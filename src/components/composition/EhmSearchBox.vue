<template>
  <!--
    Composition Pattern: EhmSearchBox composes MULTIPLE FKUI components into a
    single domain-specific search component.

    Composed FKUI components:
      - FTextField        — the query input
      - FButton (primary)  — the search action
      - FButton (tertiary) — the clear action
      - FExpandablePanel   — the collapsible "advanced search" container (when
                             `expandable` is set); FExpandablePanel renders its
                             own accessibility-correct toggle button and
                             manages aria-expanded / aria-controls itself.
  -->
  <div class="ehm-search-box" :class="searchBoxClasses">
    <!-- Expandable variant: FExpandablePanel provides the toggle + a11y -->
    <FExpandablePanel
      v-if="expandable"
      :expanded="isExpanded"
      header-tag="h3"
      class="ehm-search-box__expandable"
      @toggle="toggleExpand"
    >
      <template #title>{{ placeholder || "Search" }}</template>

      <!-- default slot = the expandable body -->
      <div class="ehm-search-box__content">
        <!-- Composed: FTextField -->
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

        <!-- Composed: FButton (search action) -->
        <FButton
          variant="primary"
          size="small"
          type="button"
          class="ehm-search-box__button"
          :disabled="isButtonDisabled"
          :aria-label="showIcon ? 'Sök' : undefined"
          @click="handleSearch"
        >
          <span v-if="showIcon" aria-hidden="true">🔍</span>
          <template v-else>Sök</template>
        </FButton>

        <!-- Composed: FButton (clear action) -->
        <FButton
          v-if="showClearButton"
          variant="tertiary"
          size="small"
          type="button"
          class="ehm-search-box__clear"
          aria-label="Rensa"
          @click="handleClear"
        >
          <span aria-hidden="true">✕</span>
        </FButton>
      </div>

      <!-- Advanced filters slot -->
      <div v-if="$slots.filters" class="ehm-search-box__filters">
        <slot name="filters" :query="searchQuery" />
      </div>
    </FExpandablePanel>

    <!-- Non-expandable variant -->
    <div v-else class="ehm-search-box__content">
      <!-- Composed: FTextField -->
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

      <!-- Composed: FButton (search action) -->
      <FButton
        variant="primary"
        size="small"
        type="button"
        class="ehm-search-box__button"
        :disabled="isButtonDisabled"
        :aria-label="showIcon ? 'Sök' : undefined"
        @click="handleSearch"
      >
        <span v-if="showIcon" aria-hidden="true">🔍</span>
        <template v-else>Sök</template>
      </FButton>

      <!-- Composed: FButton (clear action) -->
      <FButton
        v-if="showClearButton"
        variant="tertiary"
        size="small"
        type="button"
        class="ehm-search-box__clear"
        aria-label="Rensa"
        @click="handleClear"
      >
        <span aria-hidden="true">✕</span>
      </FButton>
    </div>

    <!-- Search results slot (shown after a search, in both variants) -->
    <div v-if="$slots.results && hasSearched" class="ehm-search-box__results">
      <slot name="results" :query="searchQuery" :is-loading="isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef, type Ref } from "vue";
import { FButton, FExpandablePanel, FTextField } from "@fkui/vue";

/**
 * EhmSearchBox - Composition Pattern
 *
 * Combines several FKUI components into a higher-level, domain-specific search
 * component. This is the composition pattern: the value added is the
 * orchestration (state, debouncing, clear/reset, expandable advanced filters)
 * over FKUI building blocks, not the primitives themselves.
 *
 * Architecture: COMPOSITION
 * - Composes: FTextField + FButton (×2) + FExpandablePanel
 * - Creates:  a search domain component with filtering and results display
 * - Coordinates: state and events between the composed components
 * - Use case: when the same set of FKUI components is used together repeatedly
 *
 * Accessibility is delegated to the composed FKUI components:
 * - FButton renders native <button> elements with FKUI's focus handling.
 * - FExpandablePanel renders its own toggle button and manages
 *   aria-expanded / aria-controls itself (we only drive `expanded`).
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
  },
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

// Disable when explicitly disabled or when the query is shorter than minLength
const isButtonDisabled = computed(() => props.disabled || !hasQuery.value);

const searchBoxClasses = computed(() => ({
  "ehm-search-box--expandable": props.expandable,
  "ehm-search-box--expanded": isExpanded.value,
  "ehm-search-box--loading": isLoading.value,
}));

// === Methods ===
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
  emit("update:expanded", isExpanded.value);
};

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
.ehm-search-box {
  display: flex;
  flex-direction: column;
  gap: var(--ehmds-spacing-4, 1rem);
}

.ehm-search-box__content {
  display: flex;
  align-items: stretch;
  gap: var(--ehmds-spacing-2, 0.5rem);
  width: 100%;
}

.ehm-search-box__input {
  flex: 1;
  min-width: 0;
}

/*
 * The search field is used inline (no label). Neutralise FTextField's label and
 * spacing so it reads as a bare search input. These are token/layout overrides
 * only — FTextField's behaviour and a11y are preserved.
 */
.ehm-search-box__input :deep(.text-field) {
  --f-border-width-medium: 1px;
  --fkds-color-border-primary: var(--ehmds-color-neutral-300, #b0b8c9);
  --f-border-radius-medium: var(--ehmds-border-radius-medium, 8px);
  margin-bottom: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}

.ehm-search-box__input :deep(.text-field__input-wrapper),
.ehm-search-box__input :deep(.text-field__wrapper) {
  border: none !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}

/* Target FKUI's .text-field__input directly — the actual <input> element */
.ehm-search-box__content :deep(.text-field__input) {
  border: 1px solid var(--ehmds-color-neutral-300, #b0b8c9) !important;
  border-radius: var(--ehmds-border-radius-medium, 8px) !important;
  box-shadow: none !important;
  height: 40px;
  background: transparent;
}

.ehm-search-box__input :deep(.label) {
  display: none;
}

.ehm-search-box__input :deep(.text-field > :first-child) {
  height: 0;
  overflow: hidden;
}

/*
 * Composed FButton components keep FKUI's own focus handling, so we do NOT
 * override their :focus-visible — preserving FKUI's accessibility behaviour is
 * a project rule. We only align the button height with the input row.
 */
.ehm-search-box__button,
.ehm-search-box__clear {
  flex-shrink: 0;
  height: 40px;
}

.ehm-search-box__filters {
  margin-top: var(--ehmds-spacing-3, 0.75rem);
  padding-top: var(--ehmds-spacing-3, 0.75rem);
  border-top: 1px solid var(--ehmds-color-neutral-200, #d0d5e0);
}

.ehm-search-box__results {
  margin-top: var(--ehmds-spacing-4, 1rem);
}

/* Expandable container: nudge FExpandablePanel toward the EHMDS card look */
.ehm-search-box__expandable :deep(.expandable-panel) {
  border: 1px solid var(--ehmds-color-neutral-300, #b0b8c9);
  border-radius: var(--ehmds-border-radius-medium, 8px);
  background-color: var(--ehmds-color-background-primary, #ffffff);
}

.ehm-search-box--loading {
  opacity: 0.7;
  pointer-events: none;
}

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
