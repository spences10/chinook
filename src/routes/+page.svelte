<script lang="ts">
	import {
		AudioLines,
		Disc3,
		ListMusic,
		MicVocal,
		Music,
		Receipt,
		Users,
	} from '@lucide/svelte';

	let { data } = $props();

	const icon_map: Record<string, typeof Music> = {
		artists: MicVocal,
		albums: Disc3,
		tracks: AudioLines,
		genres: Music,
		playlists: ListMusic,
		customers: Users,
		invoices: Receipt,
	};
</script>

<div class="container mx-auto p-8">
	<div class="mb-12 text-center">
		<h1 class="mb-4 text-5xl font-bold tracking-tight">
			Chinook Music Store
		</h1>
		<p class="text-xl text-muted-foreground">
			Browse the digital media catalog
		</p>
	</div>

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
