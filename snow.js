/*!
// SnowFlakes.js - v0.0.3
// sifisatz
*/

var amountOfSnowflakes = 505,
	snowFlake = ["#DDD", "#EEE"],
	snowSpeed = 0.75,
	snowMinSize = 8,
	snowMaxSize = 24,
	snowFlakes = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

RandomWithRanges = (range) => Math.floor(range * Math.random());

initSnow = () => {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
	for (let i = 0; i <= amountOfSnowflakes; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snowFlakes[i] = document.getElementById("flake" + i);
		snowFlakes[i].style.fontFamily = "inherit";
		snowFlakes[i].size = RandomWithRanges(snowSize) + snowMinSize;
		snowFlakes[i].style.fontSize = snowFlakes[i].size + "px";
		snowFlakes[i].style.color = snowFlake[RandomWithRanges(snowFlake.length)];
		snowFlakes[i].style.zIndex = 1000;
		snowFlakes[i].sink = snowSpeed * snowFlakes[i].size / 5;
		snowFlakes[i].posX = RandomWithRanges(marginRight - snowFlakes[i].size);
		snowFlakes[i].posY = RandomWithRanges(2 * marginBottom - marginBottom - 2 * snowFlakes[i].size);
		snowFlakes[i].style.left = snowFlakes[i].posX + "px";
		snowFlakes[i].style.top = snowFlakes[i].posY + "px";
	}

	moveSnow();
}


moveSnow = () => {
	for (let i = 0; i <= amountOfSnowflakes; i++) {
		coords[i] += pos[i];
		snowFlakes[i].posY += snowFlakes[i].sink;
		snowFlakes[i].style.left = snowFlakes[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snowFlakes[i].style.top = snowFlakes[i].posY + "px";

		if (snowFlakes[i].posY >= marginBottom - 2 * snowFlakes[i].size || parseInt(snowFlakes[i].style.left) > (marginRight - 3 * lefr[i])) {
			snowFlakes[i].posX = RandomWithRanges(marginRight - snowFlakes[i].size);
			snowFlakes[i].posY = 0;
		}
	}
	var snowRefresh = 50;
	setTimeout("moveSnow()", snowRefresh);
}

// Styles
var snowStyles = `cursor: default; 
-webkit-user-select: none; 
-moz-user-select: none; 
-ms-user-select: none; 
-o-user-select: none; 
user-select: none; 
position:absolute; 
top:-${snowMaxSize};
`;

for (let i = 0; i <= amountOfSnowflakes; i++) {
	document.write(`<span id='flake${i}' style="${snowStyles}">&#x2022;</span>`);
}

resize = () => {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}
window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);