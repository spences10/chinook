<script lang="ts">
	import { page } from '$app/state';
	import { get_invoice } from '$lib/queries.remote';

	const data_promise = $derived(get_invoice(Number(page.params.id)));

	function format_date(date_str: string) {
		return new Date(date_str).toLocaleDateString();
	}
</script>

{#await data_promise}
	<div class="container mx-auto p-8">Loading...</div>
{:then data}
	{#if data}
		<div class="container mx-auto p-8">
			<h1 class="mb-2 text-4xl font-bold">
				Invoice #{data.invoice.InvoiceId}
			</h1>
			<p class="mb-8 text-muted-foreground">
				<a
					href="/customers/{data.invoice.CustomerId}"
					class="hover:underline"
				>
					{data.invoice.CustomerName}
				</a>
				- {format_date(data.invoice.InvoiceDate)}
			</p>

			{#if data.invoice.BillingAddress}
				<div class="mb-8 rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">
						Billing Address
					</div>
					<div class="font-medium">
						{data.invoice.BillingAddress}<br />
						{data.invoice.BillingCity}, {data.invoice.BillingState}
						{data.invoice.BillingPostalCode}<br />
						{data.invoice.BillingCountry}
					</div>
				</div>
			{/if}

			<h2 class="mb-4 text-2xl font-semibold">Items</h2>
			<div class="grid gap-2">
				{#each data.items as item}
					<a
						href="/tracks/{item.TrackId}"
						class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
					>
						<div>
							<div class="font-medium">{item.TrackName}</div>
							<div class="text-sm text-muted-foreground">
								{item.ArtistName}
							</div>
						</div>
						<div class="text-right">
							<div class="font-medium">
								${(item.UnitPrice * item.Quantity).toFixed(2)}
							</div>
							<div class="text-sm text-muted-foreground">
								{item.Quantity} × ${item.UnitPrice.toFixed(2)}
							</div>
						</div>
					</a>
				{/each}
			</div>

			<div class="mt-6 flex justify-end">
				<div class="rounded-lg border bg-card p-4">
					<div class="text-sm text-muted-foreground">Total</div>
					<div class="text-2xl font-bold">
						${data.invoice.Total.toFixed(2)}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="container mx-auto p-8">Invoice not found</div>
	{/if}
{:catch error}
	<div class="container mx-auto p-8">Error: {error.message}</div>
{/await}
