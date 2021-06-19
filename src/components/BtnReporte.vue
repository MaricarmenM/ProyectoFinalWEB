<template>
	<router-link :to="link">
		<v-icon x-large>{{ image }}</v-icon>
		<div class="text-decoration-none">{{ texto }}</div>
	</router-link>
</template>

<script>
export default {
	name: 'BtnAzul',
	props: {
		texto: String,
		link: String,
		image: String,
	},
};
</script>

<style scoped></style>
