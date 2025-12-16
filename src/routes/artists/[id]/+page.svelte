<script lang="ts">
	import { page } from '$app/state';
	import { get_artist } from '$lib/queries.remote';

	const data = $derived(await get_artist(Number(page.params.id)));
</script>

{#if data}
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
					<span class="text-muted-foreground"
						>{album.track_count} tracks</span
					>
				</a>
			{/each}
		</div>
	</div>
{:else}
	<div class="container mx-auto p-8">Artist not found</div>
{/if}
