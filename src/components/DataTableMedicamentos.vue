<template>
	<v-data-table :headers="headers" :items="desserts" sort-by="calories" class="elevation-1">
		<template v-slot:top>
			<v-toolbar flat>
				<v-spacer></v-spacer>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
							<v-icon class="me-2">mdi-beaker-plus</v-icon>
							Medicamento Nuevo
						</v-btn>
					</template>
					<v-card>
						<v-card-title>
							<span class="text-h5">{{ formTitle }}</span>
						</v-card-title>

						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" sm="6" md="12">
										<v-text-field v-model="editedItem.medicamento" label="Medicamento"></v-text-field>
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

				<v-dialog v-model="dialogDelete" max-width="550px">
					<v-card>
						<v-card-title class="text-h5">Estas seguro de eliminar el medicamento?</v-card-title>
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
			{ text: 'Medicamento', value: 'medicamento', class: 'black--text' },
			{ text: 'Actions', value: 'actions', class: 'black--text', sortable: false },
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			id: '',
			medicamento: '',
		},
		defaultItem: {
			id: '',
			medicamento: '',
		},
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Medicamento Nuevo' : 'Editar';
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
				const data = await fetch('https://api-tedw-covid.herokuapp.com/medicamento');
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
