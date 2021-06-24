<template>
	<div>
		<header>
			<NavAlumno />
		</header>
		<main class="d-flex justify-center mt-5 mx-auto">
			<div class="container-custom">
				<CardConsultas />
			</div>
		</main>
	</div>
</template>

<script>
import CardConsultas from '../../components/CardConsultas.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'Consultas',
	components: { NavAlumno, CardConsultas },
};
</script>

<style></style>

<style scoped>
.container-custom {
	width: 70%;
	align-items: center;
}
</style>
