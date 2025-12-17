<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import { search_catalog } from '$lib/queries.remote';
	import {
		AudioLines,
		Disc3,
		ListMusic,
		MicVocal,
		Music,
		Receipt,
		Search,
		Users,
	} from '@lucide/svelte';

	let { data } = $props();

	let open = $state(false);
	let search_value = $state('');
	let search_results =
		$state<Awaited<ReturnType<typeof search_catalog>>>();
	let is_searching = $state(false);
	let debounce_timer: ReturnType<typeof setTimeout>;

	const icon_map: Record<string, typeof Music> = {
		artists: MicVocal,
		albums: Disc3,
		tracks: AudioLines,
		genres: Music,
		playlists: ListMusic,
		customers: Users,
		invoices: Receipt,
	};

	function handle_keydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	}

	async function do_search(term: string) {
		if (term.length < 2) {
			search_results = undefined;
			return;
		}
		is_searching = true;
		search_results = await search_catalog({ term });
		is_searching = false;
	}

	$effect(() => {
		clearTimeout(debounce_timer);
		if (search_value) {
			debounce_timer = setTimeout(() => do_search(search_value), 300);
		} else {
			search_results = undefined;
		}
	});

	const has_results = $derived(
		search_results &&
			(search_results.tracks.length > 0 ||
				search_results.artists.length > 0 ||
				search_results.albums.length > 0),
	);
</script>

<svelte:document onkeydown={handle_keydown} />

<div class="container mx-auto p-8">
	<div class="mb-8 text-center">
		<h1 class="mb-4 text-5xl font-bold tracking-tight">
			Chinook Music Store
		</h1>
		<p class="text-xl text-muted-foreground">
			Browse the digital media catalog
		</p>
	</div>

	<!-- Search Button -->
	<div class="mx-auto mb-12 max-w-xl">
		<Button
			variant="outline"
			class="w-full justify-between text-muted-foreground"
			onclick={() => (open = true)}
		>
			<span class="flex items-center gap-2">
				<Search class="h-4 w-4" />
				Search tracks, artists, albums...
			</span>
			<kbd
				class="pointer-events-none hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 select-none sm:flex"
			>
				<span class="text-xs">⌘</span>K
			</kbd>
		</Button>
	</div>

	<!-- Command Palette -->
	<Command.Dialog bind:open shouldFilter={false}>
		<Command.Input
			placeholder="Search tracks, artists, albums..."
			bind:value={search_value}
		/>
		<Command.List>
			{#if is_searching}
				<Command.Loading>Searching...</Command.Loading>
			{:else if search_value.length >= 2}
				{#if has_results}
					{#if search_results?.artists.length}
						<Command.Group heading="Artists">
							{#each search_results.artists.slice(0, 5) as artist}
								<Command.Item
									value="artist-{artist.ArtistId}"
									onSelect={() => {
										open = false;
										goto(`/artists/${artist.ArtistId}`);
									}}
								>
									<MicVocal class="me-2 size-4" />
									<span>{artist.Name}</span>
								</Command.Item>
							{/each}
						</Command.Group>
					{/if}

					{#if search_results?.albums.length}
						<Command.Group heading="Albums">
							{#each search_results.albums.slice(0, 5) as album}
								<Command.Item
									value="album-{album.AlbumId}"
									onSelect={() => {
										open = false;
										goto(`/albums/${album.AlbumId}`);
									}}
								>
									<Disc3 class="me-2 size-4" />
									<span>{album.Title}</span>
									<span class="ml-2 text-muted-foreground">
										{album.ArtistName}
									</span>
								</Command.Item>
							{/each}
						</Command.Group>
					{/if}

					{#if search_results?.tracks.length}
						<Command.Group heading="Tracks">
							{#each search_results.tracks.slice(0, 5) as track}
								<Command.Item
									value="track-{track.TrackId}"
									onSelect={() => {
										open = false;
										goto(`/tracks/${track.TrackId}`);
									}}
								>
									<AudioLines class="me-2 size-4" />
									<span>{track.Name}</span>
									<span class="ml-2 text-muted-foreground">
										{track.ArtistName}
									</span>
								</Command.Item>
							{/each}
						</Command.Group>
					{/if}
				{:else}
					<Command.Empty forceMount
						>No results found for "{search_value}"</Command.Empty
					>
				{/if}
			{:else}
				<Command.Empty forceMount>Type to search...</Command.Empty>
			{/if}
		</Command.List>
	</Command.Dialog>

	<div class="grid grid-cols-2 gap-6 md:grid-cols-4">
		{#each data.stats as stat}
			{@const Icon = icon_map[stat.table_name] || Music}
			<a
				href="/{stat.table_name}"
				class="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg"
			>
				<div class="mb-4 flex items-center justify-between">
					<Icon
						class="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary"
					/>
					<span
						class="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
					>
						{stat.table_name}
					</span>
				</div>
				<div class="text-4xl font-bold tracking-tight">
					{stat.count.toLocaleString()}
				</div>
				<div class="mt-1 text-sm text-muted-foreground capitalize">
					{stat.table_name === 'tracks' ? 'songs' : stat.table_name}
				</div>
			</a>
		{/each}
	</div>

	<div class="mt-16 text-center">
		<p class="text-sm text-muted-foreground">
			Built with SvelteKit + Bun SQLite + shadcn-svelte
		</p>
	</div>
</div>
