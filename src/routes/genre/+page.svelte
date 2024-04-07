<script lang="ts">
	let { data } = $props();

	const { genres } = data;
</script>

<svelte:head>
	<title>Genres - Chinook SvelteKit</title>
</svelte:head>

<ul class="list-disc pl-10 text-xl">
	{#each genres as { GenreName, GenreId }}
		<li>
			<a href={`/genre/${GenreId}`} class="link link-primary">
				{GenreName}
			</a>
		</li>
	{/each}
</ul>
