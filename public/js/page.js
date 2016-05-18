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
		document.getElementById(open).classList.toggle('hidden');
	}, false);
}

for (var i = 0; i < closeButton.length; i++) {
	closeButton[i].addEventListener('click', function (e) {
		var close = this.dataset.close;
		e.preventDefault();
		document.getElementById(close).classList.toggle('hidden');
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

var oReq = new XMLHttpRequest();
oReq.onload = function (e) {
	var response = JSON.parse(oReq.response);
	printScore(response);
}
oReq.open("GET", "http://miby.ienze.me/api/top");
oReq.send();

function printScore(response) {
	var table = document.querySelector('#scoreTable tbody');
	var v;
	var elem;
	for (var key in response) {
		if (key < 10) {
			v = response[key];
			r = parseInt(key) + 1;
			elem = '<tr><td>' + r + '</td><td>' + v['name'] + '</td><td>' + v['level'] + '</td></tr>'
			table.insertAdjacentHTML('beforeend', elem);
		}
	}
	console.log(table.innerHtml);
}

