<template>
	<v-btn depressed color="primary" large :to="link">
		{{ texto }}
	</v-btn>
</template>

<script>
export default {
	name: 'BtnAzul',
	props: {
		texto: String,
		link: String,
	},
};
</script>

<style scoped></style>
