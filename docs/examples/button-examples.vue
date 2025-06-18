<template>
	<div class="button-examples">
		<h2>Button Examples</h2>

		<section class="example-section">
			<h3>Basic Variants</h3>
			<div class="button-grid">
				<EhmdsButton variant="primary">Primary</EhmdsButton>
				<EhmdsButton variant="secondary">Secondary</EhmdsButton>
				<EhmdsButton variant="tertiary">Tertiary</EhmdsButton>
				<EhmdsButton variant="success">Success</EhmdsButton>
				<EhmdsButton variant="warning">Warning</EhmdsButton>
				<EhmdsButton variant="error">Error</EhmdsButton>
			</div>
		</section>

		<section class="example-section">
			<h3>EHMDS Custom Variants</h3>
			<div class="button-grid">
				<EhmdsButton variant="ehmds-primary">EHMDS Primary</EhmdsButton>
				<EhmdsButton variant="ehmds-secondary"
					>EHMDS Secondary</EhmdsButton
				>
				<EhmdsButton variant="ehmds-accent">EHMDS Accent</EhmdsButton>
			</div>
		</section>

		<section class="example-section">
			<h3>Sizes</h3>
			<div class="button-grid">
				<EhmdsButton size="small">Small</EhmdsButton>
				<EhmdsButton size="medium">Medium</EhmdsButton>
				<EhmdsButton size="large">Large</EhmdsButton>
			</div>
		</section>

		<section class="example-section">
			<h3>Enhanced Features</h3>
			<div class="button-grid">
				<EhmdsButton rounded>Rounded</EhmdsButton>
				<EhmdsButton shadow>With Shadow</EhmdsButton>
				<EhmdsButton rounded shadow variant="ehmds-primary"
					>Rounded + Shadow</EhmdsButton
				>
				<EhmdsButton full-width variant="success"
					>Full Width</EhmdsButton
				>
			</div>
		</section>

		<section class="example-section">
			<h3>States</h3>
			<div class="button-grid">
				<EhmdsButton disabled>Disabled</EhmdsButton>
				<EhmdsButton loading>Loading</EhmdsButton>
				<EhmdsButton :loading="isLoading" @click="toggleLoading">
					{{ isLoading ? "Loading..." : "Click to Load" }}
				</EhmdsButton>
			</div>
		</section>

		<section class="example-section">
			<h3>With Icons</h3>
			<div class="button-grid">
				<EhmdsButton variant="primary">
					<template #icon>
						<span>🚀</span>
					</template>
					Launch
				</EhmdsButton>
				<EhmdsButton variant="success">
					<template #icon>
						<span>✓</span>
					</template>
					Save
				</EhmdsButton>
			</div>
		</section>
	</div>
</template>

<script setup>
import { ref } from "vue";
import EhmdsButton from "../../src/components/Button.vue";

const isLoading = ref(false);

const toggleLoading = () => {
	isLoading.value = true;
	setTimeout(() => {
		isLoading.value = false;
	}, 2000);
};
</script>

<style scoped>
.button-examples {
	padding: 2rem;
	max-width: 800px;
	margin: 0 auto;
}

.example-section {
	margin-bottom: 2rem;
}

.example-section h3 {
	margin-bottom: 1rem;
	color: #2c5aa0;
}

.button-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: center;
}

.button-grid .ehmds-button--full-width {
	flex-basis: 100%;
}
</style>
