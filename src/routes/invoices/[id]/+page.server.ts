import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const invoice = db
		.query<
			{
				InvoiceId: number;
				InvoiceDate: string;
				CustomerId: number;
				CustomerName: string;
				BillingAddress: string | null;
				BillingCity: string | null;
				BillingState: string | null;
				BillingCountry: string | null;
				BillingPostalCode: string | null;
				Total: number;
			},
			{ id: number }
		>(
			`SELECT i.InvoiceId, i.InvoiceDate, i.CustomerId,
			        c.FirstName || ' ' || c.LastName as CustomerName,
			        i.BillingAddress, i.BillingCity, i.BillingState,
			        i.BillingCountry, i.BillingPostalCode, i.Total
			 FROM invoices i
			 JOIN customers c ON i.CustomerId = c.CustomerId
			 WHERE i.InvoiceId = $id`,
		)
		.get({ id: Number(params.id) });

	if (!invoice) throw error(404, 'Invoice not found');

	const items = db
		.query<
			{
				TrackId: number;
				TrackName: string;
				ArtistName: string;
				UnitPrice: number;
				Quantity: number;
			},
			{ id: number }
		>(
			`SELECT t.TrackId, t.Name as TrackName, a.Name as ArtistName,
			        ii.UnitPrice, ii.Quantity
			 FROM invoice_items ii
			 JOIN tracks t ON ii.TrackId = t.TrackId
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE ii.InvoiceId = $id`,
		)
		.all({ id: Number(params.id) });

	return { invoice, items };
};
