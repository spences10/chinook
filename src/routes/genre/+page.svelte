<script lang="ts">
	let { data } = $props();

	const { genres } = data;
</script>

<ul class="list-disc pl-10 text-xl">
	{#each genres as { GenreName, GenreId }}
		<li>
			<a href={`/genre/${GenreId}`} class="link link-primary">
				{GenreName}
			</a>
		</li>
	{/each}
</ul>
