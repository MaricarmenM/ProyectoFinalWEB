<template>
	<div>
		<NavAlumno />
		<v-main>
			<v-container>
				<CardAlumno
					:nombre="alumno.nombre + ' ' + alumno.apellidos"
					:numControl="alumno.email"
					:especialidad="especialidad"
					:estatus="estatus"
				/>
				<DataTablePruebas class="mt-5" />
			</v-container>
		</v-main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CardAlumno from '../../components/CardAlumno.vue';
import DataTablePruebas from '../../components/DataTablePruebas.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'HomeUser',
	components: { NavAlumno, CardAlumno, DataTablePruebas },
	data() {
		return {
			alumno: {},
			especialidad: '',
			estatus: '',
		};
	},
	methods: {
		async getAlumno() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${this.id}`);
				const array = await data.json();
				this.alumno = array[0];
				this.getArea();
				this.getTipo();
			} catch (error) {
				console.log(error);
			}
		},
		async getArea() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/area/${this.alumno.idarea}`
				);
				const array = await data.json();
				this.especialidad = array[0].carreradepto;
			} catch (error) {
				console.log(error);
			}
		},
		async getTipo() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/tipousuario/${this.alumno.idtipo}`
				);
				const array = await data.json();
				this.estatus = array[0].tipo;
			} catch (error) {
				console.log(error);
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
	mounted() {
		this.getAlumno();
	},
};
</script>

<style></style>
