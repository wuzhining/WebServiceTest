(function(){
	function machineMo(){
		//统计  设备监视数量
		initTol= function (){
			var ajaxParam={
    				url:'/iPlant_ajax',
    				dataType:'JSON',
    				data:{
    					IFS:"J000007"
    				},
                    successCallBack:function(data){
                    	var rowCollection = createSourceObj(data);
                    	if(rowCollection.length>0){
                    		//设置值
                    		var counts = 0;
                    		var ycCount =0;
                    		var bl =0;
                    		//var a= parseFloat(rowCollection[2].PCT);
                    		
                    		for(var i=0; i<rowCollection.length; i++){
                    			counts+=parseInt(rowCollection[i].TOT);
                    			//DICT_IT:"RDI01.01" 正常生产
                    			if(rowCollection[i].DICT_IT=="RDI01.01"){
                    				$("#zctol").text(rowCollection[i].TOT); 
                    				$("#scbl").text(rowCollection[i].PCT); 
                    			}
                    			//待机空闲
                    			else if(rowCollection[i].DICT_IT=="RDI01.02"){
                    				$("#djts").text(rowCollection[i].TOT); 
                    				$("#djbl").text(rowCollection[i].PCT);
                    			}
                    			//停机在生产
                    			else if(rowCollection[i].DICT_IT=="RDI01.03"){
                    				ycCount +=parseInt(rowCollection[i].TOT);
                    				bl += parseFloat(rowCollection[i].PCT);
                    			}
                    			//停机
                    			else if(rowCollection[i].DICT_IT=="RDI01.04"){
                    				$("#tjts").text(rowCollection[i].TOT); 
                    				$("#tjbl").text(rowCollection[i].PCT);
                    			}
                    			//计划停机
                    			else if(rowCollection[i].DICT_IT=="RDI01.06"){
                    				$("#jhts").text(rowCollection[i].TOT); 
                    				$("#jhbl").text(rowCollection[i].PCT);
                    			}
                    			//无派单生产
                    			else if(rowCollection[i].DICT_IT=="RDI01.08"){
                    				ycCount +=parseInt(rowCollection[i].TOT);
                    				bl += parseFloat(rowCollection[i].PCT);
                    			}
                    			//通信失败
                    				else if(rowCollection[i].DICT_IT=="RDI01.07"){
                    				$("#txts").text(rowCollection[i].TOT); 
                    				$("#txbl").text(rowCollection[i].PCT);
                    			}
                    			//异常生产
                    			else if(rowCollection[i].DICT_IT=="RDI01.05"){
                    				ycCount +=parseInt(rowCollection[i].TOT);
                    				bl += parseFloat(rowCollection[i].PCT);
                    			}
                    		}
                    		//总共
                    		$("#cToal").text(counts);
                    		//异常生产
                    		$("#cToalsc").text(ycCount); 
            				$("#ycbl").text(bl+"%");
                    	}
                    }
    		};
    		iplantAjaxRequest(ajaxParam);
		}
    }
	machineMo.prototype={
	    init:function(){
	    	 $(function(){
	    		/*//查询设备状态
		    		iplantAjaxRequest( {
		    			url: '/iPlant_ajax',
		    			data: {IFS:'D000008',DICT_CD:"RDI01",},
		    			successCallBack: function (data) {
		    				var array = new Array();
		    				array.push({"id":"","text":"全部"});
		    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
		    					array.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT,"text":data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM});
		    				}
		        	
		    				$('#jqztbox').combobox({
		    					data:array,
		    					valueField:'id',
		    					textField:'text'
		    				});
		    				
		    				$('#jqztbox').combobox({
		    					onSelect: function (r) {
		    						$("#zfa").attr("src","machineMx.html"+"?zt="+r.id);//+"&ccId="+$('#testId').combobox('getValue')
		    	     	    	}
		    				});
		    				$("#zfa").attr("src","machineMx.html"+"?zt="+$('#jqztbox').combobox('getValue'));
		    				$("#testId").combobox({
			     	    	onSelect: function (r) {
			     	    		$("#zfa").attr("src","machineMx.html"+"?ccId="+r.value+"&zt="+$('#jqztbox').combobox('getValue'));
			     	    	}
			     	    });
		    			}
		    		});*/
		    		$("#zfa").attr("src","machineTmpMx.html");
		    		initTol();
	    		//定时刷新
	    		var t=setInterval(function  () {
	    			initTol();
	    		},10000);
	         });
        }
   }
	var bc = new machineMo();
    bc.init();
})();