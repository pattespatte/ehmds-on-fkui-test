import Vue from 'vue';
import EhmdsOnFkuiTest from 'ehmds-on-fkui-test'; // Make sure this package is installed
const { Button } = EhmdsOnFkuiTest;

const App = {
  render() {
    return Vue.h(Button, { variant: 'primary' }, () => 'Hello Button!');
  }
};

Vue.createApp(App).mount('#app');