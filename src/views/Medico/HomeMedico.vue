<template>
	<div>
		<NavMedico />
		<v-main>
			<v-container>
				<v-container fluid class="container-custom">
					<v-row align="center" no-gutters justify="center">
						<v-col cols="12">
							<CardMedico
								:nombre="this.medico.nombre + ' ' + this.medico.apellidos"
								:numControl="this.medico.email"
								:especialidad="this.especialidad"
								:estatus="this.estatus"
							/>
						</v-col>
					</v-row>
					<v-row> </v-row>
				</v-container>
			</v-container>
		</v-main>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import CardMedico from '../../components/CardMedico.vue';
import NavMedico from '../../components/NavMedico.vue';
export default {
	components: { NavMedico, CardMedico },
	data() {
		return {
			medico: {},
			especialidad: '',
			estatus: '',
		};
	},
	methods: {
		async getmedico() {
			try {
				const data = await fetch(`https://api-tedw-covid.herokuapp.com/usuario/${this.id}`);
				const array = await data.json();
				this.medico = array[0];
				this.getArea();
				this.getTipo();
			} catch (error) {
				console.log(error);
			}
		},
		async getArea() {
			try {
				const data = await fetch(
					`https://api-tedw-covid.herokuapp.com/area/${this.medico.idarea}`
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
					`https://api-tedw-covid.herokuapp.com/tipousuario/${this.medico.idtipo}`
				);
				const array = await data.json();
				this.estatus = array[0].tipo;
				console.log(this.estatus);
			} catch (error) {
				console.log(error);
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
	created() {
		this.getmedico();
	},
};
</script>

<style>
.container-custom {
	width: 60%;
}
</style>
