function clearControlValue(){
	$('#txtServerNo').textbox("setValue",'');
    $('#txtInputParam').textbox("setValue",'');
	 $('#txtHeaderInfo').textbox("setValue",'');
     $('#txtReturnData').textbox("setValue",'');
}
function testServer(){
    	var serverNo=$('#txtServerNo').val();
    	var inputParam=$('#txtInputParam').val();
    	var headerInfo=$('#txtHeaderInfo').val();
    	var reqStr='';
        reqParam=inputParam.split(',');
        var reqDataObj={IFS:serverNo,reqType: 'WEB'};
        if(reqParam!=""){
        	for(var i=0;i<reqParam.length;i++){
        		var strSource=reqParam[i].toString().replace('"','');
        		var strKey=strSource.substring(0,strSource.indexOf(':')).toString();
        		var startIndex=strSource.indexOf(':')+1;
        		var strValue=strSource.substring(startIndex).toString();
        		//var strJson="{"+strKey+":"+strValue+"}";
        		//var objKey=eval('('+strJson+')');
        		reqDataObj[strKey]=strValue;
        	}
        }
        var reqStr = '';
        if (reqDataObj != null) {
        	  reqStr = '{\"REQ\":[{\"REQ_DATA\":' + JSON.stringify(reqDataObj) + '}]}';
        }
        var ajaxParam={
    		    url:'iPlant_MQTT',
    		    type: 'POST',
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
    		    data:{ "reqStr": reqStr },
    		    success:function(data){
    		    	var aa=data;
    		    	var strJsonData='';
    		    	var strJsonHRD=JSON.stringify(data.RESPONSE["0"].RESPONSE_HDR);
    		        for(var i=0;i<data.RESPONSE["0"].RESPONSE_DATA.length;i++){
    		        	if(data.RESPONSE["0"].RESPONSE_DATA[i]){
    		               strJsonData+=JSON.stringify(data.RESPONSE["0"].RESPONSE_DATA[i]);
    		        	}
    		        }
    		        $('#txtHeaderInfo').textbox("setValue",'['+strJsonHRD+']');
    		        $('#txtReturnData').textbox("setValue",'['+strJsonData+']');
    		   },
               errorCallBack:function(e){
            	   var dd='fef';
               }
    		}
       $.ajax(ajaxParam);
    }




















