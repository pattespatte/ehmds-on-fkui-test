<template>
  <!--
    Composition Pattern: EhmSearchBox composes MULTIPLE FKUI components into a
    single domain-specific search component.

    Composed FKUI components:
      - FTextField        — the query input. The action buttons are placed in
                            FTextField's real `input-right` slot, so they live
                            *inside* the field's own input-wrapper DOM and stay
                            perfectly aligned with the input (Flowbite-style
                            overlay) instead of being an unrelated flex sibling.
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
        <!-- Composed: FTextField — action buttons live in its real
             `input-right` slot, so they share the field's input-wrapper DOM
             and stay aligned (Flowbite-style overlay). -->
        <FTextField
          :id="searchInputId"
          v-model="searchQuery"
          :placeholder="placeholder"
          :disabled="disabled"
          :inline="true"
          class="ehm-search-box__input"
          @keyup.enter="handleSearch"
          @keyup.escape="handleClear"
        >
          <template #input-right>
            <div class="ehm-search-box__actions">
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
                <EhmSearchIcon v-if="showIcon" />
                <template v-else>Sök</template>
              </FButton>
            </div>
          </template>
        </FTextField>
      </div>

      <!-- Advanced filters slot -->
      <div v-if="$slots.filters" class="ehm-search-box__filters">
        <slot name="filters" :query="searchQuery" />
      </div>
    </FExpandablePanel>

    <!-- Non-expandable variant -->
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
      >
        <template #input-right>
          <div class="ehm-search-box__actions">
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

            <FButton
              variant="primary"
              size="small"
              type="button"
              class="ehm-search-box__button"
              :disabled="isButtonDisabled"
              :aria-label="showIcon ? 'Sök' : undefined"
              @click="handleSearch"
            >
              <EhmSearchIcon v-if="showIcon" />
              <template v-else>Sök</template>
            </FButton>
          </div>
        </template>
      </FTextField>
    </div>

    <!-- Search results slot (shown after a search, in both variants) -->
    <div v-if="$slots.results && hasSearched" class="ehm-search-box__results">
      <slot name="results" :query="searchQuery" :is-loading="isLoading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, type ComputedRef, type Ref } from "vue";
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
 * The action buttons are placed in FTextField's real `input-right` slot so they
 * render inside the field's own input-wrapper DOM. This keeps them perfectly
 * aligned with the input (Flowbite-style overlay) instead of being an unrelated
 * flex sibling that drifts vertically.
 *
 * Accessibility is delegated to the composed FKUI components:
 * - FButton renders native <button> elements with FKUI's focus handling.
 * - FExpandablePanel renders its own toggle button and manages
 *   aria-expanded / aria-controls itself (we only drive `expanded`).
 */

/*
 * Crisp inline SVG magnifier for the search button. Uses `currentColor`, so on
 * the primary (navy) button it renders white-on-navy — a monochrome icon with
 * no emoji rasterisation/blur. `aria-hidden` because the button itself carries
 * an accessible name via `aria-label`.
 */
const EhmSearchIcon = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "2",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
      focusable: "false",
    },
    [
      h("circle", { cx: "11", cy: "11", r: "7" }),
      h("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" }),
    ],
  );
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
  width: 100%;
}

/*
 * The search field is used inline (no label). Neutralise FTextField's label and
 * spacing so it reads as a bare search input. These are token/layout overrides
 * only — FTextField's behaviour and a11y are preserved.
 *
 * Selector note: FKUI forwards our `ehm-search-box__input` class onto the inner
 * <input> element itself (via $attrs), NOT onto an ancestor. So
 * `.ehm-search-box__input :deep(.text-field)` would look for `.text-field` as a
 * descendant of the <input> — which never matches. We anchor every :deep rule
 * on the stable `.ehm-search-box__content` wrapper instead.
 */
.ehm-search-box__content :deep(.text-field) {
  --f-border-width-medium: 1px;
  --fkds-color-border-primary: var(--ehmds-color-neutral-300, #b0b8c9);
  --f-border-radius-medium: var(--ehmds-border-radius-medium, 8px);
  margin-bottom: 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
}

.ehm-search-box__content :deep(.text-field__input-wrapper),
.ehm-search-box__content :deep(.text-field__wrapper) {
  position: relative; /* anchor for the absolutely-positioned action overlay */
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
  /* Room for the overlay action group on the right edge */
  padding-right: calc(
    var(--ehm-search-actions-width, 96px) + var(--ehmds-spacing-2, 0.5rem)
  );
  background: transparent;
}

.ehm-search-box__content :deep(.label) {
  display: none;
}

.ehm-search-box__content :deep(.text-field > :first-child) {
  height: 0;
  overflow: hidden;
}

/*
 * Action overlay — the clear + search buttons live inside FTextField's real
 * `input-right` slot, absolutely positioned over the input's right edge
 * (Flowbite search-input pattern). Because they are in the slot, they share
 * the field's DOM and cannot drift out of vertical alignment with the input.
 *
 * `top: 0; bottom: 0` pins the overlay to the input-wrapper's exact height
 * (Flowbite `inset-y-0`). This is more robust than `top: 50%` + translateY:
 * FButton renders internal spinner spans that inflate the action box's
 * shrink-to-fit height, which would otherwise mis-center the button.
 */
.ehm-search-box__actions {
  position: absolute;
  top: 0;
  bottom: 0;
  right: var(--ehmds-spacing-1, 0.25rem);
  display: flex;
  align-items: center;
  gap: var(--ehmds-spacing-1, 0.25rem);
  z-index: 1;
}

/*
 * Composed FButton components keep FKUI's own focus handling, so we do NOT
 * override their :focus-visible — preserving FKUI's accessibility behaviour is
 * a project rule. We only constrain sizing so the icon button centres reliably
 * inside the 40px input row:
 *  - fixed height + `align-self: center` so the button is vertically centred
 *    by the flex container regardless of FKUI's intrinsic button height;
 *  - zero FKUI's button margins (`margin: 0`). FKUI's .button carries a large
 *    bottom margin (24px); in a centred flex item that margin is part of the
 *    margin box and shifts the button's visual centre upward, breaking
 *    alignment with the input;
 *  - neutralise the always-rendered spinner spans so they don't inflate the
 *    content line box around the icon.
 */
.ehm-search-box__button {
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 32px;
  margin: 0;
  padding-inline: var(--ehmds-spacing-2, 0.5rem);
  line-height: 1;
}

.ehm-search-box__button :deep(.spinner--before),
.ehm-search-box__button :deep(.spinner--after) {
  display: none;
}

.ehm-search-box__clear {
  align-self: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  min-width: 28px;
  margin: 0;
  line-height: 1;
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
  /* On small screens give the search action a little more breathing room. */
  .ehm-search-box__content :deep(.text-field__input) {
    padding-right: calc(
      var(--ehm-search-actions-width, 96px) + var(--ehmds-spacing-2, 0.5rem)
    );
  }
}
</style>
