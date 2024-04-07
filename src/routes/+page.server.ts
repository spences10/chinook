import { get_initial_tracks } from '$lib/server';

export const load = async () => {
	const tracks = await get_initial_tracks();

	return {
		tracks,
	};
};
