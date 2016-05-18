/* 
 Created on : May 7, 2016, 8:20:09 PM
 Author     : niC00L
 
 Script used for page editing
 */

var openButton = document.getElementsByClassName('open');
var closeButton = document.getElementsByClassName('close');
var colorsHelp = document.querySelector('#colors');

for (var i = 0; i < openButton.length; i++) {		
	openButton[i].addEventListener('click', function (e) {
		var open = this.dataset.open;	
		e.preventDefault();
		document.getElementById(open).className = 'visible';
	}, false);
}

for (var i = 0; i < closeButton.length; i++) {		
	closeButton[i].addEventListener('click', function (e) {
		var close = this.dataset.close;
		e.preventDefault();
		document.getElementById(close).className = 'hidden';
	}, false);
}

function setUsername() {
	name = document.querySelector('[name=username]').value;
	playerSettings.name = name;
}

function drawColors() {
	var color;
	var element;

	for (var op in colors) {
		color = colors[op].substring(2);
		element = '<span class="color" style="color:#' + color + '; border-color:#' + color + '">' + op + '</span>';
		colorsHelp.innerHTML += element;
	}
}

drawColors();

