import { createApp } from "vue";
import { type SetupOptions } from "@forsakringskassan/docs-generator";

export function setup(options: SetupOptions): void {
	const { rootComponent, selector } = options;
	const app = createApp(rootComponent);

	// Add any global plugins or configuration here if needed
	// app.use(MyAwesomePlugin);

	app.mount(selector);
}