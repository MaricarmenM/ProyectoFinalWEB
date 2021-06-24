<template>
	<div>
		<header>
			<NavAlumno />
		</header>
		<main class="d-flex justify-center mt-5 mx-auto">
			<div class="container-custom">
				<CardCuestionario />
			</div>
		</main>
	</div>
</template>

<script>
import CardCuestionario from '../../components/CardCuestionario.vue';
import NavAlumno from '../../components/NavAlumno.vue';
export default {
	name: 'Cuestionario',
	components: { NavAlumno, CardCuestionario },
};
</script>

<style scoped>
.container-custom {
	width: 70%;
	align-items: center;
}
</style>
