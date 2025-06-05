<template>
	<div
		class="ehmds-card"
		:style="{ backgroundColor: background, borderColor: border }"
	>
		<header v-if="title" class="ehmds-card-header">
			<h3>{{ title }}</h3>
		</header>
		<div class="ehmds-card-body">
			<slot />
		</div>
		<footer v-if="$slots.footer" class="ehmds-card-footer">
			<slot name="footer" />
		</footer>
	</div>
</template>

<script>
export default {
	name: "EhmdsCard",
	props: {
		title: {
			type: String,
			default: "",
		},
		background: {
			type: String,
			default: "#fff",
		},
		border: {
			type: String,
			default: "#e0e0e0",
		},
	},
};
</script>

<style scoped>
.ehmds-card {
	border: 1px solid var(--ehmds-border-color, #e0e0e0);
	border-radius: var(--ehmds-border-radius, 8px);
	padding: 16px;
	box-shadow: var(--ehmds-shadow-small, 0 2px 4px rgba(0, 0, 0, 0.1));
}
.ehmds-card-header {
	margin-bottom: 8px;
	font-weight: bold;
}
.ehmds-card-body {
	margin-bottom: 8px;
}
.ehmds-card-footer {
	text-align: right;
}
</style>
