<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>登录</title>
<script type="text/javascript" src="staticres/lib/jquery-1.11.3.js"></script>
<script type="text/javascript" src="staticres/lib/simpletool/SimpleTool.js"></script>
<script type="text/javascript" src="staticres/js/login/login.js"></script>
</head>
<body>
    请您登录：
     	<br/>
     账号：<input type="text" id="name" />
    	 <br/>
     密码：<input type="password" id="password" />
     <br/>
    <button onclick="doLogin();">登录</button>
</body>
</html>