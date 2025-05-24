<template>
  <div class="app">
    <header class="header">
      <h1>EHMDS Button Component Demo</h1>
      <p>Testing the improved Button component with various configurations</p>
    </header>

    <main class="main">
      <!-- Basic Variants Section -->
      <section class="demo-section">
        <h2>Basic FKUI Variants</h2>
        <div class="button-grid">
          <EhmdsButton variant="primary" @click="handleClick">Primary</EhmdsButton>
          <EhmdsButton variant="secondary" @click="handleClick">Secondary</EhmdsButton>
          <EhmdsButton variant="tertiary" @click="handleClick">Tertiary</EhmdsButton>
          <EhmdsButton variant="success" @click="handleClick">Success</EhmdsButton>
          <EhmdsButton variant="warning" @click="handleClick">Warning</EhmdsButton>
          <EhmdsButton variant="error" @click="handleClick">Error</EhmdsButton>
        </div>
      </section>

      <!-- EHMDS Custom Variants -->
      <section class="demo-section">
        <h2>EHMDS Custom Variants</h2>
        <div class="button-grid">
          <EhmdsButton variant="ehmds-primary" @click="handleClick">EHMDS Primary</EhmdsButton>
          <EhmdsButton variant="ehmds-secondary" @click="handleClick">EHMDS Secondary</EhmdsButton>
          <EhmdsButton variant="ehmds-accent" @click="handleClick">EHMDS Accent</EhmdsButton>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Button Sizes</h2>
        <div class="button-row">
          <EhmdsButton size="small" @click="handleClick">Small</EhmdsButton>
          <EhmdsButton size="medium" @click="handleClick">Medium</EhmdsButton>
          <EhmdsButton size="large" @click="handleClick">Large</EhmdsButton>
        </div>
      </section>

      <!-- Enhanced Features -->
      <section class="demo-section">
        <h2>Enhanced Features</h2>
        <div class="button-grid">
          <EhmdsButton rounded @click="handleClick">Rounded</EhmdsButton>
          <EhmdsButton shadow @click="handleClick">With Shadow</EhmdsButton>
          <EhmdsButton rounded shadow @click="handleClick">Rounded + Shadow</EhmdsButton>
          <EhmdsButton full-width @click="handleClick">Full Width</EhmdsButton>
        </div>
      </section>

      <!-- States -->
      <section class="demo-section">
        <h2>Button States</h2>
        <div class="button-grid">
          <EhmdsButton @click="handleClick">Normal</EhmdsButton>
          <EhmdsButton disabled @click="handleClick">Disabled</EhmdsButton>
          <EhmdsButton :loading="isLoading" @click="handleLoadingClick">
            {{ isLoading ? 'Loading...' : 'Click to Load' }}
          </EhmdsButton>
        </div>
      </section>

      <!-- With Icons -->
      <section class="demo-section">
        <h2>With Icon Slot</h2>
        <div class="button-grid">
          <EhmdsButton variant="ehmds-primary" @click="handleClick">
            <template #icon>
              <span class="icon">⭐</span>
            </template>
            With Icon
          </EhmdsButton>
          <EhmdsButton variant="ehmds-accent" rounded shadow @click="handleClick">
            <template #icon>
              <span class="icon">🚀</span>
            </template>
            Launch
          </EhmdsButton>
        </div>
      </section>

      <!-- Form Types -->
      <section class="demo-section">
        <h2>Form Integration</h2>
        <form @submit.prevent="handleSubmit" class="form-demo">
          <div class="form-group">
            <label for="demo-input">Test Input:</label>
            <input 
              id="demo-input" 
              v-model="formData.text" 
              type="text" 
              placeholder="Enter some text..."
            />
          </div>
          <div class="button-row">
            <EhmdsButton type="submit" variant="ehmds-primary">Submit</EhmdsButton>
            <EhmdsButton type="reset" variant="secondary" @click="resetForm">Reset</EhmdsButton>
            <EhmdsButton type="button" variant="tertiary" @click="handleClick">Cancel</EhmdsButton>
          </div>
        </form>
      </section>

      <!-- Click Counter -->
      <section class="demo-section">
        <h2>Interaction Test</h2>
        <div class="interaction-demo">
          <p>Click count: <strong>{{ clickCount }}</strong></p>
          <div class="button-row">
            <EhmdsButton variant="ehmds-accent" @click="incrementCounter">
              Increment Counter
            </EhmdsButton>
            <EhmdsButton variant="secondary" @click="resetCounter">
              Reset Counter
            </EhmdsButton>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import EhmdsButton from './components/Button.vue'

// Reactive state
const clickCount = ref(0)
const isLoading = ref(false)
const formData = reactive({
  text: ''
})

// Event handlers
const handleClick = (event) => {
  console.log('Button clicked:', event)
}

const incrementCounter = () => {
  clickCount.value++
}

const resetCounter = () => {
  clickCount.value = 0
}

const handleLoadingClick = () => {
  isLoading.value = true
  // Simulate async operation
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
}

const handleSubmit = (event) => {
  console.log('Form submitted with data:', formData)
  alert(`Form submitted with: "${formData.text}"`)
}

const resetForm = () => {
  formData.text = ''
}
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.demo-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e9ecef;
}

.demo-section h2 {
  color: #495057;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  align-items: start;
}

.button-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.form-demo {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #495057;
}

.form-group input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.interaction-demo {
  text-align: center;
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.interaction-demo p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.icon {
  margin-right: 0.5rem;
  font-size: 1rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .button-grid {
    grid-template-columns: 1fr;
  }
  
  .button-row {
    flex-direction: column;
    align-items: stretch;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .demo-section {
    border: 2px solid #000;
  }
  
  .form-group input {
    border: 2px solid #000;
  }
}
</style>