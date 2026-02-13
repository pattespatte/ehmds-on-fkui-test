<template>
	<DocsLayout>
		<div class="docs-index">
			<h1>Documentation</h1>
			<p>Welcome to the EHMDS documentation. Select a topic below:</p>
			<ul class="docs-list">
				<li><router-link to="/docs/architecture/overview">Architecture Overview</router-link></li>
				<li><router-link to="/docs/architecture/architecture-theory">Architecture Theory</router-link></li>
				<li><router-link to="/docs/architecture/token-override">Token Override Pattern</router-link></li>
				<li><router-link to="/docs/architecture/wrapper">Wrapper/Facade Pattern</router-link></li>
				<li><router-link to="/docs/architecture/extension">Extension Pattern</router-link></li>
				<li><router-link to="/docs/architecture/composition">Composition Pattern</router-link></li>
			</ul>
		</div>
	</DocsLayout>
</template>

<script setup>
import DocsLayout from './DocsLayout.vue';
</script>

<style scoped>
.docs-index h1 {
	margin-bottom: 1rem;
}

.docs-list {
	list-style: none;
	padding: 0;
}

.docs-list li {
	margin: 0.5rem 0;
}

.docs-list a {
	color: #3498db;
	text-decoration: none;
	font-size: 1.1rem;
}

.docs-list a:hover {
	text-decoration: underline;
}
</style>
