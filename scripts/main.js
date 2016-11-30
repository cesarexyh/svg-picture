$(document).ready(function(){
	var faceLastValue=1;
	var eyeLastValue=1;
	var noseLastValue=1;
	var nosePosLastValue=0;
	var mouthPosLastValue=0;
	var mouthLastValue=1;
	var earLastValue=1;
	var eyeBrowRotLastValue=0;
	var eyeBrowPosLastValue=0;
	//控件初始化
	var faceSetting=document.getElementById("faceSet");
	var eyeSetting=document.getElementById('eyeSet');
	var noseSetting=document.getElementById('noseSet');
	var nosePosSetting=document.getElementById('noseSetPosition');
	var mouthSetting=document.getElementById('mouthSet');
	var mouthPosSetting=document.getElementById('mouthPosition');
	var eyeBrowRotSetting=document.getElementById('eyeBrowRotate');
	var eyeBrowPosSetting=document.getElementById('eyeBrowPosition');
	var earSetting=document.getElementById('earSet');
	//放大函数
	function scaleChange(widget, matrixPara, svgName, Cx, Cy, lastValue) {
		matrixPara.scale(widget.value / lastValue, widget.value / lastValue, Cx, Cy);
		svgName.transform(matrixPara);
	}
	//清除边框函数
	function clear(){
			$(".svg-container").each(function(){
				if($(this).hasClass("select")){
					$(this).removeClass("select");
				}
			});
		}
	//画板根据屏幕移动
	(function scroll() {
		var offset=$(".canvas").offset();
		var topPadding=40;
		$(window).scroll(function(event) {
			if($(window).scrollTop()>offset.top){
				$(".canvas").stop().animate({marginTop:$(window).scrollTop()-offset.top+topPadding});
			}else{
				$(".canvas").stop().animate({marginTop:0});
			}
		});
	})();
	//动态侧边栏
	var accordionsMenu = $('.cd-accordion-menu');
	if( accordionsMenu.length > 0 ) {
		
		accordionsMenu.each(function(){
			var accordion = $(this);
			accordion.on('change', 'input[type="checkbox"]', function(){
				var checkbox = $(this);
				console.log(checkbox.prop('checked'));
				( checkbox.prop('checked') ) ? checkbox.siblings('ul').attr('style', 'display:none;').slideDown(300) : checkbox.siblings('ul').attr('style', 'display:block;').slideUp(300);
			});
		});
	}
	function updateHandle(elem) {
		//获取眼睛的值
		var eyeValue=Snap(elem.getElementById("rightEye"));
		var eyeMatrix=eyeValue.transform().globalMatrix;
		eyeSetting.value=eyeMatrix.a*10;
		eyeLastValue=eyeSetting.value;
		//获取鼻子的值
		var noseValue=Snap(current.getElementById("nose"));
		var noseMatrix=noseValue.transform().globalMatrix;
		noseSetting.value=noseMatrix.a;
		noseLastValue=noseSetting.value;
		//获取鼻子位置的值
		var nosePosValue=Snap(current.getElementById("nose"));
		var nosePosMatrix=nosePosValue.transform().globalMatrix;
		nosePosSetting.value=nosePosMatrix.f/10;
		nosePosLastValue=nosePosSetting.value;
		//获取嘴巴的角度
		var mouthValue=current.getElementById("mouth1").getAttribute("d");
		var mouthValueArr=mouthValue.split(" ");
		mouthSetting.value=mouthValueArr[5]/150;
		//获取嘴巴位置
		var mouthPosValue=Snap(current.getElementById("mouth1"));
		var mouthPosMatrix=mouthPosValue.transform().globalMatrix;
		mouthPosSetting.value=mouthPosMatrix.f/10;
		mouthPosLastValue=mouthPosSetting.value;
		//获取眉毛的角度
		var eyeBrowRotValue=Snap(current.getElementById('rightEyeBrow'));
		var eyeBrowRotMatrix=eyeBrowRotValue.transform().globalMatrix;
		eyeBrowRotSetting.value=Math.acos(eyeBrowRotMatrix.a)*(180/Math.PI);
		eyeBrowRotLastValue=eyeBrowRotSetting.value;
		//获取眉毛位置
		var l_eyeBrowPosValue=Snap(current.getElementById('eyeBrowLeft'));
		var l_eyeBrowPosMatrix=l_eyeBrowPosValue.transform().globalMatrix;
		eyeBrowPosSetting.value=l_eyeBrowPosMatrix.e/10;
		eyeBrowPosLastValue=eyeBrowPosSetting.value;
		//获取脸部宽度
		var faceValue=current.getElementById("outline").getAttribute("d");
		var faceValueArr=faceValue.split(' ');
		faceSetting.value=faceValueArr[6]/430;
		faceLastValue=faceSetting.value;
	}
	//读取svg文件
	$.ajax({
			url: 'svg/boy_new.svg',
			dataType: 'xml',
			success:function(content){
				//初始化控件大小
				var doc=content.documentElement;
				
				// var divList=document.getElementsByClassName("svg-container");
				
				// 初始化脸部大小
				var snapFace=Snap(doc.getElementById("face"));
				var face = snapFace.transform().globalMatrix;
				var faceCx = 325.45611;
				var faceCy = 299.81381;
				// 初始化眼睛大小
				var snapRightEye=Snap(doc.getElementById("rightEye"));
				var snapLeftEye=Snap(doc.getElementById("leftEye"));
				var r=snapRightEye.transform().globalMatrix;
				var l=snapLeftEye.transform().globalMatrix;
				var leftEyeCx=60.16115;
				var leftEyeCy=299.31009;
				var rightEyeCx=-100.81381;
				var rightEyeCy=299.31009;
				//初始化鼻子大小
				var snapNose=Snap(doc.getElementById("nose"));
				var noseMatrix=snapNose.transform().globalMatrix;
				var noseCx=95.45611;
				var noseCy=98.81381;
				//初始化嘴巴表情
				var svgMouth=doc.getElementById("mouth1");
				//初始化嘴巴大小
				/*var snapMouthWidth=Snap(doc.getElementById('mouth'));
				var mouthMatrix=snapMouthWidth.transform().globalMatrix;
				var mouthCx=225.45611;
				var mouthCy=105.81381;*/
				//初始化眉毛角度
				var snaplEyeBrow=Snap(doc.getElementById('eyeBrowLeft'));
				var snaprEyeBrow=Snap(doc.getElementById('eyeBrowRight'));
				var snaplMatrix=snaplEyeBrow.transform().globalMatrix;
				var snaprMatrix=snaprEyeBrow.transform().globalMatrix;
				//初始化耳朵大小
				var snapRightEar=Snap(doc.getElementById("rightear"));
				var snapLeftEar=Snap(doc.getElementById("leftear"));
				var rEar=snapRightEar.transform().globalMatrix;
				var lEar=snapLeftEar.transform().globalMatrix;
				var earCx=100;
				var earCy=100;


				$(".svg-container").each(function() {					
					//随机脸部大小
					/*faceSetting.value=(Math.random()*(1.1-0.9)+0.9);
					faceLastValue=faceSetting.value;*/
					//随机眼睛大小					
					eyeSetting.value=(Math.random()*2/**(1.25-0.75)+0.75*/);
					scaleChange(eyeSetting,r,snapRightEye,rightEyeCx,rightEyeCy,eyeLastValue);
					scaleChange(eyeSetting,l,snapLeftEye,leftEyeCx,leftEyeCy,eyeLastValue);
					eyeLastValue=eyeSetting.value;
					//随机鼻子大小
					noseSetting.value=(Math.random()*1.05+0.25);
					scaleChange(noseSetting,noseMatrix,snapNose,noseCx,noseCy,noseLastValue);
					noseLastValue=noseSetting.value;
					//随机嘴巴表情
					mouthSetting.value=(Math.random()*(1.10-0.38)+0.38);
					svgMouth.setAttribute("d","M 40 115 Q 60 "+mouthSetting.value*150+" 75 115");
					//随机嘴巴大小
					/*mouthWidthSetting.value=(Math.random()*(1.25-0.75)+0.75);
					scaleChange(mouthWidthSetting,mouthMatrix,snapMouthWidth,rightEyeCx,rightEyeCy,mouthLastValue);
					mouthLastValue=mouthWidthSetting.value;
					*/
					//随机眉毛角度
					eyeBrowRotSetting.value=(Math.random()*180-90);
					eyeBrowpiValue=360-eyeBrowRotSetting.value;
					snaprMatrix.rotate(eyeBrowRotSetting.value,380,260);
					snaplMatrix.rotate(eyeBrowpiValue,275,260);
					snaprEyeBrow.transform(snaprMatrix);
					snaplEyeBrow.transform(snaplMatrix);
					//随机耳朵大小
					/*earSetting.value=2;
					scaleChange(earSetting,rEar,snapRightEar,-220.81381,-150.31009,earLastValue);*/


					$(this).append($(doc).clone());


					$(this).on("click",function (argument) {
						// body...
						clear();//执行前先检查所有类名为append的div,如果有select选择器,则删除
						$(this).addClass("select");
						current=$(this).children()[0];
						updateHandle(current);
					});

				});
					
				}
		});

	$(".cd-accordion-menu a").click(function() {
		var ID = $(this).attr("id"); //获取选中的id值
		var boardStr = ID.slice(0, ID.indexOf('-')); //查看选中的是哪一个组件也是对应存放的文件夹名字
		var svgUrl = "svg/" + boardStr + "/" + ID + ".svg";

		$.ajax({
			url: svgUrl,
			dataType: 'xml',
			success:function(svgcomponent){
				var con=svgcomponent.documentElement;
					//如果SVG存在，用当前的替换				
				var c=current.getElementById("boardStr");
				var replaceDom=con.getElementById(boardStr);
				
				$(current.getElementById(boardStr)).replaceWith(replaceDom);
				updateHandle(current);	
				}
			});

	});
	$('#request').on('click', function(event) {
		$.ajax({
			url: 'http://192.168.3.110:3000/',
			type:'GET',	
			dataType: 'html',
			success:function (content) {
				console.log(content);
			}
		});
		
	});

	//脸部微调整
	$('#faceSet').on('input change', function(event) {
	/*	if ($("#face").length > 0) {
			//脸部轮廓初始化
			faceLastValue = $("#faceSet").attr("value");
			var svgFace = Snap(document.getElementById("face"));
			var face = svgFace.transform().globalMatrix;
			var faceCx = 325.45611;
			var faceCy = 299.81381;
			scaleChange(this, face, svgFace, faceCx, faceCy, faceLastValue);
			
		}else{
			return;
		}*/
		var snapFace=current.getElementById("outline");
		var snapFaceStr=snapFace.getAttribute('d');
		var snapFaceArr=snapFaceStr.split(' ');
		snapFaceArr[6]=Number(snapFaceArr[6])+(this.value-faceLastValue)*12;
		snapFaceArr[7]=Number(snapFaceArr[7])+(this.value-faceLastValue)*12;
		snapFaceArr[8]=Number(snapFaceArr[8])+(this.value-faceLastValue)*12;
		snapFaceArr[9]=Number(snapFaceArr[9])+(this.value-faceLastValue)*12;
		snapFaceArr[11]=Number(snapFaceArr[11])+(this.value-faceLastValue)*12;
		snapFaceArr[12]=Number(snapFaceArr[12])+(this.value-faceLastValue)*12;
		snapFaceArr[20]=Number(snapFaceArr[20])-(this.value-faceLastValue)*12;
		snapFaceArr[21]=Number(snapFaceArr[21])+(this.value-faceLastValue)*12;
		snapFaceArr[22]=Number(snapFaceArr[22])-(this.value-faceLastValue)*12;
		snapFaceArr[23]=Number(snapFaceArr[23])+(this.value-faceLastValue)*12;
		snapFaceArr[25]=Number(snapFaceArr[25])-(this.value-faceLastValue)*12;
		snapFaceArr[26]=Number(snapFaceArr[26])+(this.value-faceLastValue)*12;

		
		snapFace.setAttribute("d","M 439.75942 278.73696 C 439.75942 318.42175 "+snapFaceArr[6]+" "+snapFaceArr[7]+" "+snapFaceArr[8]+" "+snapFaceArr[9]+" C "+snapFaceArr[11]+" "+snapFaceArr[12]+" 381.84340 437.98332 330.53813 437.98332 C 290.72984 437.98332 "+snapFaceArr[20]+" "+snapFaceArr[21]+" "+snapFaceArr[22]+" "+snapFaceArr[23]+" C "+snapFaceArr[25]+" "+snapFaceArr[26]+" 228.50245 319.96783 228.50245 280.28303 C 228.50245 200.91340 272.47839 161.23478 331.97525 161.23478 C 391.47211 161.23478 439.75942 199.36731 439.75942 278.73696 z");
		faceLastValue=this.value;
	});

	//眼睛微调整
	
	$('#eyeSet').on('input change', function(event) {
		if ($("#eye").length > 0) {
			//眼睛轮廓初始化

			var svgRightEye = Snap(current.getElementById("rightEye"));
			var svgLeftEye = Snap(current.getElementById("leftEye"));
			var r = svgRightEye.transform().globalMatrix;
			var l = svgLeftEye.transform().globalMatrix;
			var leftEyeCx = 60.16115;
			var leftEyeCy = 299.31009;
			var rightEyeCx = -100.81381;
			var rightEyeCy = 299.31009;
			scaleChange(this, r, svgRightEye, rightEyeCx, rightEyeCy, eyeLastValue);
			scaleChange(this, l, svgLeftEye, leftEyeCx, leftEyeCy, eyeLastValue);
			eyeLastValue = this.value;
		}else{
			return;
		}
	});

	$('#noseSet').on('input change',function (event) {
		if ($('#nose').length>0) {
		var svgNose=Snap(current.getElementById("nose"));
		var nose=svgNose.transform().globalMatrix;
		var noseCx=95.45611;
		var noseCy=98.81381;
		scaleChange(this,nose,svgNose,noseCx,noseCy,noseLastValue);
		noseLastValue=noseSetting.value;
	}else{
		return;
	}
	
	});

	$('#noseSetPosition').on('input change',function (event) {
		// body...
		var snapNosePos=Snap(current.getElementById("nose"));
		var nosePos=snapNosePos.transform().globalMatrix;
		nosePos.translate(0,nosePosSetting.value-nosePosLastValue);
		snapNosePos.transform(nosePos);
		nosePosLastValue=nosePosSetting.value;
	});

	$('#mouthSet').on('input change',function (event) {
		var snapMouth=current.getElementById("mouth1");
		snapMouth.setAttribute("d","M 40 115 Q 60 "+this.value*150+" 75 115");
	});

	$('#mouthPosition').on('input change',function (event) {
		// body...
		var snapMouthPos=Snap(current.getElementById("mouth1"));
		var mouthPos=snapMouthPos.transform().globalMatrix;
		mouthPos.translate(0,mouthPosSetting.value-mouthPosLastValue);

		snapMouthPos.transform(mouthPos);
		mouthPosLastValue=mouthPosSetting.value;
	});
	$("#eyeBrowRotate").on('input change',function (event) {
		var snapEyeBrowLeft=Snap(current.getElementById("eyeBrowLeft"));
		var snapEyeBrowRight=Snap(current.getElementById('eyeBrowRight'));
		var snapEyeBrowLMatrix=snapEyeBrowLeft.transform().globalMatrix;
		var snapEyeBrowRMatrix=snapEyeBrowRight.transform().globalMatrix;
		
		var snapEyeBrowpilValue=360-eyeBrowRotSetting.value;//记录左边眉毛旋转角度
		snapEyeBrowLMatrix.rotate(eyeBrowRotSetting.value-eyeBrowRotLastValue,275,258);
		snapEyeBrowRMatrix.rotate(snapEyeBrowpilValue-(360-eyeBrowRotLastValue),377,260);
		snapEyeBrowLeft.transform(snapEyeBrowLMatrix);
		snapEyeBrowRight.transform(snapEyeBrowRMatrix);
		eyeBrowRotLastValue=eyeBrowRotSetting.value;
	});

	$('#eyeBrowPosition').on('input change',function (event) {
		var snapEyeBrow_l_pos=Snap(current.getElementById("eyeBrowLeft"));
		var snapEyeBrow_r_pos=Snap(current.getElementById("eyeBrowRight"));
		var snapEyeBrow_l_matrix=snapEyeBrow_l_pos.transform().globalMatrix;
		var snapEyeBrow_r_matrix=snapEyeBrow_r_pos.transform().globalMatrix;
		snapEyeBrow_l_matrix.translate(eyeBrowPosSetting.value-eyeBrowPosLastValue,0);
		snapEyeBrow_l_pos.transform(snapEyeBrow_l_matrix);
		snapEyeBrow_r_matrix.translate(-(eyeBrowPosSetting.value-eyeBrowPosLastValue),0);
		snapEyeBrow_r_pos.transform(snapEyeBrow_r_matrix);
		eyeBrowPosLastValue=eyeBrowPosSetting.value;
	});
	$('#hairColor').on('input change',function (event) {
		var hair_color=current.getElementById('hairInner');
		hair_color.style.fill=this.value;
	});
});