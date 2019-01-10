(function() {
	function measurementUnit() {
		// 左边条码类型树形结构
		initLeftMenu = function() {
			var reqData = {
				IFS : 'WMS_B00042',
			}
			reqTreeData('/iPlant_ajax', reqData);
		}
		bindTreeData = function(jsonData) { // 树形节点			
			var treeConfig = {
				name : 'tre',
				method : 'get',
				parentField : "sT_C_CD	",
				textFiled : "sT_C_NM",
				idFiled : "sT_C_NM",
				data : jsonData,
				onClick : function(node) {
					if (node['sT_C_NM']) {						
						var Dept = node['sT_C_CD'];
						searchBurRuleSet(Dept);
					}
				}
			}
			initTree(treeConfig);
			$('#tre').tree(treeConfig);
		}
		//定义标签管理设置详情
		searchBurRuleSet = function(DEP){
    		var ajaxParam = {
					url : '/iPlant_ajax',
					dataType : 'JSON',
					data : {
						IFS : 'WMS_B00038',
						TEMPLATE_TYPE : DEP
					},
					successCallBack : function(data) {
							CompanyOpttype = 1;
							$.each(data.RESPONSE[0]['RESPONSE_DATA'],function(i,item){
								if(item.PREFIX_TWO_INIT_VALUE == ''){Dates = ''};
							    $('#codingMode').combobox('setValue',item.SAMPLE_VALUE);
							    $('#code').textbox('setValue',item.TEMPLATE_TYPE);
							    $('#Type').html(item.TEMPLATE_NAME);
								$('#prefixFirst').combobox('setValue',item.PREFIX_ONE);
								$('#prefixFirst_length').textbox('setValue',item.PREFIX_ONE_LENGTH);
					    		$('#prefixFirst_display').textbox('setValue',item.PREFIX_ONE_INIT_VALUE)
					    		$('#prefixSecond').combobox('setValue',item.PREFIX_TWO);
					    		$('#prefixSecond_length').textbox('setValue',item.PREFIX_TWO_LENGTH);
					    		$('#prefixSecond_display').combobox('setValue',item.PREFIX_TWO_INIT_VALUE);
					    		$('#prefixthird').combobox('setValue',item.PREFIX_THREE);
					    		$('#prefixthird_length').textbox('setValue',item.PREFIX_THREE_LENGTH);
					    		$('#prefixthird_display').textbox('setValue',item.PREFIX_THREE_INIT_VALUE);
					    		$('#codingLength').textbox('setValue',item.SERIAL_NUMBER_LENGTH);
					    		$('#initialValue').textbox('setValue',item.SERIAL_NUMBER_INIT_VALUE);
					    		$('#codingExample').textbox('setValue',item.PREFIX_ONE);
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
//						}	
					}
			}
    		iplantAjaxRequest(ajaxParam);
    	}
		//保存表格数据
		saveBurRuleSet = function(){			
			var codingMode = $('#codingMode').combobox('getValue')
			var code = $('#code').textbox('getValue');
			var prefixFirst = $('#prefixFirst').combobox('getValue');
			var prefixFirst_length = $('#prefixFirst_length').textbox('getValue');
    		var prefixFirst_display = $('#prefixFirst_display').textbox('getValue');
    		var prefixSecond = $('#prefixSecond').combobox('getValue');
    		var prefixSecond_length = $('#prefixSecond_length').textbox('getValue');
    		var prefixSecond_display = $('#prefixSecond_display').combobox('getValue');
    		var prefixthird = $('#prefixthird').combobox('getValue');
    		var prefixthird_length = $('#prefixthird_length').textbox('getValue');
    		var prefixthird_display = $('#prefixthird_display').textbox('getValue');
    		var codingLength = $('#codingLength').textbox('getValue');
    		var initialValue = $('#initialValue').textbox('getValue');
    		var codingExample = $('#codingExample').textbox('getValue');
    		var IFServerNo = '';    		
    		if(CompanyOpttype == 1){
//    			if (!saveUpdateValidate()) {
//					$.messager.alert("提示", '内容没有更新，请确认')
//					return false;
//				}
    			IFServerNo = 'WMS_B00040'
    		}else{
    			IFServerNo = 'WMS_B00040'
    		}    		
    		var ajaxParam = {
    				url : '/iPlant_ajax',
    				dataType : 'JSON',
    				data : {
    					CD :autoCreateCode('WMS'),
    					TEMPLATE_TYPE : code,
    					SAMPLE_VALUE : codingMode,
    					PREFIX_ONE : prefixFirst,
    					PREFIX_ONE_LENGTH : prefixFirst_length,
    					PREFIX_ONE_INIT_VALUE : prefixFirst_display,
    					PREFIX_TWO : prefixSecond,
    					PREFIX_TWO_LENGTH : prefixSecond_length,
    					PREFIX_TWO_INIT_VALUE : prefixSecond_display,
    					PREFIX_THREE : prefixthird,
    					PREFIX_THREE_LENGTH : prefixthird_length,
    					PREFIX_THREE_INIT_VALUE : prefixthird_display,
    					SERIAL_NUMBER_LENGTH : codingLength,
    					SERIAL_NUMBER_INIT_VALUE:initialValue,
    					IFS : IFServerNo
    				},
    				successCallBack : function(data) {

    				},
    				errorCallBack : function() {
    					
    				}
    			};
    			iplantAjaxRequest(ajaxParam);
    			 $.messager.alert('提示','保存成功');   			
		}
		//获取日期
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
	}

	measurementUnit.prototype = {
		init : function() {
			$(function() {
				// 初始化全局变量对象
				dataGrid = $('#fmBurDialog'), dataCompany = [],dataFactory = [], showmessage = $('#showMessageInfo'),editIndex = undefined, oldRow = undefined,reg = new RegExp("null", "g",Dates = '');
				unitType = 0;
				changeType = 0;
				updataId = [];
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
		    	id: 'YYYY',
		    	value: '年'
		    },{
		    	id: 'YYYYDD',
		    	value: '年月'
		    },{
		    	id: 'YYYYMMDD',
		    	value: '年月日'
		    }],
		    onSelect:function(rec){
		    	if(rec.id == 'YYYYMMDD'){
		    		 Dates = getDate(0);
		    		 $('#prefixSecond_length').textbox('setValue',8)
		    	}else if(rec.id == 'YYYYMM'){
		    		 Dates = getDate(1);
		    		 $('#prefixSecond_length').textbox('setValue',6)
		    	}else if(rec.id == 'YYYY'){
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

				initLeftMenu();				
				var node = $('#tre').tree('select',1);
				$('#tre').tree('select', node.sT_C_CD);
				var Dept = node['sT_C_CD'];
				searchBurRuleSet(Dept);

				$('#btnSave').click(function() {
					saveBurRuleSet();
					
				});
			})
		}
	}
	var unit = new measurementUnit();
	unit.init();
})()