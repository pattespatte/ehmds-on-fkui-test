<template>
  <FKUIButton
    v-bind="$attrs"
    :class="['ehmds-button']"
    v-on="$listeners"
  >
    <slot></slot>
  </FKUIButton>
</template>

<script>
import { Button as FKUIButton } from '@fkui/vue';

export default {
  name: 'Button',
  components: {
    FKUIButton
  },
  inheritAttrs: false
}
</script>

// Style overrides using styled-components
const StyledButton = styled(FKUIButton)`
  /* Override specific styles while inheriting FKUI functionality */
  background-color: var(--ehmds-on-fkui-test-color-primary);
  border-radius: var(--ehmds-on-fkui-test-radius-medium);
  font-family: var(--ehmds-on-fkui-test-typography-fontFamily);
  
  &:hover {
    background-color: var(--ehmds-on-fkui-test-color-secondary);
  }
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;