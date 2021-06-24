<template>
	<div class="mx-auto my-auto">
		<v-card class="mt-2" width="400px" height="325px" elevation="24">
			<v-toolbar color="#428bca" dark dense flat>
				<v-toolbar-title class="title mx-auto">
					Sistema De Alertar COVID-19
				</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-col>
					<v-text-field
						label="Usuario"
						name="username"
						outlined
						prepend-inner-icon="mdi-account"
						v-model="username"
					></v-text-field>
					<v-text-field
						v-model="password"
						:append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
						:rules="[rules.required, rules.min]"
						:type="show1 ? 'text' : 'password'"
						name="password"
						label="Contraseña"
						hint="At least 8 characters"
						counter
						outlined
						prepend-inner-icon="mdi-lock"
						@click:append="show1 = !show1"
					></v-text-field>
					<v-btn depressed color="primary" @click="login()">
						Aceptar
					</v-btn>
				</v-col>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
			show1: false,
			show2: true,
			show3: false,
			show4: false,
			password: '',
			rules: {
				required: (value) => !!value || 'Required.',
				min: (v) => v.length >= 5 || 'Min 8 characters',
				emailMatch: () => "The email and password you entered don't match",
			},
			username: '',
		};
	},
	methods: {
		...mapActions(['login']),
		async login() {
			if (this.username != '' && this.password != '') {
				try {
					const data = await fetch('https://api-tedw-covid.herokuapp.com/usuario/login', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ email: this.username, password: this.password }),
					});
					const array = await data.json();
					//console.log(array);
					this.login(array.id);
					//console.log(this.id);
					this.$router.push('/homeuser');
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log('A username and password must be present');
			}
		},
	},
	computed: {
		...mapState(['id']),
	},
};
</script>

<style></style>
