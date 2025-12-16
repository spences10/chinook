<script lang="ts">
	import { page } from '$app/state';
	import { get_track } from '$lib/queries.remote';

	const data_promise = $derived(get_track(Number(page.params.id)));

	function format_duration(ms: number) {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	function format_bytes(bytes: number) {
		return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
	}
</script>

{#await data_promise}
	<div class="container mx-auto p-8">Loading...</div>
{:then data}
	{#if data}
		<div class="container mx-auto p-8">
			<h1 class="mb-2 text-4xl font-bold">{data.Name}</h1>

			<div class="mb-8 space-y-1 text-muted-foreground">
				<p>
					by <a
						href="/artists/{data.ArtistId}"
						class="hover:underline">{data.ArtistName}</a
					>
				</p>
				<p>
					from <a
						href="/albums/{data.AlbumId}"
						class="hover:underline"
					>
						{data.AlbumTitle}
					</a>
				</p>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Duration</div>
					<div class="text-xl font-medium">
						{format_duration(data.Milliseconds)}
					</div>
				</div>
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Genre</div>
					<div class="text-xl font-medium">
						<a href="/genres/{data.GenreId}" class="hover:underline">
							{data.GenreName}
						</a>
					</div>
				</div>
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Format</div>
					<div class="text-xl font-medium">{data.MediaType}</div>
				</div>
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Size</div>
					<div class="text-xl font-medium">
						{format_bytes(data.Bytes)}
					</div>
				</div>
				{#if data.Composer}
					<div class="rounded-lg border p-4 md:col-span-2">
						<div class="text-sm text-muted-foreground">Composer</div>
						<div class="text-xl font-medium">{data.Composer}</div>
					</div>
				{/if}
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Price</div>
					<div class="text-xl font-medium">
						${data.UnitPrice.toFixed(2)}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="container mx-auto p-8">Track not found</div>
	{/if}
{:catch error}
	<div class="container mx-auto p-8">Error: {error.message}</div>
{/await}
