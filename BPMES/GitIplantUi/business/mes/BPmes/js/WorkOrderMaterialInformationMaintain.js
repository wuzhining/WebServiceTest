/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var search_MaterialType = $('#DeptCode').textbox('getValue');
			var workshops =$("#workShops").combobox("getValue");
			var orderstatus =$("#orderStatus").combobox("getValue");
			var statdate = $("#productionStartTime").datebox("getValue");
			var overdate = $("#productionEndTime").datebox("getValue");
			var reqData = {
				IFS: 'W000001',
				MO_NO:search_MaterialType,
				WC_CD:workshops,
				MO_STATE:orderstatus,
				PLAN_STRT_DT:statdate,
				PLAN_END_DT:overdate,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'WorkOrderMaterialInformationQuery_tab', reqData);
		}		
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataTmp.push({'value':obj.FT_CD,'text':obj.FT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp),
		
		
			
			Workshop = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'B000025'},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataWorkshop.push({'value':obj.PL_CD,'text':obj.PL_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(Workshop);
				
				materiel = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'MB00038'},
	                successCallBack: function(a) {
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataMaterielType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(materiel);
				
				BOM = {
		                url: "/iPlant_ajax",
		                dataType: "JSON",
		                data: {IFS:'Z000051'},
		                successCallBack: function(a) {
		                	var op = a.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataBOM.push({'text':obj.BOM_CD,'value':obj.BOM_NM});
						    });  
		                },
		                errorCallBack: function() {
		                    $.messager.alert("提示", '请联系管理员，查询失败！')
		                }
		            };
					iplantAjaxRequest(BOM);
		dataGrade=[{'value':'一级','text':'一级'},{'value':'二级','text':'二级'},{'value':'三级','text':'三级'}];
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WorkOrderMaterialInformationQuery_tab',
				dataType: 'json',
				columns: [[
				           
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
						    {field: 'WC_CD',title: '车间',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";},
								   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true,editable:false}}}, 
							{field:'MO_NO',title:'工单号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
								   options:{required:true, validType:['length[1,30]','specialTextCharacter']}},
						   {field:'MO_STATE_NM',title:'工单状态',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
							   options:{required:true, validType:['length[1,30]','specialTextCharacter']}},	   
						   {field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
							   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataBOM,required:true,editable:false}}},
						    {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        	    {field: 'ITEM_TYPE',title: '物料类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.ITEM_TYPE_NM || value)+ "</span>";},
							    editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}}, 
	        	    		{field: 'PROD_TYPE',title: '工单类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								   options:{validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'PLAN_PO_QTY',title: '工单计划产量',width: 85,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:1}}, 
			            	       formatter:function(value,row,index){ return formatNumber(value,0); }},
            	            {field: 'UGT_TYPE',title: '紧急等级',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UGT_TYPE ||value)+ "</span>";},
						           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataGrade,required:true,editable:false}}},
            	            {field: 'SO_NO',title: '销售订单',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	           options:{ validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'PLAN_STRT_DT',title: '计划开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_STRT_DT){return row.PLAN_STRT_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
							{field: 'PLAN_END_DT',title: '计划结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.PLAN_END_DT){return row.PLAN_END_DT;}},
			            		   editor:{type:'datebox',options:{required:true,editable:true}}}, 
							{field: 'NXT_OPER',title: '后工程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[0,30]','specialTextCharacter']}}},
			        	    {field: 'PRF_CD',title: '工艺流程',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'WC_CD'});
			    	 row.WC_CD = $(eddi.target).combobox('getValue');
			    	 row.WC_NM = $(eddi.target).combobox('getText');
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			    	 var edditype = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE'});
			    	 row.ITEM_TYPE = $(edditype.target).combobox('getValue');
			    	 row.ITEM_TYPE_NM = $(edditype.target).combobox('getText');
			    	 
			    	 var edddg = $(this).datagrid('getEditor', {index: index,field: 'UGT_TYPE'});
			    	 row.UGT_TYPE = $(edddg.target).combobox('getValue');
			    	 
			    	 var edddgBOM = $(this).datagrid('getEditor', {index: index,field: 'ITEM_CD'});
			    	 row.ITEM_CD = $(edddgBOM.target).combobox('getText');
			    	 row.ITEM_NM = $(edddgBOM.target).combobox('getValue');
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
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	if(row.MO_STATE!=1){
		        		return;       /*只有创建状态才能修改删除*/
		        	}
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		//导入
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工单信息导入');
		},
		/*显示图片*/
       importFile = function (){
    	   // 以下即为完整客户端路径
    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type;
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
    				   $('#showFileName').html(fileName);
    			   }else{
    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
    				   return false;
    			   }
    		   }
    	   }
       },
	   ImportStation =function(){
    	   var webroot=document.location.origin;
    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
    	   if(pic.files.length>0){
    		   file = pic.files[0],fileName = file.name,fileType=file.type;
    		   if(fileName.indexOf('.')>0){
    			   temp=fileName.split('.');
    			   strSrc = temp[temp.length-1];
    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
    				   $('#FILE_BELONG').val("ITEM_CD"),
    		    	   $('#FILE_CLS').val("import"),
    		    	   $('#FILE_TYPE').val('xlsx'),
    		    	   $('#importType').val('1'),
    		    	   $('#IFS').val('W000002');
    				   var formData = new FormData($( "#importUplod" )[0]);  
    				   $.ajax({
    		                cache: true,
    		                type: "POST",
    		                url:webroot+'/iTaurus/iPlant_ImgUpload',
    		                data:formData,// 你的formid
    		                async: false,
    		                processData:false,
    		                contentType:false,
    		                error: function(request) {
    		                	$.messager.alert("提示", '导入失败！');
    		                	console.log(request);
    		                },
    		                success: function(data) {
    		                	$.messager.alert("提示", data[0].msg);
    		                }
    		            });
    			   }else{
    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
    				   return false;
    			   }
    		   }
    	   }
	   },
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
			
		},
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		releasedDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行释放');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要释放您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.MO_STATE!='1'){
	           					tmp=item.MO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'2'});
	           			 }	           			
	                 });
	           		 
	           		 
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W000003'
                        },
                        successCallBack: function (data) {
                        	if(tmp!=null && tmp!=''){
                        		$.messager.alert('提示',tmp+"   已释放,不能再次释放"); 
                        	}
                        	showmessage.html('<font color=red>释放成功！</font>');
                        	 var ajaxGenerate = {
                                     url: '/iPlant_ajax',
                                     dataType: 'JSON',
                                     data: {
                                         IFS: 'MB00001'
                                     }
                                 };
                             iplantAjaxRequest(ajaxGenerate);
                        	initGridData();
                            return;
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>释放失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
                    
                   
	           	}
	        });      
		}
		
		completeDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据完工');
	            return;
	        }
	      /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要完工您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.MO_STATE=='4'){
	           					tmp=item.MO_NO+","+tmp;	
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'4'});
	           			 }	           			
	                 });
	           		 
	           		 
                    var ajaxUpdate = {
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            IFS: 'W000003'
                        },
                        successCallBack: function (data) {
                        	if(tmp!=null && tmp!=''){
                        		$.messager.alert('提示',tmp+"   已完工,不能再次完工");
                        		initGridData();
                        		return;
                        	}
                        	showmessage.html('<font color=red>完工成功！</font>');
                        	initGridData();
                            return;
                        },
                        errorCallBack: function (data) {
                        	showmessage.html('<font color=red>完工失败！</font>');
                            return;
                        }
                    };
                    iplantAjaxRequest(ajaxUpdate);
                    
                   
	           	}
	        });      
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#WorkOrderMaterialInformationQuery_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	       /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		var tmp='';
	           		 $.each(checkedItems, function (index, item) {
	           			 if(item.MO_STATE!='1'){
	           				 tmp=item.MO_NO+","+tmp;		
	           			 }else{
	           				arrUpdate.push({MO_NO:item.MO_NO,MO_STATE:'2'});
	           			 }	           			
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	         /*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'W000004'
	                         },
	                         successCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除成功！</font>');
	                         	initGridData();
	                             return;
	                         },
	                         errorCallBack: function (data) {
	                         	showmessage.html('<font color=red>删除失败！</font>');
	                             return;
	                         }
	                     };
	                     iplantAjaxRequest(ajaxUpdate);

	           		 }else{
	           			showmessage.html('<font color=red>删除失败，此工单不是创建状态！</font>');
	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				var ajaxParam2={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'W0000025',
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        arr.push({"value":"", "text":"全部"});
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
                        }
                        $('#orderStatus').combobox({
                            data:arr,
                            valueField:'value',
                            textField:'text',
                            panelWidth:150
                        });
                    }
                }
                iplantAjaxRequest(ajaxParam2);
				var ajaxParam3={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'B000025',
	                    },
	                    successCallBack:function(data){
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].PL_CD, "text":rowCollection[i].PL_NM});
	                        }
	                        $('#workShops').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
	            iplantAjaxRequest(ajaxParam3);
				
				/*初始化全局变量对象*/
				dataGrid = $('#WorkOrderMaterialInformationQuery_tab'),dataWorkshop=[],dataBOM=[],dataMaterielType=[],dataTmp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				var MO_NO;
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					initData={MO_STATE_NM:'创建',MO_NO:'系统自动生成',FCT_CD:dataTmp[0].value,WC_CD:dataWorkshop[0].value,MO_STATE:'1',ITEM_TYPE:dataMaterielType[0].value,REM_PO_QTY:0,PROD_TYPE:'组装工单',UGT_TYPE:dataGrade[0].value}
					insertDataGrid('WorkOrderMaterialInformationQuery_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnReleased').click(function(){
					releasedDataGrid();
	            });
				
				$('#btncomplete').click(function(){
					completeDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('WorkOrderMaterialInformationQuery_tab','W000002','W000003','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						
					OpenImprotFramedr();
				});
				
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
				
				$('#btnExprt').click(function(){						/*导出*/
				 	var now = new Date();
                    var year =now.getFullYear();
                	var reqData = {
                			IFS:'W000001'
                	}
                	createTable('tbIMESReport','工单物料信息导出','WorkOrderMaterialInformationQuery_tab',reqData);
	            });
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();