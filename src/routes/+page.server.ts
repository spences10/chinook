import { db } from '$lib/server/db';

export const load = () => {
	const stats = db
		.query<{ table_name: string; count: number }, []>(
			`SELECT 'artists' as table_name, COUNT(*) as count FROM artists
			 UNION ALL SELECT 'albums', COUNT(*) FROM albums
			 UNION ALL SELECT 'tracks', COUNT(*) FROM tracks
			 UNION ALL SELECT 'genres', COUNT(*) FROM genres
			 UNION ALL SELECT 'playlists', COUNT(*) FROM playlists
			 UNION ALL SELECT 'customers', COUNT(*) FROM customers
			 UNION ALL SELECT 'invoices', COUNT(*) FROM invoices`,
		)
		.all();

	return { stats };
};
