<template>
	<div>
			<router-link :to="link">
			<v-icon x-large>{{ image }}</v-icon>
		</router-link>
		<div class="text-decoration-none">{{ texto }}</div>
	</div>
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
