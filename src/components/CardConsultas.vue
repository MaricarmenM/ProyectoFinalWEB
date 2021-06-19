<template>
	<v-card class="mt-2">
		<div class="card-header">
			<v-card-title class="white--text text-h5">
				Administrador de Consultas Médicas
			</v-card-title>
			<v-card-subtitle class="white--text text-subtitle-2">
				Aquí podras ver las citas atendidas así como crear una nueva cita con los medicos
				internos
			</v-card-subtitle>
		</div>
		<v-card-text>
			<DataTableConsultas />
		</v-card-text>
	</v-card>
</template>

<script>
import DataTableConsultas from './DataTableConsultas.vue';
export default {
	components: { DataTableConsultas },
};
</script>

<style scoped>
.card-header {
	background-color: #428bca;
}
</style>
