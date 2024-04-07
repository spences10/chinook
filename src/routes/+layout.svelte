<script lang="ts">
	let { children } = $props();
	import '../app.pcss';
</script>

<main class="container mx-auto max-w-6xl flex-grow px-4">
	<h1 class="mb-2 mt-4 text-5xl font-bold text-primary">
		<a href="/">Chinook SQLite database</a>
	</h1>
	<ul class="mb-10 flex space-x-4 text-xl font-bold">
		<li><a href="/genre" class="link link-primary">Genres</a></li>
		<li><a href="/" class="link link-primary">Home</a></li>
	</ul>
	{@render children()}
</main>
