/**
 * @描述：封装的工具类
 */

(function(window, undefined)
{
	var SimpleTool =
	{};
	var dateHadExtend=false;//是否已经扩展Date类
	
	
	
	/**
	 * @作者 陈杰
	 * @描述 判断单个变量是否为空
	 */
	SimpleTool.isNull = function(v)
	{
		if (v == undefined)
		{
			return true;
		}
		if (typeof(v) == "string")
		{
			if (v == "undefined" || v == "" || v == "null"||$.trim(v)=="")
			{
				return true;
			}
		}
		if (typeof(v) == "object")
		{
			if (v == null||v.length<=0)
			{
				return true;
			}
		}
		return false;

	}

	/**
	 * @作者 陈杰
	 * @描述 判断所传入参数中是否有空，参数个数是不受到限制的
	 * @调用示例 SimpleTool.hasNull(a,b,c,d);
	 */
	SimpleTool.hasNull = function()
	{
		for (var i = 0; i < arguments.length; i++)
		{
			if (SimpleTool.isNull(arguments[i]))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * @作者 陈杰(转)
	 * @描述 将页面嵌入
	 * @调用示例 new SimpleTool.EmbTool("czrz/showlist?czrz.glid=dfds&type=tl", "",
	 *       "", "embidContainer", "1","");
	 */
	SimpleTool.EmbTool = function(B, A)
	{
		this.bindFunction = function(E, D)
		{
			return function()
			{
				return E.apply(D,
						[D])
			}
		};
		this.stateChange = function(D)
		{
			if (this.request.readyState == 4)
			{
				if (this.appendHtml)
				{
					if (this.request.status == 200)
					{
						document.getElementById(this.srcElement).innerHTML = this.request.responseText
					} else
					{
						document.getElementById(this.srcElement).innerHTML = this.failTxt
					};
				} else
				{
					this.callbackFunction(this.request,
							this.request.responseText, this.srcElement)
				}
			}
		};
		this.getRequest = function()
		{
			if (window.ActiveXObject)
			{
				return new ActiveXObject("Microsoft.XMLHTTP")
			} else
			{
				if (window.XMLHttpRequest)
				{
					return new XMLHttpRequest()
				}
			}
			return false
		};
		this.callbackFunction = A;
		this.url = B;
		this.postBody = (arguments[2] || "");
		this.srcElement = arguments[3];
		this.appendHtml = arguments[4];
		this.failTxt = "<font color='#FF0000'><I>错误</I></font>";
		if (arguments[5])
		{
			this.failTxt = arguments[5];
		}
		this.request = this.getRequest();
		if (this.request)
		{
			var C = this.request;
			C.onreadystatechange = this.bindFunction(this.stateChange, this);
			if (this.postBody !== "")
			{
				C.open("POST", B, true);
				C.setRequestHeader("X-Requested-With", "XMLHttpRequest");
				C.setRequestHeader("Content-type",
						"application/x-www-form-urlencoded");
				C.setRequestHeader("If-Modified-Since", "0");
				C.setRequestHeader("Connection", "close")
			} else
			{
				C.open("GET", B, true)
				C.setRequestHeader("If-Modified-Since", "0");
			}
			C.send(this.postBody)
		}
	};

	SimpleTool.openCzrzDiv = function(id)
	{
		$("#embidContainer" + id).hide();
		$("#embidload" + id).hide();
		$("#embidcontext" + id).show();
	}

	SimpleTool.loadCzrzDiv = function(url, id)
	{
		new SimpleTool.EmbTool(url, "", "", "embidContainer" + id, "1", "");
		$("#embidContainer" + id).show();
		$("#embidload" + id).show();
		$("#embidcontext" + id).hide();
	}

	SimpleTool.startLoad = function()
	{
		var array = $("img[id^='embidcontext']").click();
	}

	SimpleTool.fetchWebRootURL = function()
	{
		// js获取项目根路径，如： http://localhost:8083/uimcardprj

		// 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
		var curWwwPath = window.document.location.href;
		// 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		// 获取主机地址，如： http://localhost:8083
		var localhostPaht = curWwwPath.substring(0, pos);
		// 获取带"/"的项目名，如：/uimcardprj
		var projectName = pathName.substring(0, pathName.substr(1).indexOf('/')
						+ 1);
		return (localhostPaht + projectName);

	}

	SimpleTool.refreshPage = function(window,param)
	{
		if (window == undefined)
		{
			alert("未传入windw对象！");
			return;
		}
		if(!SimpleTool.isNull(param))
		{
			if(param.indexOf("&")!=0)
			{
				param="&"+param;
			}
		}
		// 不是关窗口的操作，而是重新加载页面
		$("#save_btn").removeAttr("disabled");
		// 强制刷新本页面
		var tmp = window.location.href;
		var ind=tmp.indexOf("?");
		if (index < 0)
		{
		   window.location.href=window.location.href+"1=1";
		}
		var index = tmp.indexOf("rd_rd");
		if (index > 0)
		{
			var a = tmp.substr(0, index - 1);
			window.location.href = tmp + "&rd_rd=" + Math.random()+param;

		} else
		{
			window.location.href = tmp + "&rd_rd=" + Math.random()+param;
		}
	}

	// alert 封装
	SimpleTool.alert = function(param)
	{
		var paramDefault={
			title:"提示", msg:"", icon:"info", callback:function(){}
		};
		var finalParam={};
		$.extend(true,finalParam,paramDefault);
		$.extend(true,finalParam,param);
		if ($ != undefined && $.messager != undefined)
		{
		  //使用easyui的alert
			 $.messager.alert(finalParam.title, finalParam.msg, finalParam.icon, function () {
					if (typeof finalParam.callback == "function")
					{
						finalParam.callback();
					}
		        });
		}else
		{
			// 使用普通alert
			alert(finalParam.msg);
			if (typeof finalParam.callback == "function")
			{
				finalParam.callback();
			}
		}

	}

	// confirm封装
	SimpleTool.confirm = function(btnTitle, msg, okCallback, cacelCallback)
	{
		if ($ != undefined && $.messager != undefined)
		{
			// 使用easyui
			// "info"
			$.messager.confirm(btnTitle, msg, function(b)
					{
						if (b == false)
						{
							// 否
							if (cacelCallback != undefined)
							{
								if (typeof(cacelCallback) == "function")
								{
									// 需要回调
									cacelCallback();
								} else
								{
									SimpleTool.alert("传入的回调函数参数错误！cacelCallback");
								}

							}
							return;
						} else
						{
							// 是
							if (okCallback != undefined)
							{
								if (typeof(okCallback) == "function")
								{
									// 需要回调
									okCallback();
								} else
								{
									SimpleTool.alert("传入的回调函数参数错误！okCallback");
								}

							}
							return;
						}
					});
			return;
		} else
		{
			// 使用普通confirm
			var b = confirm(msg);
			if (b == false)
			{
				// 否
				if (cacelCallback != undefined)
				{

					if (typeof(cacelCallback) == "function")
					{
						// 需要回调
						cacelCallback();
					} else
					{
						SimpleTool.alert("传入的回调函数参数错误！cacelCallback");
					}

				}
			} else
			{
				// 是
				if (okCallback != undefined)
				{
					if (typeof(okCallback) == "function")
					{
						// 需要回调
						okCallback();
					} else
					{
						SimpleTool.alert("传入的回调函数参数错误！okCallback");
					}

				}
			}
			if (typeof callback == "function")
			{
				callback();
			}
		}
	}
	SimpleTool.savewindow = function()
	{
		var tpstr = "window" + Math.random();
		tpstr = tpstr.replace(/\./g, "");
		var exestr = "window.top." + tpstr + "=window";
		eval(exestr);
		return tpstr;
	}

	SimpleTool.createMaskLayer=function(obj) {
		if(obj==undefined)
		{
			obj={};
		}
		var webRoot=SimpleTool.fetchWebRootURL();
		var imgsrc=webRoot+"/static/app/performance/images/loading.gif";
		 var defaultConfig={title:"正在处理中，请稍候……",_window:window,dest:$("body")};
		  var finallConfig={};
		  $.extend(finallConfig,defaultConfig);
	      $.extend(finallConfig,obj);
		// var $maskLayer = $('<div style="vertical-align:middle;color:black;" class="top-maskLayer">'+finallConfig.title+'</div>');
	      var $maskLayer = $('<div style="vertical-align:middle;color:black;" class="top-maskLayer">'+'<img src="'+imgsrc+'" style="width:32px; height:32px;" />'+'</div>');
		 var lineHeight_=$(finallConfig.dest).height()+"px";
		 var top_=$(finallConfig.dest).offset().top;
		 top_=top_-document.body.scrollTop;
		 var left_=$(finallConfig.dest).offset().left;
		 left_=left_-document.body.scrollLeft;
		 $maskLayer.css({
			background: "#e8e8e8",
			opacity: "0.5",
			position: "fixed",
			left: left_,
			top: top_,
			width:   $(finallConfig.dest).width(),
			height:  $(finallConfig.dest).height(),
			fontSize: "15px",
			zIndex: 9999999,
			lineHeight: lineHeight_,
			textAlign: "center"
		});
		$maskLayer.appendTo($(finallConfig.dest));
	}
	
	SimpleTool.removeMaskLayer=function(obj) {
		if(obj==undefined)
		{
			obj={};
		}
		 var defaultConfig={_window:window};
		    $.extend(obj,defaultConfig);
		obj._window.$(".top-maskLayer").remove();
	}
	
	// 根据传入参数，获取jQuery对象
	SimpleTool.jQueryObject = function(obj)
	{
		if (SimpleTool.isNull(obj))
		{
			return null;
		}
		if (typeof(obj) == "string")
		{
			return $("#" + obj);
		} else
		{
			return $(obj);
		}
	}
	// 生成一个字符串作为ID
	SimpleTool.createRdID = function()
	{
		var tmp = "" + Math.random();
		tmp = tmp.replace(".", "");
		var date = new Date();
		tmp = tmp + date.getTime();
		return tmp;
	}
	
	/**
	 * 扩展时间类
	 */
	SimpleTool.extendDate = function() {
		Date.prototype.Format = function(fmt) {
			var o = {
				"M+" : this.getMonth() + 1, // 月份
				"d+" : this.getDate(), // 日
				"h+" : this.getHours(), // 小时
				"m+" : this.getMinutes(), // 分
				"s+" : this.getSeconds(), // 秒
				"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
				"S" : this.getMilliseconds()
				// 毫秒
			};
			if (/(y+)/.test(fmt))
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4
								- RegExp.$1.length));
			for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt))
					fmt = fmt.replace(RegExp.$1,
							(RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
									.substr(("" + o[k]).length)));
			return fmt;
		}
		
		dateHadExtend=true;
	}
	
	SimpleTool.formatDate = function(date,format) {
		 SimpleTool.extendDate();
		 if(SimpleTool.isNull(date))
		 {
		 	return "";
		 }
		 if(SimpleTool.isNull(format))
		 {
		 	return "";
		 }
		 if(date instanceof Date)
		 {
		 	return date.Format(format);
		 }
	}
	
	// 判断两个时间是否属于同一个月份
	 SimpleTool.dateInSameMonth=function(date1,date2)
	 {
	    	try
	    	{
	    		if(dateHadExtend==false)
	    		{
	    			SimpleTool.extendDate();
	    		}
	    		var format = "yyyy-MM";
	    		var str1=date1.Format(format);
	    		var str2=date2.Format(format);
	    		if(str1==str2)
	    		{
	    			return true;
	    		}else
	    		{
	    			return false;
	    		}
	    	}catch(e)
	    	{
	    		throw new Error("判断两个时间是否处于同一个月份出现异常！");
	    	}
	 }
	 SimpleTool.parseDate=function(str)
	 {
	 	    if(SimpleTool.isNull(str))
	 	    {
	 	       //如果为空
	 	       return null;
	 	    }
	 	    if(typeof(str)=="number")
			{
			   var date=new Date(str);
			   return date;
			}
			
	 	    str=$.trim(str);
	 	    var  partten = "", reg = null;
	 	    var strlong = "^[0-9]*$";
            var ny2 = "^\\d{4}-([0][1-9]|[1][0-2])$";
            var nyr2 = "^\\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1])$";
            var nyrsfm2 = "^\\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1]) ([0-1][0-9]|2?[0-3]):([0-5][0-9]):([0-5][0-9])$";
             var nyrsf2 = "^\\d{4}-([0][1-9]|[1][0-2])-([0][1-9]|[1-2][0-9]|[3][0-1]) ([0-1][0-9]|2?[0-3]):([0-5][0-9])$";
            var sfm2 = "^\\d([0-1][0-9]|2?[0-3]):([0-5][0-9]):([0-5][0-9])$";
            var sf2 = "^([0-1][0-9]|2?[0-3]):([0-5][0-9])$";
            var fm2 = "^([0-5][0-9]):([0-5][0-9])$";
            try
            {
            	   if (new RegExp(strlong).test(str))
                    {
                        //longtime
                    	var date = new Date(Number(str)); 
                    	return date;
                    }else if (new RegExp(ny2).test(str))
                    {
                        //年月的格式
                    	var oDate1= str.split("-"); 
                    	var date = new Date(oDate1[0], oDate1[1]-1); 
                    	return date;
                    }else if(new RegExp(nyr2).test(str))
					{
					   		var oDate1= str.split("-"); 
                    	    var date = new Date(oDate1[0], oDate1[1]-1,oDate1[2]); 
                    	    return date;
					}else if(new RegExp(nyrsfm2).test(str))
					{
							var a1=str.split(" "); 
					   		var oDate1= a1[0].split("-"); 
							var oDate2= a1[1].split(":"); 
                    	    var date = new Date(oDate1[0], oDate1[1]-1,oDate1[2],oDate2[0],oDate2[1],oDate2[2]); 
                    	    return date;
					}else if(new RegExp(nyrsf2).test(str))
					{
							var a1=str.split(" "); 
					   		var oDate1= a1[0].split("-"); 
							var oDate2= a1[1].split(":"); 
                    	    var date = new Date(oDate1[0], oDate1[1]-1,oDate1[2],oDate2[0],oDate2[1]); 
                    	    return date;
					}else if(new RegExp(sfm2).test(str))
					{
						 	var oDate2= str.split(":"); 
                    	    var date = new Date(); 
							date.setHours(oDate2[0],oDate2[1],oDate2[2]);
                    	    return date;
					}else if(new RegExp(sf2).test(str))
					{
						 	var oDate2= str.split(":"); 
                    	    var date = new Date(); 
							date.setHours(oDate2[0],oDate2[1],0);
                    	    return date;
					}else if(new RegExp(fm2).test(str))
					{
						 	var oDate2= str.split(":"); 
                    	    var date = new Date(); 
							date.setHours(0,oDate2[0],oDate2[1]);
                    	    return date;
					}else
					{
					   alert("SimpleTool解析时间出错，时间值非法！");
					}
            }catch(e)
            {
            	alert("SimpleTool解析时间出异常！");
            	return null;
            }
             
	 }
	 
	//将数组去重
    SimpleTool.uniqueArray = function(arr)
	{
		if (SimpleTool.isNull(arr))
		{
			return [];
		}
		var result = [], hash =
		{};
		for (var i = 0, elem; (elem = arr[i]) != null; i++)
		{
			if (!hash[elem])
			{
				result.push(elem);
				hash[elem] = true;
			}
		}
		return result;
	}

	 //移除数组中的某个元素
	SimpleTool.removeArray=function(array,val)
	{
		   var bNeedCurl=false;
	 	    do{
	 	    	  var index = array.indexOf(val);
	              if (index > -1) {
	                array.splice(index, 1);
	                bNeedCurl=true;
	              }else
	              {
	              	bNeedCurl=false;
	              }
	 	    }while(bNeedCurl);
	}
	 
	function patternReg(pattern,val)
	{
		try
		{
			return pattern.test(val);
		}catch(e)
		{
			return false;
		}
	}
	
	//判断是否是电话号码
	SimpleTool.isPhone=function(val)
	{
		 if(SimpleTool.isNull(val))val="";
			      var pattern = /^0\d{2,3}-?\d{7,8}$/;
    		      if (!pattern.test(val))
    		      {
    		      	return false
    		      }
		   return true;
	}
	

	
	//判断是否是电话号码
	SimpleTool.isPhone=function(val)
	{
		 if(SimpleTool.isNull(val))val="";
		 var pattern = /^1\d{10}$/;
    	 return patternReg(pattern,val);
	}
	
	//判断是否是手机号
	SimpleTool.isMobile=function(val)
	{
		 if(SimpleTool.isNull(val))val="";
		  var pattern = /^1\d{10}$/;
    	  return patternReg(pattern,val);
	}
	
	//判断是否是邮箱
	SimpleTool.isEmail=function(val)
	{
		   if(SimpleTool.isNull(val))val="";
		   var pattern = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;  
    	  return patternReg(pattern,val);
	}
	
	//判断是否是正数（可以是整数也可以是小数）
	SimpleTool.isPositiveNum =function(val)
	{
		    if(SimpleTool.isNull(val))val="";
		    var pattern = /^\d+(\.\d+)?$/;
    	    return patternReg(pattern,val);
	}
	
	//判断是否是正正数
	SimpleTool.isPositiveInt =function(val)
	{
		    if(SimpleTool.isNull(val))val="";
		    var pattern = /^\d+$/;
    	    return patternReg(pattern,val);
	}
	
	//判断是否是合法的IP（可以是整数也可以是小数）
	SimpleTool.isIp =function(val)
	{
		    if(SimpleTool.isNull(val))val="";
		    var pattern = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    	    return patternReg(pattern,val);
	}
	
	var glob_mask_loadid=null;
	var glob_mask_count=0;

	//加一个全局的遮罩层，目前只支持使用master-layer
	SimpleTool.createGlobMaskLayer=function()
	{
		if(SimpleTool.isNull(window.top.layer))
		{
			alert("该遮罩只限于支持master-layer！");
			return ;
		}
		if(glob_mask_loadid==null||glob_mask_count<=0)
		{
			glob_mask_loadid=window.top.layer.load(0, 2); //打开加载层，关闭时使用layer.close(loadid)
			glob_mask_count=1;
		}else
		{
			glob_mask_count++;
		}
	}
	
	//移除全局的遮罩层
	SimpleTool.removeGlobMaskLayer=function()
	{
		if(SimpleTool.isNull(window.top.layer))
		{
			alert("该遮罩只限于支持master-layer！");
			return ;
		}
		
		//加载成功之后需要移除
		if(glob_mask_count>0)
		{
			glob_mask_count--;
		}else
		{
			glob_mask_count=0;
		}
		if(glob_mask_count==0)
		{
			//执行移除
			window.top.layer.close(glob_mask_loadid);//关闭遮罩
		}
	}
	
	//判断是否有ajax异常
	SimpleTool.hasAjaxException = function(response,$obj)
	{
		try
		{
			var json={};
			if(typeof(response)=="object")
			{
				 json=response;
			}
			else
			 {
			 	json = $.parseJSON(response);
			 }
			if (json != undefined && json.success == false&&json.exception==true)
			{
				var tip = "出现异常！";
				if (!SimpleTool.isNull(json.msg))
				{
					tip = json.msg;
				}
				window.top.layer.alert(tip, -1);
				if($($obj))
				{
					$($obj).empty();
				}
				return true;
			}
			return false;
		} catch (e)
		{
			return false;
		}
	}
	
	//对jquery的ajax做封装
	/*
	 示例：
	 
	 SimpleTool.ajax({
				url:"/docmanagement/pc/filemng/test",
				type:"POST",
				dataType:"json",
				success:function(data){
					SimpleTool.removeGlobMaskLayer();//移除遮罩层
					 //正常访问了服务器，并且服务器未抛出异常
					alert("执行正常！");
					console.log(data);
				},error:function(msg,bAccessServer,bServerException,data)
				{
					SimpleTool.removeGlobMaskLayer();//移除遮罩层
					
					var msg="";
					if(bAccessServer==true)
					{
						 msg="访问到了服务器，但是想要执行的操作执行失败!";
						 if(bServerException==true)
						 {
						 	msg+="服务器抛出了异常！";
						 }else
						 {
						 	msg+="服务器未出现异常！";
						 }
					}else
					{
						msg="未访问到了服务器!";
					}
					console.log(msg);
					console.log(data);
				}
			});
			
	 * */
	SimpleTool.ajax=function(_config_)
	{
		if(SimpleTool.isNull(_config_)||typeof(_config_)!="object")
		{
			return ;
		}
		var finalConfig_={};
		     $.extend(finalConfig_,_config_);
		 	 finalConfig_.success=function(data)
		 	 {
		 	 	 if(SimpleTool.hasAjaxException(data))
							{
								//如果出现了ajax异常
								if(typeof(_config_.error)=="function")
								{
									if(typeof(data)=="string")
									{
										data=$.parseJSON(data);
									}
									_config_.error(true,true,data);
								}
								return ;
							}
		 	 	    if(finalConfig_.dataType=="json")
		 	 	    	{
			 	 	    	if(data.success==true)
							{
								//返回成功
								if(typeof(_config_.success)=="function")
								{
									_config_.success(data);
								}
								
							}else
							{
								//返回失败
								if(typeof(_config_.error)=="function")
										{
									       var msg="";
											if(!SimpleTool.isNull(data.msg))
												{
												   msg=data.msg;
												}else if(!SimpleTool.isNull(data.errorMessage))
												{
													msg=data.errorMessage;
												}
											_config_.error(msg,true,false,data);
										}
										return ;
							}
		 	 	    	}else
		 	 	    		{
		 	 	    			_config_.success(data);
		 	 	    		}
					
		 	 	 	
		 	 }
		 	 finalConfig_.error=function(XMLHttpRequest, textStatus, errorThrown)
					{
						if (XMLHttpRequest.status == 200)
						{
							var json = $.parseJSON(XMLHttpRequest.responseText);
							if(typeof(json)=="object")
							{
								 window.top.alert("访问了服务器，但是出现异常！详情："+json, -1);
							}
							if(typeof(_config_.error)=="function")
							{
								if(typeof(json)=="string")
								{
									json=$.parseJSON(json);
								}
								_config_.error(true,false,json);
							}
						} else if (XMLHttpRequest.status == 500)
						{
							var json;
							try
							{
								json = $.parseJSON(XMLHttpRequest.responseText);
							}catch(e)
							{
								console.log("json解析失败！");
							}
							if(typeof(json)=="object")
							{
								 window.top.alert("访问了服务器，但是出现异常！详情："+json, -1);
							}
							if(typeof(_config_.error)=="function")
							{
								if(typeof(json)=="string")
								{
									json=$.parseJSON(json);
								}
								_config_.error(XMLHttpRequest.responseText,true,true,json);
							}
						} else if (XMLHttpRequest.readyState != 0)
						{
							window.top.alert('网络连接出错！'
											+ XMLHttpRequest.status + "、"
											+ XMLHttpRequest.readyState + "、"
											+ textStatus + "、" + errorThrown,
									-1);
							if(typeof(_config_.error)=="function")
							{
								_config_.error(false,false,{msg:'网络连接出错！'});
							}
						}
					}
			$.ajax(finalConfig_);
	}
	
	//只能输入日期，日期取值为1到28号
	//用法:$(input对象).keyup(function(){input_dateOnly(this);});
	SimpleTool.input_dateOnly=function(domobj)
	{
			if(domobj.value==domobj.value2)
			     return;
			if(domobj.value=="")
			   {
			      domobj.value2="";
				    return;
			   }
			domobj.value=domobj.value.replace(/[^\d]/g,'');
			var reg=/^([1-9]|1[0-9]|2[0-8])$/g;
			if(new RegExp(reg).test(domobj.value)==false)
			{
				  //console.log("false");
				 if(domobj.value2!=undefined&&domobj.value2!="")
				 {
					 domobj.value=domobj.value2;
				 }else{
				      domobj.value="";
				 }
			   return ;
			}
			if(domobj.value!=undefined&&domobj.value!="")
			   domobj.value2=domobj.value;
	}

	//只能正的两位整数或者小数，小数点后保留两位，取值范围是min-max
	//用法:$(input对象).keyup(function(){input_decimal_2(this,0,100);});
	SimpleTool.input_decimal_2=function (domobj,min,max)
	{
			if(domobj.value==domobj.value2)
			     return;
			if(domobj.value=="")
			   {
			      domobj.value2="";
				    return;
			   }
			domobj.value=domobj.value.replace(/[^\d.]/g,'');
			domobj.value=domobj.value.replace(/^0*(?=\d)/g,'');
			var reg=/^\d{1,}(\.\d{0,2})?$/g;
			if(new RegExp(reg).test(domobj.value)==false)
			{
				 //console.log("false");
				 if(domobj.value2!=undefined&&domobj.value2!="")
				 {
					 domobj.value=domobj.value2;
				 }/*else{
				      domobj.value="";
				 }*/
			   return ;
			}
			var f=parseFloat(domobj.value);
			if(!SimpleTool.isNull(min)&&f<min)
			{
			    domobj.value=min;
			}
			if(!SimpleTool.isNull(max)&&f>max)
			{
			    domobj.value=max;
			}
			if(domobj.value!=undefined&&domobj.value!="")
			   domobj.value2=domobj.value;
	}

	//只能输入正整数，范围是min-max
	//用法:$(input对象).keyup(function(){input_integer(this,0,100);});
	SimpleTool.input_integer=function(domobj,min,max)
	{
			if(domobj.value==domobj.value2)
			     return;
			if(domobj.value=="")
			   {
			      domobj.value2="";
				    return;
			   }
			domobj.value=domobj.value.replace(/[^\d]/g,'');
			domobj.value=domobj.value.replace(/^0*(?=\d)/g,'');
			var reg=/^\d*(\.\d{0,2})?$/g;
			if(new RegExp(reg).test(domobj.value)==false)
			{
				 //console.log("false");
				 if(domobj.value2!=undefined&&domobj.value2!="")
				 {
					 domobj.value=domobj.value2;
				 }
			   return ;
			}
			var f=parseFloat(domobj.value);
			if(f<min)
			{
			    domobj.value=min;
			}else if(f>max)
			{
			    domobj.value=max;
			}
			if(domobj.value!=undefined&&domobj.value!="")
			   domobj.value2=domobj.value;
	}
	
	//定义一个Map
	SimpleTool.Map = function() {
		var container_ = new Object();
		var m_ = {
			p_ : function(key, value) {
				container_[key] = value;
			},
			g_ : function(key) {
				return container_[key];
			},
			k_ : function() {
				var keyset = new Array();
				var count = 0;
				for ( var key in container_) {
					// 跳过object的extend函数
					if (key == 'extend') {
						continue;
					}
					keyset[count] = key;
					count++;
				}
				return keyset;
			},
			s_ : function() {
				var count = 0;
				for ( var key in container_) {
					// 跳过object的extend函数
					if (key == 'extend') {
						continue;
					}
					count++;
				}
				return count;
			},
			r_ : function(key) {
				delete container_[key];
			},
			t_ : function() {
				var str = "";
				for (var i = 0, keys = this.keySet(), len = keys.length; i < len; i++) {
					str = str + keys[i] + "=" + container_[keys[i]] + ";\n";
				}
				return str;
			}
		}
		this.put=m_["p_"];
		this.get=m_["g_"];
		this.keySet=m_["k_"];
		this.size=m_["s_"];
		this.remove=m_["r_"];
		this.toString=m_["t_"];
	}// SimpleTool.Map结束

	window.SimpleTool = SimpleTool;
})(window);

(function($) {
			$.fn.serializeJson = function() {
				var serializeObj = {};
				var array = this.serializeArray();
				var str = this.serialize();
				$(array)
						.each(
								function() {
									if (serializeObj[this.name]) {
										if ($.isArray(serializeObj[this.name])) {
											serializeObj[this.name]
													.push(this.value);
										} else {
											serializeObj[this.name] = [
													serializeObj[this.name],
													this.value ];
										}
									} else {
										serializeObj[this.name] = this.value;
									}
								});
				return serializeObj;
			};
		
		})(jQuery);
		