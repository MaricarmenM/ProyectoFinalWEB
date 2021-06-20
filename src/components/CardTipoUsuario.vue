<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
				Tipos de Usuarios
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				Se muestra los diferentes tipos de usuario, podras dar de alta a nuevos asi como eliminarlos o editarlos
			</v-card-subtitle>
		</div>
		<v-card-text>
		<DataTableTipoUsuario/>
		</v-card-text>
	</v-card>
</template>

<script>
import DataTableTipoUsuario from './DataTableTipoUsuario.vue';
export default {
	components: { DataTableTipoUsuario },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>
