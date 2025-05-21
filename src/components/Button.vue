<template>
	<FKUIButton v-bind="$attrs" :class="['ehmds-button']">
		<slot></slot>
	</FKUIButton>
</template>

<script setup>
import { Button as FKUIButton } from "@fkui/vue";
</script>

<style scoped>
.ehmds-button {
	background-color: var(--ehmds-on-fkui-test-color-primary);
	border-radius: var(--ehmds-on-fkui-test-radius-medium);
	font-family: var(--ehmds-on-fkui-test-typography-fontFamily);
}
.ehmds-button:hover {
	background-color: var(--ehmds-on-fkui-test-color-secondary);
}
</style>
