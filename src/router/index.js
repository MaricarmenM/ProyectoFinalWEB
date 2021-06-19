import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/homeuser',
		name: 'HomeUser',
		component: () => import('../views/Alumno/HomeUser.vue'),
	},
	{
		path: '/cuestionario',
		name: 'Cuestionario',
		component: () => import('../views/Alumno/Cuestionario.vue'),
	},
	{
		path: '/consultas',
		name: 'Consultas',
		component: () => import('../views/Alumno/AdminConsultas.vue'),
	},
	{
		path: '/homemedico',
		name: 'HomeMedico',
		component: () => import('../views/Medico/HomeMedico.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
