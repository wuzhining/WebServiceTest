/* 启动时加载 */
/*
 */
(function() {
	function materialMaintenance() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
    		/*工厂名称下拉框*/
    		var Factory = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000021"},
                successCallBack: function(a) {
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
    		
    		searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'SystemParameterConfiguration_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	   editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
			        {field: 'PAR_CODE',title: '参数代码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field: 'PAR_NAME',title: '参数名称',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
			        {field: 'PAR_VAL',title: '参数值',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'MO',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		                    options:{required:true, validType:['length[1,50]','specialCharacterTextArea']}}}, 	   
			        {field: 'USER_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 	   
			        
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
			    		ed = $(this).datagrid('getEditor', {index: index,field: 'PAR_CODE'});
			    		fc = ed.target;
			    		fc.prop('readonly',true);
		    		}
		        },
		        /**单击进入编辑模式*/
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataGrid=function(dgrid){
			var dgrid=$("#SystemParameterConfiguration_tab").datagrid("options");
			var reqData = {
				IFS: 'S0000027',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'SystemParameterConfiguration_tab', reqData);
		},
		deleteDataGrid = function () {
			var checkedItems = $('#SystemParameterConfiguration_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
                 var ajaxUpdate = {
                     url: '/iPlant_ajax',
                     dataType: 'JSON',
                     data: {
                    	 PAR_CODE: checkedItems[0].PAR_CODE,
                    	 PAR_VAL: checkedItems[0].PAR_VAL,
                         IFS: 'S0000030'
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
	        });      
		}
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				
				/*初始化全局变量对象*/
				dataGrid = $('#SystemParameterConfiguration_tab'),dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				
				initGridData();
				
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				
				$('#btnAdd').click(function() {		
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,USE_YN:"Y"}
					}
					insertDataGrid('SystemParameterConfiguration_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });

				$('#btnSave').click(function() {
					saveDataGrid('SystemParameterConfiguration_tab','S0000029','S0000028','showMessageInfo');
				});
				
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();