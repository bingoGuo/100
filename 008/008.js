window.addEventListener("load",doFirst,false);
function doFirst() {
	var calendar = document.createElement("div");
	calendar.setAttribute('id', 'calendar');
	//create date
	var date = document.createElement("div");
	date.setAttribute('id', 'date');
	calendar.appendChild(date);
	//create div for month and year
	var monthAndYear1 = document.createElement("div");
	var monthAndYear2 = document.createElement("div");
	monthAndYear1.setAttribute('class', 'monthandyear');
	monthAndYear2.setAttribute('class', 'monthandyear');
	calendar.appendChild(monthAndYear1);
	calendar.appendChild(monthAndYear2);
	//create time
	var time = document.createElement("div");
	time.setAttribute('id', 'time');
	calendar.appendChild(time);
	//create button
	var button =document.createElement("button");
	button.setAttribute('value', 'hide');
	var button_text = document.createTextNode("hide seconds");
	button.appendChild(button_text);
	calendar.appendChild(button);
	// add calendar to content
	var content = document.getElementById('content');
	content.appendChild(calendar);
	startTime();
}
function startTime() {
	var today = new Date();
	var todayString = today.toString().split(" ");
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	var calendar = document.getElementById('calendar');
	var button = calendar.getElementsByTagName('button');
	var monthAndYear = calendar.getElementsByClassName('monthandyear');
	var date = document.getElementById('date');
	var time = document.getElementById('time');
	monthAndYear[0].innerHTML = todayString[1];
	monthAndYear[1].innerHTML = todayString[3];
	date.innerHTML = todayString[2];
	time.innerHTML = h+m+s;
	button[0].onclick = function () {
		if(this.value == "show"){
			time.style.width = "2.8em";
			this.value = "hide";
			this.lastChild.nodeValue = "show seconds";
		}else if (this.value == "hide") {
			time.style.width = "6em";
			this.value = "show";
			this.lastChild.nodeValue = "hide seconds";
		}
	}; 	
	t = setTimeout("startTime()",500);
}
function checkTime(i) {
	if (i <10){
		i=":0"+i;
	}else{
		i = ":"+i;
	}
	return i;
}