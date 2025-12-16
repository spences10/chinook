import { db } from '$lib/server/db';

export const load = () => {
	const playlists = db
		.query<
			{ PlaylistId: number; Name: string; track_count: number },
			[]
		>(
			`SELECT p.PlaylistId, p.Name, COUNT(pt.TrackId) as track_count
			 FROM playlists p
			 LEFT JOIN playlist_track pt ON p.PlaylistId = pt.PlaylistId
			 GROUP BY p.PlaylistId
			 ORDER BY p.Name`,
		)
		.all();

	return { playlists };
};
