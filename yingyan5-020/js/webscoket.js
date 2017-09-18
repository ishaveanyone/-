/**
 */
 var websocket = null;
  //判断当前浏览器是否支持WebSocket
 if ('WebSocket' in window)
	 websocket = new WebSocket("ws://101.200.141.234:8877/hawkeye/socket");
 else if ('MozWebSocket' in window)
	 websocket = new MozWebSocket("ws://101.200.141.234:8877/hawkeye/socket");
 else
	 console.log('Not support websocket');
 
  //连接发生错误的回调方法
  websocket.onerror = function(){
	  window.location.href="denglu.html";
      setMessageInnerHTML("error");
  };
   
  //连接成功建立的回调方法
  websocket.onopen = function(event){
      /*setMessageInnerHTML("open");*/
      console.log(1)
  }
  //接收到消息的回调方法
  websocket.onmessage = function(evt){
	  var json_str=evt.data.toString();
	  if(isJSON(json_str)){
		  var data = JSON.parse(json_str);
		  if(status==-1){
			  window.location.href="denglu.html";
			  return;
		  }
		  if(typeof(data.data)!="undefined"){
			  setMessageInnerHTML(data.data)
		  }
	  }
  }
   
  //连接关闭的回调方法
  websocket.onclose = function(){
      /*setMessageInnerHTML("close");*/
  }
   
  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
  window.onbeforeunload = function(){
	 console.log("页面刷新..websocket连接");
     websocket.close();
  }
  
  //将消息显示在网页上
  function setMessageInnerHTML(content){
	  //填充内容
	  $("#websocket_message").html("<p>"+content+"</p>");
	  $("#xiaoxitanchuang").css("display","block");
  }
  
  //关闭连接
  function closeWebSocket(){
      websocket.close();
  }
   
  //发送消息
  function send(){
      var message = document.getElementById('text').value;
      websocket.send(message);
  }
  
  //判断是否能够json格式化字符串
  function isJSON(str) {
	    if (typeof str == 'string') {
	        try {
	            JSON.parse(str);
	            return true;
	        } catch(e) {
	            console.log(e);
	            return false;
	        }
	    }
	    console.log('It is not a string!')    
	}
  
