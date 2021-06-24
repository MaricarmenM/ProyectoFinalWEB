<template>
	<div style="height: auto;">
		<router-link :to="link" tag="h4" class="font-weight-regular">
			<v-icon class="icon">{{ image }}</v-icon>
			<div>{{ texto }}</div>
		</router-link>
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

<style scoped>
.icon {
	font-size: 90px;
}
</style>
