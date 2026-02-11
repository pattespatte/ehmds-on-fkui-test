<template>
	<DocsLayout>
		<div class="docs-page" v-html="markdownHtml"></div>
	</DocsLayout>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import DocsLayout from "./DocsLayout.vue";
import { loadMarkdown } from "../../utils/markdown.js";
import mermaid from "mermaid";

const route = useRoute();
const markdownHtml = ref("");

// Initialize Mermaid
mermaid.initialize({
	startOnLoad: false,
	theme: "default",
	securityLevel: "loose",
});

const renderMermaidDiagrams = async () => {
	await nextTick();
	const mermaidDivs = document.querySelectorAll(
		".mermaid[data-mermaid-code]",
	);
	for (const div of mermaidDivs) {
		const encoded = div.getAttribute("data-mermaid-code");
		const code = decodeURIComponent(escape(atob(encoded)));
		const id = div.getAttribute("data-mermaid-id");
		try {
			const { svg } = await mermaid.render(id + "-svg", code);
			div.innerHTML = svg;
		} catch (error) {
			console.error("Mermaid rendering error:", error);
			div.innerHTML = `<pre class="mermaid-error">${error.message}</pre>`;
		}
	}
};

const loadDocs = async () => {
	const page = route.params.page || "overview";
	// Use Vite's BASE_URL for environment-aware paths
	// Dev: '/' (docs served via symlink from public/docs)
	// Prod: '/ehmds-on-fkui-test/' (docs in dist/docs from viteStaticCopy)
	const basePath = import.meta.env.BASE_URL;
	// Map page names to file paths
	const pageFiles = {
		overview: `${basePath}docs/architecture/overview.md`,
		"token-override": `${basePath}docs/architecture/token-override.md`,
		wrapper: `${basePath}docs/architecture/wrapper.md`,
		extension: `${basePath}docs/architecture/extension.md`,
		composition: `${basePath}docs/architecture/composition.md`,
		comparison: `${basePath}docs/architecture/comparison.md`,
		accessibility: `${basePath}docs/architecture/accessibility.md`,
		"fkui-updates": `${basePath}docs/architecture/fkui-updates.md`,
	};
	const filePath = pageFiles[page];
	if (filePath) {
		// Pass the architecture docs directory for resolving relative links
		const currentDir = `${basePath}docs/architecture`;
		markdownHtml.value = await loadMarkdown(filePath, currentDir);
		// Render Mermaid diagrams after HTML update
		await renderMermaidDiagrams();
	} else {
		markdownHtml.value =
			"<p>Documentation page not found: " + page + "</p>";
	}
};

onMounted(() => {
	loadDocs();
});

// Reload when route changes
watch(
	() => route.params.page,
	() => {
		loadDocs();
	},
);
</script>

<style scoped>
.docs-page {
	line-height: 1.6;
}

.docs-page :deep(h1) {
	font-size: 2rem;
	margin: 0 0 1rem 0;
	color: #2c3e50;
	border-bottom: 2px solid #dee2e6;
	padding-bottom: 0.5rem;
}

.docs-page :deep(h2) {
	font-size: 1.5rem;
	margin: 1.5rem 0 0.75rem 0;
	color: #34495e;
}

.docs-page :deep(h3) {
	font-size: 1.25rem;
	margin: 1.25rem 0 0.5rem 0;
	color: #34495e;
}

.docs-page :deep(h4) {
	font-size: 1.1rem;
	margin: 1rem 0 0.5rem 0;
	color: #34495e;
}

.docs-page :deep(p) {
	margin: 0 0 1rem 0;
}

.docs-page :deep(ul),
.docs-page :deep(ol) {
	margin: 0 0 1rem 0;
	padding-left: 2rem;
}

.docs-page :deep(li) {
	margin: 0.25rem 0;
}

.docs-page :deep(code) {
	background: #f1f5f9;
	padding: 0.125rem 0.375rem;
	border-radius: 0.25rem;
	font-family: "Monaco", "Consolas", monospace;
	font-size: 0.9em;
}

.docs-page :deep(pre) {
	background: #1e293b;
	color: #e2e8f0;
	padding: 1rem;
	border-radius: 0.5rem;
	overflow-x: auto;
	margin: 1rem 0;
}

.docs-page :deep(pre code) {
	background: none;
	padding: 0;
	color: inherit;
}

.docs-page :deep(a) {
	color: #3498db;
	text-decoration: none;
}

.docs-page :deep(a:hover) {
	text-decoration: underline;
}

.docs-page :deep(table) {
	width: 100%;
	border-collapse: collapse;
	margin: 1rem 0;
}

.docs-page :deep(th),
.docs-page :deep(td) {
	padding: 0.75rem;
	text-align: left;
	border-bottom: 1px solid #dee2e6;
}

.docs-page :deep(th) {
	background: #495057;
	color: white;
	font-weight: 600;
}

.docs-page :deep(blockquote) {
	border-left: 4px solid #3498db;
	padding-left: 1rem;
	margin: 1rem 0;
	color: #6c757d;
}

/* Mermaid diagram styling */
.docs-page :deep(.mermaid) {
	display: flex;
	justify-content: center;
	margin: 2rem 0;
	padding: 1rem;
	background: #f8f9fa;
	border-radius: 0.5rem;
}

.docs-page :deep(.mermaid svg) {
	max-width: 100%;
	height: auto;
}

.docs-page :deep(.mermaid-error) {
	color: #dc3545;
	background: #f8d7da;
	padding: 1rem;
	border-radius: 0.25rem;
}
</style>
