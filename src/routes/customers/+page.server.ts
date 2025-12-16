import { db } from '$lib/server/db';

export const load = () => {
	const customers = db
		.query<
			{
				CustomerId: number;
				FirstName: string;
				LastName: string;
				Email: string;
				Country: string | null;
			},
			[]
		>(
			`SELECT CustomerId, FirstName, LastName, Email, Country
			 FROM customers
			 ORDER BY LastName, FirstName`,
		)
		.all();

	return { customers };
};
