$(function() {
	$(".list a").click(function() {
		var $thisPost = $(this).parent().next();
		var index = $(this).parent().find("a").index(this);
		$thisPost.find("ul").hide().eq(index).show();
		if ($thisPost.is(":hidden")) {
			$(this).parents("ul").find(".post").hide();
			$thisPost.slideDown("slow");
		}
	});
	$(".list a:first").click();
});