<template>
  <div id="demo">
    <!-- Use the imported Button component -->
    <Button @click="handleClick">Click Me!</Button>
  </div>
</template>

<script>
// Update the import path below to the correct package or local file
// Example if it's a local component:
// import Button from './Button.vue';
// Or if the package name is different, update accordingly:
// import { Button } from 'correct-package-name';
import { Button } from 'ehmds-on-fkui-test'; // <-- Replace this line with the correct import

export default {
  name: 'DemoApp',
  components: {
    Button
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    }
  }
};
</script>