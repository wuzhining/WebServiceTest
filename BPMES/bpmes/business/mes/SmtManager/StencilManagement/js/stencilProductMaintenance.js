/* 启动时加载 */
/*
 */
(function() {
	function factoryInfo() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var searchSC_CD = $('#searchSC_CD').textbox('getValue');
			var searchSC_NM = $('#searchSC_NM').textbox('getValue');
			var searchPCB = $('#searchPCB').textbox('getValue');
			var reqData = {
				IFS: 'ST00033',
				SC_CD:searchSC_CD,
				SC_NM:searchSC_NM,
				PCB_MAT_CD:searchPCB,
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'stencilProductMaintenance_tab', reqData);
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
		iplantAjaxRequest(tmp);
		
		stencil = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS:'ST00029'},
                successCallBack: function(a) {	
                	dataStencil = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataStencil.push({'text':obj.SC_LB,'value':obj.SC_LB});
                    	STENCILNM[obj.SC_LB]=obj.SC_NM;
                    	STENCILCD[obj.SC_LB]=obj.SC_CD;
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(stencil);	
		
		PCB = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                	IFS:'Z000007',
                	ITEM_TYPE:'PCB'
                },
                successCallBack: function(a) {	
                	dataPcbMatCd = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPcbMatCd.push({'text':obj.ITEM_CD,'value':obj.ITEM_CD});
				    });  
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(PCB);	
		
		/*feeder状态下拉框查询*/
			materiel = {
		        url: "/iPlant_ajax",
		        dataType: "JSON",
		        data: {IFS:'ST00038'},
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
				name: 'stencilProductMaintenance_tab',
				dataType: 'json',
				columns: [[
                                    
				           	{field : "CZ",width : 10,checkbox : true},
			        	    {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.FCT_NM  || value)+ "</span>";},
				           		   editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataTmp,required:true,editable:false}}},
				            {field:'SC_LB',title: '钢网标签', width:250,align:'center',
 	                    	       formatter :function(value,row){
		           		    		return "<span title='" + value + "'>" + value + "</span>";
		           		    	   },
		 	                        editor:{  
		 	                            type:'combobox',
		 	                            options:{
		 	                            	valueField:'value',
		 	                                textField:'text',
		 	                                panelWidth:250,
		 	                                panelHeight:250,
		 	                                editable:true,
		 	                                required:true,
		 	                                data:dataStencil,
		 	                                onSelect: function(a){
		 	                                	var target1 = $('#stencilProductMaintenance_tab').datagrid('getEditor', {'index':ccIndex,'field':'SC_CD'}).target;
		 	                                	target1.textbox('setValue',STENCILCD[a.value]);
		 	                                	var target2 = $('#stencilProductMaintenance_tab').datagrid('getEditor', {'index':ccIndex,'field':'SC_NM'}).target;
		 	                                	target2.textbox('setValue',STENCILNM[a.value]);
		 	                                }
		 	                            }    
		 	                        }
	 	                      },
				            {field: 'SC_CD',title: '钢网编码',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
			            		   editor:{type:'textbox',options:{editable:false}}},
				            {field: 'SC_NM',title: '钢网名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
			            		   editor:{type:'textbox',options:{editable:false}}},
			                {field: 'PCB_TY',title: 'PCB类型',width: 80,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + ( row.PCB_TY_NM || value)+ "</span>";},
		           		       editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataMaterielType,required:true,editable:false}}},
		           		    {field: 'PCB_MAT_CD',title: 'PCB料号',width: 120,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},
		           		    	editor:{
		           		    		type:'combobox',
	 	                            options:{
	 	                            	valueField:'value',
	 	                                textField:'text',
	 	                                panelWidth:120,
	 	                                panelHeight:120,
	 	                                editable:true,
	 	                                required:true,
	 	                                data:dataPcbMatCd,
						        	    onSelect:function(a){
						        	    	if(flag == 0){		//新增行才触发验证方法
						        	    		var sc_lb = $('#stencilProductMaintenance_tab').datagrid('getEditor', {'index':ccIndex,'field':'SC_LB'}).target.textbox('getValue');
					        	    			var pcb_cd = a.value;
	        		                			verifyRepeat(sc_lb,pcb_cd);
						        	    	}
						        	   }
						           }
		           		    	}
		           		    },
			                {field: 'VERSION',title: '版本',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
				        	    options:{required:true, validType:['length[1,30]','specialCharacterTextArea']}}},
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
			    	 
			    	 var edddgBOM2 = $(this).datagrid('getEditor', {index: index,field: 'PCB_TY'});
			    	 row.PCB_TY = $(edddgBOM2.target).combobox('getText');
			    	 row.PCB_TY_NM = $(edddgBOM2.target).combobox('getValue');
			    	 
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
		        	ccIndex=index;
               	 	eeEndEdit('stencilProductMaintenance_tab');
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
		        	if(row.editType == 'add'){
		        		
		        	}
		        	/**判断是否为可编辑字段*/
		        	addDatagridEditor(dataGrid,index);
		        	if(row.editType == 'add'){
		        		flag = 0;				//等于0为新增
		        	}else{
		        		flag = 1;
		        	}
		        	if(!checkNotEmpty(row.editType)){
		        		ed = $(this).datagrid('getEditor', {index: index,field: 'SC_LB'});
			    		if(ed != null){
			    			fc = ed.target;
			    			fc.prop('readonly',true);
			    		}
			    		
			    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SC_CD'});
			    		if(ed2 != null){
			    			fc2 = ed2.target;
				    		fc2.prop('readonly',true);
			    		}
			    		
			    		ed3 = $(this).datagrid('getEditor', {index: index,field: 'PCB_MAT_CD'});
			    		if(ed3 != null){
			    			fc3 = ed3.target;
				    		fc3.textbox('disable',true);
			    		}
			    		
			    		ed4 = $(this).datagrid('getEditor', {index: index,field: 'SC_NM'});
			    		if(ed4 != null){
			    			fc4 = ed4.target;
				    		fc4.prop('readonly',true);
			    		}
		        	}
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
		
		/*输入料号之后查重，验证此钢网是否已与此料号绑定*/
		verifyRepeat = function(sc_lb,pcb_cd){
			if(sc_lb == ''){
				$.messager.alert('提示','请先选择钢网标签后再选择PCB料号。','',function(){
					var PCBCD = $('#stencilProductMaintenance_tab').datagrid('getEditor', {'index':ccIndex,'field':'PCB_MAT_CD'}).target
					PCBCD.combobox('setValue','');
	            });
        		return;
			}
			var Verify = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {
	                	IFS: "ST00033",
	                	SC_LB:sc_lb,
	                	PCB_MAT_CD:pcb_cd
	                },
	                successCallBack: function(a) {
	                	var data = a.RESPONSE[0].RESPONSE_DATA;
	                	if(data.length>0){
	                		$.messager.alert('提示','PCB料号'+data[0].PCB_MAT_CD+'已与'+data[0].SC_LB+'钢网绑定,不能重复绑定！','',function(){
								var PCBCD = $('#stencilProductMaintenance_tab').datagrid('getEditor', {'index':ccIndex,'field':'PCB_MAT_CD'}).target
								PCBCD.combobox('setValue','');
	                		});
	                	}
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(Verify)
		},
		
		eeEndEdit = function(str){
			var rows = $('#'+str).datagrid('getRows');
			if(rows.length>0){
				for(var i=0; i<rows.length; i++){
					$('#'+str).datagrid('endEdit',i);
				}
			}
		},
		
		setDataNull=function(){
			 $('#showFileName').html('');
		},
		
		/*导入*/
		OpenImprotFramedr = function(){
			$("#enditTabupload").dialog("open").dialog('setTitle', '钢网产品维护导入');
		}
		
		deleteDataGrid = function () {
			var checkedItems = $('#stencilProductMaintenance_tab').datagrid('getSelections');
	        if (checkedItems.length==0) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        /*确认提示框*/
	        var delCnt=0,arrUpdate = new Array();;
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
	           	if(r==true){
	           		 $.each(checkedItems, function (index, item) {
	           			 arrUpdate.push({PCB_MAT_CD:item.PCB_MAT_CD,SC_LB:item.SC_LB});
	                 });
	           		 
	           		 if(arrUpdate.length>0){
	     	           	/*批量删除*/
	                     var ajaxUpdate = {
	                         url: '/iPlant_ajax',
	                         dataType: 'JSON',
	                         data: {
	                             list: arrUpdate,
	                             IFS: 'ST00036'
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
				/*钢网状态下拉搜索框*/
				var ajaxParam2={
	                    url:'/iPlant_ajax',
	                    data:{
	                        IFS:'ST00038',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchSC_ST').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].DICT_IT, "text":rowCollection[i].DICT_IT_NM});
	                        }
	                        $('#searchSC_ST').combobox({
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
	                        IFS:'Z000051',
	                    },
	                    successCallBack:function(data){
	                    	$('#searchPCB').combobox('clear');
	                        var rowCollection=createSourceObj(data); 
	                        var arr = [];
	                        arr.push({"value":"", "text":"全部"});
	                        for(var i=0; i< rowCollection.length; i++){
	                        	arr.push({"value":rowCollection[i].BOM_CD, "text":rowCollection[i].BOM_NM});
	                        }
	                        $('#searchPCB').combobox({
	                            data:arr,
	                            valueField:'value',
	                            textField:'text',
	                            panelWidth:150
	                        });
	                    }
	                }
				
	            iplantAjaxRequest(ajaxParam3);
				
				/*初始化全局变量对象*/
				dataGrid = $('#stencilProductMaintenance_tab'),dataMaterielType=[],dataStencil=[],dataPcbMatCd=[],dataTmp=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
				initGridData();
				$('#btnSearch').click(function() {	
					var dgrid = dataGrid.datagrid('options');
					searchDataGrid(dgrid);
				});
				
				$('#btnAdd').click(function() {
					ccIndex=0;
               	 	eeEndEdit('stencilProductMaintenance_tab');
					insertDataGrid('stencilProductMaintenance_tab',{});
					flag = 0;
				});
				
				$('#btnDelete').click(function(){
					deleteDataGrid();
	            });
				
				$('#btnSave').click(function() {
					saveDataGrid('stencilProductMaintenance_tab','ST00034','ST00035','showMessageInfo');
				});
				
				$('#btnImport').click(function() {						/*导入*/
					OpenImprotFramedr();
				});
				
				 $('#btnExprt').click(function(){						/*导出*/
					 	var now = new Date();
	                    var year =now.getFullYear();
	                	var reqData = {
	                			IFS:'ST00033'
	                	}
	                	createTable('tbIMESReport','钢网产品维护导出','stencilProductMaintenance_tab',reqData);
	                });
				
			});
		}
	}
	var fcfo = new factoryInfo();var ccIndex= 0;/*全局索引;*/var flag;
	fcfo.init();var STENCILNM = {};var STENCILCD = {};
})();