<script lang="ts">
	let { data } = $props();

	function formatDuration(ms: number) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-2 text-4xl font-bold">{data.album.Title}</h1>
	<p class="mb-8 text-muted-foreground">
		by <a
			href="/artists/{data.album.ArtistId}"
			class="hover:underline">{data.album.ArtistName}</a
		>
	</p>

	<h2 class="mb-4 text-2xl font-semibold">Tracks</h2>
	<div class="grid gap-2">
		{#each data.tracks as track, i}
			<a
				href="/tracks/{track.TrackId}"
				class="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<span class="w-8 text-muted-foreground">{i + 1}</span>
				<span class="flex-1 font-medium">{track.Name}</span>
				<span class="text-muted-foreground"
					>{formatDuration(track.Milliseconds)}</span
				>
			</a>
		{/each}
	</div>
</div>
