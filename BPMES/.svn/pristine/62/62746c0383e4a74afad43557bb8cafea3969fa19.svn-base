

$(function(){
$(".submitForm").click(function(){
if(checkUserName() && checkUserPwd())
{
	var data = {
			IFS:'D000037',
			UserName: $('#UserName').val(),
			UserPwd: $('#PassWord').val()
	};
	$.ajax({
		type:"POST",
		url:'iPlant_login',
		dataType:"json",
		data:data,
		success:function(data){
			if(data.status == 1){
				alert('登陆成功..');
			}
			else{
				alert('登陆失败..');
			};
	   }
	});
}
});

//check the userName
function checkUserName()
{
	if($("#UserName").val().length == 0)
	{
		$(".nameText").css("color","red").text("用户名不为空");
		alert("用户名不为空");
		return false;
	}
	else 
	{
		var reg = /^[A-Za-z0-9_]{0,9}$/;
		if(!reg.test($('#UserName').val()))
		{
		    $(".nameText").css("color","red").text("格式不正确（由数字/字母组成0-9个字符）");
            alert("用户名不正确");
            return false;
        }
		else
		{
			$(".nameText").css("color","red").text("");
			return true;
	    };
	 };
};
//check the pwd
function checkUserPwd()
{
	if($('#PassWord').val().length == 0){
	   $(".passText").css("color","red").text("密码不为空");
	   alert("密码不为空");
	   return false;
	}
	else{
		  $(".passText").css("color","red").text("");
		  return true;
	}
}
$('.outForm').click(function(){
	$('form:input')[0].reset() ;
	$('#PassWord').val('Password') ;
	location.reload(); 
})
});



















