/* 启动时加载 */
/*
 */
(function() {
	function burRuleInfo() {

		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'B000133', 
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'barRule_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'barRule_tab',
				dataType: 'json',
				columns: [[
					{field: 'BC_CD',title: '规则名编码',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
						   options:{required:true, validType:['length[1,20]','specialTextCharacter']}}},
					{field: 'BC_RL_NM',title: '规则名',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'BC_RL_DES',title: '规则描述',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}}, 
					{field: 'BC_RL_FMT',title: '条码格式',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
			        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
			        {field: 'detailedSetting',title: '详细设置',width: 80,align: 'center',formatter:function(){//使用formatter格式化刷子
						   return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter:  function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}} 
				]],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
/*			    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'BC_RL_NM'});
			    	 row.BC_RL_NM = $(ed.target).combobox('getValue');
			    	 row.BC_RL_DES = $(ed.target).combobox('getText');*/
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
		        	if(field=='detailedSetting'){
		        		$('#fmBurDialog').form('clear');
		        		endEditingAll(dataGrid);
		        		dataGrid.datagrid('selectRow',index);
//		        		dgrid = $('#MaterialTypeMaintenance_tab').datagrid('options'),
		        		tabName = 'barRule_tab',
		        		dialogName = 'burRuleDialog',
		        	    titleName  = '条码规则详细设置',
//						reqData = {IFS: 'Z000046',ITEM_CD:row.ITEM_TYPE_CD,pageIndex: 1,pageSize: dgrid.pageSize},
						$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
		        		searchBurRuleSet();
		        	}else{
			    	if (editIndex != index){
			    		var ed,fc,editorFt;
			    		if(editIndex!=undefined){
		    				/**判断是否为新增行，并验证新增工厂编码重复*/
			    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'BC_RL_NM'}),editorFt = edft.target,cd = editorFt.val();
			    			if(checkNotEmpty(rowEdit.editType)){
			    				if(rowEdit.editType=='add'){
			    					if(checkNotEmpty(cd)){
					    				var ajaxParam = {
											url : '/iPlant_ajax',
											dataType : 'JSON',
											data : {
												IFS : 'B000133',
												BC_RL_NM : cd,
												pageIndex : 1,
												pageSize : 10
											},
											successCallBack : function(data) {
												rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
												if (rowNum > 0) {
													dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
										       		showmessage.html('<font color=red>您输入的规则名['+ cd + ']已有相同,请重新输入!</font>');
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
			    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，PT_CD字段为只读模式
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'BC_RL_NM'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    				}
			    			}else{
					    		 addDatagridEditor(dataGrid,index);
					    		 if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'BC_RL_NM'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
			    			}
			    		}else{
			    			addDatagridEditor(dataGrid,index);
			    			if(!checkNotEmpty(row.editType)){
					    		ed = $(this).datagrid('getEditor', {index: index,field: 'BC_RL_NM'});
					    		fc = ed.target;
					    		fc.prop('readonly',true);
				    		}
			    		}
			    	}
	            }
			}
			}
			initGridView(reqData, gridList);
			dataGrid.datagrid('loadData', jsonData);
		},
		getDataByCondition =function (){
			endEditingAll(dataGrid);
			var queryRuleTypeName = $('#queryRuleTypeName').textbox('getValue');
			var queryRuleName = $('#queryRuleName').textbox('getValue');
			var dgrid = dataGrid.datagrid('options');
			console.log(queryRuleName);
	        var reqData ={
	        	BC_RL_CD: queryRuleTypeName,
	        	BC_RL_NM: queryRuleName,
	        	IFS:'B000133',
	        	pageIndex:1,
	        	pageSize:dgrid.pageSize
	        };
	        reqGridData('/iPlant_ajax','barRule_tab',reqData)
	      }
		searchBurRuleSet = function(){
			var row = dataGrid.datagrid('getSelected');
			if(!row.BC_CD) return false;
    		var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'B000146',
						BC_CD : row.BC_CD
					},
					successCallBack : function(data) {
						if(data.RESPONSE[0]['RESPONSE_DATA'].length == 0){
							CompanyOpttype = 2;
							
						}else{
							CompanyOpttype = 1;
							$.each(data.RESPONSE[0]['RESPONSE_DATA'],function(i,item){
								if(item.PRE_UNIT_2 == ''){Dates = ''};
							    $('#codingMode').combobox('setValue',item.ED_MODE);
								if(item.WH_FILLED == 'Y'){
					    			$('#autoFillEmpty').prop('checked', 'checked');
								} else {
									$('#autoFillEmpty').prop('checked', '');
								}
								$('#prefixFirst').combobox('setValue',item.PRE_1);
								$('#prefixFirst_length').textbox('setValue',item.PRE_LEN_1);
					    		$('#prefixFirst_display').textbox('setValue',item.PRE_UNIT_1)
					    		if(item.PRE_SIGN_1 == 'Y'){
					    			$('#prefixFirst_basis').prop('checked', 'checked');
								} else {
									$('#prefixFirst_basis').prop('checked', '');
								}
					    		$('#prefixSecond').combobox('setValue',item.PRE_2);
					    		$('#prefixSecond_length').textbox('setValue',item.PRE_LEN_2);
					    		$('#prefixSecond_display').combobox('setValue',item.PRE_UNIT_2);
					    		if(item.PRE_SIGN_2 == 'Y'){
					    			$('#prefixSecond_basis').prop('checked', 'checked');
								} else {
									$('#prefixSecond_basis').prop('checked', '');
								}
					    		$('#prefixthird').combobox('setValue',item.PRE_3);
					    		$('#prefixthird_length').textbox('setValue',item.PRE_LEN_3);
					    		$('#prefixthird_display').textbox('setValue',item.PRE_UNIT_3);
					    		if(item.PRE_SIGN_3 == 'Y'){
					    			$('#prefixthird_basis').prop('checked', 'checked');
								} else {
									$('#prefixthird_basis').prop('checked', '');
								}
					    		$('#codingLength').textbox('setValue',item.BC_LEN);
					    		$('#initialValue').textbox('setValue',item.BC_BEN_V);
					    		$('#codingExample').textbox('setValue',item.PRE_1);
						   		var len = $('#codingLength').numberbox('getValue');
					        	var lenin = $('#initialValue').numberbox('getValue');
					        	var alength = len-lenin.toString().length;
					        	var ent='';
					        	for(var i=0;i<alength;i++){
					        	    ent +='0'; 
					        	}
					        	ent = ent+lenin.toString();
					        	$('#coding_4').textbox('setValue',ent);
					        	var coding_1 = $('#prefixFirst').combobox('getText');
					        	var coding_2 = $('#prefixSecond').combobox('getText');
					        	var coding_3 = $('#prefixthird').combobox('getText');
					        	$('#coding_1').textbox('setValue',coding_1);
					        	$('#coding_2').textbox('setValue',coding_2);
					        	$('#coding_3').textbox('setValue',coding_3);
						    	var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
						   		var prefixthird_display = $('#prefixthird_display').textbox('getValue');
						   		var count = $('#coding_4').textbox('getValue');
						   	    var total = prefixFirst_display + Dates + prefixthird_display + count;
						   		$('#codingExample').textbox('setValue',total);
							})
						}	
					}
			}
    		iplantAjaxRequest(ajaxParam);
    	}
		saveBurRuleSet = function(){
			var codingMode = $('#codingMode').combobox('getValue')
			var autoFillEmpty = 'N';
			if ($('#autoFillEmpty').is(':checked')) {
				autoFillEmpty = "Y";
			} else {
				autoFillEmpty = "N";
			}
			var prefixFirst = $('#prefixFirst').combobox('getValue');
			var prefixFirst_length = $('#prefixFirst_length').textbox('getValue')
    		var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
    		var prefixFirst_basis = 'N';
			if ($('#prefixFirst_basis').is(':checked')) {
				prefixFirst_basis = "Y";
			} else {
				prefixFirst_basis = "N";
			}
    		var prefixSecond = $('#prefixSecond').combobox('getValue');
    		var prefixSecond_length = $('#prefixSecond_length').textbox('getValue');
    		var prefixSecond_display = $('#prefixSecond_display').combobox('getValue');
    		var prefixSecond_basis = 'N';
    		if ($('#prefixFirst_basis').is(':checked')) {
    			prefixSecond_basis = "Y";
			} else {
				prefixSecond_basis = "N";
			}
    		var prefixthird = $('#prefixthird').combobox('getValue');
    		var prefixthird_length = $('#prefixthird_length').textbox('getValue');
    		var prefixthird_display = $('#prefixthird_display').textbox('getValue');
    		var prefixthird_basis = 'N';
    		if ($('#prefixFirst_basis').is(':checked')) {
    			prefixthird_basis = "Y";
			} else {
				prefixthird_basis = "N";
			}
    		var codingLength = $('#codingLength').textbox('getValue');
    		var initialValue = $('#initialValue').textbox('getValue');
    		var codingExample = $('#codingExample').textbox('getValue');
    		var IFServerNo = '';
    		if(CompanyOpttype == 1){
    			IFServerNo = 'B000145'
    		}else{
    			IFServerNo = 'B000143'
    		}
    		var row = dataGrid.datagrid('getSelected');
    		var ajaxParam = {
    				url : '/iPlant_ajax',
    				dataType : 'JSON',
    				data : {
    					CD :autoCreateCode('SYS'),
    					BC_CD : row.BC_CD,
    					ED_MODE : codingMode,
    					WH_FILLED : autoFillEmpty,
    					PRE_1 : prefixFirst,
    					PRE_LEN_1 : prefixFirst_length,
    					PRE_UNIT_1 : prefixFirst_display,
    					PRE_SIGN_1 : prefixFirst_basis,
    					PRE_2 : prefixSecond,
    					PRE_LEN_2 : prefixSecond_length,
    					PRE_UNIT_2 : prefixSecond_display,
    					PRE_SIGN_2 : prefixSecond_basis,
    					PRE_3 : prefixthird,
    					PRE_LEN_3 : prefixthird_length,
    					PRE_UNIT_3 : prefixthird_display,
    					PRE_SIGN_3 : prefixthird_basis,
    					BC_LEN : codingLength,
    					BC_BEN_V:initialValue,
    					IFS : IFServerNo
    				},
    				successCallBack : function(data) {

    				},
    				errorCallBack : function() {
    					
    				}
    			};
    			iplantAjaxRequest(ajaxParam);
    			$("#burRuleDialog").dialog("close");
		}
		getDate=function(value) {
			var date = new Date();
			var year = date.getFullYear().toString(),month = (date.getMonth() + 1),day = date.getDate().toString();
	        if (month < 10) month = "0" + month;
	        if (day < 10) day = "0" + day;
	        if(value == 0){
	        	date = year + month +day;	
	        }else if(value == 1){
	        	date = year + month;
	        }else{
	        	date = year;
	        }
	        return date;
	    }
		delectBurRuleSet = function(){
			var row = dataGrid.datagrid('getSelected');
			var param = {
                    url: "/iPlant_ajax",
                    dataType: "JSON",
                    data: {
                    	IFS:'B000144',
                    	BC_CD:row.BC_CD
                    },
                    successCallBack: function() {
                    	deleteDataGrid('barRule_tab','CD','B000135','showMessageInfo');
                    }
                };
                iplantAjaxRequest(param);
		}
	}

	burRuleInfo.prototype = {

		init: function() {
			$(function() {
				//初始化全局变量对象
				dataGrid = $('#barRule_tab'), showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g"),CompanyOpttype = 0,Dates = '';
				initGridData();
				$('#codingMode').combobox({   
					    valueField:'id',    
					    textField:'value',
					    data:[{
					    	id: 'automatic',
					    	value: '自动编码'
					    },{
					    	id: 'manual',
							value: '手动编码'
					    }],
					    onSelect:function(rec){
					    	if(rec.id == '手动'){
					    		$('#fmBurDialog').form('clear')
					    		$('#prefixFirst').combobox({disabled: true});
					    		$('#prefixSecond').combobox({disabled: true});
					    		$('#prefixSecond_display').combobox({disabled: true});
					    		$('#prefixthird').combobox({disabled: true});
					    		$('#prefixSecond_length').textbox('textbox').attr('disabled',true);
					    		$('#prefixthird_length').textbox('textbox').attr('disabled',true);
					    		$('#prefixthird_length').textbox('textbox').removeAttr('required');
					    		$('#codingLength').textbox('textbox').attr('disabled',true);
					    		$('#initialValue').textbox('textbox').attr('disabled',true);
					    		$('#codingExample').textbox('textbox').attr('disabled',true);
					    		$('#prefixFirst_length').textbox('textbox').attr('disabled',true);
					    		$('#prefixFirst_display').textbox('textbox').attr('disabled',true);
					    		$('#prefixthird_display').textbox('textbox').attr('disabled',true);
					    		$('#coding_4').textbox('textbox').attr('disabled',true);
					    	}else{
					    		searchBurRuleSet();
					    		$('#prefixFirst').combobox({disabled: false});
					    		$('#prefixSecond').combobox({disabled: false});
					    		$('#prefixSecond_display').combobox({disabled: false});
					    		$('#prefixthird').combobox({disabled: false});
					    		$('#prefixSecond_length').textbox('textbox').attr('disabled',false);
					    		$('#prefixthird_length').textbox('textbox').attr('disabled',false);
					    		$('#prefixthird_length').textbox('textbox').removeAttr('required');
					    		$('#codingLength').textbox('textbox').attr('disabled',false);
					    		$('#initialValue').textbox('textbox').attr('disabled',false);
					    		$('#codingExample').textbox('textbox').attr('disabled',false);
					    		$('#prefixFirst_display').textbox('textbox').attr('disabled',false);
					    		$('#prefixthird_display').textbox('textbox').attr('disabled',false);
					    		$('#coding_4').textbox('textbox').attr('disabled',false);
					    	}
					    }
				})
				$('#prefixFirst').combobox({   
				    valueField:'id',    
				    textField:'value',
				    data:[{
				    	id: 'Bill',
				    	value: '单据代码'
				    },{
				    	id: 'materiel',
				    	value: '物料代码'
				    },{
				    	id: 'product',
				    	value: '产品代码'
				    }],
				    onSelect:function(rec){
				    	$('#coding_1').textbox('setValue',rec.value)
				    }
			})
			$('#prefixSecond').combobox({   
				    valueField:'id',    
				    textField:'value',
				    data:[{
				    	id: 'BillData',
				    	value: '单据日期'
				    },{
				    	id: 'productData',
				    	value: '出厂日期'
				    }],
				    onSelect:function(rec){
				    	$('#coding_2').textbox('setValue',rec.value)
				    }
			})
			$('#prefixSecond_display').combobox({   
			    valueField:'id',    
			    textField:'value',
			    data:[{
			    	id: 'Year',
			    	value: '年'
			    },{
			    	id: 'Years',
			    	value: '年月'
			    },{
			    	id: 'Dates',
			    	value: '年月日'
			    }],
			    onSelect:function(rec){
			    	if(rec.id == 'Dates'){
			    		 Dates = getDate(0);
			    		 $('#prefixSecond_length').textbox('setValue',8)
			    	}else if(rec.id == 'Years'){
			    		 Dates = getDate(1);
			    		 $('#prefixSecond_length').textbox('setValue',6)
			    	}else if(rec.id == 'Year'){
			    		 Dates = getDate(2);
			    		 $('#prefixSecond_length').textbox('setValue',4)
			    	}else{
			    		Dates = '';
			    		$('#prefixSecond_length').textbox('setValue',0)
			    	}
			    	var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
			   		var prefixthird_display = $('#prefixthird_display').textbox('getValue');
			   		var count = $('#coding_4').textbox('getValue');
			   	    var total = prefixFirst_display + Dates + prefixthird_display + count;
			   		$('#codingExample').textbox('setValue',total);
			    }
		   })
		   $('#prefixthird').combobox({   
			    valueField:'id',    
			    textField:'value',
			    data:[{
			    	id: 'function',
			    	value: '函数'
			    }],
			    onSelect:function(rec){
			    	$('#coding_3').textbox('setValue',rec.value)
			    }
		})
		$('#prefixFirst_display').textbox('textbox').keyup(function(){
				setTimeout(function () {
					$('#prefixFirst_display').textbox('textbox').blur();
			    	var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
			   		var prefixthird_display = $('#prefixthird_display').textbox('getValue');
			   		var prefixFirst_length = $('#prefixFirst_length').textbox('getValue');
			   		var count = $('#coding_4').textbox('getValue'),rs = '';
			   		var prefixFirst = prefixFirst_display.slice(0,prefixFirst_length);
			   		$('#prefixFirst_display').textbox('setValue',prefixFirst);
			   	    var total = prefixFirst_display + Dates + prefixthird_display + count;
			   		$('#codingExample').textbox('setValue',total);
			    }, 200);
			 
			});
			
			$('#codingLength').textbox('textbox').keyup(function(){
				setTimeout(function () {
					$('#codingLength').textbox('textbox').blur();
					  var len = $('#codingLength').numberbox('getValue');
		        	  var lenin = $('#initialValue').numberbox('getValue');
		        	  var alength = len-lenin.toString().length;
		        	  var ent='';
		        	  for(var i=0;i<alength;i++){
		        		   ent +='0'; 
		        	  }
		        	  ent = ent+lenin.toString();
		        	  $('#coding_4').textbox('setValue',ent);
			   		  var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
			   		  var prefixthird_display = $('#prefixthird_display').textbox('getValue');
			   		  var total = prefixFirst_display + Dates + prefixthird_display +ent;
			   		  $('#codingExample').textbox('setValue',total);
			    }, 200);
			 
			});
			$('#initialValue').textbox('textbox').keyup(function(){
				setTimeout(function () {
					$('#initialValue').textbox('textbox').blur();
					  var len = $('#codingLength').numberbox('getValue');
		        	  var lenin = $('#initialValue').numberbox('getValue');
		        	  var alength = len-lenin.toString().length;
		        	  var ent='';
		        	  for(var i=0;i<alength;i++){
		        		   ent +='0'; 
		        	  }
		        	  ent = ent+lenin.toString();
		        	  $('#coding_4').textbox('setValue',ent);
		        	  var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
			   		  var prefixthird_display = $('#prefixthird_display').textbox('getValue');
			   		  var total = prefixFirst_display + Dates + prefixthird_display +ent;
			   		  $('#codingExample').textbox('setValue',total);
			    }, 200);
			 
			});
		   $('#btnSearch').click(function(){
		        	  getDataByCondition(); 
				});
		   
				$('.add').click(function() {					
					insertDataGrid('barRule_tab',{CD:autoCreateCode('SYS')});
				});
				
				$('.delete').click(function(){
//					deleteDataGrid('barRule_tab','CD','B000135','showMessageInfo');
					delectBurRuleSet();
	            });

				$('.save').click(function() {
					saveDataGrid('barRule_tab','B000134','B000136','showMessageInfo');
				});
			});
		}
	}
	var burRule = new burRuleInfo();
	burRule.init();
})();