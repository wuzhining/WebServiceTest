/* 启动时加载 */
/*
 */
(function() {
	function sysRuleInfo() {
		initTreeGridData = function() {
			var dgrid = dataGrid.treegrid('options');
			if(!dgrid) return;
			searchITEM_CD = $('#search_MaterialType').textbox('getValue');
			searchCD=  $("#search_BOMcoding").textbox('getValue');
			var reqData = {
				IFS: 'Z000033',
				FCT_CD:searchITEM_CD,
				BOM_CD:searchCD,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqTreeGridData('/iPlant_ajax', 'bomProduct_tab', reqData);
		}
		var tmp1 = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "MB00026",
                	  PRF_TYPE:'-1'
                },
              
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPRFCD.push({'value':obj.PRF_CD,'text':obj.PRF_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(tmp1);
		
		var Unit = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "MB00040"},
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataUnit.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(Unit);

		
		bindTreeGridData = function(reqData,jsonData) {
			var gridList = {
				name: 'bomProduct_tab',
		        parentField: "_parentId",
		        textFiled: "ST_C_CD",
		        idField: "ST_C_CD",
		        treeField:"ST_C_CD",
		        state: "closed",
		        pagination: true,
	            pageSize: 3,
	            pageList: [3,10,15],
				dataType: 'json',
				columns: [[
					{field: 'ST_C_CD',title: 'BOM编码',width: 170,align: 'left',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},	  
				    {field: 'ST_C_NM',title: 'BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		        	      options:{validType:['length[1,400]','specialTextCharacter']}}},			  
		            {field: 'ST_P_CD',title: '母BOM编码',width:130 ,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						  options:{ validType:['length[1,50]']}}},	
				    {field: 'ST_P_NM',title: '母BOM名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
		 	    	      options:{ validType:['length[1,400]','specialTextCharacter']}}},
				    {field: 'FT_NM',title: '工厂名称',width: 120,align: 'center'},	  
	    		    {field: 'UOM',title: '单位',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.UOM_NM || value)+ "</span>";},
        	    		 editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataUnit,editable:false}}},		  
		    		{field: 'UNIT_QTY',title: '单机用量',width: 60,align: 'right',editor:{type:'numberbox', options:{precision:8}}, 
	            	      formatter:function(value,row,index){ return formatNumber(value,0);}},	 		
	    		    {field: 'VALID_STAT_DT',title: '有效开始日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_STAT_DT){return row.VALID_STAT_DT;}},
            		     editor:{type:'datebox',}}, 
    	    		{field: 'VALID_END_DT',title: '有效结束日期',width: 150,align: 'center',formatter:function(value,row,index){if(row.VALID_END_DT){return row.VALID_END_DT;}},
	            		   editor:{type:'datebox',}}, 
    	    		{field: 'PRF_CD',title: '工艺名称',width: 130,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.PRF_NM || value)+ "</span>";},
        	    		 editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPRFCD,editable:false}}},	
    	    		{field: 'MD_CL',title: '成型周期',width:60,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'numberbox', options:{precision:0}}, 
		            	      formatter:function(value,row,index){ return formatNumber(value,0);}},
    	    		{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},
					      editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
			        {field: 'MO',title: '说明',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
        	    		  options:{validType:['length[1,500]','specialTextCharacter']}}},	
	    		    {field: 'CRT_ID',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_ID',title: '修改人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
					{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				]],
				
				/**下拉框结束编辑模式的操作*/
			     onEndEdit:function(row){
			    	 var edd2 = $(this).treegrid('getEditor', {index: row.ST_C_CD,field: 'UOM'});
			    	 row.UOM = $(edd2.target).combobox('getValue');
			    	 row.UOM_NM = $(edd2.target).combobox('getText');
			    	 
			    	 var edd = $(this).treegrid('getEditor', {index: row.ST_C_CD,field: 'PRF_CD'});
			    	 row.PRF_CD = $(edd.target).combobox('getValue');
			    	 row.PRF_NM = $(edd.target).combobox('getText');
			    	 
			     },
			     /**进入编辑模式的操作*/
			     onBeforeEdit:function(row){
			    	 showmessage.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     /**编辑模式进入之后的操作*/
			     onAfterEdit:function(row,changes){
			    	 /**判断是否进行数据变更*/
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).treegrid('refreshRow', row.ST_C_CD);
			     },
			     onCancelEdit:function(row){
		            row.editing = false;
		            $(this).treegrid('refreshRow', row.ST_C_CD);
		        },
		        /**单击进入编辑模式*/
		        onClickRow: function (row) {
		        	var index = row.ST_C_CD;
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		var rowEdit = dataGrid.treegrid('getSelected');
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.treegrid('getSelected');
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					addTreeGridEditor(dataGrid,index);
			    					if(!checkNotEmpty(rowEdit.editType)){	/*如果是修改的情况，ST_C_CD字段为只读模式*/
							    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
							    		fc = ed.target;
	    					    		fc.prop('readonly',true);
	    					    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
							    		fc = ed.target;
	    					    		fc.prop('readonly',true);
						    		}
			    				}else{
			    					addDatagridEditor(dataGrid,index);
			    					 if(!checkNotEmpty(row.editType)){
		    					    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
		    					    		fc = ed.target;
		    					    		fc.prop('readonly',true);
		    					    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
								    		fc = ed.target;
		    					    		fc.prop('readonly',true);		
		    				    		}
			    				}
			    			}else{
			    				addTreeGridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(rowEdit.editType)){
							    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
							    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
							    		fc = ed.target;
	    					    		fc.prop('readonly',true);		
						    		}
			    			}
			    		}else{
			    			addTreeGridEditor(dataGrid,index);
			    			 if(!checkNotEmpty(rowEdit.editType)){
						    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_C_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
						    		ed = $(this).treegrid('getEditor', {index: index,field: 'ST_P_CD'});
						    		fc = ed.target;
 					    		fc.prop('readonly',true);		
					    		}
			    		}
			    	}
	            }
			}
			initTreeGrid(reqData, gridList);
			dataGrid.treegrid('loadData', jsonData);
		},

		
		/**批量新增和修改的保存*/
		saveTreeDataGrid=function(){
            if (endTreeGridEditing(dataGrid)){
            	/*判断后变更数据*/
            	if (dataGrid.treegrid('getChanges').length) {
                    var inserted = dataGrid.treegrid('getChanges', "inserted");  
                    var updated = dataGrid.treegrid('getChanges', "updated");
                    var deleted = dataGrid.treegrid('getChanges', "deleted");
                    /**装载数据*/
                    var arrInsert = new Array(),arrUpdate = new Array(),strInsert = new Array(),strUpdate = new Array();
                    if(inserted.length>0){
                    	for(var m=0;m<inserted.length;m++){
                    		arrInsert.push({ 
                    			BOM_NM: inserted[m].ST_C_NM,
                    			PRNT_BOM_NM: inserted[m].ST_P_NM,
                    			FCT_CD: inserted[m].FCT_CD,
                    			BOM_ST: inserted[m].BOM_ST,
                    			UNIT_QTY: inserted[m].UNIT_QTY,
                    			UOM: inserted[m].UOM,
                    			CRT_ID: inserted[m].CRT_ID,
                    			CRT_DT: inserted[m].CRT_DT,
                    			USE_YN: inserted[m].USE_YN,
                    			BOM_CD: inserted[m].ST_C_CD,
                    			PRF_CD: inserted[m].PRF_CD,
                    			VALID_STAT_DT: inserted[m].VALID_STAT_DT,
                    			VALID_END_DT: inserted[m].VALID_END_DT,
                    			MD_CL: inserted[m].MD_CL,
                    			MO: inserted[m].MO,
                    			PRNT_BOM_CD: inserted[m].ST_P_CD
                    		});
                    		
                    	}
                    	/*批量先增*/
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'Z000030'
                            },
                            successCallBack: function (data) {
                            	initTreeGridData();
                            	dataGrid.treegrid('reload');  
                            	dataGrid.treegrid('acceptChanges'); 
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        iplantAjaxRequest(ajaxInsert);
                    }
                    if(updated.length>0){
                    	for(var m=0;m<updated.length;m++){
                    		if(updated[m].editType=='add'){
                    			arrInsert.push({ 
                        			BOM_NM: updated[m].ST_C_NM,
                        			PRNT_BOM_NM: updated[m].ST_P_NM,
                        			FCT_CD: updated[m].FCT_CD,
                        			BOM_ST: updated[m].BOM_ST,
                        			UNIT_QTY: updated[m].UNIT_QTY,
                        			UOM: updated[m].UOM,
                        			CRT_ID: updated[m].CRT_ID,
                        			CRT_DT: updated[m].CRT_DT,
                        			USE_YN: updated[m].USE_YN,
                        			BOM_CD: updated[m].ST_C_CD,
                        			PRF_CD: updated[m].PRF_CD,
                        			MD_CL: updated[m].MD_CL,
                        			VALID_STAT_DT: updated[m].VALID_STAT_DT,
                        			VALID_END_DT: updated[m].VALID_END_DT,
                        			MO: updated[m].MO,
                        			PRNT_BOM_CD: updated[m].ST_P_CD
                        		});
	                    	}else{
	                    		if(updated[m].edited){
	                    			arrUpdate.push({ 
	                    				BOM_NM: updated[m].ST_C_NM,
	                        			PRNT_BOM_NM: updated[m].ST_P_NM,
	                        			FCT_CD: updated[m].FCT_CD,
	                        			BOM_ST: updated[m].BOM_ST,
	                        			UNIT_QTY: updated[m].UNIT_QTY,
	                        			UOM: updated[m].UOM,
	                        			CRT_ID: updated[m].CRT_ID,
	                        			CRT_DT: updated[m].CRT_DT,
	                        			USE_YN: updated[m].USE_YN,
	                        			BOM_CD: updated[m].ST_C_CD,
	                        			PRF_CD: updated[m].PRF_CD,
	                        			VALID_STAT_DT: updated[m].VALID_STAT_DT,
	                        			VALID_END_DT: updated[m].VALID_END_DT,
	                        			MD_CL: updated[m].MD_CL,
	                        			MO: updated[m].MO,
	                        			PRNT_BOM_CD: updated[m].ST_P_CD
	                    			});
	                    		}
	                    	}
                    	}
                    	/*批量先增*/
                        var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrInsert,
                                IFS: 'Z000030'
                            },
                            successCallBack: function (data) {
                            	initTreeGridData();
                            	dataGrid.treegrid('reload');  
                            	dataGrid.treegrid('acceptChanges'); 
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            },
             
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                            
                        };
                        if(arrInsert.length>0){
                        	iplantAjaxRequest(ajaxInsert);
                    	}
                        /*批量修改*/
                        var ajaxUpdate = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'Z000031'
                            },
                            successCallBack: function (data) {
                            	initTreeGridData();
                            	dataGrid.treegrid('acceptChanges');
                            	showmessage.html('<font color=red>保存成功！</font>');
                                return;
                            	 
                            },
                            errorCallBack: function (data) {
                            	showmessage.html('<font color=red>保存失败！</font>');
                                return;
                            }
                        };
                        if(arrUpdate.length>0){
                        	iplantAjaxRequest(ajaxUpdate);
                    	}
                    }
                }else{
                	showmessage.html('<font color=red>没有进行变更！</font>');
                }
			}else{
				showmessage.html('<font color=red>请输入必填项！</font>');
			}
		},
		/**删除行*/
		deleteTreeDataGrid=function (){
			/**删除行有2中情况，一种新增的还没有保存，一种是原来就有的直接删除*/
			var indexs = treegridEditorRows(),del = [],row;
			if(indexs.length>0){
				$.messager.confirm("确认框", "您确定要删除您所选择的数据?",function(a) {
					if(a){
						for(var j=0;j<indexs.length;j++){
							row = dataGrid.treegrid('find',indexs[j]);
							if(checkNotEmpty(row.ST_C_CD)){
	                        	var str = {
				                        url: "/iPlant_ajax",
				                        dataType: "JSON",
				                        data: {
				                            IFS: "Z000032",
				                            ST_C_CD: row.ST_C_CD,   
				                            BOM_CD: row.BOM_CD
				                        },
				                        successCallBack: function(data) {
			                        	initTreeGridData();
			                        	dataGrid.treegrid('remove', row.ST_C_CD );
				                     }
	                        	  };
				               iplantAjaxRequest(str);
							}else{
								/**判断多个空行只删除最顶上的*/
								del.push(indexs[j]);
							}
						}
						if(del.length>0){
							dataGrid.treegrid('remove', del[0]);
						}
						if(del.length==1){
							editIndex = undefined;
						}
						showmessage.html('<font color=red>删除成功！</font>');
					}
	            })
			}else{
				showmessage.html('<font color=red>请选中要删除的数据！</font>');
			}
		};
		/**插入一个新的空白行*/		
		insertTreeDataGrid=function (){
			
			var id,parentId,SYS = '0';
			var row = dataGrid.treegrid('getSelected');
			if(row){
				 rowId = row.ST_C_CD;
				 parentId = row.ST_C_CD;
				 parentNM= row.ST_C_NM;
			}else{
				 rowId = '';
				 parentId = '';
				 parentNM = ''
			}
			id = autoCreateCode(SYS);
			dataGrid.treegrid('append', {
				parent: rowId,
				data: [{
					gridId:'bomProduct_tab',
					ST_C_CD:id,
					ST_P_CD:parentId,
					ST_C_NM:"",
					editType:'add',
					ST_P_NM:parentNM
				}]

			});
			
			/**新增一个字段判断是否为新增*/
			var rowEdit = dataGrid.treegrid('getSelected');
			dataGrid.treegrid('beginEdit',id);
			if (editIndex != id){
				if (endTreeGridEditing(dataGrid)){
					editIndex = id;
				} else {
				}
			}else{
				endTreeGridEditing(dataGrid);
			}
		}
		
		/*新增判断重复的父级BOM*/
		addCheck =function(repeat){
			var ajaxdew={	/*重复*/
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'Z000051',
                        BOM_CD:repeat,
                    },
                    successCallBack:function(data){
                    	console.log(data);
                    	var rowCollection=createSourceObj(data); 
                    	 if (rowCollection.length >0){
                    		 $.messager.alert('提示', '已有相同编码为父级结构，请重新选择');
                    		 $("#BOMCoding").combobox("clear");
                    		 $("#parentBOMCoding").combobox("clear");
                    		 return;
                    	 }
                    }
                }
            iplantAjaxRequest(ajaxdew);
		}
		
		/* 添加编码弹出框 */
		addCustom=function() {
			$("#enditTabBOM").dialog("open").dialog('setTitle', '产品BOM增加');
			clearallinput();
			/*绑定*/
			
			$("#parentBOMCoding").combobox({  
	             onChange:function(n,o){
	            	/*警告重复*/
	            	var repeat= $("#BOMCoding").combobox('getText');
	            	 
	            	if(n=="顶层父节点"){/*子父情况不同*/	
	            		if (repeat!=""){
	            			addCheck(repeat);
	            		}
	            		
	            		$('#Singledosage').numberbox({
	            			disabled : true,
	            			prompt:'无需输入'
	            		});
	            		$('#Singledosage').numberbox('setValue','');
						$('#technologicalprocess').combo({
							readonly : true,  
							required : false,
							prompt:'无需输入'
	            		});
	            	 }else{
	            		$('#Singledosage').numberbox({
	            			disabled : false,
		            		 required: true,
		            		 prompt:'',
		            		 missingMessage:'该选项为必填信息' 
		            		});
						$('#technologicalprocess').combo({
							readonly : false,
							required : true,
							prompt:'',
							 missingMessage:'该选项为必填信息' ,
	            		});
	            	 }
	            	 $("#parentBOMname").textbox('setValue',n);
	             }})  
          	$("#BOMCoding").combobox({  
	             onChange:function(n,o){  
	            	 $("#BOMName").textbox('setValue',n);
	            	 $("#parentBOMCoding").combobox("clear");
             }}) 
           /*时间默认*/
           formatterDate = function(date) {
					var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
					var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"+ (date.getMonth() + 1);
					return date.getFullYear() + '-' + month + '-' + day;
					};
			$('#startdate').datebox('setValue', formatterDate(new Date()));
			$('#enddate').datebox('setValue', formatterDate(new Date()));
			/*bOM编码*/
			var ajaxParam5={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'MB00018',
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].ITEM_NM, "text":rowCollection[i].ITEM_CD});
                        }
                        $('#BOMCoding').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                    }
                }
            iplantAjaxRequest(ajaxParam5);
			
			/*母bOM编码*/
			var ajaxParam4={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'Z000051',
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        arr.push({"id":"顶层父节点", "text":"N/A"});
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].BOM_NM, "text":rowCollection[i].BOM_CD});
                        }
                        $('#parentBOMCoding').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                    }
                }
            iplantAjaxRequest(ajaxParam4);
			
			/*工艺*/
			var ajaxParam3={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'MB00026',
                        PRF_TYPE:'-1'
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].PRF_CD, "text":rowCollection[i].PRF_NM});
                        }
                        $('#technologicalprocess').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                    }
                }
            iplantAjaxRequest(ajaxParam3);
			/*工厂*/
			var ajaxParam2={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'B000021',
                    },
                    successCallBack:function(data){
                        var rowCollection=createSourceObj(data); 
                        var arr = [];
                        for(var i=0; i< rowCollection.length; i++){
                        	arr.push({"id":rowCollection[i].FT_CD, "text":rowCollection[i].FT_NM});
                        }
                        $('#plantName').combobox({
                            data:arr,
                            valueField:'id',
                            textField:'text',
                            panelWidth:200
                        });
                    }
                }
            iplantAjaxRequest(ajaxParam2);
			/*单位*/
			var Unit = {
					 url:'/iPlant_ajax',
	                    data:{
	                        IFS:'MB00040',
	                    },
	                    successCallBack:function(data){
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"id":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#unit').combobox({
	                            data:arr,
	                            valueField:'id',
	                            textField:'text',
	                            panelWidth:200
	                        });
	                    }
	            };
			iplantAjaxRequest(Unit);
		}
		/*弹出验证*/
		checkDataValid = function() {
			var a = $("#BOMCoding").combobox('getValue'),		/*bom编码*/
			b = $("#Singledosage").numberbox('getValue'),		/*单机用量*/
			c = $('#parentBOMCoding').combobox('getValue'),		/*母bom编码*/
			d = $('#plantName').combobox('getValue'),			/*工厂名称*/
			e = $('#unit').combobox('getValue'),				/*单位*/
			f = $('#technologicalprocess').combobox('getValue');/*工艺名称*/
			if (c=="顶层父节点"){
				if ("" == a || "" ==c || ""==d || ""==e)
					return !1;
				return 1;
			}else{
				if ("" == a || "" == b || "" ==c || ""==d || ""==e || ""==f)
					return !1;
				return 1;
			};
			
         },
         /*威猛先生清除残留*/
         clearallinput = function(){
        	 $('#BOMName').textbox('clear');
        	 $('#parentBOMname').textbox('clear');
        	 $('#Singledosage').numberbox('clear');
        	 $('#moldingcycle').numberbox('clear');
         }
		/* 页面保存按钮通用*/
		savaStation = function() {
        	if (!checkDataValid()) return void $.messager.alert("提示", "请添加必选信息");
			var arrInsert = new Array()
			arrInsert.push({ 
    			BOM_NM: $('#BOMCoding').combobox('getValue'),
    			PRNT_BOM_NM: $('#parentBOMCoding').combobox('getValue'),
    			FCT_CD: $('#plantName').combobox('getValue'),
    			BOM_ST: $('#txtBOM_ST').val(),
    			UNIT_QTY: $('#Singledosage').val(),
    			UOM: $('#unit').combobox('getValue'),
    			USE_YN: $('#available').val(),
    			BOM_CD: $('#BOMCoding').combobox('getText'),
    			PRF_CD: $('#technologicalprocess').combobox('getValue'),
    			MD_CL: $('#moldingcycle').val(),
    			VALID_STAT_DT: $('#startdate').datebox('getValue'),
    			VALID_END_DT: $('#enddate').datebox('getValue'),
    			PRNT_BOM_CD: $('#parentBOMCoding').combobox('getText'),
    			MO: $('#txtNote').val()
    		});
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					list: arrInsert,
                    IFS: 'Z000030'
				},
				successCallBack: function(data) {
					if($.messager.alert('提示', '新增成功！')) {
						$('#enditTabBOM').dialog('close');
						initTreeGridData();
					}
				},
				errorCallBack: function() {
					$.messager.alert('提示', '新增失败！');
				}
			};
			iplantAjaxRequest(ajaxParam);
			$("#enditTabBOM").dialog("close");
		}
         
		/*查询*/
		searchDataGrid=function(dgrid){
			initTreeGridData();
		}
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '产品BOM导入');
		}
	     setDataNull=function(){
			 $('#showFileName').html('');
		}
	     
	     importFile = function (){
	    	   /* 以下即为完整客户端路径*/
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
	    				   $('#FILE_BELONG').val("BOM_CD"),
	    		    	   $('#FILE_CLS').val("import"),
	    		    	   $('#FILE_TYPE').val('xlsx'),
	    		    	   $('#importType').val('1'),
	    		    	   $('#IFS').val('Z000050');
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
	    		                	$.messager.alert("提示", data[0].msg);
	    		                }
	    		            });
	    			   }else{
	    				   $('#showFileName').html('<font color=red>请输入excel文件！</font>');
	    				   return false;
	    			   }
	    		   }
	    	   }
		   };
	}

	sysRuleInfo.prototype = {
		init: function() {
			$(function() {
				/*初始化全局变量对象*/
				dataGrid = $('#bomProduct_tab'),
				dataCompany = [],dataFactory=[],dataTmp=[],dataUnit=[],dataPRFCD=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initTreeGridData();
				/*获取工厂类别下拉*/
				$('#btnSearch').click(function() {					
					searchDataGrid();
				});
				$('.add').click(function() {	
					addCustom();
				});
				
				$('.delete').click(function(){
					deleteTreeDataGrid();
	            });

				$('#btnSave').click(function() {
					saveTreeDataGrid();
				});
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'Z000033'
	                	}
	                	createTable('tbIMESReport','产品BOM导出','bomProduct_tab',reqData);
	                });
			});
		}
	}
	var sysRule = new sysRuleInfo();
	sysRule.init();
})();