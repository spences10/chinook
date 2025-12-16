import { db } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
	const playlist = db
		.query<
			{ PlaylistId: number; Name: string },
			{ id: number }
		>(`SELECT PlaylistId, Name FROM playlists WHERE PlaylistId = $id`)
		.get({ id: Number(params.id) });

	if (!playlist) throw error(404, 'Playlist not found');

	const tracks = db
		.query<
			{
				TrackId: number;
				Name: string;
				ArtistName: string;
				AlbumTitle: string;
				Milliseconds: number;
			},
			{ id: number }
		>(
			`SELECT t.TrackId, t.Name, a.Name as ArtistName, al.Title as AlbumTitle, t.Milliseconds
			 FROM playlist_track pt
			 JOIN tracks t ON pt.TrackId = t.TrackId
			 LEFT JOIN albums al ON t.AlbumId = al.AlbumId
			 LEFT JOIN artists a ON al.ArtistId = a.ArtistId
			 WHERE pt.PlaylistId = $id
			 ORDER BY t.Name`,
		)
		.all({ id: Number(params.id) });

	return { playlist, tracks };
};
