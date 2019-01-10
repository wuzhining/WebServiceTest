/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchBUSI_CODE = $('#searchBUSI_CODE').combobox('getValue');
			var searchMac = $('#searchMac').textbox('getValue');
			var searchIP = $('#searchIP').textbox('getValue');
			var searchRoutLine = $('#searchRoutLine').combobox('getValue');
			/*工厂下拉框查询*/
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
			iplantAjaxRequest(tmp);
			
			/*工序路线下拉框*/
			var routeName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "GX00011"},
	                successCallBack: function(a) {
	                	dataRouteName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataRouteName.push({'value':obj.ROUT_CD,'text':obj.ROUT_NAME});
	                    	routName[a.RESPONSE[0].RESPONSE_DATA[n].ROUT_CD]=a.RESPONSE[0].RESPONSE_DATA[n].ROUT_NAME;
					    }); 
	                    console.log(routName)
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
			
			/*拉线*/
			var Allline = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "B000109"},
	                successCallBack: function(a) {
	                	dataLineCd = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataLineCd.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
	                    	console.log('dataLineCd='+dataLineCd);
					    }); 
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(Allline);
			
			
			materiel = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS:'GX00079'},
	                successCallBack: function(a) {
	                	dataMaterielType = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataMaterielType.push({'value':obj.MN_CD,'text':obj.MN_NM});
					    });  
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
				iplantAjaxRequest(materiel);
			
			var reqData = {
				IFS: 'GX00075',
				ROUT_CD: searchBUSI_CODE,
				MAC_ADDRESS: searchMac,
				IP_ADDRESS: searchIP,
				LINE_CD:searchRoutLine,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'defineTheProcessRoute_tab', reqData);
		},		
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'defineTheProcessRoute_tab',
				dataType: 'json',
				columns: [[
				           	{field: 'FCT_CD',title: '工厂名称',width: 90,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			        	    {field: 'MAC_ADDRESS',title: 'MAC地址',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
					        {field: 'IP_ADDRESS',title: 'IP地址',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
					        {field: 'LINE_CD',title: '工位所属拉线',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.LINE_NM  || value)+ "</span>";},
			           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataLineCd,required:true,editable:false}}},
			           		{field: 'BUSI_CODE',title: '业务代码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.BUSI_CODE  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
			           		/*{field: 'BUSI_NAME',title: '业务名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},*/
			        	    {field: 'ROUT_CD',title: '工位代码',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataRouteName,required:true,editable:false}}},
				           	{field: 'ROUT_NAME',title: '工位名称',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					        {field: 'ROUT_SORT',title: '工位顺序',width: 60,align: 'right',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
				        	{field: 'ROUT_TY',title: '工位类型',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},	   
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == '1') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: '1',off: '0'}}}, 
					        {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						           options:{validType:['length[0,50]','specialTextCharacter']}}},
					        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 170,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
							]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var edditmp = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(edditmp.target).combobox('getValue');
			    	 row.FCT_NM = $(edditmp.target).combobox('getText');
			    	 
			    	 var edditLine = $(this).datagrid('getEditor', {index: index,field: 'LINE_CD'});
			    	 row.LINE_CD = $(edditLine.target).combobox('getValue');
			    	 row.LINE_NM = $(edditLine.target).combobox('getText');
			    	 
			    	 var edditype = $(this).datagrid('getEditor', {index: index,field: 'BUSI_CODE'});
			    	 row.BUSI_CODE = $(edditype.target).combobox('getValue');
			    	 //row.BUSI_NAME = $(edditype.target).combobox('getText');
			    	 
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
		        },
		        /**单击进入编辑模式*/
			}
			initGridMultiView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		/*检索*/
	   searchDataGrid=function(dgrid){
			initGridData();
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '工序路线定义导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#defineTheProcessRoute_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({MAC_ADDRESS:item.MAC_ADDRESS,ROUT_CD:item.ROUT_CD});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'GX00078'
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
				
				var ajaxParam3={
	                url:'/iPlant_ajax',
	                data:{
	                    IFS:'GX00011',
	                },
	                successCallBack:function(data){
	                	$('#searchBUSI_CODE').combobox('clear');
	                    var rowCollection=createSourceObj(data); 
	                    var arr = [];
	                    arr.push({"value":"", "text":"全部"});
	                    for(var i=0; i< rowCollection.length; i++){
	                    	arr.push({"value":rowCollection[i].ROUT_CD, "text":rowCollection[i].ROUT_NAME});
	                    }
	                    $('#searchBUSI_CODE').combobox({
	                        data:arr,
	                        valueField:'value',
	                        textField:'text',
	                        panelWidth:150
	                    });
	                }
	            }
	            iplantAjaxRequest(ajaxParam3);
				
				/*拉线*/
				var ajaxParamLine={
		                url:'/iPlant_ajax',
		                data:{
		                    IFS:'B000109',
		                },
		                successCallBack:function(data){
		                	$('#searchRoutLine').combobox('clear');
		                    var rowCollection=createSourceObj(data); 
		                    var arr = [];
		                    arr.push({"value":"", "text":"全部"});
		                    for(var i=0; i< rowCollection.length; i++){
		                    	arr.push({"value":rowCollection[i].PD_LN_CD, "text":rowCollection[i].PD_LN_NM});
		                    }
		                    $('#searchRoutLine').combobox({
		                        data:arr,
		                        valueField:'value',
		                        textField:'text',
		                        panelWidth:150
		                    });
		                }
		            }
		            iplantAjaxRequest(ajaxParamLine);
				
				
				/*初始化全局变量对象*/
				dataGrid = $('#defineTheProcessRoute_tab'),dataLineCd=[],dataRouteName = [],dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataTmp.length>0 && dataMaterielType.length>0 && dataRouteName.length>0){
						initData={FCT_CD:dataTmp[0].value,BUSI_CODE:dataMaterielType[0].value,USE_YN:'1'}
					}
					insertDataGrid('defineTheProcessRoute_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('defineTheProcessRoute_tab','GX00076','GX00077','showMessageInfo');
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'GX00011'
	                	}
	                	createTable('tbIMESReport','工序路线定义导出','defineTheProcessRoute_tab',reqData);
	                });
				
			});
		}
	}
	var fcfo = new factoryInfo();var routName = {};
	fcfo.init();
})();