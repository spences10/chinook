<script lang="ts">
	let { data } = $props();

	let tracks = $state(data.tracks);

	let search_term = $state('');
	let timer: string | number | NodeJS.Timeout | undefined;

	const fetch_tracks = async () => {
		const res = await fetch(`/api/search?search_term=${search_term}`);
		const data = await res.json();
		tracks = data;
	};

	const handle_search = (e: Event) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const target = e.target as HTMLInputElement;
			search_term = target.value;
			fetch_tracks();
		}, 300);
	};

	const handle_input = (e: Event) => {
		const target = e.target as HTMLInputElement;
		if (target.value === '') {
			search_term = '';
			tracks = data.tracks;
		}
	};
</script>

<svelte:head>
	<title>Music Search - Chinook SvelteKit</title>
</svelte:head>

<input
	type="search"
	placeholder="Search tracks, titles, albums, artists, genres..."
	class="input input-bordered input-primary mb-10 w-full"
	value={search_term}
	on:keyup={handle_search}
	on:input={handle_input}
/>

<p class="mb-2 text-xl font-light">
	This is the initial 50 tracks from the Chinook database
</p>

<div class="overflow-x-auto">
	<table
		class="table table-pin-rows table-pin-cols table-xs md:table-lg"
	>
		<thead>
			<tr class="text-xl">
				<th>Track</th>
				<th>Artist</th>
				<th>Album</th>
				<th>Genre</th>
			</tr>
		</thead>
		<tbody>
			{#each tracks as track (track.TrackId)}
				<tr class:hover={'bg-base-200'}>
					<td>
						<a
							href={`/track/${track.TrackId}`}
							class="link link-primary"
						>
							{track.Name}
						</a>
					</td>
					<td>
						<a
							href={`/artist/${track.ArtistId}`}
							class="link link-primary"
						>
							{track.ArtistName}
						</a>
					</td>
					<td>
						<a
							href={`/album/${track.AlbumId}`}
							class="link link-primary"
						>
							{track.Title}
						</a>
					</td>
					<td>
						<a
							href={`/genre/${track.GenreId}`}
							class="link link-primary"
						>
							{track.Genre}
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
