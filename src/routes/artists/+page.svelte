<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Artists</h1>

	<div class="grid gap-2">
		{#each data.artists as artist}
			<a
				href="/artists/{artist.ArtistId}"
				class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<span class="font-medium">{artist.Name}</span>
				<span class="text-muted-foreground">
					{artist.album_count} albums
				</span>
			</a>
		{/each}
	</div>
</div>
