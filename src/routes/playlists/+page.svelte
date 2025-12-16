<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Playlists</h1>

	<div class="grid gap-2">
		{#each data.playlists as playlist}
			<a
				href="/playlists/{playlist.PlaylistId}"
				class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<span class="font-medium">{playlist.Name}</span>
				<span class="text-muted-foreground">
					{playlist.track_count} tracks
				</span>
			</a>
		{/each}
	</div>
</div>
