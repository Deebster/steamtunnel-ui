<script lang="ts">
	import { Board, deal, height, width } from './cards';

	let board: Board = [];

	function newDeal() {
		board = deal();
	}

	function flip(event) {
		console.log(event);
	}
</script>

<button on:click={newDeal}>Deal</button><br />

<svg viewBox="0,0 100,100">
	<rect width="100%" height="100%" fill="#074412" />
	<image width="100%" height="100%" fill="green" href="/static/mix_texture.svg" />
	{#each board as card, i}
		<rect
			class="card"
			width="13"
			height="10"
			x={5 + (i % width) * 15}
			y={5 + Math.floor(i / height) * 15}
			on:click={flip}
		/>
		<text x={12 + (i % width) * 15} y={5 + Math.floor(i / height) * 15}>
			{card.card}
			{#if card.rotated}'{/if}
		</text>
	{/each}
</svg>

<style>
	:global(.card) {
		fill: bisque;
		rx: 1px;
	}

	:global(text) {
		font-size: 70%;
		text-anchor: middle;
		dominant-baseline: hanging;
		pointer-events: none;
	}
</style>
