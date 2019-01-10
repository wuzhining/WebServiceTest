/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchFD_CD = $('#searchFD_CD').textbox('getValue');
			var searchFD_NM = $('#searchFD_NM').textbox('getValue');
			var searchFD_TY =$("#searchFD_TY").combobox("getValue");
			var searchFD_ST =$("#searchFD_ST").combobox("getValue");
			var reqData = {
				IFS: 'ST00021',
				FD_CD:searchFD_CD,
				FD_NM:searchFD_NM,
				FD_TY:searchFD_TY,
				FD_ST:searchFD_ST,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'feederInformationMaintenance_tab', reqData);
		}		
		var tmp = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
                	dataTmp = [];
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
		
		/*feeder状态下拉框查询*/
			materiel = {
		        url: "/iPlant_ajax",
		        dataType: "JSON",
		        data: {IFS:'ST00037'},
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
		
		/*feeder类型下拉框查询*/
		feedType = {
	        url: "/iPlant_ajax",
	        dataType: "JSON",
	        data: {
	        	IFS: 'D000008',
	        	DICT_CD: 'FDT01'
	        },
	        successCallBack: function(a) {
	        	var op = a.RESPONSE[0].RESPONSE_DATA;
	        	dataFeedType.push({"value":"", "text":"全部"});
	            $.each(op,function(n,obj) {
	            	dataFeedType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
	            	feedDataType.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
			    });  
	            $('#searchFD_TY').combobox({
                    data:dataFeedType,
                    valueField:'value',
                    textField:'text',
                    panelWidth:200
                });
	        },
	        errorCallBack: function() {
	            $.messager.alert("提示", '请联系管理员，查询失败！')
	        }
	    };
		iplantAjaxRequest(feedType);
		
			
		
		var checkDate=0;
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'feederInformationMaintenance_tab',
				dataType: 'json',
				columns: [[
				           	{field : "CZ",width : 10,checkbox : true},
				           	{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		{field: 'FD_CHIP_ID',title: '飞达芯片ID',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
						    {field: 'FD_LB',title: '飞达标签',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
				            {field: 'FD_CD',title: '飞达编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
			                {field: 'FEED_PW',title: '飞达轨道',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				                   options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},      
				            {field: 'FD_NM',title: '飞达名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					               options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}},
			                {field: 'FD_TY',title: '飞达类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FD_TY_NM  || value)+ "</span>";},
		           		           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:feedDataType,required:true,editable:false}}},
		           		    {field: 'FD_ST',title: '飞达状态',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FD_ST_NM  || value)+ "</span>";},
			           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},   
		           		    {field: 'USE_NUM',title: '使用次数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
		           		    {field: 'CRITE_NUM',title: '标准次数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{required:true,precision:0,min:0}}, 
				            	   formatter:function(value,row,index){ return formatNumber(value,0); }},
				            {field: 'PRINT_NUM',title: '打印次数',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				            {field: 'WARNING_DT',title: '预警时间',width: 120,align: 'center',formatter: function (value) {
				            	if(checkNotEmpty(value)) {
				            		var myDate = new Date();
				            		var mytime=myDate.toLocaleDateString();    //获取当前时间
				            		function CompareDate(d1,d2)
				            		{
				            		  return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
				            		}
				            		var flag=CompareDate(mytime,value);
				            		if(flag){
				            			checkDate=1;
				            			return "<span  style='color:red' title='" + value + "'>" + value + "</span>";
				            		}else{
				            			checkDate=0;
				            			return "<span  style='color:green' title='" + value + "'>" + value + "</span>";
				            		}
				            		
				            		}
				            	},editor:{type:'datebox',options:{required:true,onSelect: 
				            		function(date){
				            		var nowDate = new Date();
				            		if (date<nowDate){
				            			$(this).datebox("setValue","");
				            			alert('预警时间不能小于当前时间');
				            		}
			            		}
				            	}}}, 
				            {field: 'LAST_MT_DT',title: '上次保养时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(checkDate == 1) { return '否';}else if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
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
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
			    		ed = $(this).datagrid('getEditor', {index: index,field: 'FD_LB'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		
		/*是否打印弹出打印预览页面*/
		openPrintPreview = function(FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM){
			$("#PrintPreview_openDiv").dialog("open").dialog('setTitle', '打印预览页面');
			$("#FD_LB").textbox('setValue',FD_LB);
			$("#FD_CD").textbox('setValue',FD_CD);
			$("#FD_NM").textbox('setValue',FD_NM);
			$("#FD_TY").textbox('setValue',FD_TY);
			$("#FD_ST").textbox('setValue',FD_ST);
			$("#CRITE_NUM").textbox('setValue',CRITE_NUM);
			$("#USE_NUM").textbox('setValue',USE_NUM);
			$("#txtCRT_ID").textbox('setValue',CRT_ID);
			$("#txtCurrentCount").textbox('setValue',1);
			
			
		}
		
		/**
		 * 打印SN
		 * 
		 * @param dgrid
		 */
		saveMesSNcode = function(){
			
			var post = $("#feederInformationMaintenance_tab").datagrid('getSelections');
			var postLenght = post.length;
			var rowSz = $('#rowSize').textbox('getValue');
			var data1=new Array();var data2 = new Array();
			var barCodeList="";
			for (var i=0;i<postLenght;i++){			
	        		data1.push({"CODE":post[i].FD_LB});
	        		data2.push({"FD_LB":post[i].FD_LB,'PRINT_NUM':'1'});
            };
            barCodeStr = {labName:"FDLB.lab",'rowSize':rowSz,"barCodeList":data1};
    		zbSocketPrinter(barCodeStr);
    		
    		/*更新打印次数*/
    		var ajaxUpdatePRINNUM = {
                     url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data: {
                         list: data2,
                         IFS: 'ST00023'
                     },
                     successCallBack: function (data) {
                    	 initGridData();
                     }
                 };
            iplantAjaxRequest(ajaxUpdatePRINNUM);
            /*更新打印次数END*/
			$('#PrintPreview_openDiv').dialog('close');
			$.messager.alert("提示", '条码打印完成！');
			initGridData();	
		}
		
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		deleteDataGrid = function () {
			var checkedItems = $('#feederInformationMaintenance_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({FCT_CD:item.FCT_CD,FD_CD:item.FD_CD});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'ST00024'
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

	           		 }
	           	}
	        });      
		}
	}
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*飞达状态下拉搜索框*/
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'ST00037',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchFD_ST').combobox('clear')
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#searchFD_ST').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
				
	            iplantAjaxRequest(ajaxParam2);
				
				/*初始化全局变量对象*/
				dataGrid = $('#feederInformationMaintenance_tab'),dataFeedType=[],feedDataType=[],dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataMaterielType.length>0 && dataTmp.length>0){
						initData={FCT_CD:dataTmp[0].value,USE_YN:'Y',USE_NUM:'0',FD_TY:feedDataType[0].value,FD_ST:dataMaterielType[0].value}
					}
					insertDataGrid('feederInformationMaintenance_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('feederInformationMaintenance_tab','ST00022','ST00023','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					$("#materialImportDialog").dialog("open").dialog('setTitle', '飞达信息导入');
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00021'
	                	}
	                	createTable('tbIMESReport','飞达信息维护导出','feederInformationMaintenance_tab',reqData);
	                });
				
				 $('#btnPrint').click(function(){
						var post = $("#feederInformationMaintenance_tab").datagrid('getSelections');
						if(post == null || post == ''){
							$.messager.alert('提示', '请选择一条数据进行打印');
						}else{
							var FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM;
							FD_LB = post[0].FD_LB;FD_CD = post[0].FD_CD;FD_NM = post[0].FD_NM;FD_TY = post[0].FD_TY;
							FD_ST = post[0].FD_ST;CRT_ID = post[0].CRT_ID;CRITE_NUM = post[0].CRITE_NUM;USE_NUM = post[0].USE_NUM;
							openPrintPreview(FD_LB,FD_CD,FD_NM,FD_TY,FD_ST,CRT_DT,CRITE_NUM,USE_NUM);
						}
					})
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();