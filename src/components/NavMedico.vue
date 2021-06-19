<template>
	<div>
		<v-app-bar color="#008a17" dense dark>
			<v-app-bar-nav-icon>
				<router-link to="/homeuser">
					<v-img
						alt="ITC Logo"
						class="shrink mx-2"
						contain
						src="../assets/LogoItc.png"
						transition="scale-transition"
						width="30"
					/>
				</router-link>
			</v-app-bar-nav-icon>

			<v-toolbar-title>Instituto Tecnológico de Celaya</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>

			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-logout-variant</v-icon>
					</v-btn>
				</template>

				<v-list>
					<v-list-item v-for="n in 5" :key="n" @click="() => {}">
						<v-list-item-title>Option {{ n }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
	</div>
</template>

<script>
export default {};
</script>

<style></style>
