import { query } from '$app/server';
import { db } from '$lib/server/db';
import * as v from 'valibot';

const id_schema = v.number();
const search_schema = v.object({
	term: v.string(),
	limit: v.optional(v.number(), 20),
});

export const search_catalog = query(
	search_schema,
	async ({ term, limit }) => {
		if (!term || term.length < 2)
			return { tracks: [], artists: [], albums: [] };

		const search_term = `%${term}%`;

		const tracks = db
			.query<
				{
					TrackId: number;
					Name: string;
					ArtistName: string;
					AlbumTitle: string;
				},
				[string, number]
			>(
				`SELECT t.TrackId, t.Name, a.Name as ArtistName, al.Title as AlbumTitle
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE t.Name LIKE ?
			 ORDER BY t.Name
			 LIMIT ?`,
			)
			.all(search_term, limit ?? 20);

		const artists = db
			.query<
				{ ArtistId: number; Name: string },
				[string, number]
			>(`SELECT ArtistId, Name FROM artists WHERE Name LIKE ? ORDER BY Name LIMIT ?`)
			.all(search_term, limit ?? 20);

		const albums = db
			.query<
				{ AlbumId: number; Title: string; ArtistName: string },
				[string, number]
			>(
				`SELECT al.AlbumId, al.Title, a.Name as ArtistName
			 FROM albums al
			 JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE al.Title LIKE ?
			 ORDER BY al.Title
			 LIMIT ?`,
			)
			.all(search_term, limit ?? 20);

		return { tracks, artists, albums };
	},
);

export const get_artist = query(id_schema, async (id) => {
	const artist = db
		.query<
			{ ArtistId: number; Name: string },
			[number]
		>(`SELECT ArtistId, Name FROM artists WHERE ArtistId = ?`)
		.get(id);

	if (!artist) return null;

	const albums = db
		.query<
			{ AlbumId: number; Title: string; track_count: number },
			[number]
		>(
			`SELECT al.AlbumId, al.Title, COUNT(t.TrackId) as track_count
			 FROM albums al
			 LEFT JOIN tracks t ON al.AlbumId = t.AlbumId
			 WHERE al.ArtistId = ?
			 GROUP BY al.AlbumId
			 ORDER BY al.Title`,
		)
		.all(id);

	return { artist, albums };
});

export const get_album = query(id_schema, async (id) => {
	const album = db
		.query<
			{
				AlbumId: number;
				Title: string;
				ArtistId: number;
				ArtistName: string;
			},
			[number]
		>(
			`SELECT al.AlbumId, al.Title, al.ArtistId, a.Name as ArtistName
			 FROM albums al
			 JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE al.AlbumId = ?`,
		)
		.get(id);

	if (!album) return null;

	const tracks = db
		.query<
			{ TrackId: number; Name: string; Milliseconds: number },
			[number]
		>(
			`SELECT TrackId, Name, Milliseconds
			 FROM tracks
			 WHERE AlbumId = ?
			 ORDER BY TrackId`,
		)
		.all(id);

	return { album, tracks };
});

export const get_track = query(id_schema, async (id) => {
	return db
		.query<
			{
				TrackId: number;
				Name: string;
				AlbumId: number;
				AlbumTitle: string;
				ArtistId: number;
				ArtistName: string;
				GenreId: number;
				GenreName: string;
				MediaType: string;
				Composer: string | null;
				Milliseconds: number;
				Bytes: number;
				UnitPrice: number;
			},
			[number]
		>(
			`SELECT t.TrackId, t.Name, t.AlbumId, al.Title as AlbumTitle,
			        a.ArtistId, a.Name as ArtistName, t.GenreId, g.Name as GenreName,
			        mt.Name as MediaType, t.Composer, t.Milliseconds, t.Bytes, t.UnitPrice
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 LEFT JOIN genres g ON t.GenreId = g.GenreId
			 LEFT JOIN media_types mt ON t.MediaTypeId = mt.MediaTypeId
			 WHERE t.TrackId = ?`,
		)
		.get(id);
});

export const get_genre = query(id_schema, async (id) => {
	const genre = db
		.query<
			{ GenreId: number; Name: string },
			[number]
		>(`SELECT GenreId, Name FROM genres WHERE GenreId = ?`)
		.get(id);

	if (!genre) return null;

	const tracks = db
		.query<
			{
				TrackId: number;
				Name: string;
				ArtistName: string;
				AlbumTitle: string;
				Milliseconds: number;
			},
			[number]
		>(
			`SELECT t.TrackId, t.Name, a.Name as ArtistName, al.Title as AlbumTitle, t.Milliseconds
			 FROM tracks t
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE t.GenreId = ?
			 ORDER BY t.Name
			 LIMIT 50`,
		)
		.all(id);

	return { genre, tracks };
});

export const get_playlist = query(id_schema, async (id) => {
	const playlist = db
		.query<
			{ PlaylistId: number; Name: string },
			[number]
		>(`SELECT PlaylistId, Name FROM playlists WHERE PlaylistId = ?`)
		.get(id);

	if (!playlist) return null;

	const tracks = db
		.query<
			{
				TrackId: number;
				Name: string;
				ArtistName: string;
				AlbumTitle: string;
				Milliseconds: number;
			},
			[number]
		>(
			`SELECT t.TrackId, t.Name, a.Name as ArtistName, al.Title as AlbumTitle, t.Milliseconds
			 FROM playlist_track pt
			 JOIN tracks t ON pt.TrackId = t.TrackId
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE pt.PlaylistId = ?
			 ORDER BY t.Name`,
		)
		.all(id);

	return { playlist, tracks };
});

export const get_customer = query(id_schema, async (id) => {
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
			[number]
		>(
			`SELECT CustomerId, FirstName, LastName, Company, Address, City, State, Country, PostalCode, Phone, Email
			 FROM customers WHERE CustomerId = ?`,
		)
		.get(id);

	if (!customer) return null;

	const invoices = db
		.query<
			{ InvoiceId: number; InvoiceDate: string; Total: number },
			[number]
		>(
			`SELECT InvoiceId, InvoiceDate, Total
			 FROM invoices
			 WHERE CustomerId = ?
			 ORDER BY InvoiceDate DESC`,
		)
		.all(id);

	return { customer, invoices };
});

export const get_invoice = query(id_schema, async (id) => {
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
			[number]
		>(
			`SELECT i.InvoiceId, i.InvoiceDate, i.CustomerId,
			        c.FirstName || ' ' || c.LastName as CustomerName,
			        i.BillingAddress, i.BillingCity, i.BillingState,
			        i.BillingCountry, i.BillingPostalCode, i.Total
			 FROM invoices i
			 JOIN customers c ON i.CustomerId = c.CustomerId
			 WHERE i.InvoiceId = ?`,
		)
		.get(id);

	if (!invoice) return null;

	const items = db
		.query<
			{
				TrackId: number;
				TrackName: string;
				ArtistName: string;
				UnitPrice: number;
				Quantity: number;
			},
			[number]
		>(
			`SELECT t.TrackId, t.Name as TrackName, a.Name as ArtistName,
			        ii.UnitPrice, ii.Quantity
			 FROM invoice_items ii
			 JOIN tracks t ON ii.TrackId = t.TrackId
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE ii.InvoiceId = ?`,
		)
		.all(id);

	return { invoice, items };
});
