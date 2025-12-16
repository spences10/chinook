<script lang="ts">
	let { data } = $props();
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Customers</h1>

	<div class="grid gap-2">
		{#each data.customers as customer}
			<a
				href="/customers/{customer.CustomerId}"
				class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<div>
					<div class="font-medium">
						{customer.FirstName}
						{customer.LastName}
					</div>
					<div class="text-sm text-muted-foreground">
						{customer.Email}
					</div>
				</div>
				{#if customer.Country}
					<span class="text-muted-foreground">
						{customer.Country}
					</span>
				{/if}
			</a>
		{/each}
	</div>
</div>
