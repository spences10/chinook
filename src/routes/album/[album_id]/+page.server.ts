import { get_album_by_id } from '$lib/server/queries.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const album_id = parseInt(params.album_id);

	if (!album_id) {
		error(404, 'Album not found');
	}

	const { artist, album, tracks } = await get_album_by_id(album_id);

	return {
		artist,
		album,
		tracks,
	};
};
