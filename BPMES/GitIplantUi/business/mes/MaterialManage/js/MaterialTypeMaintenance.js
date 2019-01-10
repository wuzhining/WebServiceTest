/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
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
			
			var itemAttr = {
		            url: "/iPlant_ajax",
		            dataType: "JSON",
		            data: {IFS: "Z000045"},
		            successCallBack: function(a) {
		            	var op = a.RESPONSE[0].RESPONSE_DATA;
		                $.each(op,function(n,obj) {
		                	dataitemAttr.push({'text':obj.ITEM_GROUP_ATTR,'value':obj.ITEM_GROUP_ATTR});
		                	ITEMATTR[a.RESPONSE[0].RESPONSE_DATA[n].ITEM_GROUP_ATTR]=a.RESPONSE[0].RESPONSE_DATA[n].ITEM_GROUP_ATTR_NM;
					    });  
		            },
		            errorCallBack: function() {
		                $.messager.alert("提示", '请联系管理员，查询失败！');
		            }
		        };
			iplantAjaxRequest(itemAttr);
			
			var search_MaterialType = $('#search_MaterialType').textbox('getValue');
			var reqData = {
				IFS: 'Z000001',
				ITEM_TYPE_CD:search_MaterialType,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'MaterialTypeMaintenance_tab', reqData);
		},
		
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'MaterialTypeMaintenance_tab',
				dataType: 'json',
				columns: [[
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
					{field: 'ITEM_TYPE_CD',title: '物料类别编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_TYPE_NM',title: '物料类别描述',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'img1',title: '物料组属性',width: 80,align: 'center',formatter:function(){
						   return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					{field: 'img2',title: '已分配物料',width: 80,align: 'center',formatter:function(){
						   return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}}, 
					{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				    {field: 'MO',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{validType:['length[1,25]','specialTextCharacter']}}},
				    {field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						   
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(ed.target).combobox('getValue');
			    	 row.FCT_NM = $(ed.target).combobox('getText');
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
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCD,reqData,dgrid,reqDataPro;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	/**判断是否为可编辑字段*/
		        	if(field=='img1'){
		        		endEditingAll(dataGrid);
		        		dgrid = $('#MaterialTypeMaintenance_tab').datagrid('options'),
		        		tabName = 'MaterialGroupSetiing',
		        		dialogName = 'MaterialType_open',
		        	    titleName  = '物料组属性',
						dgrid.itemCD = row.ITEM_TYPE_CD,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'Z000046',ITEM_CD:row.ITEM_TYPE_CD,pageIndex: 1,pageSize: dgrid.pageSize},
						$("#MaterialTypeID").textbox('setValue',row.ITEM_TYPE_CD);
						OpenFrame(reqData, dialogName, titleName, tabName,reqDataPro);
						OpenFrameAttribute(row.ITEM_TYPE_CD,row.FCT_CD);
		        	}else if(field=='img2'){
		        		endEditingAll(dataGrid);
		        		dgrid = $('#MaterialTypeMaintenance_tab').datagrid('options'),
		        		$("#MSDtitle").html("<label>物料编码："+row.ITEM_TYPE_CD+"</label><label>&nbsp;&nbsp;物料描述："+row.ITEM_TYPE_NM+"</label>"),
		        		tabName = 'AssignedMaterial',
		        		dialogName = 'MaterialType_open_YI',
		        	    titleName  = '已分配物料',
						dgrid.itemCD = row.ITEM_TYPE_CD,
						dgrid.fctCd = row.FCT_CD,
						reqData = {IFS: 'Z000005',ITEM_CD:row.ITEM_TYPE_CD,FCT_CD:row.FCT_CD,pageIndex: 1,pageSize: dgrid.pageSize},
		        		OpenFrame(reqData, dialogName, titleName, tabName);
		        	}else{
			        	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工单编码重复*/
				    			rowEdit = dataGrid.datagrid('getRows')[editIndex],editem = $(this).datagrid('getEditor', {index: editIndex,field: 'ITEM_TYPE_CD'}),editorFt = editem.target,itemCD = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(itemCD)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'Z000001',
													ITEM_TYPE_CD : itemCD,
													pageIndex : 1,
													pageSize : 10
												},
												successCallBack : function(data) {
													rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
													if (rowNum > 0) {
														dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											       		showmessage.html('<font color=red>您输入的物料编码['+ itemCD + ']已有相同,请重新输入!</font>');
											       		return false;
													} else {
														addDatagridEditor(dataGrid,index);
													}
												}
											};
											iplantAjaxRequest(ajaxParam);
						    			}else{
							        	   addDatagridEditor(dataGrid,index);
						    			}
				    				}else{
				    					addDatagridEditor(dataGrid,index);
				    					if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'ITEM_TYPE_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
					    		}
				    		}
				    	}
		        	}
		        },
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		}
	}
	
	OpenImprotFrame = function(){
		$("#enditTabupload").dialog("open").dialog('setTitle', '物料类型维护导入');
	}
	/*显示图片*/
    importFile = function (){
 	   /*以下即为完整客户端路径*/
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
	OpenFrame =function(reqData, dialogName, titleName, tabName){
		$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
		if(checkNotEmpty(reqData)){
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
		}
	}
	
	OpenFrameAttribute = function(ITEM_GROUP_ATTR,FCT_CD){
		var dgrid = dataGrid.datagrid('options');
		if(!dgrid) return;
		
		var reqDataA = {
			ITEM_GROUP_ATTR: ITEM_GROUP_ATTR,
		    FCT_CD: FCT_CD,
			IFS: 'Z000045',
			pageIndex: 1,
			pageSize: dgrid.pageSize
		}
		reqGridData('/iPlant_ajax', 'MaterialTypeView', reqDataA);
		
		bindGridData = function(reqDataA, jsonData) {
			var tabName = 'MaterialTypeView';
			var edDataGrid = $('#'+tabName);
			var gridLists = {
				name: 'MaterialTypeView',
				dataType: 'json',
				columns: [[
				    {field: 'ID',title: '修改时间',width: 150,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
					{field: 'ITEM_GROUP_ATTR',title: '物料属性编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				    	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'ITEM_GROUP_ATTR_NM',title: '物料属性名称',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				    	options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'MO',title: '备注',width: 140,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			     ]],
			     /**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
			    	 row.FCT_CD = $(ed.target).combobox('getValue');
			    	 row.FCT_NM = $(ed.target).combobox('getText');
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(index,row){
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
			    onClickRow: function (index, row) {
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
			    			if(tabName=='MaterialTypeView'){
			    				addDatagridEditor(edDataGrid,index);
			    			}
			    		}else{
			    			addDatagridEditor(edDataGrid,index);
			    		}
			    	}
	           }
			}
			initGridView(reqDataA, gridLists);
			$('#MaterialTypeView').datagrid('loadData', jsonData);
		}
	}
	
	dialogEditorDataGrid = function(tabName,reqData, jsonData) {
		/*根据tabName判断哪个列表*/
		var columnsTab,edDataGrid,messageInfo;
		if(tabName=='MaterialGroupSetiing'){
			columnsTab=[
			    {field: 'ID',title: 'id',width: 150,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},        
			    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},
				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false}}},
			    {field: 'ITEM_CD',title: '物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
			    {field:'ITEM_GROUP_ATTR',title: '物料属性编码', width:120,align:'center',
                     editor:{  
                         type:'combobox',
                         options:{
                         	valueField:'value',
                             textField:'text',
                             panelWidth:120,
                             panelHeight:120,
                             editable:false,
                             data:dataitemAttr,
                             onSelect:function(data){	
                             	console.log(data)
									var target = $('#MaterialGroupSetiing').datagrid('getEditor', {'index':ccIndex,'field':'ITEM_GROUP_ATTR_NM'}).target;
									target.textbox('setValue', ITEMATTR[data.value]);
								}
                         }    
                     }
                   },
                  {field:'ITEM_GROUP_ATTR_NM', title: '物料属性名称', width:150,align:'center',editor:{type:'textbox',options:{editable:false}}}, 
			    
			    {field: 'ITEM_GROUP_ATTR_VAL',title: '物料属性值',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				    	options:{validType:['length[1,25]','specialTextCharacter']}}}, 
				{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						options:{validType:['length[1,100]','specialTextCharacter']}}},
				{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'CRT_DT',title: '创建时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_DT',title: '修改时间',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			];
			edDataGrid = $('#'+tabName);
			messageInfo = $('#showMessageSetInfo');
		}else if(tabName=='AssignedMaterial'){
			columnsTab=[
				{field: 'ITEM_CD',title: '物料编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
				{field: 'ITEM_NM',title: '物料描述',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
				{field: 'ITEM_TYPE',title: '物料类别',width: 120,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.CP_NM  || value)+ "</span>";},
					editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataCompany,required:true}}}, 
				{field: 'MO',title: '备注',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						options:{validType:['length[1,100]','specialTextCharacter']}}},
				{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
				{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
				{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
				{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
			];
			edDataGrid = $('#'+tabName);
		}
		var gridList = {
			name: tabName,
			dataType: 'json',
			pagination:false,
			rownumbers:true,
			loadMsg: '数据加载中...',
			columns: [columnsTab],
			/**结束编辑模式的操作*/
		     onEndEdit:function(index,row){
		    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});
		    	 row.FCT_CD = $(ed.target).combobox('getValue');
		    	 row.FCT_NM = $(ed.target).combobox('getText');
		    	 
		     },
		     /**进入编辑模式的操作*/
		     onBeforeEdit:function(index,row){
		    	 messageInfo.html('');
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
		    onClickRow: function (index, row) {
		    	 ccIndex=index;
            	 eeEndEdit('MaterialGroupSetiing');
		    	if (editIndex != index){
		    		var ed,fc,editorFt;
		    		if(editIndex!=undefined){
		    			if(tabName=='MaterialGroupSetiing'){
		    				addDatagridEditor(edDataGrid,index);
		    			}
		    		}else{
		    			addDatagridEditor(edDataGrid,index);
		    		}
		    	}
           }	
         }
         initGridView(reqData, gridList);
		$('#'+tabName).datagrid('loadData', jsonData);
     }
	
	ImportStation =function(){
    	var webroot=document.location.origin;
  	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
  	   if(pic.files.length>0){
  		   file = pic.files[0],fileName = file.name,fileType=file.type;
  		   if(fileName.indexOf('.')>0){
  			   temp=fileName.split('.');
  			   strSrc = temp[temp.length-1];
  			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
  				   $('#FILE_BELONG').val("MO_NO"),
  		    	   $('#FILE_CLS').val("import"),
  		    	   $('#FILE_TYPE').val('xlsx'),
  		    	   $('#importType').val('1'),
  		    	   $('#IFS').val('Z000002');
  				   var formData = new FormData($( "#importUplod" )[0]);  
  				   $.ajax({
  		                cache: true,
  		                type: "POST",
  		                url:webroot+'/iTaurus/iPlant_ImgUpload',
  		                data:formData,/* 你的formid*/
  		                async: false,
  		                processData:false,
  		                contentType:false,
  		                error: function(request) {
  		                	$.messager.alert("提示", '导入失败！');
  		                	console.log(request);
  		                },
  		                success: function(data) {
  		                	$("#enditTabupload").dialog("close");
  		                	initGridData();
  		                	$.messager.alert("提示", '导入成功！');
  		                }
  		            });
  			   }else{
  				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
  				   return false;
  			   }
  		   }
  	   }
    };
     
	eeEndEdit = function(str){
		var rows = $('#'+str).datagrid('getRows');
		if(rows.length>0){
			for(var i=0; i<rows.length; i++){
				$('#'+str).datagrid('endEdit',i);
			}
		}
	},
	
	searchDataGrid=function(dgrid){
		initGridData();
	}
	
	factoryInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#MaterialTypeMaintenance_tab'),dataCompany=[],dataitemAttr=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				
				$('#btnSearch').click(function() {					
					searchDataGrid(dataGrid);
				});
				
				$('#btnAdd').click(function() {
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,USE_YN:"Y"}
					}
					changeCheck="insert";
					insertDataGrid('MaterialTypeMaintenance_tab',initData);
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid('MaterialTypeMaintenance_tab','ITEM_TYPE_CD','Z000004','showMessageInfo');
	            });

				$('#btnSave').click(function() {
					saveDataGrid('MaterialTypeMaintenance_tab','Z000002','Z000003','showMessageInfo');
				});
				
				/*物料组属性设置*/
				$('#btnSetAdd').click(function() {
					 ccIndex=0;
	            	 eeEndEdit('MaterialGroupSetiing');
					var ITEM_GROUP_ATTR = $("#MaterialTypeID").textbox('getValue');
					var initData = {};
					if(dataFactory.length>0){
						initData={FCT_CD:dataFactory[0].value,ITEM_CD:ITEM_GROUP_ATTR,USE_YN:"Y"}
					}
					changeCheck="insert";
					insertDataGrid('MaterialGroupSetiing',initData);	/*初始化默认数据*/
				});
				
				$('#btnSetDelete').click(function(){
					deleteDataGrid('MaterialGroupSetiing','ITEM_GROUP_ATTR','Z000049','showMessageSetInfo');
	            });

				$('#btnSetSave').click(function() {
					saveDataGrid('MaterialGroupSetiing','Z000047','Z000048','showMessageSetInfo');
				});
				/*物料组属性*/
				$('#btnAttAdd').click(function() {
					var initData2 = {};
					if(dataFactory.length>0){
						initData2={FCT_CD:dataFactory[0].value,USE_YN:"Y"}
					}
					changeCheck="insert";
					insertDataGrid('MaterialTypeView',initData2);	/*初始化默认数据*/
				});
				
				$('#btnAttDelete').click(function(){
					deleteDataGrid('MaterialTypeView','ID','Z000056','showMessageAttInfo');
	            });

				$('#btnAttSave').click(function() {
					saveDataGrid('MaterialTypeView','Z000054','Z000055','showMessageAttInfo');
					OpenFrameAttribute();
				});
				
				
				
				$('#btnImport').click(function() {
					OpenImprotFrame();
				});
				
				 $('#btnExprt').click(function(){
	                	var reqData = {
	                			IFS:'Z000001'
	                	}
	                	createTable('tbIMESReport','物料类别维护导出','MaterialTypeMaintenance_tab',reqData);
	                	
	                });
			});
		}
	}
	var changeCheck="";var flag;
	var fcfo = new factoryInfo();var ccIndex= 0;/*全局索引;*/
	var ITEMATTR = {};
	fcfo.init();
})();