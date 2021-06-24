<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
				Medicamentos
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				Se muestra medicamentos existentes, podras dar de alta a nuevos asi como eliminarlos o editarlos
			</v-card-subtitle>
		</div>
		<v-card-text>
		<DataTableMedicamentos/>
		</v-card-text>
	</v-card>
</template>

<script>
import DataTableMedicamentos from './DataTableMedicamentos.vue';
export default {
	components: { DataTableMedicamentos },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>
