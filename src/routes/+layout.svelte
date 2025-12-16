<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import './layout.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="min-h-screen bg-background text-foreground">
	<header class="border-b">
		<nav class="container mx-auto flex items-center gap-6 p-4">
			<a href="/" class="text-xl font-bold">Chinook</a>
			<a href="/artists" class="hover:underline">Artists</a>
			<a href="/albums" class="hover:underline">Albums</a>
			<a href="/tracks" class="hover:underline">Tracks</a>
			<a href="/genres" class="hover:underline">Genres</a>
			<a href="/playlists" class="hover:underline">Playlists</a>
		</nav>
	</header>

	<main>
		{@render children()}
	</main>
</div>
