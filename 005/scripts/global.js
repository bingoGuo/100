function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload !== 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        };
    }
}
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.appendChild(newElement,targetElement.nextSibling);
    }
}

function addClass(element,value) {
	if(!element.className){
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
	}
}
//页面突出显示 
//给当前页面的导航加类 可以直接在html文件改。
function highlightPage() {
	if(!document.getElementsByTagName || !document.getElementById) return false;
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i=0;i<links.length;i++){
		linkurl = links[i].getAttribute('href');
		if(window.location.href.indexOf(linkurl) != -1){
			// string.indexOf(substring) 
			// 在string中确定substring的位置，如果没有匹配到返回-1
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute('id', linktext);
		}
	}

}
addLoadEvent(highlightPage);
//移动图片 
function moveElement(elementID,final_x,final_y,interval){
	if (!document.getElementById) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	//防止用户过快的移动鼠标时，动画效果互相影响
	if (elem.movement){
		clearTimeout(elem.movement);
	}
	if　(!elem.style.left){
		elem.style.left = "0px";
	}
	if　(!elem.style.top){
		elem.style.top = "0px";
	}
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	}
	if (xpos < final_x) {
		dist = Math.ceil((final_x-xpos)/10);
		xpos = xpos+dist;
	}
	if (xpos > final_x) {
		dist = Math.ceil((xpos-final_x)/10);
		xpos = xpos-dist;
	}
	if (ypos < final_y) {
		dist = Math.ceil((final_y-ypos)/10);
		ypos = yspos+dist;
	}
	if (ypos > final_y) {
		dist = Math.ceil((ypos-final_y)/10);
		ypos = yspos-dist;
	}
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement = setTimeout(repeat,interval);
}
//创建预览图，插在intro后面。鼠标在链接上时会显示相应的预览图
function prepareSlideshow() {
	if (!document.getElementsByTagName || !document.getElementById) return false;
	if (!document.getElementById('intro')) return false;
	var intro = document.getElementById('intro');
	//插入slideshow
	var slideshow = document.createElement('div');
	slideshow.setAttribute('id', 'slideshow');
	var preview = document.createElement('img');
	preview.setAttribute('src', 'images/slideshow.gif');
	preview.setAttribute('alt', 'a glimpse of what awaits you');
	preview.setAttribute('id', 'preview');
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);

	var links = document.getElementsByTagName('a');
	var destination;
	for (var i = links.length - 1; i >= 0; i--) {
		links[i].onmouseover = function() {
			destination = this.getAttribute('href');
			if (destination.indexOf("index.html") != -1) {
				moveElement('preview',0,0,5);
			}
			if (destination.indexOf("about.html") != -1) {
				moveElement('preview',-150,0,5);
			}
			if (destination.indexOf("photos.html") != -1) {
				moveElement('preview',-300,0,5);
			}
			if (destination.indexOf("live.html") != -1) {
				moveElement('preview',-450,0,5);
			}
			if (destination.indexOf("contact.html") != -1) {
				moveElement('preview',-600,0,5);
			}
		};
	}

}
addLoadEvent(prepareSlideshow);

//about 页面每次显示一个section
function showSection(id) {
	var sections = document.getElementsByTagName('section');
	for (var i = sections.length - 1; i >= 0; i--) {
		if (sections[i].getAttribute('id') != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = 'block';
		}
	}
}

function prepareInternalnav() {
	//获取nav里的a的href
	if (!document.getElementsByTagName || !document.getElementById) return false;
	var articles = document.getElementsByTagName('article');
	if (articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName('nav');
	if (navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName('a');
	for (var i = links.length - 1; i >= 0; i--) {
		//string.split('#') 把string 根据#分成几部分
		var sectionId = links[i].getAttribute('href').split('#')[1];
		if (!document.getElementById(sectionId)) continue;
		//页面加载后section全部隐藏
		document.getElementById(sectionId).style.display = "none";
		//sectionId 在click的处理函数不能用，定义一个links属性来传递
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		};
	}
}
addLoadEvent(prepareInternalnav);

//photos.html 照片墙
function showPic(whichPic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    if (document.getElementById("description")) {
        var text = whichPic.getAttribute("title")? whichPic.getAttribute("title") : "";
        var description = document.getElementById("description");
        description.firstChild.nodeValue = text;
    }
    return true;
}
function prepareGallery() {
    if (!document.getElementsByTagName || !document.getElementById) {
        return false;
    }
    if (!document.getElementById("imagegallery")) {
        return false;
    }
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i ++) {
        links[i].onclick = function() {
            return !showPic(this);
        };
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
function preparePlaceholder(){
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/photos/Bucharest.jpg");
    placeholder.setAttribute("alt","my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id","description");
    var desctext = document.createTextNode("choose a image");
    description.appendChild(desctext);
    var gallery = document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,gallery);
}


//获取表格中的缩写，在下方显示缩写和完整形式
function displayAbbreviations() {
    if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
    //取得所有缩略词
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    //遍历所有缩略词
    for (var i=0; i<abbreviations.length;i++) {
    	if(abbreviations[i].childNodes.length < 1) continue;
        var definition = abbreviations[i].getAttribute("title");
        var key = abbreviations[i].lastChild.nodeValue;
        defs[key] = definition; 
    }
    //创建定义列表
    var dlist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    //创建列表标题
    if (dlist.childNodes.length < 1) return false;
    var header = document.createElement("h2");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName('article');
    if (articles.length < 0 ) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dlist);
}
addLoadEvent(displayAbbreviations);

//单击标签相应表单得到焦点
function focusLabels() {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName('label');
	for (var i = labels.length - 1; i >= 0; i--) {
		if (!labels[i].getAttribute('for')) continue;
		labels[i].onclick = function () {
			var id = this.getAttribute('for');
			if (!document.getElementById(id)) return false;
			var element = document.getElementById(id);
		};
	}
}
addLoadEvent(focusLabels);

//对不支持html5实现表单验证
//是否有输入
function isFilled(field) {
	if (field.value.replace(" ","").length == 0) return false;
	var placeholder = field.placeholder || field.getAttribute('placeholder');
	return (field.value != placeholder);
}
//填的email格式是否正确
function isEmail(field) {
	return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != -1)
}
//验证表单
function validateForm(whichform) {
	for (var i = whichform.elements.length - 1; i >= 0; i--) {
		var element = whichform.elements[i];
		if (element.required == "required"){
			if(!isFilled(element)){
				window.alert("please fill the "+element.name+" field");
				return false;
			}
		}
		if (element.type =="email") {
			if (!isEmail(element)) {
				window.alert("the "+element.name+" field must be a valid email address");
				return false;
			}
		}
	}
	return true;//提交表单
}

//准备表单
function prepareForms() {
	for (var i = document.forms.length - 1; i >= 0; i--) {
		var thisform = document.forms[i];
		thisform.onsubmit = function () {
			return validateForm(thisform);
		}
	}
}