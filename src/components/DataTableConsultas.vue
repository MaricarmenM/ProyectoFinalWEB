<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		:footer-props="{
			showFirstLastPage: true,
			firstIcon: 'mdi-arrow-collapse-left',
			lastIcon: 'mdi-arrow-collapse-right',
			prevIcon: 'mdi-minus',
			nextIcon: 'mdi-plus',
		}"
	>
		<template v-slot:top>
			<v-toolbar flat>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" class="mb-2" v-bind="attrs" v-on="on">
							<v-icon class="me-2">mdi-calendar</v-icon>
							Nueva Cita
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">Nueva Cita</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6">
										<v-menu
											ref="fecha"
											v-model="fecha"
											:close-on-content-click="false"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="editedItem.fecha"
													label="Fecha"
													persistent-hint
													prepend-icon="mdi-calendar"
													v-bind="attrs"
													@blur="editedItem.fecha = parseDate(dateFormatted)"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="editedItem.fecha"
												no-title
												@input="fecha = false"
											></v-date-picker>
										</v-menu>
									</v-col>

									<v-col cols="12" sm="6">
										<v-menu
											ref="menu"
											v-model="time2"
											:close-on-content-click="false"
											:nudge-right="40"
											:return-value.sync="editedItem.hora"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="editedItem.hora"
													label="Horario"
													prepend-icon="mdi-clock-time-four-outline"
													readonly
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="time2"
												v-model="editedItem.hora"
												full-width
												@click:minute="$refs.menu.save(editedItem.hora)"
											></v-time-picker>
										</v-menu>
									</v-col>

									<v-col cols="12" sm="6">
										<v-select
											:items="medicos"
											v-model="editedItem.medico"
											prepend-icon="mdi-doctor"
											item-text="nombre"
											item-value="id"
											label="Médico"
										></v-select>
									</v-col>

									<v-col cols="12" sm="6">
										<v-select
											:items="modalidades"
											v-model="editedItem.modalidad"
											label="Modalidad"
										></v-select>
									</v-col>

									<v-col cols="12">
										<v-textarea
											v-model="editedItem.descripcion"
											class="mx-2"
											label="Describe tus síntomas"
											rows="1"
											prepend-icon="mdi-comment"
										></v-textarea>
									</v-col>

									<v-col cols="12" sm="6">
										<v-btn
											:loading="loading3"
											:disabled="loading3"
											color="blue-grey"
											class="ma-2 white--text"
											@click="loader = 'loading3'"
										>
											Upload
											<v-icon right dark>
												mdi-cloud-upload
											</v-icon>
										</v-btn>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">
								Cancel
							</v-btn>
							<v-btn color="blue darken-1" text @click="save">
								Agendar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="550px">
					<v-card>
						<v-card-title class="text-h5">Estas seguro de eliminar la cita?</v-card-title>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
							<v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
							<v-spacer></v-spacer>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon medium @click="deleteItem(item)">
				mdi-delete
			</v-icon>
			<v-icon medium class="mr-2" @click="getReceta(item)">
				mdi-file-pdf
			</v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { mapState } from 'vuex';
