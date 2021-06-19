<template>
	<div>
		<NavMedico />
		<v-main>
			<v-container>
				<CardAlumno
					nombre="Jorge + ' ' + hee"
					numControl="ddfd"
					especialidad="dfd"
					estatus="dfd"
				/>
			</v-container>
		</v-main>
	</div>
</template>

<script>
import CardAlumno from '../../components/CardAlumno.vue';
import NavMedico from '../../components/NavMedico.vue';
export default {
	components: { NavMedico, CardAlumno },
};
</script>

<style></style>
