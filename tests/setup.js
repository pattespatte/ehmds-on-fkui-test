/**
 * Test setup for Vitest
 * Configures Vue Test Utils and global test utilities
 */

import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Don't mock FKUI components - we want to test with actual components
// This ensures we're testing real FKUI integration
config.global.stubs = {};

// Global mocks
global.console = {
  ...console,
};
