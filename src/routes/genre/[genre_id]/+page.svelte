<script lang="ts">
	let { data } = $props();

	const { albums, genre } = data;
</script>

<svelte:head>
	<title>{genre} - Chinook SvelteKit</title>
</svelte:head>

<h1 class="mb-5 text-4xl font-bold text-primary">
	<a href="/genre">
		{genre}
	</a>
</h1>

<div class="overflow-x-auto">
	<table
		class="table table-pin-rows table-pin-cols table-xs md:table-lg"
	>
		<thead>
			<tr class="text-xl">
				<th>Album</th>
				<th>Artist</th>
			</tr>
		</thead>
		<tbody>
			{#each albums as album}
				<tr class:hover={'bg-base-200'}>
					<td>
						<a
							href={`/album/${album.AlbumId}`}
							class="link link-primary"
						>
							{album.AlbumTitle}
						</a>
					</td>
					<td>
						<a
							href={`/artist/${album.ArtistId}`}
							class="link link-primary"
						>
							{album.ArtistName}
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
