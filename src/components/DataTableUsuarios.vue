<template>
	<v-data-table
		:headers="headers"
		:items="desserts"
		sort-by="email"
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
				<v-dialog v-model="dialog" max-width="800px">
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
													v-model="editedItem.nacimiento"
													label="Fecha de nacimiento"
													persistent-hint
													prepend-icon="mdi-calendar"
													v-bind="attrs"
													@blur="editedItem.nacimiento = parseDate(dateFormatted)"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker
												v-model="editedItem.nacimiento"
												no-title
												@input="nacimiento = false"
											></v-date-picker>
										</v-menu>
									</v-col>

									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field
											v-model="editedItem.apellidos"
											label="Apellidos"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.email" label="Email"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field v-model="editedItem.clave" label="Contraseña"></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-text-field
											v-model="editedItem.direccion"
											label="Direcciòn"
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-select
											:items="tipos"
											v-model="editedItem.idtipo"
											item-text="tipo"
											item-value="id"
											label="Tipo Usuario"
										></v-select>
									</v-col>
									<v-col cols="12" sm="6" md="4">
										<v-select
											:items="area"
											v-model="editedItem.idarea"
											item-text="carreradepto"
											item-value="id"
											label="Departamento"
										></v-select>
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
		tipos: [],
		area: [],
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				text: 'ID',
				align: 'start',
				sortable: true,
				value: 'id',
				class: 'black--text',
			},
			{ text: 'Email', value: 'email', class: 'black--text' },
			{ text: 'Nombre', value: 'nombre', class: 'black--text' },
			{ text: 'Apellidos', value: 'apellidos', class: 'black--text' },
			{ text: 'Fecha Nacimiento', value: 'nacimiento', class: 'black--text' },
			{ text: 'Direccion', value: 'direccion', class: 'black--text' },
			{ text: 'Area', value: 'carreradepto', class: 'black--text' },
			{ text: 'Tipo', value: 'tipo', class: 'black--text' },
			{ text: 'Actions', value: 'actions', class: 'black--text', sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			id: 0,
			email: '',
			clave: '',
			nombre: '',
			apellidos: '',
			nacimiento: new Date().toISOString().substr(0, 10),
			direccion: '',
			idarea: {},
			idtipo: {},
		},
		defaultItem: {
			id: 0,
			email: '',
			clave: '',
			nombre: '',
			apellidos: '',
			nacimiento: new Date().toISOString().substr(0, 10),
			direccion: '',
			idarea: {},
			idtipo: {},
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Usuario Nuevo' : 'Editar Usuario';
		},
		computedDateFormatted() {
			return this.formatDate(this.editedItem.nacimiento);
		},
		disablePassword() {
			return this.editedIndex === -1 ? false : true;
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
		this.getTipoUsuario();
		this.getTipoArea();
	},

	methods: {
		async initialize() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/usuarioTabla');
				const array = await data.json();
				array.forEach(function(tupla, index) {
					tupla.nacimiento = new Date(tupla.nacimiento).toISOString().substr(0, 10);
				});
				this.desserts = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getTipoUsuario() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/tipousuario');
				const array = await data.json();
				this.tipos = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getTipoArea() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/area');
				const array = await data.json();
				this.area = array;
			} catch (error) {
				console.log(error);
			}
		},
		async getAreaByName(name) {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/areaNombre', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						area: name,
					}),
				});
				const array = await data.json();
				this.editedItem.idarea = { carreradepto: array[0].carreradepto, id: array[0].id };
			} catch (error) {
				console.log(error);
			}
		},
		async getTipoUsuarioByName(name) {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/tipoUsuario/tipo/${name}`
				);
				const array = await data.json();
				this.editedItem.idtipo = { tipo: array[0].tipo, id: array[0].id };
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
			this.editedItem = Object.assign(
				{},
				{
					id: item.id,
					email: item.email,
					clave: item.clave,
					nombre: item.nombre,
					apellidos: item.apellidos,
					nacimiento: new Date(item.nacimiento).toISOString().substr(0, 10),
					direccion: item.direccion,
					idarea: {},
					idtipo: {},
				}
			);
			this.getAreaByName(item.carreradepto);
			this.getTipoUsuarioByName(item.tipo);
			console.log(this.editedItem);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.desserts.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.desserts.splice(this.editedIndex, 1);
			this.deleteUsuario(this.editedItem.id);
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
		async saveUsuario() {
			try {
				const data = await fetch('https://api-tedw-covid.herokuapp.com/usuario/', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						nombre: this.editedItem.nombre,
						apellidos: this.editedItem.apellidos,
						email: this.editedItem.email,
						clave: this.editedItem.clave,
						nacimiento: this.editedItem.nacimiento,
						direccion: this.editedItem.direccion,
						idarea: this.editedItem.idarea,
						idtipo: this.editedItem.idtipo,
					}),
				});
				this.initialize();
			} catch (error) {
				console.log(error);
			}
		},
		async updateUsuario(item) {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${item.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						nombre: item.nombre,
						apellidos: item.apellidos,
						email: item.email,
						clave: item.clave,
						nacimiento: item.nacimiento,
						direccion: item.direccion,
						idarea: item.idarea,
						idtipo: item.idtipo,
					}),
				});
				this.initialize();
			} catch (error) {
				console.log(error);
			}
		},
		async deleteUsuario(id) {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${id}`, {
					method: 'DELETE',
				});
			} catch (error) {
				console.log(error);
			}
			this.closeDelete();
		},
		save() {
			if (this.editedIndex > -1) {
				this.updateUsuario(this.editedItem);
				Object.assign(this.desserts[this.editedIndex], this.editedItem);
			} else {
				this.saveUsuario();
				this.desserts.push(this.editedItem);
			}
			this.close();
		},
	},
};
</script>
