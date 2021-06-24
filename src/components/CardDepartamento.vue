<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
				Departamentos
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				Se muestra los diferentes departamentos de la instituciòn,podras dar de alta a nuevos asi como eliminarlos o editarlos
			</v-card-subtitle>
		</div>
		<v-card-text>
		<DataTableDepartamento />
		</v-card-text>
	</v-card>
</template>

<script>
import DataTableDepartamento from './DataTableDepartamento.vue';
export default {
	components: { DataTableDepartamento },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>
