/*-------------------
*Description:        By www.yiwuku.com
*Website:            https://app.zblogcn.com/?id=1558
*Author:             尔今 erx@qq.com
*update:             2017-11-28(Last:2019-02-01)
-------------------*/

$(function(){
	//控制脚本
	function lrmcdPst(){
		$("#lr_formcon dl").each(function(){
			var $lrmcd = $(this), $pht = $(window).height();
			if($pht < 600){
				$lrmcd.animate({top:'20px',marginTop:0,marginLeft:-$lrmcd.outerWidth()/2},300);
			}else{
				$lrmcd.animate({top:'50%',marginTop:-$lrmcd.outerHeight()/2,marginLeft:-$lrmcd.outerWidth()/2},300);
			}
		});
	}
	$(window).resize(function() {
		lrmcdPst();
	});
	var lrsbar = zbp.cookie.get("lrsbar");
	if(lrsbar == 1){
		$("#lr_mainbox").css({left:"-100%"});
		$(".lr_arrow").show();
	}
	$("#lr_mainbox").delay(lrDelay*1000).animate({bottom:"0"},1200).append('<div class="lr_mbg"></div>');
	$("#lr_mainbox .lr_btn_close").click(function() {
		lrmBar("-100%", 1);
		zbp.cookie.set("lrsbar", 1, lrCookie);
	});
	$(".lr_arrow").click(function() {
		lrmBar(0, 0);
		zbp.cookie.set("lrsbar", 0, lrCookie);
	});
	function lrmBar(n, c){
		$("#lr_mainbox").animate({left:n},600);
		if(c == 1){
			$(".lr_arrow").delay(600).fadeIn(200);
		}else{
			$(".lr_arrow").fadeOut(200);
		}
	}
	//弹出表单
	$("body").on("click", ".xylogin", function() {
		lrShow($(".lr_login"));
	});
	$("a[href='#xylogin'], #navbar-item-lrlogin a").click(function(){
		lrShow($(".lr_login"));
		return false;
	});
	$("body").on("click", ".xyreg", function() {
		lrShow($(".lr_reg"));
	});
	$("a[href='#xyreg']").click(function(){
		lrShow($(".lr_reg"));
		return false;
	});
	function lrShow(c){
		lrmBar("-100%", 1);
		$("#lr_formcon").fadeIn();
		c.siblings().not(".lr_btn_close").addClass("animated flipOutY").fadeOut();
		c.fadeIn().removeClass("flipOutY").addClass("animated flipInY");
		intFocus(c);
		lrmcdPst();
	}
	$("#lr_formcon .lr_btn_close").click(function(){
		lrFormHide();
	});
	function lrFormHide(){
		$("#lr_formcon").fadeOut();
		$("#lr_formcon dl").addClass("animated flipOutY").fadeOut();
		if(lrsbar != 1){
			lrmBar(0, 0);
		}
	}
	//表单切换
	$(".lr_oto").click(function() {
		var o = $(this).parents("dl").siblings();
		$(this).parents("dl").addClass("animated flipOutY").fadeOut();
		o.fadeIn().removeClass("flipOutY").addClass("animated flipInY");
		intFocus(o);
		$("#verfiycode").click();
	});
	function intFocus(c){
		c.find("input:first").focus();
	}
	//登录
	$(".lr_login .lr_post").click(function() {
		lrLogin();
	});
    $("#Remember").click(function(){
        $("#Remember").attr("value",$(this).attr("checked")=="checked"?lrCookie:0);
    });
	function lrLogin(){
		var name = $(".lr_login input[name='UserName']").val(),
		pswd = $(".lr_login input[name='PassWord']").val();
		if(name.length < 2 || pswd.length < 6){
			alert("请正确填写用户名和密码！");
		}else{
			$.post(bloghost+'zb_users/plugin/LoginReg/act.php?act=login',{
				"username":name,
				"password":MD5(pswd),
				"savedate":$(".lr_login input[name='Remember']").val(),
				},function(data){
					var s =data;
					if((s.search("faultCode")>0)&&(s.search("faultString")>0)){
						alert(s.match("<string>.+?</string>")[0].replace("<string>","").replace("</string>",""));
					}else{
						//alert(s);
						if(lrGoto == "1" || lrGoto == ""){
							window.location.reload();
						}else if(lrGoto == "2"){
							location.href = bloghost;
						}else{
							location.href = lrGoto;
						}
						if(lrTools){
							lrmBar("-100%", 1);
							zbp.cookie.set("lrsbar", 1, lrCookie);
						}
					}
				}
			);
		}
	}
	//注册
	$(".lr_reg .lr_post").click(function() {
		lrReg();
	});
	function lrReg(){
		var name = $(".lr_reg input[name='UserName']").val(),
		pswd = $(".lr_reg input[name='PassWord']").val(),
		pswd2 = $(".lr_reg input[name='PassWord2']").val(),
		pname = $(".lr_reg input[name='PersonName']").val(),
		email = $(".lr_reg input[name='Email']").val(),
		icode = $(".lr_reg input[name='Icode']").val(),
		vcode = $(".lr_reg input[name='Vcode']").val();
		if(name.length < 3){
			alert("请填写用户名且至少3个字符！");
			$(".lr_reg input[name='UserName']").focus();
			return false;
		}
		if(pswd.length < 6){
			alert("请填写密码且至少8位！");
			$(".lr_reg input[name='PassWord']").focus();
			return false;
		}
		if(pswd != pswd2){
			alert("两次输入密码不一样！");
			$(".lr_reg input[name='PassWord2']").focus();
			return false;
		}
		if($(".lr_reg input[name='PersonName']").length && pname.length < 1){
			alert("昵称不能为空！");
			$(".lr_reg input[name='PersonName']").focus();
			return false;
		}
		if($(".lr_reg input[name='Email']").length && (email.indexOf("@") < 1 || email.indexOf(".") < 3)){
			alert("请正确填写邮箱！");
			$(".lr_reg input[name='Email']").focus();
			return false;
		}
		if($(".lr_reg input[name='Icode']").length && icode.length != 22){
			alert("请正确填写22位邀请码！");
			$(".lr_reg input[name='Icode']").focus();
			return false;
		}
		if($(".lr_reg input[name='Vcode']").length && vcode.length != 5){
			alert("请正确填写5位验证码！");
			$(".lr_reg input[name='Vcode']").focus();
			return false;
		}
		if($(".lr_reg input[name='agreement']").length && !$(".lr_reg input[name='agreement']").is(':checked')){
			alert("请阅读并同意注册协议！");
			$("#agreement").focus();
			return false;
		}
		$.post(bloghost+'zb_users/plugin/LoginReg/act.php?act=reg',{
			"username":name,
			"password":pswd,
			"repassword":pswd2,
			"personname":pname,
			"email":email,
			"invitecode":icode,
			"verifycode":vcode,
			},function(data){
				var s =data;
				if((s.search("faultCode")>0)&&(s.search("faultString")>0)){
					alert(s.match("<string>.+?</string>")[0].replace("<string>","").replace("</string>",""));
					$("#verfiycode").click();
				}else{
					alert(s);
					$(".lr_reg .lr_int").val("");
					$(".lr_reg").addClass("animated flipOutY").fadeOut();
					$(".lr_login").fadeIn().removeClass("flipOutY").addClass("animated flipInY");
					if($(".lr_reg input[name='Email']").length && lrRmail){
						$.post(bloghost+'zb_users/plugin/LoginReg/regmail.php',{
							"email":email,
							"username":name,
							"password":pswd,
							"action":lrRmail,
							},function(data){
								var s =data;
								if((s.search("faultCode")>0)&&(s.search("faultString")>0)){
									window.console && window.console.log && console.log(s.match("<string>.+?</string>")[0].replace("<string>","").replace("</string>",""));
								}else{
									window.console && window.console.log && console.log(s);
								}
							}
						);
					}
				}
			}
		);
	}
	document.onkeydown = function(e){  
		if(e.keyCode == 13 && $(".lr_login:visible").length){
			lrLogin();
		}
		if(e.keyCode == 13 && $(".lr_reg:visible").length){
			lrReg();
		}
		if(e.altKey && e.keyCode==76 && lrCkey){
			lrShow($(".lr_login"));
		}
		if(e.altKey && e.keyCode==82 && lrCkey){
			lrShow($(".lr_reg"));
		}
		if(e.altKey && e.keyCode==88 && lrCkey){
			lrFormHide();
		}
	}
	//退出
	$(".lr_logout, a[href='#xylogout'], #navbar-item-lrlogout a").click(function() {
		$.post(bloghost+'zb_users/plugin/LoginReg/act.php?act=logout',{
			},function(data){
				var s =data;
				if(s){
					window.location.reload();
				}
			}
		);
		return false;
	});
	//获取邀请码
	$(".geticode").click(function() {
		if(lrGiway != ""){
			$(this).attr({href:lrGiway,target:"_blank"});
			$("input[name='Icode']").attr("placeholder","请留意新打开窗口");
		}else{
			$("input[name='Icode']").val("正在获取……");
			$.post(bloghost+'zb_users/plugin/LoginReg/act.php?act=icode',{
				"action":1,
				},function(data){
					var s =data;
					if(s){
						$("input[name='Icode']").val(s);
					}
				}
			);
		}
	});
});