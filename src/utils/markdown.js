import { marked } from 'marked';

// Simple markdown loader that fetches and parses markdown files
export async function loadMarkdown(path) {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Failed to load ${path}: ${response.statusText}`);
		}
		const markdown = await response.text();
		return marked(markdown);
	} catch (error) {
		console.error('Error loading markdown:', error);
		return `<p>Error loading documentation: ${error.message}</p>`;
	}
}
