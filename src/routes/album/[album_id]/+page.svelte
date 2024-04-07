<script lang="ts">
	let { data } = $props();

	const { artist, album, tracks } = data;
</script>

<svelte:head>
	<title>{album} - Chinook SvelteKit</title>
</svelte:head>

<h1 class="mb-5 text-4xl font-bold text-primary">{album}</h1>
<p class="mb-10 text-3xl font-bold tracking-widest text-secondary">
	By {artist}
</p>

<div class="overflow-x-auto">
	<table
		class="table table-pin-rows table-pin-cols table-xs md:table-lg"
	>
		<thead>
			<tr class="text-xl">
				<th>#</th>
				<th>Track</th>
				<th>Duration</th>
			</tr>
		</thead>
		<tbody>
			{#each tracks as track, i}
				<tr class:hover={'bg-base-200'}>
					<td>{i + 1}</td>
					<td>
						<a
							href={`/track/${track.TrackId}`}
							class="link link-primary"
						>
							{track.TrackName}
						</a>
					</td>
					<td>{track.Duration}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
