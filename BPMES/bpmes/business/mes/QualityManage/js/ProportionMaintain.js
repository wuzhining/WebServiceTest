/* 启动时加载 *//* */(function() {	function materialMaintenance() {		initGridData = function() {			var dgrid = dataGrid.datagrid('options');			if(!dgrid) return;    		/*工厂名称下拉框*/    		var Factory = {                    url: "/iPlant_ajax",                    dataType: "JSON",                    data: {IFS: "B000021"},                    successCallBack: function(a) {                    	dataFactory = [];                    	var op = a.RESPONSE[0].RESPONSE_DATA;                        $.each(op,function(n,obj) {                        	dataFactory.push({'value':obj.FT_CD,'text':obj.FT_NM});    				    });                      },                    errorCallBack: function() {                        $.messager.alert("提示", '请联系管理员，查询失败！')                    }                };    		iplantAjaxRequest(Factory);    		    		dataSAMP_ST=[],dataSer=[{'value':'','text':'全部 '}];    		dataSer.push({'value':'物料','text':'物料'});    		dataSAMP_ST.push({'value':'物料','text':'物料'});    		$("#search_SamplingType").combobox("loadData", dataSer);    					searchDataGrid(dgrid);		},		bindGridData = function(reqData, jsonData) {			var gridList = {				name: 'ProportionMaintain_tab',				dataType: 'json',				columns: [[				           {field: 'FCT_CD',title: '工厂名称',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.FCT_NM || value)+ "</span>";},				    	 	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataFactory,required:true,editable:false,				    	 		onChange:function(newValue,oldValue){				    	 			$("#fctId").val(newValue);				    	 			}				    	 	}}},				    	 	{field: 'SAMP_ST',title: '抽检类型',width: 100,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" +  value + "'>" +  (row.SAMP_ST_NM || value)+ "</span>";},					    	editor:{type:'combobox',id:"status",options:{valueField:'value',textField:'text',data:dataSAMP_ST,required:true,editable:false,					    		onChange:function(newValue,oldValue){		    	                    $("#sampSt").val(newValue);			    	 			}				    	 	}}},							{field: 'SAMP_VAL',title: '抽检值',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',					        options:{required:true, validType:['length[1,50]','specialTextCharacter']}}},					        {field: 'SAMP_LOT',title: '抽检批量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',					        options:{required:true, validType:['length[1,150]','specialCharacterTextArea']}}},					        {field: 'SAMP_QTY',title: '抽检数量',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',					        options:{required:true, validType:['length[1,150]','specialTextCharacter']}}},					        {field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '是';} else { return '否';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}, 					        {field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}					]],				/**结束编辑模式的操作*/			     onEndEdit:function(index,row){			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});			    	 row.FCT_CD = $(ed.target).combobox('getValue');			    	 row.FCT_NM = $(ed.target).combobox('getText');			    	 var edSa = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ST'});			    	 row.SAMP_ST = $(edSa.target).combobox('getValue');			    	 row.SAMP_ST_NM = $(edSa.target).combobox('getText');			     },			     /**进入编辑模式的操作*/			     onBeforeEdit:function(index,row){			    	 showmessage.html('');			    	 row.editing = true;			    	 row.edited = false;			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');			    	 $(this).datagrid('refreshRow', index);			     },			     /**编辑模式进入之后的操作*/			     onAfterEdit:function(index,row){			    	 /**判断是否进行数据变更*/			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');			    	 if(temp!=oldRow){			    		 row.edited = true;			    	 }			    	 row.editing = false;			    	 $(this).datagrid('refreshRow', index);			     },		        onCancelEdit:function(index,row){		            row.editing = false;		            $(this).datagrid('refreshRow', index);		        },		        /**单击进入编辑模式*/		        onClickCell: function (index,field,value) {		        	var rows = dataGrid.datagrid('getRows'),row = rows[index];		        	if (editIndex != index){			    		var ed,fc,ed2,fc2,editorFt;			    		if(editIndex!=undefined){		    				/**判断是否为新增行，并验证新增工厂编码重复*/			    			rowEdit = dataGrid.datagrid('getRows')[editIndex];			    				if(checkNotEmpty(rowEdit.editType)){			    					if(rowEdit.editType=='add'){			    						flag=1;	    			    			}else{	    			    				flag='';	    				        	   addDatagridEditor(dataGrid,index);	    			    			}			    				}else{			    					addDatagridEditor(dataGrid,index);			    					if(!checkNotEmpty(row.editType)){	    				        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});							    		fc = ed.target;							    		console.log(fc);							    		fc.combobox('disable');							    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ST'});	    					    		fc2 = ed2.target;	    					    		fc2.combobox('disable');    			    				}			    				}			    			}else{					    		 addDatagridEditor(dataGrid,index);					    		 if(!checkNotEmpty(row.editType)){					    			 	ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});							    		fc = ed.target;							    		console.log(fc);							    		fc.combobox('disable');	    					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ST'});	    					    		fc2 = ed2.target;	    					    		fc2.combobox('disable');						    		}			    			}			    		}else{			    			addDatagridEditor(dataGrid,index);			    			if(!checkNotEmpty(row.editType)){		    									        	    ed = $(this).datagrid('getEditor', {index: index,field: 'FCT_CD'});					    		fc = ed.target;					    		console.log(fc);					    		fc.combobox('disable');					    		ed2 = $(this).datagrid('getEditor', {index: index,field: 'SAMP_ST'});					    		fc2 = ed2.target;					    		fc2.combobox('disable');		    				}			    		}			    	}		        /**单击进入编辑模式*/			}			initGridView(reqData, gridList);			dataGrid.datagrid('loadData', jsonData);		},		searchDataGrid=function(dgrid){			var dgrid=$("#ProportionMaintain_tab").datagrid("options"),search_SamplingType = $('#search_SamplingType').textbox('getValue'),search_SamplingValue = $('#search_SamplingValue').textbox('getValue');			var reqData = {				IFS: 'Q000001',				SAMP_ST:search_SamplingType,				SAMP_VAL:search_SamplingValue,				pageIndex: 1,				pageSize: dgrid.pageSize			};			reqGridData('/iPlant_ajax', 'ProportionMaintain_tab', reqData);		}		setDataNull=function(){			 $('#showFileName').html('');		}				deleteDataGrid = function () {			var checkedItems = $('#ProportionMaintain_tab').datagrid('getSelections');	        if (checkedItems.length==0) {	            $.messager.alert('提示', '请选择一条数据进行删除');	            return;	        }	        /*确认提示框*/	        var delCnt=0;	        $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {	           	if(r==true){	                     var ajaxUpdate = {	                         url: '/iPlant_ajax',	                         dataType: 'JSON',	                         data: {	                        	 FCT_CD: checkedItems[0].FCT_CD,	                        	 SAMP_VAL: checkedItems[0].SAMP_VAL,	                             IFS: 'Q000004'	                         },	                         successCallBack: function (data) {	                         	$('#showMessageInfo').html('<font color=red>删除成功！</font>');	                         	initGridData();	                             return;	                         },	                         errorCallBack: function (data) {	                        	 $('#showMessageInfo').html('<font color=red>删除失败！</font>');	                             return;	                         }	                     };	                     iplantAjaxRequest(ajaxUpdate);	           	}	        });      		}	}	materialMaintenance.prototype = {		init: function() {			$(function() {				/*初始化全局变量对象*/				dataGrid = $('#ProportionMaintain_tab'),dataSAMP_ST=[],dataFactory=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");				initGridData();				$('#btnSearch').click(function() {										searchDataGrid();				});				$('#btnAdd').click(function() {							flag=1;					var initData = {};					if(dataFactory.length>0){						initData={FCT_CD:dataFactory[0].value,SAMP_ST:dataSAMP_ST[0].value,USE_YN:"Y"}					}					insertDataGrid('ProportionMaintain_tab',initData);				});								$('#btnExprt').click(function(){                	var now = new Date();                    var year =now.getFullYear();                	var reqData = {                		IFS:'Q000001'                	}                	createTable('tbIMESReport','抽检比例维护导出','ProportionMaintain_tab',reqData);                });								$('#btnDelete').click(function(){					deleteDataGrid();	            });				$('#btnSave').click(function() {					if(flag==1){						/*FCT_CD=$("#fctId").val();						SAMP_ST=$("#sampSt").val();						message="该工厂与抽检类型已存在！";						flag='';						var hold = {	                            url: "/iPlant_ajax",	                            dataType: "JSON",	                            data: {	                                IFS: "Q000001",	                                FCT_CD:FCT_CD,	                                SAMP_ST:SAMP_ST	                            },	                            successCallBack: function(a) {	                            	var op = a.RESPONSE[0].RESPONSE_DATA;	                            	if(op.length>0){	                            		 showmessage.html('<font color=red>'+message+'</font>');	                            	}else{*/                		showmessage.html('');                		saveDataGrid('ProportionMaintain_tab','Q000002','Q000003','showMessageInfo');	                            /*	}	                            },	                            errorCallBack: function() {	                                $.messager.alert("提示","请联系管理员，查询失败！");	                            }	                        };	                		iplantAjaxRequest(hold);*/					}else{						showmessage.html('');						saveDataGrid('ProportionMaintain_tab','Q000002','Q000003','showMessageInfo');					}									});			});		}	}	var changeCheck="";var flag='',FCT_CD='',SAMP_ST='',message;	var fcfo = new materialMaintenance();	fcfo.init();})();