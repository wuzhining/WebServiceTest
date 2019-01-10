(function () {
    function RoleMes() {
		pageConfig={
    	    gridName:'roleMes_tab',
    	    RoleMesCode:'RoleMesCode',
    	    RoleMesName:'RoleMesName',
    	    RoleMesUse:'RoleMesUse',
    	    title:'用户组管理',
    	}
    	initGridData=function(){
    		var dgrid=$('#'+pageConfig.gridName).datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'D000025',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	 reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
    	bindGridData = function (reqData,jsonData) {
        	var gridList = {
					name: 'roleMes_tab',
					dataType: 'json',
					columns: [[
						{field: 'GR_CD',title: '用户组编码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'GR_NM',title: '用户组名称',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
						{field: 'USE_YN',title: '是否启用',width: 100,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
						{field: 'GR_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	   options:{validType:['length[1,100]','specialTextCharacter']}}}, 
						{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
						{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
						{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
					/**结束编辑模式的操作*/
				     onEndEdit:function(index,row){
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
				    onClickRow: function (index, row) {
				    	if (editIndex != index){
				    		var ed,fc,editorFt;
				    		if(editIndex!=undefined){
			    				/**判断是否为新增行，并验证新增工厂编码重复*/
				    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'GR_CD'}),editorFt = edft.target,ftCd = editorFt.val();
				    			if(checkNotEmpty(rowEdit.editType)){
				    				if(rowEdit.editType=='add'){
				    					if(checkNotEmpty(ftCd)){
						    				var ajaxParam = {
												url : '/iPlant_ajax',
												dataType : 'JSON',
												data : {
													IFS : 'D000025',
													CP_CD : ftCd,
													pageIndex : 1,
													pageSize : 10
												},
												successCallBack : function(data) {
													rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
													if (rowNum > 0) {
														dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
											       		showmessage.html('<font color=red>您输入的公司编码['+ ftCd + ']已有相同,请重新输入!</font>');
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
				    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，ft_cd字段为只读模式
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'GR_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    				}
				    			}else{
						    		 addDatagridEditor(dataGrid,index);
						    		 if(!checkNotEmpty(row.editType)){
								    		ed = $(this).datagrid('getEditor', {index: index,field: 'GR_CD'});
								    		fc = ed.target;
								    		fc.prop('readonly',true);
							    		}
				    			}
				    		}else{
				    			addDatagridEditor(dataGrid,index);
				    			if(!checkNotEmpty(row.editType)){
						    		ed = $(this).datagrid('getEditor', {index: index,field: 'GR_CD'});
						    		fc = ed.target;
						    		fc.prop('readonly',true);
					    		}
				    		}
				    	}
		            },
				}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
        }
        getDataByCondition = function(){
            var dgrid=$('#'+pageConfig.gridName).datagrid('options');
			var roleMesCode = $('#queryRoleMesCode').textbox('getValue');
			var roleMesName = $('#queryRoleMesName').textbox('getValue');
			var reqData ={
				GR_CD: roleMesCode,
				GR_NM: roleMesName,
				IFS:'D000025',
                pageIndex:1,
                pageSize:dgrid.pageSize
			};
			reqGridData('/iPlant_ajax','roleMes_tab',reqData);
        };  
    }
    RoleMes.prototype = {
        init: function () {
            $(function () {
            	dataGrid = $('#roleMes_tab'),dataCompany=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                //添加鼠标移开事件
                $("input",$("#RoleMesCode").next("span")).blur(function(){
        		    var RoleMesCode = $('#RoleMesCode').val();
        			existCompany(RoleMesCode);
        	    });
                initGridData();
             
                $('#btnAdd').click(function () {
                	insertDataGrid('roleMes_tab',{GR_CD:"",GR_NM:""});
                });
                $('#btnSave').click(function () {
                	saveDataGrid('roleMes_tab','D000026','D000028','showMessageInfo');
                });
                $('#btnDelete').click(function(){
                	deleteDataGrid('roleMes_tab','GR_CD','D000027','showMessageInfo');
                });
                $('#btnSearch').click(function(){
                	getDataByCondition();
				});
				 
                $('#confirm').click(function(){
					getDataByCondition();	
				});
            });
        }
    }
    var pCode = new RoleMes();
    pCode.init();
})();
