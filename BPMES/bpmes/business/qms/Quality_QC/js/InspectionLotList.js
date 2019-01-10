
(function() {
	function application() {	
		function CurentTime()
	    { 
	        var now = new Date();
	        
	        var year = now.getFullYear();       //年
	        var month = now.getMonth() + 1;     //月
	        var day = now.getDate();            //日
	        
	        var hh = now.getHours();            //时
	        var mm = now.getMinutes();          //分
	        var ss = now.getSeconds();           //秒
	        
	        var clock = year + "-";
	        
	        if(month < 10)
	            clock += "0";
	        
	        clock += month + "-";
	        
	        if(day < 10)
	            clock += "0";
	            
	        clock += day + " ";
	        
	        if(hh < 10)
	            clock += "0";
	            
	        clock += hh + ":";
	        if (mm < 10) clock += '0'; 
	        clock += mm + ":"; 
	         
	        if (ss < 10) clock += '0'; 
	        clock += ss; 
	        return(clock); 
	}

					
		
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
    		$('#ddlResultId').combobox('setValue',"");
    		$('#txtItemCode').textbox('setValue',"");
			$('#txtInspectionLotNo').textbox('setValue',"");
			$('#ddlState').combobox('setValue',"");
			$('#txtCreateDateTimeStart').datebox('setValue',"");
			$('#txtCreateDateTimeEnd').datebox('setValue',"");
		}
       
			
	};
	application.prototype = {
		init: function() {
			$(function() {			
		         
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
})();