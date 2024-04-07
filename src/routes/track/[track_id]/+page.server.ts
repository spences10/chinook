import { get_track_by_track_id } from '$lib/server/queries.js';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const track_id = parseInt(params.track_id);

	if (!track_id) {
		error(404, 'Artist not found');
	}

	const { artist, track, track_name } =
		await get_track_by_track_id(track_id);

	return {
		track_name,
		artist,
		track,
	};
};
