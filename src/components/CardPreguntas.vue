<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
			 Preguntas
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				Se muestran las preguntas existentes, podras dar de alta a nuevos asi como eliminarlas o editarlas
			</v-card-subtitle>
		</div>
		<v-card-text>
		<DataTablePreguntas/>
		</v-card-text>
	</v-card>
</template>

<script>
import DataTablePreguntas from './DataTablePreguntas.vue';
export default {
	components: { DataTablePreguntas },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>