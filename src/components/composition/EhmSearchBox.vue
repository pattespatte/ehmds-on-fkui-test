<template>
	<!-- Composition pattern: EhmSearchBox composes multiple FKUI components -->
	<div class="ehm-search-box" :class="searchBoxClasses">
		<!-- Compose: FTextField + buttons + expandable into search domain component -->
		<div v-if="expandable" class="ehm-search-box__expandable">
			<!-- Custom expandable header -->
			<button
				type="button"
				class="ehm-search-box__toggle"
				:aria-expanded="isExpanded"
				@click="toggleExpand"
			>
				<span class="ehm-search-box__toggle-text">{{ placeholder || 'Search' }}</span>
				<span class="ehm-search-box__toggle-icon" aria-hidden="true">
					{{ isExpanded ? '▼' : '▶' }}
				</span>
			</button>

			<!-- Expandable content -->
			<div v-show="isExpanded" class="ehm-search-box__expandable-content">
				<div class="ehm-search-box__content">
					<!-- Search input - COMPOSED from FTextField -->
					<FTextField
						:id="searchInputId"
						v-model="searchQuery"
						:placeholder="placeholder"
						:disabled="disabled"
						:inline="true"
						class="ehm-search-box__input"
						@keyup.enter="handleSearch"
						@keyup.escape="handleClear"
					/>

					<!-- Search button - COMPOSED with FKUI button styling -->
					<button
						type="button"
						class="button button--small ehm-search-box__button"
						:disabled="isButtonDisabled"
						@click="handleSearch"
						:aria-label="showIcon ? 'Sök' : undefined"
					>
						<template v-if="showIcon">
							<span aria-hidden="true">🔍</span>
						</template>
						<template v-else>
							Sök
						</template>
					</button>

					<!-- Clear button - COMPOSED with FKUI button styling -->
					<button
						v-if="showClearButton"
						type="button"
						class="button button--discrete button--small ehm-search-box__clear"
						@click="handleClear"
						aria-label="Rensa"
					>
						<span aria-hidden="true">✕</span>
					</button>
				</div>

				<!-- Advanced filters slot -->
				<div v-if="$slots.filters" class="ehm-search-box__filters">
					<slot name="filters" :query="searchQuery" />
				</div>
			</div>
		</div>

		<!-- Non-expandable version -->
		<div v-else class="ehm-search-box__content">
			<FTextField
				:id="searchInputId"
				v-model="searchQuery"
				:placeholder="placeholder"
				:disabled="disabled"
				:inline="true"
				class="ehm-search-box__input"
				@keyup.enter="handleSearch"
				@keyup.escape="handleClear"
			/>

			<button
				type="button"
				class="button button--small ehm-search-box__button"
				:disabled="isButtonDisabled"
				@click="handleSearch"
				:aria-label="showIcon ? 'Sök' : undefined"
			>
				<template v-if="showIcon">
					<span aria-hidden="true">🔍</span>
				</template>
				<template v-else>
					Sök
				</template>
			</button>

			<button
				v-if="showClearButton"
				type="button"
				class="button button--discrete button--small ehm-search-box__clear"
				@click="handleClear"
				aria-label="Rensa"
			>
				<span aria-hidden="true">✕</span>
			</button>
		</div>

		<!-- Search results slot -->
		<div v-if="$slots.results && hasSearched" class="ehm-search-box__results">
			<slot name="results" :query="searchQuery" :is-loading="isLoading" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { FTextField } from "@fkui/vue";

/**
 * EhmSearchBox - Composition Pattern
 *
 * This component COMPOSES multiple FKUI components into a higher-level
 * domain-specific component for search functionality.
 *
 * Architecture: COMPOSITION
 * - Composes: FTextField (input) + HTML Button with FKUI styling + FExpandablePanel (expandable)
 * - Creates: Search domain component with filtering, results display
 * - Coordinate: Manages state and communication between composed components
 * - Use case: When you need to combine multiple FKUI components into a cohesive UI
 */

defineOptions({
	name: "EhmSearchBox",
	inheritAttrs: false,
});

interface EhmSearchBoxProps {
	/** Placeholder text for search input */
	placeholder?: string;
	/** Disabled state */
	disabled?: boolean;
	/** Show search button icon */
	showIcon?: boolean;
	/** Make search box expandable */
	expandable?: boolean;
	/** Minimum characters before search is enabled */
	minLength?: number;
	/** Debounce delay in milliseconds */
	debounce?: number;
	/** Initial search query */
	modelValue?: string;
}

const props = withDefaults(defineProps<EhmSearchBoxProps>(), {
	placeholder: "Search...",
	disabled: false,
	showIcon: true,
	expandable: false,
	minLength: 0,
	debounce: 300,
	modelValue: "",
});

interface EhmSearchBoxEmits {
	"update:modelValue": [value: string];
	search: [query: string];
	clear: [];
	"update:expanded": [value: boolean];
}

