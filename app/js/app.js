/* 
 Created on : May 6, 2016, 4:36:09 PM
 Author     : niC00L, Ienze
 */

var pixySetuped = pixySetup();

var renderer = pixySetuped[0];
var stage = pixySetuped[1];

renderer.backgroundColor = 0xcccccc;
var render = function () {
	renderer.render(stage);
	requestAnimationFrame(render);
}

render();