export default {
	data: (vm) => ({
		loader: null,
		loading3: false,
		time2: false,
		fecha: false,
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		medicos: [],
		receta: [],
		modalidades: [
			{ text: 'Presencial', value: 'presencial' },
			{ text: 'Virtual', value: 'virtual' },
		],
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: 'ID',
				align: 'start',
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Fecha', value: 'fecha', class: 'black--text' },
			{ text: 'Horario', value: 'hora', class: 'black--text' },
			{ text: 'Médico', value: 'medico', class: 'black--text' },
			{ text: 'Modalidad', value: 'modalidad', class: 'black--text' },
			{ text: 'Descripción', value: 'descripcion', class: 'black--text' },
			{ text: 'Diagnóstico', value: 'sospechoso', class: 'black--text' },
			{ text: 'Actions', value: 'actions', class: 'black--text', sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			id: 2,
			fecha: new Date().toISOString().substr(0, 10),
			hora: new Date().toISOString().substr(11, 5),
			medico: {},
			modalidad: '',
			sospechoso: true,
			descripcion: '',
		},
		defaultItem: {
			id: 2,
			fecha: new Date().toISOString().substr(0, 10),
			hora: new Date().toISOString().substr(11, 5),
			medico: {},
			modalidad: '',
			sospechoso: true,
			descripcion: '',
		},
	}),

	computed: {
		...mapState(['id']),
		computedDateFormatted() {
			return this.formatDate(this.editedItem.fecha);
		},
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
		date(val) {
			this.dateFormatted = this.formatDate(this.editedItem.fecha);
		},
		loader() {
			const l = this.loader;
			this[l] = !this[l];

			setTimeout(() => (this[l] = false), 3000);

			this.loader = null;
		},
	},

	created() {
		this.initialize();
		this.getMedicos();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/citas/${this.id}`
				);
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.fecha = new Date(tupla.fecha).toISOString().substr(0, 10);

					if (tupla.sospechoso != null) {
						if (tupla.sospechoso) {
							tupla.sospechoso = 'Con síntomas';
						}
						if (!tupla.sospechoso) {
							tupla.sospechoso = 'Sin síntomas';
						}
					} else {
						tupla.sospechoso = 'En proceso...';
					}
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getMedicos() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/tipo/Medico`);
				const array = await data.json();
				const arraydata = [];
				array.forEach(function(tupla, index) {
					arraydata.push({ nombre: tupla.nombre + ' ' + tupla.apellidos, id: tupla.id });
				});
				this.medicos = arraydata;
			} catch (error) {
				console.log(error);
			}
		},
		async getReceta(item) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/receta/imprimir/${item.id}`
				);
				const array = await data.json();
				if (!Array.isArray(array) || array.length !== 0) {
					array[0].fecha = new Date().toISOString().substr(0, 10);
					var object = window.open(
						'',
						'_blank',
						'width= 1100, height=620, left=10, top=50, menubar=yes, tooblar=no, location=no, scrollbars=yes'
					);
					object.document.open();
					let html = `<!DOCTYPE html>
						<html lang="en">
						<head>
							<title>Receta ${item.id}</title>
						</head>
						<body>
							<p>Medico: ${array[0].medico}</p>
							<p>Fecha: ${array[0].fecha}</p>`;
					array.forEach((tupla) => {
						/*console.log(tupla.medicamento);
						console.log(tupla.dosis);*/
						html = html.concat(
							`<p>Medicamento: ${tupla.medicamento}: </p><p>   Tomar ${tupla.dosis}</p>`
						);
					});
					html = html.concat(`</body></html>`);
					console.log(html);
					object.document.write(html);
					object.document.close();
				}
			} catch (error) {
				console.log(error);
			}
		},
		formatDate(date) {
			if (!date) return null;

			const [year, month, day] = date.split('-');
			return `${month}/${day}/${year}`;
		},
		parseDate(date) {
			if (!date) return null;

			const [month, day, year] = date.split('/');
			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
		},
		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},
		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.deleteConsulta(this.editedItem.id);
		},
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},
		async saveConsulta() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/consulta', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						fecha: this.editedItem.fecha,
						hora: this.editedItem.hora,
						idmedico: this.editedItem.medico,
						idpaciente: this.id,
						tipocita: this.editedItem.modalidad,
						sospechoso: null,
						descripcion: this.editedItem.descripcion,
					}),
				});
				this.initialize();
			} catch (error) {
				console.log(error);
			}
		},
		async deleteConsulta(id) {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/consulta/${id}`, {
					method: 'DELETE',
				});
			} catch (error) {
				console.log(error);
			}
			this.closeDelete();
		},
		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				console.log(this.editedItem);
				this.saveConsulta();
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
