/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
    		/*工厂名称下拉框*/
    		var Factory = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {IFS: "B000021"},
                    successCallBack: function(a) {
                    	dataFactory = [];
                    	var op = a.RESPONSE[0].RESPONSE_DATA;
                        $.each(op,function(n,obj) {
                        	dataFactory.push({'value':obj.FT_CD,'text':obj.FT_NM});
    				    });  
                    },
                    errorCallBack: function() {
                        $.messager.alert("提示", '请联系管理员，查询失败！')
                    }
                };
    		iplantAjaxRequest(Factory);
    		
    		/*HOLD类型下拉框*/
			dataPi=[],dataSer=[{'value':'','text':'全部 '}];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "Q000018"
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
                    	dataSer.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                    $("#searchHOLD_TY").combobox("loadData", dataSer);
                    $("#searchHOLD_TY").combobox('select', dataSer[0].value);
                },
                errorCallBack: function() {
                    $.messager.alert("提示","请联系管理员，查询失败！");
                }
            };
    		iplantAjaxRequest(pi);
    		
    		dataHOLD_ST.push({'value':"ACTINVE",'text':"ACTINVE"},{'value':"INACTIVE",'text':"INACTIVE"},{'value':"SCRAP",'text':"SCRAP"});
    		
    		searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'Q-HOLD_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false,
				    	 		onChange:function(newValue,oldValue){
				    	 			$("#fctId").val(newValue);
				    	 		}	
				    	 	}}},
					{field: 'HOLD_TY',title: 'HOLD类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.HOLD_TY_NM || value)+ "</span>";},
				    	 		editor:{type:'combobox',id:"type",options:{valueField:'value',textField:'text',data:dataPi,required:true,editable:false,
				    	 			onChange:function(newValue,oldValue){
				    	 				$("#holdId").val(newValue);
				    	 				if(CompanyOpttype==0){
				    	 					if(newValue=='HOLD1.05'){
				    	 						CompanyOpttype=0;
					    	 					$("#searchHOLD_TY2").combobox("loadData", dataSer);
					    	                    var fctId=$("#fctId").val();
					    	                    var hold = {
					    	                            url: "/iPlant_ajax",
					    	                            dataType: "JSON",
					    	                            data: {
					    	                                IFS: "W0000027",
					    	                                FCT_CD:fctId
					    	                            },
					    	                            successCallBack: function(a) {
					    	                            	var op = a.RESPONSE[0].RESPONSE_DATA;
					    	                            	$("#BarCode_tab").html('');
					    	                            	var test;
					    	                            	var heade="<tr style='height: 35px;' >";
					    	                                $.each(op,function(n,obj) {
					    	                                	test+="<td style='float:left' id='barcode'>"+obj.BAR_CODE+"</td>";
					    	            				    });  
					    	                                $("#BarCode_tab").html(heade+test+"</tr>");
					    	                            },
					    	                            errorCallBack: function() {
					    	                                $.messager.alert("提示","请联系管理员，查询失败！");
					    	                            }
					    	                        };
					    	                		iplantAjaxRequest(hold);
					    	                		
					    	 					$("#enditTab").dialog("open").dialog('setTitle', '时间段设置');
					    	 					
					    	 				}
				    	 				}else{
				    	 					if(newValue=='HOLD1.05'){
				    	 						CompanyOpttype=1;
					    	                    var fctId=$("#fctId").val();
					    	                    var hold = {
					    	                            url: "/iPlant_ajax",
					    	                            dataType: "JSON",
					    	                            data: {
					    	                                IFS: "Q000019",
					    	                                FCT_CD:fctId
					    	                            },
					    	                            successCallBack: function(a) {
					    	                            	var op = a.RESPONSE[0].RESPONSE_DATA;
					    	                            	$("#BarCode_tab").html('');
					    	                                $.each(op,function(n,obj) {
								    	                		$("#searchHOLD_TY2").combobox("loadData",dataPi);
								    	                		$("#searchHOLD_TY2").combobox('setValue',obj.HOLD_TY_NM);
								    	                		$("#process").textbox('setValue',obj.PROCESS);
								    	                		$("#txtStartDate").datebox('setValue',obj.INPUT_STAT_DT);
								    	                		$("#txtEndDate").datebox('setValue',obj.INPUT_END_DT);
								    	                		var test="";
								    	                		if(obj.BAR_CODE!=null){
								    	                			var result=obj.BAR_CODE.split(",");
									    	                		for(var i=0;i<result.length;i++){
									    	                		  test+="<td style='float:left'>"+result[i]+"</td>";
									    	                		}
								    	                		}
								    	                		$("#BarCode_tab").html("<tr style='height: 35px;'>"+test+"</tr>");
					    	            				    });  
					    	                                $("#enditTab").dialog("open").dialog('setTitle', '时间段设置');
					    	                            },
					    	                            errorCallBack: function() {
					    	                                $.messager.alert("提示","请联系管理员，查询失败！");
					    	                            }
					    	                        };
					    	                		iplantAjaxRequest(hold);
					    	 				}
				    	 				}
				    	 				
						        }
					}}},
					{field: 'HOLD_VAL',title: 'HOLD值',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
				    {field: 'HOLD_ST',title: 'HOLD状态',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.HOLD_ST || value)+ "</span>";},
						   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataHOLD_ST,required:true,editable:false,
				    }}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'FRZE_YN',title: '是否解冻',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(ed.target).combobox('getValue');
			    	 row.FCT_NM = $(ed.target).combobox('getText');
			    	 var ed2 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_TY'});
			    	 row.DICT_IT = $(ed2.target).combobox('getValue');
			    	 row.DICT_IT_NM = $(ed2.target).combobox('getText');
			    	 var ed3 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_ST'});
			    	 row.HOLD_TY = $(ed2.target).combobox('getValue');
			    	 row.HOLD_TY_NM = $(ed2.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(index,row){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        
		        /**单击进入编辑模式*/
		        onClickCell: function (index,field,value) {
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			rowEdit = dataGrid.datagrid('getRows')[editIndex];
			    			if(checkNotEmpty(rowEdit.editType)){
			    					if(rowEdit.editType=='add'){
			    						CompanyOpttype=0;
	    			    			}else{
	    			    				CompanyOpttype=1;
	    			    				addDatagridEditor(dataGrid,index);
	    			    				if(!checkNotEmpty(row.editType)){
		    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
								    		fc = ed.target;
								    		console.log(fc);
								    		fc.combobox('disable');
								    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_TY'});
								    		if(ed2.oldHtml!='<span title="HOLD1.05">时间段</span>'){
								    			fc2 = ed2.target;
									    		console.log(fc2);
									    		fc2.combobox('disable');
								    		}
	    			    				}
	    			    			}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					if(!checkNotEmpty(row.editType)){
	    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		console.log(fc);
							    		fc.combobox('disable');
							    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_TY'});
							    		if(ed2.oldHtml!='<span title="HOLD1.05">时间段</span>'){
							    			fc2 = ed2.target;
								    		console.log(fc2);
								    		fc2.combobox('disable');
							    		}
							    		
    			    				}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
	    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
							    		fc = ed.target;
							    		console.log(fc);
							    		fc.combobox('disable');
							    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_TY'});
							    		if(ed2.oldHtml!='<span title="HOLD1.05">时间段</span>'){
							    			fc2 = ed2.target;
								    		console.log(fc2);
								    		fc2.combobox('disable');
							    		}
 			    				}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
					    		fc = ed.target;
					    		console.log(fc);
					    		fc.combobox('disable');
					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'HOLD_TY'});
					    		if(ed2.oldHtml!='<span title="HOLD1.05">时间段</span>'){
					    			fc2 = ed2.target;
						    		console.log(fc2);
						    		fc2.combobox('disable');
					    		}
		    				}
			    		}
			    	}
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataGrid=function(dgrid){
			var dgrid=$("#Q-HOLD_tab").datagrid("options"),searchHOLD_TY = $('#searchHOLD_TY').combobox('getValue'),searchHOLD_VAL = $('#searchHOLD_VAL').textbox('getValue');
			var reqData = {
				IFS: 'Q000011',
				HOLD_TY:searchHOLD_TY,
				HOLD_VAL:searchHOLD_VAL,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'Q-HOLD_tab', reqData);
		}
		setDataNull=function(){
			 $('#showFileName').html('');
		}
		
		checkDataValid = function() {
			var a = $("#process").val(),
			b = $("#txtStartDate").datebox('getValue');
			c = $("#txtEndDate").datebox('getValue');
			d = $('#searchHOLD_TY2').combobox('getValue');
			if ("" == a || "" == b || "" ==c || ""==d) 
				return !1;
			return 1;
         },
         
         
         AddOrUpdateHoldTime=function(){
        	 ajaxParamTime = {
						url: '/iPlant_ajax',
						dataType: 'JSON',
						data:{
							FCT_CD:FCT_CD,
							HOLD_TY:HOLD_TY,
							PROCESS:PROCESS,
							INPUT_STAT_DT:INPUT_STAT_DT,
							INPUT_END_DT:INPUT_END_DT,
							BAR_CODE:BAR_CODE,
							IFS:IFServerNo
						},
						successCallBack: function(data) {
							if($.messager.alert('提示', susMsg)) {
								$('#enditTab').dialog('close'),setDataNull();
							}
						},
						errorCallBack: function() {
							$.messager.alert('提示', errorMsg);
						}
					};
				iplantAjaxRequest(ajaxParamTime);
         }
       deleteDataGrid = function () {
 			var checkedItems = $('#Q-HOLD_tab').datagrid('getSelections');
 	        if (checkedItems.length==0) {
 	            $.messager.alert('提示', '请选择一条数据进行删除');
 	            return;
 	        }
 	        /*确认提示框*/
 	        var delCnt=0;
 	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
 	           	if(r==true){
 	                     var ajaxUpdate = {
 	                         url: '/iPlant_ajax',
 	                         dataType: 'JSON',
 	                         data: {
 	                        	 FCT_CD: checkedItems[0].FCT_CD,
 	                        	 HOLD_TY: checkedItems[0].HOLD_TY,
 	                             IFS: 'Q000014'
 	                         },
 	                         successCallBack: function (data) {
 	                         	$('#showMessageInfo').html('<font color=red>删除成功！</font>');
 	                         	initGridData();
 	                             return;
 	                         },
 	                         errorCallBack: function (data) {
 	                        	 $('#showMessageInfo').html('<font color=red>删除失败！</font>');
 	                             return;
 	                         }
 	                     };
 	                     iplantAjaxRequest(ajaxUpdate);
 	           	}
 	        });      
 		}
         
		savaStation = function() {			
			if (!checkDataValid()) return void $.messager.alert("提示", "请添加必选信息");
			IFServerNo = '',reqData = [],susMsg = '',errorMsg = '';
			
			FCT_CD=$("#fctId").val();
			HOLD_TY=$('#searchHOLD_TY2').combobox('getValue');
			PROCESS=$('#process').val();
			INPUT_STAT_DT=$('#txtStartDate').datebox('getValue');
			INPUT_END_DT=$('#txtEndDate').datebox('getValue');
			var tr = $("#BarCode_tab tr:first");	/*第一个tr*/ 
			var tds = tr.children();				/*所有td*/
			for(var i=0;i<tds.length;i++){
				BAR_CODE+=$(tds[i]).text()+",";
			}
			alert(BAR_CODE);
			
			if(CompanyOpttype == 0) {
				susMsg = '添加成功',errorMsg = '添加失败,请联系管理员',IFServerNo = 'Q000020';
				IFS=IFServerNo;
			} else if(CompanyOpttype == 1) {
				susMsg = '更新成功',errorMsg = '更新失败,请联系管理员',IFServerNo = 'Q000021';
				IFS=IFServerNo;
				AddOrUpdateHoldTime();
			}
			$("#enditTab").dialog("close");
		}
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#Q-HOLD_tab'),dataPi=[],dataHOLD_ST=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {		
					CompanyOpttype=0;
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,HOLD_ST:dataHOLD_ST[0].value,FRZE_YN:"Y",HOLD_TY:dataPi[0].value}
					}
					insertDataGrid('Q-HOLD_tab',initData);
				});
				
				$('#btnExprt').click(function(){
                	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                		IFS:'Q000011'
                	}
                	createTable('tbIMESReport','Q-HOLD导出','Q-HOLD_tab',reqData);
                });
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });

				$('#btnSave').click(function() {
					saveDataGrid('Q-HOLD_tab','Q000012','Q000013','showMessageInfo');
				});
			});
		}
	}
	var FCT_CD,HOLD_TY,PROCESS,INPUT_STAT_DT,INPUT_END_DT,BAR_CODE='',IFServerNo,susMsg,errorMsg,CompanyOpttype;
	var fcfo = new materialMaintenance();
	fcfo.init();
})();
