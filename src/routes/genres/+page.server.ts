import { db } from '$lib/server/db';

export const load = () => {
	const genres = db
		.query<
			{ GenreId: number; Name: string; track_count: number },
			[]
		>(
			`SELECT g.GenreId, g.Name, COUNT(t.TrackId) as track_count
			 FROM genres g
			 LEFT JOIN tracks t ON g.GenreId = t.GenreId
			 GROUP BY g.GenreId
			 ORDER BY g.Name`,
		)
		.all();

	return { genres };
};
