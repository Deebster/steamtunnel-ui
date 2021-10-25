<script lang="ts">
	import { Board, Tile, deal, height, width, Status } from './cards';

	let board: Board = [];

	function newDeal() {
		board = deal();
	}

	function flip(evt: MouseEvent, tile: Tile) {
		const otherDirection = evt.altKey || evt.ctrlKey || evt.shiftKey || evt.metaKey;
		console.log(tile);
		if (tile.status !== Status.FaceDown) {
			return;
		}
		tile.status = Status.FaceUp;
		if (otherDirection) {
			tile.rotated = !tile.rotated;
		}
		board = board;
	}
</script>

<button on:click={newDeal}>Deal</button><br />

<svg viewBox="0,0 100,100">
	<rect width="100%" height="100%" fill="#074412" />
	<image width="100%" height="100%" fill="green" href="/static/mix_texture.svg" />
	{#each board as tile, i}
		<rect
			class="card"
			class:facedown={tile.status === Status.FaceDown}
			width="13"
			height="10"
			x={5 + (i % width) * 15}
			y={5 + Math.floor(i / height) * 15}
			on:click={(e) => flip(e, tile)}
		/>
		<text x={12 + (i % width) * 15} y={5 + Math.floor(i / height) * 15}>
			{tile.card}
			{#if tile.rotated}'{/if}
		</text>
	{/each}
</svg>

<style>
	:global(.card) {
		fill: bisque;
		rx: 1px;
	}

	:global(.card.facedown) {
		fill: #282828;
	}

	:global(text) {
		font-size: 70%;
		text-anchor: middle;
		dominant-baseline: hanging;
		pointer-events: none;
	}
</style>
