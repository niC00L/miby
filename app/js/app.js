/* 
 Created on : May 6, 2016, 4:36:09 PM
 Author     : niC00L, Ienze
 */

var pixySetuped = pixySetup();

var renderer = pixySetuped[0];
renderer.backgroundColor = 0xcccccc;
var stage = pixySetuped[1];

var squareEmptyImg = PIXI.Texture.fromImage("img/square-empty.png");

for (var i = 0; i < 7; i++) {
	for (var j = 0; j < 7; j++) {
		var squareEmpty = new PIXI.Sprite(squareEmptyImg);

		squareEmpty.position.x = 13.5*i + 4.5;
		squareEmpty.position.y = 13.5*j + 4.5;
		squareEmpty.width = 10;
		squareEmpty.height = 10;
		
		stage.addChild(squareEmpty);
	}
}

var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
}
render();