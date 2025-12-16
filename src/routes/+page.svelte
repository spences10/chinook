<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Chinook Music Store</h1>

	<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
		{#each data.stats as stat}
			<a
				href="/{stat.table_name}"
				class="rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
			>
				<div class="text-3xl font-bold">
					{stat.count.toLocaleString()}
				</div>
				<div class="text-muted-foreground capitalize">
					{stat.table_name}
				</div>
			</a>
		{/each}
	</div>
</div>
