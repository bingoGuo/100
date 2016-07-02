function doFirst() {
	var main = document.getElementById('main');
	var level = document.createElement('div');
	level.setAttribute('class', 'level');
	var body = document.getElementsByTagName('body');
	body[0].insertBefore(level,main);
	var num = 2;
	splitBox(num);
}

function splitBox(num) {
	if (num > 20) {
		alert("I can't believe it!! Yod did it!! incredible!! You are not human!!");
		doFirst();
		return;
	}
	var level = document.getElementsByClassName('level');
	level[0].innerHTML = "level:"+num+"X"+num;
	// var level_text = document.createTextNode(num+"X"+num);
	// level.appendChild(level_text);
	
	var main = document.getElementById('main');
	main.innerHTML = "";
	var color1 = "#";
	var color2 = "#";
	for (var i = 0; i <3; i++) {
		rand = Math.random()*(215+num*2);
		floor1 = Math.floor(rand);
		floor2 = floor1+(40-num*2);

		if (floor1 == 0) {
			floor1 = "00";
		} else if (floor1<16) {
			floor1 ="0"+floor1.toString(16);
		} else {
			floor1 = floor1.toString(16);
		}
		color1 += floor1;

		if (floor2 == 0) {
			floor2 = "00";
		} else if (floor2<16) {
			floor2 ="0"+floor2.toString(16);
		} else {
			floor2 = floor2.toString(16);
		}
		color2 += floor2;
	}
	//box 的个数;
	var number = Math.pow(num,2);
	//change决定第几个box 颜色不一样
	var change  = Math.floor(Math.random()*number);
	for (var i = 0; i < number; i++) {
		var box = document.createElement("div");	
		var boxsize = (main.offsetHeight/num)-4;
			box.style.width = boxsize+"px";
			box.style.height = boxsize+"px";
			main.appendChild(box);
			if (i === change){
				box.style.backgroundColor = color2;
				box.setAttribute('class', "change");
				box.addEventListener("click",function() {
			    num = num+1;
				splitBox(num);
		 		},false)
			}else{
				box.style.backgroundColor = color1;
				box.addEventListener("click",function() {
					alert("game over. try again?");
					doFirst();
			 	},false)
			}	
	}
}
window.addEventListener("load",doFirst,false);