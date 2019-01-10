(function(){
	function alarmBC(){
		initGridData=function(){
			var dgrid=$('#alarmbc_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
		        IFS: 'A000038',
		        pageIndex:1,
		    	pageSize:dgrid.pageSize
		    }
	     	reqGridData('/iPlant_ajax','alarmbc_tab', reqData);
		},
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'alarmbc_tab',
					dataType: 'json',
					pagination:false,
					rownumbers:true,
					columns: [[
//					           {field : "CZ",width : 10,checkbox : true},
//					           { field: 'AC_CD', title: '报警班次编码', width: 100 ,align:'center'},
				               { field: 'AC_NM', title: '报警班次名称', width: 200,align:'center'
				            	//   ,editor: 'text'
				               },
				               { field: 'AC_BGN', title: '开始时间', width: 100,align:'center'
				            	   //,editor: 'timespinner'
				               },
				               { field: 'AC_END', title: '结束时间', width: 100,align:'center'
				            	//   ,editor: 'timespinner'
				               },
				               { field: 'AC_ST', title: '是否跨天', width: 100,align:'center'
							         //   	   ,editor:{type:'checkbox',options:{on:'Y',off:'N'}}
							               ,formatter: function (value, row, index) {
						                                   if (value == 'Y') {
						                                       return '是';
						                                   }
						                                   else {
						                                       return '否';
						                                   }
						                         }	
								            },
				               { field: 'USE_YN', title: '是否启用', width: 100,align:'center'
				            	//   ,editor:{type:'checkbox',options:{on:'Y',off:'N'} }
				               ,formatter: function (value, row, index) {
		                                   if (value == 'Y') {
		                                       return '是';
		                                   }
		                                   else {
		                                       return '否';
		                                   }
		                              }	
				               },
					            { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
				                { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'
//				                	,
//					               	formatter:function(value,row,index) {
//		                    		  if(row.CRT_DT){
//		                    			 //var nDate = new Date(value);
//		                    	         return CurentTime(row.CRT_DT);
//		                    		  }
//		                    	   }
				               	},
				               { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
				               { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'
//				            	   ,
//					                formatter:function(value,row,index) {
//		                    		  if(row.UPT_DT){
//		                    	         return CurentTime(row.UPT_DT);
//		                    		  }
//		                    	    }
				               }
				     ]],
				     onDblClickRow: function(index,row){	
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改报警班次信息');
				    	 checkFun();
				    	 $('#txtBCDM').textbox('setValue',row.AC_CD);
				    	 $('#txtBCMC').textbox('setValue', row.AC_NM);
				    	 $('#txtKSSJ').textbox('setValue',row.AC_BGN);
				    	 $('#txtJSSJ').textbox('setValue',row.AC_END);
				    	 $('#txtSFQY').combobox('setValue',row.USE_YN);
				    	 $('#txtSFKT').combobox('setValue',row.AC_ST);
				     }
			}
			initGridView(reqData,grid);
			$('#alarmbc_tab').datagrid('loadData',jsonData);
		},
		checkFun = function (){
			var qx = getUpdateRight();
			if(qx=="Y"){
				$('#txtBCDM').textbox('textbox').attr('disabled', true);
		    	 $('#txtBCMC').textbox('textbox').attr('disabled', false);
		    	 $('#txtKSSJ').textbox('textbox').attr('disabled', false);
		    	 $('#txtJSSJ').textbox('textbox').attr('disabled', false);
		    	 $('#txtSFQY').combobox('textbox').attr('disabled', false);
		    	 $('#txtSFKT').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				$('#txtBCDM').textbox('textbox').attr('disabled', true);
		    	 $('#txtBCMC').textbox('textbox').attr('disabled', true);
		    	 $('#txtKSSJ').textbox('textbox').attr('disabled', true);
		    	 $('#txtJSSJ').textbox('textbox').attr('disabled', true);
		    	 $('#txtSFQY').combobox('textbox').attr('disabled', true);
		    	 $('#txtSFKT').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		}
		editIndex=-1,
		ccCount=0,
		CompanyOpttype=0,
		getEditIndex=function(){
	       return this.OptType;
	    },
	    setEditIndex=function(value){
	       this.editIndex=value;
	    },
	    addCustom=function(){
	    	ccCount=parseInt(ccCount)+1;
//     		var row = {
//     				AC_CD: ccCount,
//     				AC_NM:'白班',
//					AC_BGN:'08:00',
//					AC_END:'20:00',
//					USE_YN:'Y',
//					AC_ST:'N'
//    				};
//     		$('#alarmbc_tab').datagrid('insertRow',{index:0,row:row}); 
	    	CompanyOpttype=0;
    		checkFun();
//     		$('#alarmbc_tab').datagrid("beginEdit", 0);
	    	$('#queryTab').dialog('close');	
	    	$("#enditTab").dialog("open").dialog('setTitle', '新增报警班次信息');
    		$("#fmCustom").form("clear");
    		$("#txtBCDM").textbox('setValue',ccCount);
    		$("#txtSFQY").combobox('setValue',"Y");
    		$("#txtSFKT").combobox('setValue',"N");
    		$('#txtKSSJ').timespinner('setValue',"08:00");
    		$('#txtJSSJ').timespinner('setValue',"20:00");
    		
     	},  
        /*数据有效性验证*/
        updateCustom = function (){
    		var checkedItems = $('#alarmbc_tab').datagrid('getSelections');
    		
    		if (checkedItems.length != 1) {
    			$.messager.alert('提示', '请选择一条数据进行修改');
    			return false;
    		}
    		var row = checkedItems[0];
    		if (row) {
    			$('#queryTab').dialog('close');	
    			$("#enditTab").dialog("open").dialog('setTitle', '修改报警班次信息');
    			$('#txtBCDM').textbox('setValue',row.AC_CD);
    			$('#txtBCMC').textbox('setValue', row.AC_NM);
    			$('#txtKSSJ').textbox('setValue',row.AC_BGN);
    			$('#txtJSSJ').textbox('setValue',row.AC_END);
    			$('#txtSFQY').combobox('setValue',row.USE_YN);
    			$('#txtSFKT').combobox('setValue',row.AC_ST);
    			
    			CompanyOpttype=1;
    		}
    		checkFun();
    	},
    	savaCustom=function (){ 
    		if(!checkForm()) return;	
    		var IFServerNo='';
    		var reqData=[];
    		if(CompanyOpttype==0){ 
    			IFServerNo='A000041' ;  
    			ccCount++;
    		}
    		else if(CompanyOpttype==1){
    			IFServerNo='A000039';
    		}
//	   else{
//		   IFServerNo='B000051'
//	   }
	   
//    		alert($('#txtSFQY').combobox('getValue')+"----"+$('#txtSFKT').combobox('getValue'));
//    		return;
    		var bcmc = $('#txtBCMC').textbox('getValue');
    		if(bcmc== null || bcmc==""){
    			$.messager.alert("提示","请输入班次名称！");
    			return;
    		}
    		var ajaxParam={
    				url:'/iPlant_ajax',
    				dataType:'JSON',
    				data:{
    					AC_CD : $('#txtBCDM').textbox('getValue'),           
    					AC_NM : bcmc,         
    					AC_BGN: $('#txtKSSJ').timespinner('getValue'),          
    					AC_END: $('#txtJSSJ').timespinner('getValue'),          
    					AC_ST : $('#txtSFKT').combobox('getValue'),         
    					USE_YN: $('#txtSFQY').combobox('getValue'),
    					IFS:IFServerNo
    				},
                    successCallBack:function(data){
                    	var susMsg=getReturnMsg(data);
                    	$.messager.alert("提示",susMsg,"",function(){
                			reqGridData('/iPlant_ajax','alarmbc_tab',{IFS:'A000038'});
                		});
                    }
    		};
    		iplantAjaxRequest(ajaxParam);
    		
    		$("#enditTab").dialog("close");

    	},
    	delCustom=function (){ //删除
    		var iCount = 0;
    		var checkedItems = $('#alarmbc_tab').datagrid('getSelections');
    		if(checkedItems.length>0){
    			var exceptionCode='';
                $.messager.confirm('提示', '您确定要删除您所选择的数据?', function (r) {
               	 if(r==true){
               		for(var i=0; i<checkedItems.length;i++){
        				var ajaxParam={
        	    				url:'/iPlant_ajax',
        	    				dataType:'JSON',
        	    				async: false,
        	    				data:{IFS:"A000040",AC_CD:checkedItems[i].AC_CD},
        	                    successCallBack:function(data){
        	                    	iCount++;
        	                    	if(data.RESPONSE[0].RESPONSE_HDR.MSG_CODE=='-1007') 
                                    {
        	                    		if(exceptionCode==""){
        	                    			exceptionCode =checkedItems[i].AC_CD;
        	                    		}else{
        	                    			exceptionCode +=','+checkedItems[i].AC_CD;
        	                    		}
                             	          
                                    }
        	                    	if(checkedItems.length==iCount){
        	                    		var msg = "删除成功";
        	                    		if(exceptionCode !=""){
        	                    			msg='班次代码:'+exceptionCode+'被使用，不能删除，请联系管理员'; 
                                		 }
        	                    		$.messager.alert("提示",msg,"",function(){
        	                    			reqGridData('/iPlant_ajax','alarmbc_tab',{IFS:'A000038'});
        	                    		});
        	                    	}
        	                    }
        	    		};
        	    		iplantAjaxRequest(ajaxParam);
        			}
               	 }
                }); 
    		}
    	},
     	CurentTime=function (value)
     	    { 
    			var now = new Date();
    			if(value){
    				now = new Date(value);
    			}
     	        
     	        
     	        var year = now.getFullYear();       //年
     	        var month = now.getMonth() + 1;     //月
     	        var day = now.getDate();            //日
     	        
     	        var hh = now.getHours();            //时
     	        var mm = now.getMinutes();          //分
     	        var ss = now.getSeconds();           //秒
     	        
     	        var clock = year + "-";
     	        
     	        if(month < 10)
     	            clock += "0";
     	        
     	        clock += month + "-";
     	        
     	        if(day < 10)
     	            clock += "0";
     	            
     	        clock += day + " ";
     	        
     	        if(hh < 10)
     	            clock += "0";
     	            
     	        clock += hh + ":";
     	        if (mm < 10) clock += '0'; 
     	        clock += mm + ":"; 
     	         
     	        if (ss < 10) clock += '0'; 
     	        clock += ss; 
     	        return(clock); 
     	},
//  	serchCustom = function () {
//   		$('#enditTab').dialog('close');	
//  		$("#queryTab").dialog("open").dialog('setTitle', '报警班次查询');
//  		$("#querywlMes").form("clear");
//  	},
    	serchconfirm =function (){//查询
    		var bh = $("#txtBCDMCX").val();
    		var mc = $("#txtBCMCCX").val();
	
    		var reqData ={
    				AC_CD:bh,
    				AC_NM:mc,
    				IFS:"A000038"
    		}
    		
    			reqGridData('/iPlant_ajax','alarmbc_tab',reqData);
    		
    	}
//     	,
//     	saveAlarmBC=function(){
//     		var temp= 0;
//     		var user = getQueryString("userName");
//     		var nowTime = CurentTime();
//     		var datas = $('#alarmbc_tab').datagrid('getRows');
//     		for(var i = 0; i<datas.length;i++){
//				$('#alarmbc_tab').datagrid("endEdit", i);
//			}
//     		
//     		if(datas.length==0){
//     			$.messager.alert('提示', "没有修改报警班次。");
//     			return;
//     		}else{
//     			
//     			var insertrows = $("#alarmbc_tab").datagrid('getChanges', "inserted");
//     			var updaterows = $("#alarmbc_tab").datagrid('getChanges', "updated");
//     			if(insertrows.length>0){
//     				for(var i=0; i<insertrows.length; i++){
//     					if(insertrows[i].AC_NM==""){
//     						$.messager.alert('提示', "班次名称未录入，请重新输入");
//     						return;
//     					}
//     				
//     					if(insertrows[i].AC_BGN==""){
//     						$.messager.alert('提示', "班次开始时间未录入，请重新输入");
//     						return;
//     					}
//     					if(insertrows[i].AC_END==""){
//     						$.messager.alert('提示', "班次结束时间未录入，请重新输入");
//     						return;
//     					}
//     					var begin = insertrows[i].AC_BGN.replace(":","");
//     					var end = insertrows[i].AC_END.replace(":","");
//     					if(insertrows[i].AC_ST=="N"){
//     						if(begin >= end){
//     							$.messager.alert('提示', "班次开始时间不能晚于结束时间，请重新设置");
//     							return;
//     						}
//     					}
//     				}
//     				
//     				//保存
//     				
//         			for(var i=0; i<insertrows.length; i++){
//    	            	  var ajaxParam1={
//    	            		      url:'/iPlant_ajax',
//    	            		      dataType:'JSON',
//    	            		      async: false,
//    	            	  	      data:{
//    	            	  	    	AC_CD:insertrows[i].AC_CD,
//    	    						AC_NM:insertrows[i].AC_NM,
//    	    						AC_BGN:insertrows[i].AC_BGN,
//    	    						AC_END:insertrows[i].AC_END,
//    	    						USE_YN:insertrows[i].USE_YN,
//    	    						AC_ST:insertrows[i].AC_ST,
//    	    						CRT_ID:user,
//    	    						CRT_DT:nowTime,
//    	            	          	IFS:'A000041'
//    	            	          },
//    	                          successCallBack:function(data){
//    	                        	  temp++;
//    	                        	  if(updaterows.length+insertrows.length==temp){
//    	                        		  $.messager.alert('提示', "保存成功。");
//    	                        		  initGridData();
//    	                        	  }
//    	                        	 
//    	                          }
//    	            	    };
//    	            		iplantAjaxRequest(ajaxParam1);
//         				
//         			}
//     			}
//     		
//     			
//     			if(updaterows.length>0){
//     				for(var i=0; i<updaterows.length; i++){
//     					if(updaterows[i].AC_NM==""){
//     						$.messager.alert('提示', "班次名称未录入，请重新输入");
//     						return;
//     					}
//     				
//     					if(updaterows[i].AC_BGN==""){
//     						$.messager.alert('提示', "班次开始时间未录入，请重新输入");
//     						return;
//     					}
//     					if(updaterows[i].AC_END==""){
//     						$.messager.alert('提示', "班次结束时间未录入，请重新输入");
//     						return;
//     					}
//     					var begin = updaterows[i].AC_BGN.replace(":","");
//     					var end = updaterows[i].AC_END.replace(":","");
//     					if(updaterows[i].AC_ST=="N"){
//     						if(begin >= end){
//     							$.messager.alert('提示', "班次开始时间不能晚于结束时间，请重新设置");
//     							return;
//     						}
//     					}
//     				}
//     				
//     				//修改
//         			for(var i=0; i<updaterows.length; i++){
//    	            	  var ajaxParam1={
//    	            		      url:'/iPlant_ajax',
//    	            		      dataType:'JSON',
//    	            		      async: false,
//    	            	  	      data:{
//    	            	  	    	AC_CD:updaterows[i].AC_CD,
//    	    						AC_NM:updaterows[i].AC_NM,
//    	    						AC_BGN:updaterows[i].AC_BGN,
//    	    						AC_END:updaterows[i].AC_END,
//    	    						USE_YN:updaterows[i].USE_YN,
//    	    						AC_ST:updaterows[i].AC_ST,
//    	    						UPT_ID:user,
//    	    						UPT_DT:nowTime,
//    	            	          	IFS:'A000039'
//    	            	          },
//    	                          successCallBack:function(data){
//    	                        	  temp++;
//    	                        	  if(updaterows.length+insertrows.length==temp){
//    	                        		  $.messager.alert('提示', "保存成功。");
//    	                        		  initGridData();
//    	                        	  }
//    	                          }
//    	            	    };
//    	            		iplantAjaxRequest(ajaxParam1);
//         				
//         			}
//     			}
//     			
//     			
//     			
//     		}
//     		
//     	}
    }
	alarmBC.prototype={
	    init:function(){
	    	 $(function(){
	    		   $("body")[0].onkeydown = keyPress;
	               $("body")[0].onkeyup = keyRelease;
	               
	               $("input",$("#txtBCMC").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
	               
	               initGridData();
	        	   var array = [{    
	        		    "id":"Y",    
	        		    "text":"是"   
	        		},{    
	        		    "id":"N",    
	        		    "text":"否"   
	        		}];
	        	   $('#txtSFQY').combobox({
   						data:array,
   						valueField:'id',
   						textField:'text'
   					});
	        	   $('#txtSFKT').combobox({
   						data:array,
   						valueField:'id',
   						textField:'text'
   					});
	        	   //获取最大值
	     			var ajaxParam2={
	          		      url:'/iPlant_ajax',
	          		      dataType:'JSON',
	          	  	      data:{
	          	          	IFS:'A000038'
	          	          },
	                      successCallBack:function(data){
	                    	  var rowCollection = createSourceObj(data);
	                    	  var min=max=rowCollection[0].AC_CD;
	                    	   for(var i=1;i<rowCollection.length;i++)
	                    	   {
	                    	     if(min>rowCollection[i].AC_CD) min=rowCollection[i].AC_CD;
	                    	     if(max<rowCollection[i].AC_CD) max=rowCollection[i].AC_CD;
	                    	   }
	                    	   ccCount = max;
	                      }
	          	    };
	          		iplantAjaxRequest(ajaxParam2);
	          	//验证输入长度
					$("input", $("#txtBCMC").next("span")).keyup(function() {
						checkInputLength('txtBCMC', 30);
					})
	         });
        }
   }
	var bc = new alarmBC();
    bc.init();
})();