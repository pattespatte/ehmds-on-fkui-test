// main.js
import { createApp } from 'vue';
import { Button } from '../dist/index.esm.js'; // Direct import from build

createApp({
  template: '<Button variant="primary">Hello</Button>'
}).component('Button', Button).mount('#app');