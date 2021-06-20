<template>
	<div>
		<header>
			<NavAdmin />
		</header>
		<main class="d-flex justify-center mt-5 mx-auto col">
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<CardAdmin
							:nombre="alumno.nombre + ' ' + alumno.apellidos"
							:numControl="alumno.email"
							:especialidad="especialidad"
							:estatus="estatus"
						/>
					</v-col>
				</v-row>
				<v-row class="mt-5" cols="12" align="center" no-gutters justify="center">
					<v-col cols="12" sm="3" align="center" no-gutters justify="center">
						<BtnReporte
							class="iconApp"
							texto="Usuarios"
							link="usuario"
							image="mdi-account-group"
							tag="button"
							width="100%"
						/>
						<BtnReporte
							class="iconApp"
							texto="Departamentos"
							link="departamento"
							image="mdi-bank"
							tag="button"
							width="100%"
						/>
						<BtnReporte
							class="iconApp"
							texto="Tipo de Usuarios"
							link="tipoUsuario"
							image="mdi-book-account"
							tag="button"
							width="100%"
						/>
						<BtnReporte
							class="iconApp"
							texto="Tipos de Pruebas"
							link="tipoPrueba"
							image="mdi-test-tube"
							tag="button"
							width="100%"
						/>
						<BtnReporte
							class="iconApp"
							texto="Medicamentos"
							link="medicamento"
							image="mdi-pill"
							tag="button"
							width="100%"
						/>
						<BtnReporte
							class="iconApp"
							texto="Preguntas"
							link="pregunta"
							image="mdi-clipboard-list"
							tag="button"
							width="100%"
						/>
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import CardAdmin from '../../components/CardAdmin.vue';
import NavAdmin from '../../components/NavAdmin.vue';
import { mapState } from 'vuex';
import BtnReporte from '../../components/BtnReporte.vue';

export default {
	name: 'HomeAdmin',
	components: { NavAdmin, CardAdmin, BtnReporte },
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
	created() {
		this.getAlumno();
	},
};
</script>

<style>
.container-custom {
	width: 60%;
}
.iconApp {
	width: 45%;
	height: 100px;
}
</style>
