# Installation

```bash
# Install from npm (when published)
npm install @ehmds/design-system

# Or install directly from repository
git clone https://github.com/pattespatte/ehmds-on-fkui-test.git
cd ehmds-on-fkui-test
npm install
```

```bash
# Import and use EHMDS in your Vue 3 application
import { createApp } from 'vue'
import ehmds from '@ehmds/design-system'
import App from './App.vue'

createApp(App).use(ehmds).mount('#app')
```