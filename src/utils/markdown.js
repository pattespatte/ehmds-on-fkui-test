import { marked } from 'marked';

// Counter for unique Mermaid diagram IDs
let mermaidCounter = 0;

/**
 * Simple markdown loader that fetches and parses markdown files
 * @param {string} path - The path to the markdown file
 * @param {string} currentDir - The directory of the current markdown file (for resolving relative links)
 */
export async function loadMarkdown(path, currentDir = '') {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Failed to load ${path}: ${response.statusText}`);
		}
		let markdown = await response.text();

		// Pre-process: Extract mermaid blocks and store them
		const mermaidBlocks = [];
		markdown = markdown.replace(/```mermaid\n([\s\S]*?)```/g, (match, code) => {
			const id = `mermaid-${mermaidCounter++}`;
			const encoded = btoa(unescape(encodeURIComponent(code.trim())));
			mermaidBlocks.push({ id, code: code.trim(), encoded });
			return `<!--MERMAID_PLACEHOLDER_${id}-->`;
		});

		// Parse markdown to HTML
		let html = marked(markdown);

		// Post-process: Convert relative .md links to absolute router links
		// e.g., ./accessibility.md -> /docs/architecture/accessibility
		html = html.replace(/href="\.\/([^"]+)\.md"/g, (match, link) => {
			return `href="${currentDir}/${link}"`;
		});

		// Post-process: Replace mermaid placeholders with mermaid divs
		mermaidBlocks.forEach(({ id, encoded }) => {
			const placeholder = `<!--MERMAID_PLACEHOLDER_${id}-->`;
			const mermaidDiv = `<div class="mermaid" data-mermaid-id="${id}" data-mermaid-code="${encoded}"></div>`;
			html = html.replace(placeholder, mermaidDiv);
		});

		return html;
	} catch (error) {
		console.error('Error loading markdown:', error);
		return `<p>Error loading documentation: ${error.message}</p>`;
	}
}