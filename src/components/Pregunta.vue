<template>
	<div>
		<div class="wrapper mx-auto">
			<p class="my-auto text-start black--text text-body-1 font-weight-regular">
				{{ pregunta }}
			</p>
			<v-container class="d-flex justify-center align-center ">
				<v-radio-group :v-model="name" row>
					<v-radio label="Si" value="S"></v-radio>
					<v-radio label="No" value="N"></v-radio>
				</v-radio-group>
			</v-container>
		</div>
		<v-divider></v-divider>
	</div>
</template>

<script>
export default {
	name: 'Pregunta',
	props: {
		name: String,
		pregunta: String,
	},
};
</script>

<style scoped>
.wrapper {
	display: grid;
	grid-template-columns: 2fr 200px;
	grid-gap: 10px;
	grid-auto-rows: minmax(auto, 50px);
}
</style>
