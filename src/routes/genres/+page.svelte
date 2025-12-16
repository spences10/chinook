<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Genres</h1>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-3">
		{#each data.genres as genre}
			<a
				href="/genres/{genre.GenreId}"
				class="rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<div class="font-medium">{genre.Name}</div>
				<div class="text-sm text-muted-foreground">
					{genre.track_count} tracks
				</div>
			</a>
		{/each}
	</div>
</div>
