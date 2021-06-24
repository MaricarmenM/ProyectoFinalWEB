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
		>
			<template v-slot:item.actions="{ item }">
				<v-icon medium class="mr-2" @click="getReportePrueba(item)">
					mdi-file-pdf
				</v-icon>
			</template>
		</v-data-table>
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
				sortable: true,
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Fecha', value: 'fecha', class: 'black--text' },
			{ text: 'Tipo de Prueba', value: 'tipoprueba', class: 'black--text' },
			{ text: 'Resultado', value: 'resultado', class: 'black--text' },
			{ text: 'Archivo', value: 'actions', sortable: false, class: 'black--text' },
		],
		editedIndex: -1,
		editedItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
		defaultItem: {
			name: '',
			calories: 0,
			fat: 0,
			carbs: 0,
			protein: 0,
		},
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
		async getReportePrueba(item) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/pruebaReporte/${item.id}`
				);
				const array = await data.json();
				array[0].fecha = new Date().toISOString().substr(0, 10);
				var object = window.open(
					'',
					'_blank',
					'width= 1100, height=620, left=10, top=50, menubar=yes, tooblar=no, location=no, scrollbars=yes'
				);
				object.document.open();
				object.document.write(`
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<title>Prueba ${item.id}</title>
					</head>
					<body>
						<p>Nombre: ${array[0].nombre}</p>
						<p>Fecha: ${array[0].fecha}</p>
						<p>Tipo de prueba: ${array[0].tipoprueba}</p>
						<p>Resultado: ${array[0].resultado}</p>
					</body>
					</html>
				`);
				object.document.close();
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
