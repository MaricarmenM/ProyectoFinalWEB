<template>
	<div>
		<header>
			<NavAdmin />
		</header>
		<main>
			<v-container fluid class="container-custom">
				<v-row align="center" no-gutters justify="center">
					<v-col cols="12">
						<CardUsuarios />
					</v-col>
				</v-row>
			</v-container>
		</main>
	</div>
</template>

<script>
import CardUsuarios from '../../components/CardUsuarios.vue';
import NavAdmin from '../../components/NavAdmin.vue';
export default {
	components: { NavAdmin, CardUsuarios },
};
</script>

<style scoped>
.container-custom {
	width: 80%;
}
</style></style>
