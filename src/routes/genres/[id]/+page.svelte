<script lang="ts">
	import { page } from '$app/state';
	import { get_genre } from '$lib/queries.remote';

	const data = $derived(await get_genre(Number(page.params.id)));

	function formatDuration(ms: number) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}
</script>

{#if data}
	<div class="container mx-auto p-8">
		<h1 class="mb-2 text-4xl font-bold">{data.genre.Name}</h1>
		<p class="mb-8 text-muted-foreground">Showing first 50 tracks</p>

		<div class="grid gap-2">
			{#each data.tracks as track}
				<a
					href="/tracks/{track.TrackId}"
					class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
				>
					<div>
						<div class="font-medium">{track.Name}</div>
						<div class="text-sm text-muted-foreground">
							{track.ArtistName} - {track.AlbumTitle}
						</div>
					</div>
					<span class="text-muted-foreground"
						>{formatDuration(track.Milliseconds)}</span
					>
				</a>
			{/each}
		</div>
	</div>
{:else}
	<div class="container mx-auto p-8">Genre not found</div>
{/if}
