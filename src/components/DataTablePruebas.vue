<template>
	<v-card>
		<v-toolbar color="primary" dark dense flat>
			<v-toolbar-title class="white--text text-h6 font-weight-medium">
				Pruebas COVID-19
			</v-toolbar-title>
		</v-toolbar>
		<v-data-table
			dense
			:headers="headers"
			:items="desserts"
			item-key="name"
			class="elevation-1 mt-3"
			:footer-props="{
				showFirstLastPage: true,
				firstIcon: 'mdi-arrow-collapse-left',
				lastIcon: 'mdi-arrow-collapse-right',
				prevIcon: 'mdi-minus',
				nextIcon: 'mdi-plus',
			}"
		></v-data-table>
	</v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'DataTablePruebas',
	data: () => ({
		desserts: [],
		headers: [
			{
				text: 'Num Prueba',
				align: 'start',
				sortable: false,
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Fecha', value: 'fecha', class: 'black--text' },
			{ text: 'Tipo de Prueba', value: 'tipoprueba', class: 'black--text' },
			{ text: 'Resultado', value: 'resultado', class: 'black--text' },
			{ text: 'Archivo', value: '', class: 'black--text' },
		],
	}),
	methods: {
		async getPruebas() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/pruebas/${this.id}`
				);
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.fecha = new Date().toISOString().substr(0, 10);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
	created() {
		this.getPruebas();
	},
};
</script>

<style></style>
