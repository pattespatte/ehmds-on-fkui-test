<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <slot></slot>
    </div>
    <div class="demo-block__code" v-if="showCode">
      <slot name="code"></slot>
    </div>
    <button 
      class="demo-block__toggle" 
      @click="showCode = !showCode"
    >
      {{ showCode ? 'Hide' : 'Show' }} Code
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showCode = ref(false)
</script>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: .5rem;
  margin: 1rem 0;
}

.demo-block__preview {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
}

/* Add spacing between elements inside .demo-block */
.demo-block :deep(button:not(:last-child)),
.demo-block :deep(input:not(:last-child)),
.demo-block :deep(select:not(:last-child)),
.demo-block :deep(textarea:not(:last-child)) {
  margin-right: 0.75rem;
}

.demo-block__code {
  border-top: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.demo-block__code {
  border-top: 1px solid var(--vp-c-divider);
  overflow: hidden;
}

.demo-block__toggle {
  width: 100%;
  padding: .5rem;
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: .9rem;
}

.demo-block__toggle:hover {
  color: var(--vp-c-brand);
}
</style>