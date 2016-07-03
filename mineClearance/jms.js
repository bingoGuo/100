$(function () {
	//难度选择
	$("fieldset :input").click(function() {
		$(this).attr("checked",true).siblings().attr("checked",false);
	});
	//初始化游戏区域
	$("#begin").click(function() {
		var $num = $("fieldset :input[checked=checked]").val();
		var $leftMineCount = $num;
		$("#landmine").html("");
		for (var i = 0; i <= $num - 1; i++) {
			if (i == 0) {
				var $html = $("#landmine").html();
				$("#landmine").html($html+"<tr></tr>");
			}else{
				var $html = $("#landmine tbody").html();
				$("#landmine tbody").html($html+"<tr></tr>");
			}
		}
		for (var j = $num - 1; j >= 0; j--) {
			var $html = $("#landmine tr").html();
			$("#landmine tr").html($html+"<td></td>");
		}
		//生成十个不同随机数
		var rand = new Array();
		for (var i = 0; i <= $num - 1; i++) {
			do{
				var sign = false;
				rand[i] = Math.floor(Math.random()*Math.pow($num,2));  //生成随机数
				for (var j = i-1; j >= 0; j--) {              	 
					if (rand[i] == rand[j]) {     //和前面的随机数相同时，跳出do循环，继续while循环
						sign = true;
						break;
					}
				}
			}
			while(sign);				//当随机数都不同时，停止while循环
			$("#landmine").find("td").eq(rand[i]).addClass("landmine");	 //生成地雷
		}
		$("#landMineCount").html($leftMineCount); //显示雷数

		$("#landmine td").each(function() {
			if ($(this).hasClass("landmine")) {
				// $(this).addClass("landMine");
				// var t = setTimeout('confirm("you lose! start again?");$("#begin").trigger("click");',200
				// 	);
				
			}else{
				// $(this).addClass("normal");
				var index = $("#landmine td").index(this);
				$num = parseInt($num);
				var hint = 0;
				if ($("#landmine td").eq(index-1).hasClass("landmine") && index%$num !=0){
					hint=hint+1;
				}
				if ($("#landmine td").eq(index+1).hasClass("landmine") && index%$num != ($num-1)) {
					hint=hint+1;
				}
				if ($("#landmine td").eq(index-$num).hasClass("landmine") && index-$num >= 0){
					hint=hint+1;
				}
				if ($("#landmine td").eq(index+$num).hasClass("landmine")){
					hint=hint+1;
				}
				if ($("#landmine td").eq(index-$num-1).hasClass("landmine") && index-$num-1 >= 0 && (index-$num-1)%$num != ($num-1)){
					hint=hint+1;
				}
				if ($("#landmine td").eq(index+$num-1).hasClass("landmine") && index%$num !=0) {
					hint=hint+1;
				}
				if ($("#landmine td").eq(index-$num+1).hasClass("landmine") && index-$num+1 >= 0 && (index-$num+1)%$num != 0 ){
					hint=hint+1;
				}
				if ($("#landmine td").eq(index+$num+1).hasClass("landmine") && index%$num != ($num-1)) {
					hint=hint+1;
				}
				$(this).val(hint);
			}
		});

		$("#landmine td").click(function() {
			openBlock($(this),$num);
			//判断胜利
			var $length = $("#landmine td").filter(function() {
				return !$(this).hasClass("landmine") && !$(this).hasClass("normal");
			}).length;
			if ($length == 0) {
				alert("you win!");
			}
			//判断失败
			var $length = $("#landmine td").filter(function() {
				return $(this).hasClass("landMine");
			}).length;
			if ($length != 0) {
				alert("you lose!");
				$("#landmine td").each(function() {
					openBlock($(this),$num);
				});
			}
		});

		$("#landmine td").contextmenu(function(e) {  //右击 
			e.preventDefault();
			$(this).addClass("flag").unbind("click"); // 右击标记地雷,禁止点击
			$leftMineCount--;
			$("#landMineCount").html($leftMineCount); //显示雷数
		})
	});

	//打开界面自动开始
	$("#begin").trigger("click");
});
function openBlock(obj,$num) {
	if (obj.hasClass("landmine")) {
		obj.addClass("landMine");
		// var t = setTimeout('alert("you lose!");',200);
	}else{
		obj.addClass("normal");
		if (obj.val() != 0) {
			obj.text(obj.val());
		}
		// if (obj.val() == 0) {
		// 	showNoMine(obj,$num);
		// }
	}
}
//回调函数太多了
// function showNoMine(obj,$num) {
// 	var index = $("#landmine td").index(this);
// 				$num = parseInt($num);
// 	if ( index%$num !=0){
// 		openBlock($("#landmine td").eq(index-1),$num);
// 	}
// 	if ( index%$num != ($num-1)) {
// 		openBlock($("#landmine td").eq(index+1),$num);
// 	}
// 	if ( index-$num >= 0){
// 		openBlock($("#landmine td").eq(index-$num),$num);
// 	}
// 	openBlock($("#landmine td").eq(index+$num),$num);
// 	if ( index-$num-1 >= 0 && (index-$num-1)%$num != ($num-1)){
// 		openBlock($("#landmine td").eq(index-$num-1),$num);
// 	}
// 	if ( index%$num !=0) {
// 		openBlock($("#landmine td").eq(index+$num-1),$num);
// 	}
// 	if ( index-$num+1 >= 0 && (index-$num+1)%$num != 0 ){
// 		openBlock($("#landmine td").eq(index-$num+1),$num);
// 	}
// 	if ( index%$num != ($num-1)) {
// 		openBlock($("#landmine td").eq(index+$num+1),$num);
// 	}
// }