<script lang="ts">
	let { data } = $props();

	function format_date(date_str: string) {
		return new Date(date_str).toLocaleDateString();
	}
</script>

<div class="container mx-auto p-8">
	<h1 class="mb-8 text-4xl font-bold">Invoices</h1>
	<p class="mb-4 text-muted-foreground">
		Showing latest 100 invoices
	</p>

	<div class="grid gap-2">
		{#each data.invoices as invoice}
			<a
				href="/invoices/{invoice.InvoiceId}"
				class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
			>
				<div>
					<div class="font-medium">Invoice #{invoice.InvoiceId}</div>
					<div class="text-sm text-muted-foreground">
						{invoice.CustomerName} - {format_date(
							invoice.InvoiceDate,
						)}
					</div>
				</div>
				<span class="font-medium">${invoice.Total.toFixed(2)}</span>
			</a>
		{/each}
	</div>
</div>
