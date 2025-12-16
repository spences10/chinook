import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const customer = db
		.query<
			{
				CustomerId: number;
				FirstName: string;
				LastName: string;
				Company: string | null;
				Address: string | null;
				City: string | null;
				State: string | null;
				Country: string | null;
				PostalCode: string | null;
				Phone: string | null;
				Email: string;
			},
			{ id: number }
		>(
			`SELECT CustomerId, FirstName, LastName, Company, Address, City, State, Country, PostalCode, Phone, Email
			 FROM customers WHERE CustomerId = $id`,
		)
		.get({ id: Number(params.id) });

	if (!customer) throw error(404, 'Customer not found');

	const invoices = db
		.query<
			{ InvoiceId: number; InvoiceDate: string; Total: number },
			{ id: number }
		>(
			`SELECT InvoiceId, InvoiceDate, Total
			 FROM invoices
			 WHERE CustomerId = $id
			 ORDER BY InvoiceDate DESC`,
		)
		.all({ id: Number(params.id) });

	return { customer, invoices };
};
