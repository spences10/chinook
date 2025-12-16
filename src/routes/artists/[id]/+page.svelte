<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-2 text-4xl font-bold">{data.artist.Name}</h1>
	<p class="mb-8 text-muted-foreground">
		{data.albums.length} albums
	</p>

	<h2 class="mb-4 text-2xl font-semibold">Albums</h2>
	<div class="grid gap-2">
		{#each data.albums as album}
			<a
				href="/albums/{album.AlbumId}"
				class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<span class="font-medium">{album.Title}</span>
				<span class="text-muted-foreground">
					{album.track_count} tracks
				</span>
			</a>
		{/each}
	</div>
</div>
