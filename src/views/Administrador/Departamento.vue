<template>
	<div>
		<header>
			<NavAdmin />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<CardDepartamento />
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import CardDepartamento from '../../components/CardDepartamento.vue';
import NavAdmin from '../../components/NavAdmin.vue';
export default {
	components: { NavAdmin, CardDepartamento },
};
</script>

<style scoped>
.container-custom {
	width: 60%;
}
</style>