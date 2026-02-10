import { marked } from 'marked';

// Counter for unique Mermaid diagram IDs
let mermaidCounter = 0;

// Simple markdown loader that fetches and parses markdown files
export async function loadMarkdown(path) {
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
			// Store the code with base64 encoding
			const encoded = btoa(unescape(encodeURIComponent(code.trim())));
			mermaidBlocks.push({ id, code: code.trim(), encoded });
			// Use HTML comment placeholder - marked will preserve these
			return `<!--MERMAID_PLACEHOLDER_${id}-->`;
		});

		// Parse markdown to HTML
		let html = marked(markdown);

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
