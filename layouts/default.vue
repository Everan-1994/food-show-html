<template>
	<div class="min-width">

		<nuxt />

	</div>
</template>

<script>
	import Hearder from '~/components/header.vue';

	export default {

		data() {
			return {

			};
		},
		created() {

		},
		components: {
			Hearder,

		},
		mounted() {
			
		},
		methods: {
			getIsIe() {
				if ('-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style) {
					window.addEventListener('hashchange', () => {
						var currentPath = window.location.hash.slice(1)
						if (this.$route.path !== currentPath) {
							this.$router.push(currentPath)
						}
					}, false)
				}
			}
		}
	};
</script>
<style>

</style>
