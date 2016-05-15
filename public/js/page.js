/* 
 Created on : May 7, 2016, 8:20:09 PM
 Author     : niC00L
 
 Script used for page editing
 */

var colorModal = document.querySelector('#colorHelpModal');
var colorModalButton = document.querySelector('.colorHelp');
var closeButton = document.querySelector('.close');
var colorsHelp = document.querySelector('#colors');

colorModalButton.addEventListener('click', function (e) {
	e.preventDefault();
	colorModal.className = 'visible';
}, false);

closeButton.addEventListener('click', function (e) {
	e.preventDefault();
	closeButton.parentElement.className = 'hidden';
}, false);

function drawColors() {
	colorsHelp.innerHTML += '<ul>';
	var color;
	var element;

	for (var op in colors) {
		color = colors[op].substring(2);
		element = '<li style="color:#'+color+'">'+op+'</li>';
		colorsHelp.innerHTML += element;
	}
	colorsHelp.innerHTML += '</ul>';
}

drawColors();

