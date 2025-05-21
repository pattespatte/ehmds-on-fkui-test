#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

// Ensure the script is executed from the repository root.
try {
	process.chdir(path.join(__dirname, '..'));
} catch (err) {
	console.error('Failed to change directory:', err);
	process.exit(1);
}

console.log('Updating FKUI dependencies...');

// List the FKUI packages to update.
const fkuiPackages = [
	'@fkui/theme-default',
	'@fkui/design',
	'@fkui/date',
	'@fkui/logic',
	'@fkui/vue'
];

// Loop through each package and install its latest version.
fkuiPackages.forEach((pkg) => {
	console.log(`Updating ${pkg} to the latest version...`);
	try {
		execSync(`npm install ${pkg}@latest --save`, { stdio: 'inherit' });
	} catch (err) {
		console.error(`Error updating ${pkg}:`, err);
		process.exit(1);
	}
});

console.log('✅ FKUI dependencies have been updated.');