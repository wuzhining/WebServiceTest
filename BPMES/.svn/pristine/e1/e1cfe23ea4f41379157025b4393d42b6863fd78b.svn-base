/* 启动时加载 */
/*
 */
(function() {
	
    
	/*全局变量*/
	var lineCD,shiftCD,startDT,endDT,nowDT;
	var mono={};var wono={};var plantQty={};
	var ganttChars = function(ganttSource,pageSize){
		$(".gantt").gantt({
	       
			source : ganttSource,
	        navigate: "scroll",
	        scale: "days",
	        maxScale: "months",
	        minScale: "hours",
	        itemsPerPage: pageSize,
	        useCookie: true,
	        dow:['一','二','三','四','五','六','日'],
	        months:["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
	        onRender:function(){
	        	$('.bar').click(function(event){
	        		var thisMO_NO = $(this).text();
	        		$('.modal').remove();								/*清除其他模态框*/
           		 	var div = $("<div id='"+thisMO_NO+"'></div>");		/*创建模态框*/
           		 	div.addClass('modal');
           		 	div.css({'left':event.pageX,'top':event.pageY});
           		 	div.appendTo('body');								/*模态框插入*/
           		 	
           		 	/*插入工单号*/
           		 	var divWO_NO = $('<div>'+'工单号:'+wono[thisMO_NO]+'</div>');
           		 	divWO_NO.addClass('divText');
           		 	divWO_NO.appendTo('#'+thisMO_NO);
        		 	/*插入工单号		END*/
           		 	
           		 	/*插入作业指示号*/
           		 	var divMO_NO = $('<div>'+'作业指示号:'+thisMO_NO+'</div>');
           		 	divMO_NO.addClass('divText');
           		 	divMO_NO.appendTo('#'+thisMO_NO);
           		 	/*插入作业指示号	END*/
           		 	
           		 	/*插入计划生产数*/
           		 	var divQTY = $('<div>'+'计划生产数:'+plantQty[thisMO_NO]+'</div>');
           		 	divQTY.addClass('divText');
           		 	divQTY.appendTo('#'+thisMO_NO);
        		 	/*插入计划生产数		END*/
	        	});
	        },
	        onAddClick:function(){
	        	$('.modal').remove();
	        }
	    });
	}
	
	$(function(){
		/*拉线下拉框*/
		var ajaxParam1={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000109',
                },
                successCallBack:function(data){
                	$('#lineCD').combobox('clear');
                    var rowCollection=createSourceObj(data); 
                    var arr = [];
                    arr.push({"value":"", "text":"全部"});
                    for(var i=0; i< rowCollection.length; i++){
                    	arr.push({"value":rowCollection[i].PD_LN_CD, "text":rowCollection[i].PD_LN_NM});
                    }
                    $('#lineCD').combobox({
                        data:arr,
                        valueField:'value',
                        textField:'text',
                        panelWidth:150
                    });
                }
            }
		
        iplantAjaxRequest(ajaxParam1);
		/*拉线下拉框	END*/
		
		/*班次下拉框*/
		var ajaxParam2={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000017',
                },
                successCallBack:function(data){
                	$('#shiftCD').combobox('clear');
                    var rowCollection=createSourceObj(data); 
                    var arr = [];
                    arr.push({"value":"", "text":"全部"});
                    for(var i=0; i< rowCollection.length; i++){
                    	arr.push({"value":rowCollection[i].CS_CD, "text":rowCollection[i].CS_NM});
                    }
                    $('#shiftCD').combobox({
                        data:arr,
                        valueField:'value',
                        textField:'text',
                        panelWidth:150
                    });
                }
            }
		
        iplantAjaxRequest(ajaxParam2);
		/*班次下拉框	END*/
		
		
		$("#btnSearch").click(function(){
			lineCD =$("#lineCD").combobox("getValue");
			shiftCD =$("#shiftCD").combobox("getValue");
			startDT = $('#startDT').datetimebox('getValue');
			endDT = $('#endDT').datetimebox('getValue');
			/*甘特图数据请求*/
			iplantAjaxRequest({
				 url:'/iPlant_ajax',
	             data:{							
	                 IFS:'W0000041',
	                 LINE_CD : lineCD,
	                 SHIFT_CD : shiftCD,
	                 PLAN_STRT_DT : startDT,
	                 PLAN_END_DT : endDT
	             },
	             successCallBack:function(data){
	            	 var datas = data.RESPONSE[0].RESPONSE_DATA;
	            	 var ganttSource = [];
	            	 $.each(datas,function(n,obj){
	            		 ganttSource.push({
	            			 name:obj.LINE_NM,
	            			 desc:obj.SHIFT_NM,
	            			 values:[{
	            				 from:"/Date("+obj.PLAN_STRT_DT+")/",
	            				 to:"/Date("+obj.PLAN_END_DT+")/",
	            				 label:obj.MO_NO,
	            				 customClass: "ganttRed"
	            			 }]
	            		 });
	            		 
	            		 wono[obj.MO_NO] = obj.WO_NO;
	            		 plantQty[obj.MO_NO] = obj.PLAN_PO_QTY;
	            	 });
	            	 var pageSize = ganttSource.length;
	            	 ganttChars(ganttSource,pageSize);
	             }
			});
		});
		 	
	})
})();