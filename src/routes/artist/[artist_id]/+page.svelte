<script lang="ts">
	let { data } = $props();

	const { artist, albums } = data;
</script>

<svelte:head>
	<title>{artist} - Chinook SvelteKit</title>
</svelte:head>

<h1 class="mb-5 text-4xl font-bold text-primary">{artist}</h1>
<p class="mb-10 text-3xl font-bold tracking-widest text-secondary">
	Albums
</p>

<div class="overflow-x-auto">
	<table
		class="table table-pin-rows table-pin-cols table-xs md:table-lg"
	>
		<thead>
			<tr class="text-xl">
				<th>Title</th>
				<th>Tracks</th>
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
					<td>{album.TrackCount}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
