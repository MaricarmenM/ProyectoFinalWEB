<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		class="elevation-1"
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
													v-model="editedItem.date"
													label="Fecha"
													persistent-hint
													prepend-icon="mdi-calendar"
													v-bind="attrs"
													@blur="editedItem.date = parseDate(dateFormatted)"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="editedItem.date"
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
											:return-value.sync="editedItem.time"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="290px"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="editedItem.time"
													label="Horario"
													prepend-icon="mdi-clock-time-four-outline"
													readonly
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-time-picker
												v-if="time2"
												v-model="editedItem.time"
												full-width
												@click:minute="$refs.menu.save(editedItem.time)"
											></v-time-picker>
										</v-menu>
									</v-col>

									<v-col cols="12" sm="6">
										<v-select
											:items="medicos"
											v-model="editedItem.medico"
											prepend-icon="mdi-doctor"
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
			</v-toolbar>
		</template>

		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data: (vm) => ({
		loader: null,
		loading3: false,
		time2: false,
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		fecha: false,
		medicos: ['Pancho', 'Jorge'],
		modalidades: ['Presencial', 'Virtual'],
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
			{ text: 'Horario', value: 'time', class: 'black--text' },
			{ text: 'Médico', value: 'medico', class: 'black--text' },
			{ text: 'Modalidad', value: 'modalidad', class: 'black--text' },
			{ text: 'Descripción', value: 'descripcion', class: 'black--text' },
			{ text: 'Diagnóstico', value: 'sospechoso', class: 'black--text' },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			id: 2,
			fecha: new Date().toISOString().substr(0, 10),
			time: null,
			medico: '',
			modalidad: '',
			descripcion: '',
		},
	}),

	computed: {
		...mapState(['id']),
		computedDateFormatted() {
			return this.formatDate(this.editedItem.date);
		},
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		date(val) {
			this.dateFormatted = this.formatDate(this.editedItem.date);
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
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/citas/${this.id}`
				);
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.fecha = new Date(tupla.nacimiento).toISOString().substr(0, 10);
					if (tupla.sospechoso) {
						tupla.sospechoso = 'Con síntomas';
					} else {
						tupla.sospechoso = 'Sin síntomas';
					}
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getMedicos() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/usuario/citas/${this.id}`
				);
				const array = await data.json();
				this.desserts = array;
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
		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
