<template>
	<v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
		<template v-slot:top>
			<v-toolbar flat>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							<v-icon class="me-2">mdi-account-plus</v-icon>
							Usuario Nuevo
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6">
										<v-menu
											ref="nacimiento"
											v-model="nacimiento"
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
												@input="nacimiento = false"
											></v-date-picker>
										</v-menu>
									</v-col>

									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
									</v-col>

									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field
											v-model="editedItem.protein"
											label="Protein (g)"
										></v-text-field>
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
								Guardar
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
				<v-dialog v-model="dialogDelete" max-width="500px">
					<v-card>
						<v-card-title class="text-h5">Estas seguro de elimunar este usuario?</v-card-title>
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
			<v-icon small class="mr-2" @click="editItem(item)">
				mdi-pencil
			</v-icon>
			<v-icon small @click="deleteItem(item)">
				mdi-delete
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
export default {
	data: (vm) => ({
		dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
		nacimiento: false,
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: 'ID',
				align: 'start',
				sortable: false,
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Num Control', value: 'email', class: 'black--text' },
			{ text: 'Nombre', value: 'nombre', class: 'black--text' },
			{ text: 'Apellidos', value: 'apellidos', class: 'black--text' },
			{ text: 'Fecha Nacimiento', value: 'nacimiento', class: 'black--text' },
			{ text: 'Direccion (g)', value: 'direccion', class: 'black--text' },
			{ text: 'Area', value: 'idarea', class: 'black--text' },
			{ text: 'Tipo', value: 'idtipo', class: 'black--text' },
			{ text: 'Actions', value: 'actions', class: 'black--text', sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			id: '',
			email: '',
			nombre: '',
			apellidos: '',
			nacimiento: new Date().toISOString().substr(0, 10),
			direccion: '',
			idarea: '',
			idtipo: '',
		},
		defaultItem: {
			id: '',
			email: '',
			nombre: '',
			apellidos: '',
			nacimiento: new Date().toISOString().substr(0, 10),
			direccion: '',
			idarea: '',
			idtipo: '',
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Usuario Nuevo' : 'Editar Usuario';
		},
		computedDateFormatted() {
			return this.formatDate(this.editedItem.date);
		},
	},

	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},

	created() {
		this.initialize();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/usuario/');
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.nacimiento = new Date(tupla.nacimiento).toISOString().substr(0, 10);
				});
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
		editItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.closeDelete();
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
