$(function(){
});

//点击登录
function doLogin()
{
	 var _name=$("#name").val();
	 var _password=$("#password").val();
	 var _data={username:_name,password:_password};
	 SimpleTool.ajax({
			url:"login",
			type:"POST",
			dataType:"json",
			data:_data,
			success:function(result){
				//SimpleTool.removeGlobMaskLayer();//移除遮罩层
				 //正常访问了服务器，并且服务器未抛出异常
				//console.log(data);
				//console.log("登录成功！");
				//console.log(result.data);
				window.top.location.href=result.data;
			},error:function(msg,bAccessServer,bServerException,data)
			{
				//SimpleTool.removeGlobMaskLayer();//移除遮罩层
				 if(bAccessServer==true)
					 {
					    alert("登录失败！");
					 }else
						 {
						    alert("无法连接到服务器！");
						 }
			}
		});
}