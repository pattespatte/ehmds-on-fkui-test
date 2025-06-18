<template>
	<div class="card-examples">
		<h2>Card Examples</h2>
		
		<section class="example-section">
			<h3>Basic Card</h3>
			<div class="card-grid">
				<EhmdsCard title="Simple Card">
					<p>This is a basic card with a title and some content.</p>
				</EhmdsCard>
			</div>
		</section>

		<section class="example-section">
			<h3>Card without Title</h3>
			<div class="card-grid">
				<EhmdsCard>
					<p>This card has no title, just content in the body.</p>
				</EhmdsCard>
			</div>
		</section>

		<section class="example-section">
			<h3>Card with Footer</h3>
			<div class="card-grid">
				<EhmdsCard title="Card with Footer">
					<p>This card demonstrates the footer slot functionality.</p>
					<template #footer>
						<EhmdsButton size="small" variant="primary">Action</EhmdsButton>
						<EhmdsButton size="small" variant="tertiary">Cancel</EhmdsButton>
					</template>
				</EhmdsCard>
			</div>
		</section>

		<section class="example-section">
			<h3>Custom Styling</h3>
			<div class="card-grid">
				<EhmdsCard 
					title="Custom Background" 
					background="#f0f4f8"
					border="#2c5aa0"
				>
					<p>This card has a custom background and border color.</p>
				</EhmdsCard>
				
				<EhmdsCard 
					title="Accent Card" 
					background="#fff5f5"
					border="#ff6b35"
				>
					<p>This card uses accent colors for a different look.</p>
				</EhmdsCard>
			</div>
		</section>

		<section class="example-section">
			<h3>Content Examples</h3>
			<div class="card-grid">
				<EhmdsCard title="User Profile">
					<div class="profile-content">
						<div class="avatar">👤</div>
						<h4>John Doe</h4>
						<p>Software Developer</p>
						<p>john.doe@example.com</p>
					</div>
					<template #footer>
						<EhmdsButton size="small" variant="ehmds-primary">View Profile</EhmdsButton>
					</template>
				</EhmdsCard>

				<EhmdsCard title="Statistics">
					<div class="stats-content">
						<div class="stat-item">
							<span class="stat-number">1,234</span>
							<span class="stat-label">Users</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">567</span>
							<span class="stat-label">Orders</span>
						</div>
						<div class="stat-item">
							<span class="stat-number">89%</span>
							<span class="stat-label">Success Rate</span>
						</div>
					</div>
				</EhmdsCard>

				<EhmdsCard title="Form Example">
					<form @submit.prevent="handleSubmit">
						<div class="form-group">
							<label for="name">Name:</label>
							<input id="name" v-model="formData.name" type="text" />
						</div>
						<div class="form-group">
							<label for="email">Email:</label>
							<input id="email" v-model="formData.email" type="email" />
						</div>
					</form>
					<template #footer>
						<EhmdsButton size="small" variant="success" @click="handleSubmit">Submit</EhmdsButton>
						<EhmdsButton size="small" variant="tertiary" @click="resetForm">Reset</EhmdsButton>
					</template>
				</EhmdsCard>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import EhmdsCard from '../../src/components/Card.vue'
import EhmdsButton from '../../src/components/Button.vue'

const formData = ref({
	name: '',
	email: ''
})

const handleSubmit = () => {
	console.log('Form submitted:', formData.value)
	alert('Form submitted! Check console for data.')
}

const resetForm = () => {
	formData.value = {
		name: '',
		email: ''
	}
}
</script>

<style scoped>
.card-examples {
	padding: 2rem;
	max-width: 1200px;
	margin: 0 auto;
}

.example-section {
	margin-bottom: 3rem;
}

.example-section h3 {
	margin-bottom: 1rem;
	color: #2c5aa0;
}

.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 1.5rem;
}

.profile-content {
	text-align: center;
}

.avatar {
	font-size: 3rem;
	margin-bottom: 1rem;
}

.profile-content h4 {
	margin: 0.5rem 0;
	color: #2c5aa0;
}

.stats-content {
	display: flex;
	justify-content: space-around;
	text-align: center;
}

.stat-item {
	display: flex;
	flex-direction: column;
}

.stat-number {
	font-size: 1.5rem;
	font-weight: bold;
	color: #2c5aa0;
}

.stat-label {
	font-size: 0.875rem;
	color: #666;
}

.form-group {
	margin-bottom: 1rem;
}

.form-group label {
	display: block;
	margin-bottom: 0.25rem;
	font-weight: 500;
}

.form-group input {
	width: 100%;
	padding: 0.5rem;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	font-size: 1rem;
}

.form-group input:focus {
	outline: none;
	border-color: #2c5aa0;
	box-shadow: 0 0 0 2px rgba(44, 90, 160, 0.1);
}
</style>