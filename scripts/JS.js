$(document).ready(function() {
	 
    
	$("#face-guazi").click(function() {
		var ID = $(this).attr("id"); //获取选中的id值
		var boardStr = ID.slice(0, ID.indexOf('-')); //查看选中的是哪一个组件也是对应存放的文件夹名字
		var boardUrl = boardStr + ' iframe'; //在界面显示部位
		var svgUrl = "svg/" + boardStr + "/" + ID + ".svg";


		$.ajax({
			url: svgUrl,
			dataType: 'xml',
			success:function(content){
				var doc=content.documentElement;
				if ($(".svg-container").has("svg").length==0) {
					//没有SVG，添加
					if(doc.getElementById('face')){$(".svg-container").append(doc);}
					else{alert("请先画个脸，谢谢");}
				} else if($('#'+boardStr).length>0){
					//如果SVG存在，用当前的替换
					var replaceDom=doc.getElementById(boardStr);
					$('#'+boardStr).replaceWith(replaceDom);
				}else{
					//SVG不存在，则添加
				 if (doc.getElementById('whileFace')&&$("#whileFace").length>0) {
						//如果添加的g是属于whileFace且whileFace已经存在
						$("#whileFace").append(doc.getElementsByTagName('g')[1]);
				} else {
					if (doc.getElementById('whileFace')) {
						$("svg").append(doc.getElementById('whileFace'));
					} else {
						$("svg").append(doc.getElementById(boardStr));
						}
					}
				}
			}
		});
	});
});