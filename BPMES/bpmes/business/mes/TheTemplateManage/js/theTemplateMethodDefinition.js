/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchMethod_CD = $('#searchMethod_CD').textbox('getValue');
			var searchMethod_NM =$("#searchMethod_NM").textbox("getValue");
			var reqData = {
				IFS: 'MF00041',
				FUN_CODE:searchMethod_CD,
				FUN_NAME:searchMethod_NM,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'theTemplateMethodDefinition_tab', reqData);
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
		
			materiel = {
	            url: "/iPlant_ajax",
	            dataType: "JSON",
	            data: {IFS:'GX00074'},
	            successCallBack: function(a) {
	            	dataMaterielType = [];
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
		
		
			
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'theTemplateMethodDefinition_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
			           		{field: 'FUN_CODE',title: '方法编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
					        {field: 'FUN_NAME',title: '方法名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
			        	    {field: 'FUN_TY',title: '方法类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FUN_TYPE_NM  || value)+ "</span>";},
			           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
			        	    {field: 'CLASS_NAME',title: '处理类名',width: 500,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,256]','specialCharacterTextArea']}}},
						    {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 
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
		
		deleteDataGrid = function () {
			var checkedItems = $('#theTemplateMethodDefinition_tab').datagrid('getSelections');
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
	           				arrUpdate.push({FCT_CD:item.FCT_CD,FUN_CODE:item.FUN_CODE});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'MF00044'
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
				/*初始化全局变量对象*/
				dataGrid = $('#theTemplateMethodDefinition_tab'),dataMaterielType=[],dataWorkshop=[],dataBOM=[],dataCompany=[],dataMaterielType=[],dataTmp=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataTmp.length>0 && dataMaterielType.length>0){
						initData={FCT_CD:dataTmp[0].value,FUN_TYPE:dataMaterielType[0].value,USE_YN:'1'}
					}
					insertDataGrid('theTemplateMethodDefinition_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				
				
				$('#btnSave').click(function() {
					saveDataGrid('theTemplateMethodDefinition_tab','MF00042','MF00043','showMessageInfo');
				});
				
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();