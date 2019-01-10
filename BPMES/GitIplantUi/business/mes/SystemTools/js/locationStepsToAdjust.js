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
            
              /*车间下拉框*/
	       var Workshop = {
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
			
				/*物料编码下拉框*/
			var BOM = {
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
				searchDataGrid(dgrid);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'locationStepsToAdjust_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	   editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
		    	    {field: 'WC_CD',title: '车间',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.WC_NM || value)+ "</span>";},
					       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataWorkshop,required:true,editable:false}}},
			        {field: 'BAR_CODE',title: '产品条码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field: 'ITEM_CD',title: '物料编码',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (value)+ "</span>";},
				           editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataBOM,required:true,editable:false}}},
			        {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'PRF_CD',title: '工序编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'PREV_ROUT_CD',title: '前一个ROUTE',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'CURR_ROUT_CD',title: '当前ROUTE ',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'NEXT_ROUT_CD',title: '下个ROUTE ',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	   options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
	        	    {field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			           options:{validType:['length[0,50]','specialTextCharacter']}}},
			        {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
		        	   
					]],
					/**结束编辑模式的操作*/
				 onEndEdit:function(index,row){
					 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(ed.target).combobox('getValue');
			    	 row.FCT_NM = $(ed.target).combobox('getText');
			    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE'});
			    	 row.ITEM_TYPE = $(eddi.target).combobox('getValue');
			    	 row.ITEM_TYPE_NM = $(eddi.target).combobox('getText');
			    	 var edd3 = $(this).datagrid('getEditor', {index: index,field: 'WHS_CD'});
			    	 row.WHS_CD = $(edd3.target).combobox('getValue');
			    	 row.WAREHOUSE_NAME = $(edd3.target).combobox('getText');
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
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		searchDataGrid=function(dgrid){
			var dgrid=$("#locationStepsToAdjust_tab").datagrid("options"),searchSN = $('#searchSN').textbox('getValue');
			var reqData = {
				IFS: 'MF00100',
				BAR_CODE:searchSN,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'locationStepsToAdjust_tab', reqData);
		}
	     
	}

	materialMaintenance.prototype = {
		init: function() {
			$(function() {
				
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
				dataGrid = $('#locationStepsToAdjust_tab'),dataBOM=[],dataFactory=[],dataWorkshop=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('#btnAdd').click(function() {		
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,WC_CD:dataWorkshop[0].value,USE_YN:"Y",PROD_FLOG:"Y"}
					}
					insertDataGrid('locationStepsToAdjust_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					var datadel = ['MO_NO','ITEM_CD','PRF_CD','CURR_ROUT_CD','NEXT_ROUT_CD'];
					deleteDataGrid('locationStepsToAdjust_tab',datadel,'MF00103','showMessageInfo');
	            });

				$('#btnSave').click(function() {
					saveDataGrid('locationStepsToAdjust_tab','MF00101','MF00102','showMessageInfo');
				});
				
			});
		}
	}
	var fcfo = new materialMaintenance();
	fcfo.init();
})();