<template>
	<v-btn color="error" elevation="2" large :to="link">
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
