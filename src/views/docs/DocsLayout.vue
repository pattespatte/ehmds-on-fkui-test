<template>
	<div class="docs-layout">
		<header class="docs-header">
			<div class="docs-header-content">
				<h1>EHMDS Documentation</h1>
				<nav class="docs-nav">
					<router-link to="/">← Back to Demo</router-link>
				</nav>
			</div>
		</header>
		<main class="docs-main">
			<div class="docs-content">
				<slot />
			</div>
		</main>
		<footer class="docs-footer">
			<p>EHMDS - A proof-of-concept exploring layered design system architecture</p>
		</footer>
	</div>
</template>

<style scoped>
.docs-layout {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	font-family: var(--ehmds-font-family, "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
}

.docs-header {
	background: #f8f9fa;
	border-bottom: 1px solid #e9ecef;
	padding: 1.5rem 0;
}

.docs-header-content {
	max-width: 900px;
	margin: 0 auto;
	padding: 0 2rem;
}

.docs-header h1 {
	margin: 0 0 0.5rem 0;
	font-size: 1.75rem;
	color: #2c3e50;
}

.docs-nav a {
	color: #3498db;
	text-decoration: none;
	font-weight: 500;
}

.docs-nav a:hover {
	text-decoration: underline;
}

.docs-main {
	flex: 1;
	padding: 2rem 0;
}

.docs-content {
	max-width: 800px;
	margin: 0 auto;
	padding: 0 2rem;
}

.docs-footer {
	padding: 2rem 0;
	border-top: 1px solid #e9ecef;
	text-align: center;
	color: #6c757d;
	font-size: 0.875rem;
}

.docs-footer p {
	margin: 0;
}
</style>
