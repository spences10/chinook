import { db } from '$lib/server/db';

export const load = () => {
	const invoices = db
		.query<
			{
				InvoiceId: number;
				InvoiceDate: string;
				CustomerName: string;
				Total: number;
			},
			[]
		>(
			`SELECT i.InvoiceId, i.InvoiceDate,
			        c.FirstName || ' ' || c.LastName as CustomerName, i.Total
			 FROM invoices i
			 JOIN customers c ON i.CustomerId = c.CustomerId
			 ORDER BY i.InvoiceDate DESC
			 LIMIT 100`,
		)
		.all();

	return { invoices };
};
