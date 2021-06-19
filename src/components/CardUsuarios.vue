<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
				Usuarios
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				En esta tabla podras dar de alta a nuevos usuarios asi como eliminarlos o editarlos
			</v-card-subtitle>
		</div>
		<v-card-text>
			<DataTableUsuarios />
		</v-card-text>
	</v-card>
</template>

<script>
import DataTableUsuarios from './DataTableUsuarios.vue';
export default {
	components: { DataTableUsuarios },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>
