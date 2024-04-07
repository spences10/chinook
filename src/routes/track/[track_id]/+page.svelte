<script lang="ts">
	let { data } = $props();

	const { artist, track, track_name } = data;
</script>

<h1 class="mb-5 text-4xl font-bold text-primary">{track_name}</h1>
<p class="mb-10 text-3xl font-bold tracking-widest text-secondary">
	<a href={`/artist/${track[0].ArtistId}`}>
		{artist}
	</a>
</p>

<div class="text-xl">
	<p><strong>Album Title:</strong> {track[0].AlbumTitle}</p>
	<p><strong>Genre Name:</strong> {track[0].GenreName}</p>
	<p><strong>Duration:</strong> {track[0].Duration}</p>
	<p><strong>Media Type:</strong> {track[0].MediaType}</p>
	<p><strong>Price:</strong> {track[0].Price}</p>
</div>
