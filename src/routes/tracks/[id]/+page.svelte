<script lang="ts">
	let { data } = $props();

	function formatDuration(ms: number) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	function formatBytes(bytes: number) {
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	}
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-2 text-4xl font-bold">{data.track.Name}</h1>

	<div class="mb-8 space-y-1 text-muted-foreground">
		<p>
			by <a
				href="/artists/{data.track.ArtistId}"
				class="hover:underline">{data.track.ArtistName}</a
			>
		</p>
		<p>
			from <a
				href="/albums/{data.track.AlbumId}"
				class="hover:underline">{data.track.AlbumTitle}</a
			>
		</p>
	</div>

	<div class="grid gap-4 md:grid-cols-2">
		<div class="rounded-lg border p-4">
			<div class="text-sm text-muted-foreground">Duration</div>
			<div class="text-xl font-medium">
				{formatDuration(data.track.Milliseconds)}
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<div class="text-sm text-muted-foreground">Genre</div>
			<div class="text-xl font-medium">
				<a
					href="/genres/{data.track.GenreId}"
					class="hover:underline"
				>
					{data.track.GenreName}
				</a>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<div class="text-sm text-muted-foreground">Format</div>
			<div class="text-xl font-medium">{data.track.MediaType}</div>
		</div>
		<div class="rounded-lg border p-4">
			<div class="text-sm text-muted-foreground">Size</div>
			<div class="text-xl font-medium">
				{formatBytes(data.track.Bytes)}
			</div>
		</div>
		{#if data.track.Composer}
			<div class="rounded-lg border p-4 md:col-span-2">
				<div class="text-sm text-muted-foreground">Composer</div>
				<div class="text-xl font-medium">{data.track.Composer}</div>
			</div>
		{/if}
		<div class="rounded-lg border p-4">
			<div class="text-sm text-muted-foreground">Price</div>
			<div class="text-xl font-medium">
				${data.track.UnitPrice.toFixed(2)}
			</div>
		</div>
	</div>
</div>
