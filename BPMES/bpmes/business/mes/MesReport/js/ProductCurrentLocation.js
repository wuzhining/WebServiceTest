/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var workshops =$("#workShops").textbox("getValue");
			var Job_indicator= $("#Job_indicator").textbox("getValue");
			var reqData = {
				IFS: 'MF00100',
				BAR_CODE: workshops,
				WO_NO: Job_indicator,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'WorkingMaterial_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'WorkingMaterial_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.DICT_IT_NM || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}}, 
					{field:'MO_NO',title:'工单号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},  
				    {field:'WO_NO',title:'作业指示号',width:140,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},	   
				    {field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
		            {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,30]','specialTextCharacter']}}}, 
	        	    {field:'BAR_CODE',title:'产品SN',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field:'SN_NO',title:'SN',width:10,hidden:true,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field:'PREV_ROUT_CD',title:'前一个工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        		   {field: 'img1',title: '产品SN历史明细',width: 120,align: 'center',formatter:function(row){
					        		return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
//			        {field:'PREV_ROUT_NM',title:'前一个工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				    {field:'CURR_ROUT_CD',title:'当前工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					      options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
			        {field:'CURR_ROUT_NM',title:'当前工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			              options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},      
//				    {field:'NEXT_ROUT_CD',title:'下一个工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//					      options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//			        {field:'NEXT_ROUT_NM',title:'下一个工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},     
					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			    ]],
		        /**单击进入编辑模式*/
			    onClickCell: function (index,field,value) {
		        	ccIndex=index;
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
					if(field=='img1'){
		        		endEditingAll(dataGrid);
						titleName = '产品SN历史明细',
						dialogName = 'editTabProcess',
						tabName = 'process_tab',
						dgrid = $('#process_tab').datagrid('options'),
						prfCd = row.BAR_CODE;
						wono = row.WO_NO;
						$("#ProcessTitle").html("<label>产品SN："+prfCd+"</label>");
//						if(row.PRF_CD!=undefined && row.PRF_CD!=''){
								/*验证此工序数据是否已经保存*/
//								 var ajaxSelect = {
//				                         url: '/iPlant_ajax',
//				                         dataType: 'JSON',
//				                         data: {
//				                        	 PRF_CD:row.PRF_CD,
//				                             IFS: 'GX00001'
//				                         },
//				                         successCallBack: function (data) {
//				                        	 if(data.RESPONSE[0].RESPONSE_DATA.length == 0){
//				                        		 $.messager.alert('提示','请先维护并保存工艺路线信息后再定义工序信息！');
//				     							 return;
//				                        	 }else{
//				                        		 reqData = {IFS: 'GX00021',PRF_CD:row.PRF_CD,pageIndex: 1,pageSize: dgrid.pageSize};
				         						 openDialogFrame(tabName,dialogName,titleName,reqData);
				         						 OpenFrameAttribute(prfCd,wono);
//				                        	 }
//				                         },
//				                         errorCallBack: function (data) {
//				                         	showmessage.html('<font color=red>删除失败！</font>');
//				                            return;
//				                         }
//				                     };
//					                iplantAjaxRequest(ajaxSelect);
					              /*验证此工序数据是否已经保存	END*/
//						}else{
//							$.messager.alert('提示','请先维护并保存工艺路线信息后再定义工序信息！');
//							return;
//						}
		        	};
					
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid({"onLoadSuccess":function(data){
//				if(data.rows.length == 0){
//					OpenFrameAttribute('');
//			    }else{
//			    	OpenFrameAttribute(data.rows[0].SN_NO);
//				    $('#header-bottom').html(data.rows[0].SN_NO+':');
//			    }
			}}).datagrid('loadData', jsonData);
		}
		
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
			if(checkNotEmpty(reqData)){
				dialogDataGrid('/iPlant_ajax', tabName, reqData);
			}
		};
	}
	/*底部的关联表格*/   
	OpenFrameAttribute = function(SN_NO,WO_NO){
		var tabName = 'process_tab';
		var dgridOp = $('#'+tabName).datagrid('options');
		if(!dgridOp) return;
		var reqDataA = {
			IFS: 'MF00104',
			BAR_CODE: SN_NO,
			WO_NO:WO_NO,
			pageIndex: 1,
			pageSize: dgridOp.pageSize	
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
		dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
			var columnsTab,edDataGrid,messageInfo;
			columnsTab=[
						{field:'PREV_ROUT_CD',title:'工位编码',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field:'ROUTE_NAME',title:'工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						    options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						    {field: 'CRT_DT',title: '创建时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
//					{field: 'FCT_NM',title: '工厂名称',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//						   options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},  
//					{field:'MO_NO',title:'工单号',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},  
//				    {field:'WO_NO',title:'作业指示号',width:140,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},	   
//				    {field: 'ITEM_CD',title: '物料编码',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
//					       options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},
//		            {field: 'ITEM_NM',title: '物料名称',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},editor:{type:'validatebox',
//			        	   options:{validType:['length[1,30]','specialTextCharacter']}}}, 
//	        	    {field:'BAR_CODE',title:'产品SN',width:120,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//					       options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},	
//			        {field:'PREV_ROUT_CD',title:'前一个工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//			        {field:'PREV_ROUT_NM',title:'前一个工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//				    {field:'CURR_ROUT_CD',title:'当前工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//					      options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//			        {field:'CURR_ROUT_NM',title:'当前工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//			              options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},      
//				    {field:'NEXT_ROUT_CD',title:'下一个工位',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//					      options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//			        {field:'NEXT_ROUT_NM',title:'下一个工位名称',width:130,align:'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
//				          options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
//					{field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
//					{field: 'CRT_DT',title: '创建时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
//					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
//					{field: 'UPT_DT',title: '修改时间',width: 160,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						    ];
			var gridLists = {
				name: tabName,
				dataType: 'json',
				columns: [columnsTab]
			}
			initEditorDataGridView(reqDataA, gridLists);
			$('#'+tabName).datagrid('loadData', jsonData);
		}
	}

	/*检索*/
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#WorkingMaterial_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
			});
		}
	}
	var fcfo = new factoryInfo();
	fcfo.init();
})();