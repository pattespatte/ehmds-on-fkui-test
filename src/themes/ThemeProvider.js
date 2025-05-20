import React, { useEffect } from 'react';
import { theme as defaultTheme } from './default';

const ThemeProvider = ({ theme = defaultTheme, children }) => {
	useEffect(() => {
		// Apply CSS custom properties to :root
		const root = document.documentElement;

		// Colors
		Object.entries(theme.colors).forEach(([key, value]) => {
			root.style.setProperty(`--ehmds-on-fkui-test-color-${key}`, value);
		});

		// Typography
		Object.entries(theme.typography).forEach(([key, value]) => {
			root.style.setProperty(`--ehmds-on-fkui-test-typography-${key}`, value);
		});

		// Spacing
		Object.entries(theme.spacing).forEach(([key, value]) => {
			root.style.setProperty(`--ehmds-on-fkui-test-spacing-${key}`, value);
		});

		// Border radius
		Object.entries(theme.borderRadius).forEach(([key, value]) => {
			root.style.setProperty(`--ehmds-on-fkui-test-radius-${key}`, value);
		});

		return () => {
			// Cleanup if needed
		};
	}, [theme]);

	return <>{children}</>;
};

export default ThemeProvider;