const emit = defineEmits<EhmSearchBoxEmits>();

// === State ===
const isExpanded: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const hasSearched: Ref<boolean> = ref(false);
let debounceTimer: number | ReturnType<typeof setTimeout> | null = null;

// === Computed ===
// Use computed getter/setter for two-way binding with parent
const searchQuery: ComputedRef<string> = computed({
	get: () => props.modelValue ?? "",
	set: (value: string) => {
		emit("update:modelValue", value);

		// Clear existing timer
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}

		// Debounce search
		const query = value.trim();
		if (query.length >= props.minLength) {
			if (props.debounce > 0) {
				debounceTimer = setTimeout(() => {
					performSearch();
				}, props.debounce);
			} else {
				performSearch();
			}
		}
	}
});

const searchInputId = computed(
	() => `ehm-search-${Math.random().toString(36).slice(2, 11)}`,
);

const hasQuery = computed(() => {
	const query = (searchQuery.value ?? "").trim();
	return query.length >= props.minLength;
});

const showClearButton = computed(() => {
	return Boolean(searchQuery.value);
});

// Always enable buttons for now (TODO: implement proper disabled logic)
const isButtonDisabled = computed(() => false);

const searchBoxClasses = computed(() => ({
	"ehm-search-box--expandable": props.expandable,
	"ehm-search-box--expanded": isExpanded.value,
	"ehm-search-box--loading": isLoading.value,
}));

// === Methods ===
// Note: @update:model-value is no longer needed since computed setter handles updates
const performSearch = () => {
	const query = (searchQuery.value ?? "").trim();
	if (query.length < props.minLength) {
		return;
	}

	hasSearched.value = true;
	emit("search", query);
};

const handleSearch = () => {
	performSearch();
};

const handleClear = () => {
	searchQuery.value = "";
	hasSearched.value = false;
	emit("update:modelValue", "");
	emit("clear");
};

const toggleExpand = () => {
	isExpanded.value = !isExpanded.value;
};

// === Watchers ===
// Note: We don't need to watch props.modelValue since v-model binding
// in the template (v-model="searchQuery") handles direct updates

// Expose methods for parent components
defineExpose({
	focus: () => {
		const input = document.getElementById(searchInputId.value);
		input?.focus();
	},
	clear: handleClear,
	search: performSearch,
});
</script>

<style scoped>
/* Composition pattern styles - coordinates composed components */
.ehm-search-box {
	display: flex;
	flex-direction: column;
	gap: var(--ehmds-spacing-4, 1rem);
}

.ehm-search-box__content {
	display: flex;
	align-items: center;
	gap: var(--ehmds-spacing-2, 0.5rem);
	width: 100%;
}

.ehm-search-box__input {
	flex: 1;
	min-width: 0;
}

.ehm-search-box__button {
	flex-shrink: 0;
}

.ehm-search-box__clear {
	flex-shrink: 0;
}

.ehm-search-box__filters {
	margin-top: var(--ehmds-spacing-3, 0.75rem);
	padding-top: var(--ehmds-spacing-3, 0.75rem);
	border-top: 1px solid var(--ehmds-color-neutral-200, #e2e8f0);
}

.ehm-search-box__results {
	margin-top: var(--ehmds-spacing-4, 1rem);
}

/* Expandable styles */
.ehm-search-box__expandable {
	border: 1px solid var(--ehmds-color-neutral-300, #cbd5e1);
	border-radius: var(--ehmds-border-radius-medium, 6px);
	background-color: var(--ehmds-color-background-primary, #ffffff);
	overflow: hidden;
}

.ehm-search-box__toggle {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: var(--ehmds-spacing-2, 0.5rem);
	padding: var(--ehmds-spacing-3, 0.75rem);
	background: none;
	border: none;
	cursor: pointer;
	text-align: left;
	font-family: inherit;
	font-size: 1rem;
	font-weight: 600;
	color: var(--ehmds-color-text-primary, #1a202c);
	transition: background-color 0.2s;
}

.ehm-search-box__toggle:hover {
	background-color: var(--ehmds-color-neutral-100, #f7fafc);
}

.ehm-search-box__toggle-text {
	flex: 1;
}

.ehm-search-box__toggle-icon {
	flex-shrink: 0;
	transition: transform 0.2s;
}

.ehm-search-box__expandable-content {
	border-top: 1px solid var(--ehmds-color-neutral-200, #e2e8f0);
}

/* Loading state */
.ehm-search-box--loading {
	opacity: 0.7;
	pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 640px) {
	.ehm-search-box__content {
		flex-wrap: wrap;
	}

	.ehm-search-box__input {
		width: 100%;
		order: 1;
	}

	.ehm-search-box__button {
		order: 2;
	}

	.ehm-search-box__clear {
		order: 3;
	}
}
</style>
