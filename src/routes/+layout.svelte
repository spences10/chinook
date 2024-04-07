<script lang="ts">
	let { children } = $props();
	import '../app.pcss';
</script>

<main class="container mx-auto max-w-6xl flex-grow px-4">
	<h1 class="mb-10 mt-4 text-5xl font-bold text-primary">
		<a href="/">Chinook SQLite database</a>
	</h1>
	{@render children()}
</main>
