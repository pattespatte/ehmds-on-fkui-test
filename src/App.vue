<template>
  <div class="app">
    <header class="header">
      <h1>EHMDS Component Library</h1>
      <p>Overview and demos of all available components</p>
    </header>

    <!-- Component Navigation -->
    <nav class="component-nav">
      <h2>Available Components</h2>
      <div class="component-list">
        <div class="component-item">
          <h3>Button</h3>
          <p>Interactive button component with multiple variants and states</p>
          <EhmdsButton variant="ehmds-primary" @click="scrollToSection('button-demo')">
            View Button Demo
          </EhmdsButton>
        </div>
        <div class="component-item">
          <h3>Card</h3>
          <p>Container component for displaying content with optional header and footer</p>
          <EhmdsButton variant="ehmds-primary" @click="scrollToSection('card-demo')">
            View Card Demo
          </EhmdsButton>
        </div>
      </div>
    </nav>

    <main class="main">
      <!-- Card Component Demo -->
      <section id="card-demo" class="demo-section">
        <h2>Card Component Demo</h2>
        <div class="card-grid">
          <!-- Basic Card -->
          <EhmdsCard title="Basic Card">
            <p>This is a basic card with a title and some content. Cards are perfect for displaying grouped information.</p>
          </EhmdsCard>

          <!-- Card with Footer -->
          <EhmdsCard title="Card with Footer">
            <p>This card demonstrates the footer slot functionality.</p>
            <template #footer>
              <EhmdsButton size="small" variant="ehmds-accent">Action</EhmdsButton>
            </template>
          </EhmdsCard>

          <!-- Custom Styled Card -->
          <EhmdsCard
            title="Custom Styled Card"
            background="#f8f9fa"
            border="#007bff"
          >
            <p>This card has custom background and border colors.</p>
            <template #footer>
              <span style="color: #6c757d; font-size: 0.875rem;">Custom styling</span>
            </template>
          </EhmdsCard>

          <!-- Card without Title -->
          <EhmdsCard>
            <h4 style="margin: 0 0 1rem 0; color: #495057;">No Title Card</h4>
            <p>This card doesn't use the title prop but has content in the default slot.</p>
            <ul style="margin: 0.5rem 0;">
              <li>Feature one</li>
              <li>Feature two</li>
              <li>Feature three</li>
            </ul>
          </EhmdsCard>

          <!-- Interactive Card -->
          <EhmdsCard title="Interactive Card">
            <p>Click count: <strong>{{ clickCount }}</strong></p>
            <div style="margin-top: 1rem;">
              <EhmdsButton size="small" variant="ehmds-primary" @click="incrementCounter">
                Increment
              </EhmdsButton>
            </div>
            <template #footer>
              <EhmdsButton size="small" variant="secondary" @click="resetCounter">
                Reset
              </EhmdsButton>
            </template>
          </EhmdsCard>

          <!-- Form Card -->
          <EhmdsCard title="Form Card">
            <form @submit.prevent="handleSubmit" class="card-form">
              <div class="form-group">
                <label for="card-input">Enter text:</label>
                <input
                  id="card-input"
                  v-model="formData.text"
                  type="text"
                  placeholder="Type something..."
                />
              </div>
            </form>
            <template #footer>
              <div class="button-row">
                <EhmdsButton size="small" type="submit" variant="ehmds-primary" @click="handleSubmit">
                  Submit
                </EhmdsButton>
                <EhmdsButton size="small" variant="tertiary" @click="resetForm">
                  Clear
                </EhmdsButton>
              </div>
            </template>
          </EhmdsCard>
        </div>
      </section>

      <!-- Button Component Demo -->
      <section id="button-demo" class="demo-section">
        <h2>Button Component Demo</h2>
        
        <!-- Basic Variants Section -->
        <div class="button-demo-subsection">
          <h3>Basic FKUI Variants</h3>
          <div class="button-grid">
            <EhmdsButton variant="primary" @click="handleClick">Primary</EhmdsButton>
            <EhmdsButton variant="secondary" @click="handleClick">Secondary</EhmdsButton>
            <EhmdsButton variant="tertiary" @click="handleClick">Tertiary</EhmdsButton>
            <EhmdsButton variant="success" @click="handleClick">Success</EhmdsButton>
            <EhmdsButton variant="warning" @click="handleClick">Warning</EhmdsButton>
            <EhmdsButton variant="error" @click="handleClick">Error</EhmdsButton>
          </div>
        </div>

        <!-- EHMDS Custom Variants -->
        <div class="button-demo-subsection">
          <h3>EHMDS Custom Variants</h3>
          <div class="button-grid">
            <EhmdsButton variant="ehmds-primary" @click="handleClick">EHMDS Primary</EhmdsButton>
            <EhmdsButton variant="ehmds-secondary" @click="handleClick">EHMDS Secondary</EhmdsButton>
            <EhmdsButton variant="ehmds-accent" @click="handleClick">EHMDS Accent</EhmdsButton>
          </div>
        </div>

        <!-- Sizes -->
        <div class="button-demo-subsection">
          <h3>Button Sizes</h3>
          <div class="button-row">
            <EhmdsButton size="small" @click="handleClick">Small</EhmdsButton>
            <EhmdsButton size="medium" @click="handleClick">Medium</EhmdsButton>
            <EhmdsButton size="large" @click="handleClick">Large</EhmdsButton>
          </div>
        </div>

        <!-- Enhanced Features -->
        <div class="button-demo-subsection">
          <h3>Enhanced Features</h3>
          <div class="button-grid">
            <EhmdsButton rounded @click="handleClick">Rounded</EhmdsButton>
            <EhmdsButton shadow @click="handleClick">With Shadow</EhmdsButton>
            <EhmdsButton rounded shadow @click="handleClick">Rounded + Shadow</EhmdsButton>
            <EhmdsButton full-width @click="handleClick">Full Width</EhmdsButton>
          </div>
        </div>

        <!-- States -->
        <div class="button-demo-subsection">
          <h3>Button States</h3>
          <div class="button-grid">
            <EhmdsButton @click="handleClick">Normal</EhmdsButton>
            <EhmdsButton disabled @click="handleClick">Disabled</EhmdsButton>
            <EhmdsButton :loading="isLoading" @click="handleLoadingClick">
              {{ isLoading ? 'Loading...' : 'Click to Load' }}
            </EhmdsButton>
          </div>
        </div>

        <!-- With Icons -->
        <div class="button-demo-subsection">
          <h3>With Icon Slot</h3>
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
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import EhmdsButton from './components/Button.vue'
import EhmdsCard from './components/Card.vue'

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

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
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

.component-nav {
  background: #ffffff;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
  margin-bottom: 3rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.component-nav h2 {
  color: #495057;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.component-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.component-item {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #dee2e6;
}

.component-item h3 {
  color: #495057;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.component-item p {
  color: #6c757d;
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.demo-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid #e9ecef;
}

.demo-section h2 {
  color: #495057;
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #dee2e6;
  padding-bottom: 0.5rem;
}

.button-demo-subsection {
  margin-bottom: 2rem;
}

.button-demo-subsection:last-child {
  margin-bottom: 0;
}

.button-demo-subsection h3 {
  color: #495057;
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
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

.card-form {
  margin: 0;
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
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
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
  
  .component-list {
    grid-template-columns: 1fr;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
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
@media (prefers-contrast: more) {
  .demo-section,
  .component-nav,
  .component-item {
    border: 2px solid #000;
  }
  
  .form-group input {
    border: 2px solid #000;
  }
}
</style>