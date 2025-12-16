<script lang="ts">
	import { page } from '$app/state';
	import { get_customer } from '$lib/queries.remote';

	const data_promise = $derived(get_customer(Number(page.params.id)));

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
				{data.customer.FirstName}
				{data.customer.LastName}
			</h1>
			{#if data.customer.Company}
				<p class="mb-4 text-muted-foreground">
					{data.customer.Company}
				</p>
			{/if}

			<div class="mb-8 grid gap-4 md:grid-cols-2">
				<div class="rounded-lg border p-4">
					<div class="text-sm text-muted-foreground">Email</div>
					<div class="font-medium">{data.customer.Email}</div>
				</div>
				{#if data.customer.Phone}
					<div class="rounded-lg border p-4">
						<div class="text-sm text-muted-foreground">Phone</div>
						<div class="font-medium">{data.customer.Phone}</div>
					</div>
				{/if}
				{#if data.customer.Address}
					<div class="rounded-lg border p-4 md:col-span-2">
						<div class="text-sm text-muted-foreground">Address</div>
						<div class="font-medium">
							{data.customer.Address}<br />
							{data.customer.City}, {data.customer.State}
							{data.customer.PostalCode}<br />
							{data.customer.Country}
						</div>
					</div>
				{/if}
			</div>

			<h2 class="mb-4 text-2xl font-semibold">
				Invoices ({data.invoices.length})
			</h2>
			<div class="grid gap-2">
				{#each data.invoices as invoice}
					<a
						href="/invoices/{invoice.InvoiceId}"
						class="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
					>
						<div>
							<div class="font-medium">
								Invoice #{invoice.InvoiceId}
							</div>
							<div class="text-sm text-muted-foreground">
								{format_date(invoice.InvoiceDate)}
							</div>
						</div>
						<span class="font-medium">
							${invoice.Total.toFixed(2)}
						</span>
					</a>
				{/each}
			</div>
		</div>
	{:else}
		<div class="container mx-auto p-8">Customer not found</div>
	{/if}
{:catch error}
	<div class="container mx-auto p-8">Error: {error.message}</div>
{/await}
