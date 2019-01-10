
(function() {
	function application() {	
		function CurentTime()
	    { 
	        var now = new Date();
	        
	        var year = now.getFullYear();       //年
	        var month = now.getMonth() + 1;     //月
	        var day = now.getDate();            //日
	        
	        var hh = now.getHours();            //时
	        var mm = now.getMinutes();          //分
	        var ss = now.getSeconds();           //秒
	        
	        var clock = year + "-";
	        
	        if(month < 10)
	            clock += "0";
	        
	        clock += month + "-";
	        
	        if(day < 10)
	            clock += "0";
	            
	        clock += day + " ";
	        
	        if(hh < 10)
	            clock += "0";
	            
	        clock += hh + ":";
	        if (mm < 10) clock += '0'; 
	        clock += mm + ":"; 
	         
	        if (ss < 10) clock += '0'; 
	        clock += ss; 
	        return(clock); 
	}

					
		//初始化表格
		initGridData = function() {
			    var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'MES_IQC0002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'productWConf_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
					name: 'productWConf_tab',
					dataType: 'json',
					singleSelect:false,
					columns: [
						[{field: 'IQC_RETRY_ID',title: 'IQC重检超时设置列表id',hidden:true,width: 80,align: 'left',formatter: function (value) {if(value !=null) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							  options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}},
							{ 
							field : 'ck',
							checkbox : true
						   },

								{
									field: 'MATERIAL_CODE',
									title: '物料编码',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'MATERIAL_NAME',
									title: '物料名称',
									width: 150,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'SUPPLIER_CODE',
									title: '供应商编码',
									width: 100,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'SUPPLIER_NAME',
									title: '供应商名称',
									width: 180,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'F_FIRST',
									title: '第一次重检间隔时间（天）',
									width: 100,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
							    {
								    field: 'S_SECOND',
								    title: '第二次重检间隔时间（天）',
								    width: 100,
								    align: 'center',formatter: function (value) {
								    if(value != null)
								    return "<span title='" + value + "'>" + value + "</span>";}
							    },
							    {
									field: 'THIRD',
									title: '第三次重检间隔时间（天）',
									width: 100,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'FOURTH',
									title: '第四次重检间隔时间（天）',
									width: 100,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
								{
									field: 'TIMES',
									title: '重检次数',hidden:true,
									width: 80,
									align: 'left',formatter: function (value) {
									if(value !=null)
									return "<span title='" + value + "'>" + value + "</span>";
									},
									editor:{type:'validatebox',
									options:{required:true, validType:['length[1,50]','specialVersionTextArea']}}
								},
							    {
									field: 'EARLYWARNING',
									title: '预警提前期（天）',
									width: 100,
									align: 'center',formatter: function (value) {
									if(value != null)
									return "<span title='" + value + "'>" + value + "</span>";}
							    },
							    {
							    	field: 'ROHS_REPORT',
							    	title: 'ROHS报告有效期',
							    	width: 120,
							    	align: 'center',formatter: function (value) {
							    	if(value != null)
							    	return "<span title='" + value + "'>" + value + "</span>";}
						        },
								{
							    	field: 'CRT_ID',
							    	title: '创建人',
							    	width: 100,
							    	align: 'center',formatter: function (value) {
							    	if(value != null)
							    	return "<span title='" + value + "'>" + value + "</span>";}
							    },
							    {
							    	field: 'CREATE_DATE',
							    	title: '创建日期',
							    	width: 150,
							    	align: 'center',formatter: function (value) {
							    	if(value != null)
							    	return "<span title='" + value + "'>" + value + "</span>";}
							    },
							    {
							    	field: 'UPT_ID',
							    	title: '更新人',
							    	width: 100,
							    	align: 'center',formatter: function (value) {
							    	if(value != null)
							    	return "<span title='" + value + "'>" + value + "</span>";}
							    },
							    {
							    	field: 'UPT_DT',
							    	title: '更新日期',
							    	width: 150,
							    	align: 'center',formatter: function (value) {
							    	if(value != null)
							    	return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					],
					onDblClickRow: function(index,row){
						var checkedRows = $('#productWConf_tab').datagrid('getSelected');
						if(checkedRows){
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改重检超时设置列表');
				    	 checkFun();
				    	
				    	 $("#searchCondition").dialog("close");
						 $("#enditTab").dialog("open").dialog('setTitle', '修改重检超时设置列表信息');
						 $('#MATERIAL_CODE').textbox('setValue', row.MATERIAL_CODE==null?'':row.MATERIAL_CODE);
						 $('#MATERIAL_NAME').textbox('setValue', row.MATERIAL_NAME==null?'':row.MATERIAL_NAME);
						 $('#SUPPLIER_CODE').textbox('setValue', row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE);
						 $('#SUPPLIER_NAME').textbox('setValue', row.SUPPLIER_NAME==null?'':row.SUPPLIER_NAME);
						 $('#TIMES').numberbox('setValue', row.TIMES==null?'':row.TIMES);
						 $('#F_FIRST').numberbox('setValue', row.F_FIRST==null?'':row.F_FIRST);
						 $('#S_SECOND').numberbox('setValue', row.S_SECOND==null?'':row.S_SECOND);
						 $('#THIRD').numberbox('setValue', row.THIRD==null?'':row.THIRD);
						 $('#FOURTH').numberbox('setValue', row.FOURTH==null?'':row.FOURTH);
						 $('#EARLYWARNING').numberbox('setValue', row.EARLYWARNING==null?'':row.EARLYWARNING);
						 $('#ROHS_REPORT').datebox('setValue', row.ROHS_REPORT==null?'':row.ROHS_REPORT);
				    	 
				    	 
						 
						 cong_id = row.IQC_RETRY_ID;
						 checkedRow=1;
					    }else{
							$.messager.alert("提示", '请选中行再进行修改')
							return false;
					    }
						 
						 
				     }
				}
				initGridView(reqData, gridList);
				$('#productWConf_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){	    	
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;					
			    	 $('#saveID').hide();
				}
				 
			}
			
			/* 添加商品移动信息 */
			
			addStation = function() {
	        	CompanyOpttype = 0;
	        	checkFun();
				$("#enditTab").dialog("open").dialog('setTitle', '重检超时设置列表信息添加');
				$("#fmStation").form("clear");
				
			}	
			
			
			
			setDataNull = function () {           
	                       
	          }	

		getDataBySearch = function(){
				var dgrid = $('#productWConf_tab').datagrid('options');
				if(!dgrid) return;
				var m_code = $('#m_code').textbox('getValue');
//				var MATERIAL_CODE = $('#MATERIAL_CODE').textbox('getValue');
				var checkeds = $('#fullMatching').prop('checked');
				var reqData = {
						MATERIAL_CODE: m_code,
						CK:checkeds,
//						MATERIAL_CODE:MATERIAL_CODE,
					IFS: 'MES_IQC0002',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				};
				reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
			};
			
			
			
			
		/* 修改重检超时设置列表信息 */			
		updateStation = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
			CompanyOpttype = 1;
			checkedRow=1;
			var moveIds = [];
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			
			var row = $("#productWConf_tab").datagrid("getSelected");
			console.log(row.MATERIAL_CODE);
			cong_id = row.IQC_RETRY_ID;
			if(row) {
				 $("#searchCondition").dialog("close");
				 $("#enditTab").dialog("open").dialog('setTitle', '修改重检超时设置列表信息');
				 $('#MATERIAL_CODE').textbox('setValue', row.MATERIAL_CODE==null?'':row.MATERIAL_CODE);
				 $('#MATERIAL_NAME').textbox('setValue', row.MATERIAL_NAME==null?'':row.MATERIAL_NAME);
				 $('#SUPPLIER_CODE').textbox('setValue', row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE);
				 $('#SUPPLIER_NAME').textbox('setValue', row.SUPPLIER_NAME==null?'':row.SUPPLIER_NAME);
				 $('#TIMES').numberbox('setValue', row.TIMES==null?'':row.TIMES);
				 $('#F_FIRST').numberbox('setValue', row.F_FIRST==null?'':row.F_FIRST);
				 $('#S_SECOND').numberbox('setValue', row.S_SECOND==null?'':row.S_SECOND);
				 $('#THIRD').numberbox('setValue', row.THIRD==null?'':row.THIRD);
				 $('#FOURTH').numberbox('setValue', row.FOURTH==null?'':row.FOURTH);
				 $('#EARLYWARNING').numberbox('setValue', row.EARLYWARNING==null?'':row.EARLYWARNING);
				 $('#ROHS_REPORT').datebox('setValue', row.ROHS_REPORT==null?'':row.ROHS_REPORT);

			}
			checkFun();
		}


        deleteStation = function () {
    		var checkedItems =  $('#productWConf_tab').datagrid('getSelections');
            if (checkedItems.length==0) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            /*确认提示框*/
            var delCnt=0,arrUpdate = new Array();;
            $.messager.confirm('确认框', '您确定要删除您所选择的数据吗?', function (r) {
               	if(r==true){
               		var tmp='';
               		 $.each(checkedItems, function (index, item) {
               				arrUpdate.push({IQC_RETRY_ID:item.IQC_RETRY_ID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'MES_IQC0004'
                             },
                             successCallBack: function (data) {
	                       	 		$.messager.alert('提示', '删除成功!','',function(){
	                          	      initGridData();
	                               });
                             },
                             errorCallBack: function (data) {
                                 $.messager.alert('提示', '删除失败!');
                                 return;
                             }
                         };
                         iplantAjaxRequest(ajaxUpdate);
               		 }else{
               			showmessage.html('<font color=red>删除失败,此工单不Y创建状态！</font>');
               		 }
               	}
            });      
    	},
        
        
        dataArr={},
        
		//置空查询输入框
		setQueryNull=function() {
			$('#m_code').textbox('setValue',""),
			$('#fullMatching').prop('checked',false);
		},
		
		
		
		//验证物料编码是否存在
		saveAddValidate = function(){
			var code = $('#MATERIAL_CODE').textbox('getValue');
			var  check = false;
			var work = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					async:false,
					data: {
					  MATERIAL_CODE:code,
					  IFS: 'MES_IQC0002'
					},
					successCallBack: function(data) {
						var	rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
						
						if (rowNum > 0) {
							
							 $.messager.alert('提示', '您输入信息已有相同,请重新输入');
							 check=true;
						}
	                	
					},
		
				};
			
			  iplantAjaxRequest(work);
			  return check;

		}
		
		
		
		
		
		
		
		formatterDate=function (value) {
			 var date = new Date(value),year = date.getFullYear().toString(),month = (date.getMonth() + 1),day = date.getDate().toString(),hour = date.getHours().toString(),minutes = date.getMinutes().toString(),seconds = date.getSeconds().toString();
	         if (month < 10) month = "0" + month;
	         if (day < 10) day = "0" + day;
	         if (hour < 10) hour = "0" + hour;
	         if (minutes < 10) minutes = "0" + minutes;
	         if (seconds < 10) seconds = "0" + seconds;
	         return year + "-" + month + "-" + day;
		};

       
        /*验证修改内容YN重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#productWConf_tab').datagrid('getSelections');
			row = checkedItems[0];
//			alert(JSON.stringify(checkedItems))
			if (row.IQC_RETRY_ID) {
				
			if($('#MATERIAL_CODE').textbox('getValue')!= (row.MATERIAL_CODE==null?'':row.MATERIAL_CODE)||
					$('#SUPPLIER_CODE').textbox('getValue')!= (row.SUPPLIER_CODE==null?'':row.SUPPLIER_CODE)||
					$('#TIMES').numberbox('getValue')!= (row.TIMES==null?'':row.TIMES)||
					$('#F_FIRST').numberbox('getValue')!= (row.F_FIRST==null?'':row.F_FIRST)||
					$('#S_SECOND').numberbox('getValue')!= (row.S_SECOND==null?'':row.S_SECOND)||
					$('#THIRD').numberbox('getValue')!= (row.THIRD==null?'':row.THIRD)||
					$('#FOURTH').numberbox('getValue')!= (row.FOURTH==null?'':row.FOURTH)||
					$('#EARLYWARNING').numberbox('getValue')!= (row.EARLYWARNING==null?'':row.EARLYWARNING)||
					$('#ROHS_REPORT').datebox('getValue')!= formatterDate(row.ROHS_REPORT==null?'':row.ROHS_REPORT,"yyyy-MM-dd")

					)
				return true;
				else {
					return false;
				}
			}
			
			
			
			
		}
		
		
		/* 添加供应商选择窗口弹出框	 */
		addVendorCode=function() {
			$("#VendorCodeDetails").dialog("open").dialog('setTitle', '供应商详情');
			$('#showMaster').html('');
		}
 		
		/**根据条件查询供应商信息**/
		getVendorCodeBySearch = function(){
			var tabName = 'VendorCodeDetails_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var name = $('#searchVendorName').val();
			var code = $('#searchVendorCode').val();
			var reqDataA = {
				//MASTER_FLAG: 'Y',
				SUP_NM:name,
				IFS: 'B000082',
				pageIndex: 1,
				pageSize: dgridOp.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqDataA);
			dialogEditorDataGrid = function(tabName,reqDataA, jsonData) {
				var gridLists = {
						name :tabName,
						dataType : 'json',
						columns : [[
						      {field:'SUP_CD',title: '供应商编码',width: 130,align: 'center',formatter: function (value,row) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						      {field:'SUP_NM',title: '供应商名称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
							  {field:'ST_NM',title: '供应商简称',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
							  {field:'SUP_BC',title: '供应商条形码',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},					  
							  {field:'DICT_IT_NM',title: '供应商类别',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
							  {field:'SUP_ST',title: '供应商状态',width: 130,align: 'center',formatter: function (value) {if (value != null) return "<span title='" + value + "'>" + value + "</span>";}},
						 ]],
						 onClickRow: function(index,row){
							 selectVendorCode(row.SUP_CD,row.SUP_NM);
				         }
					}
				initEditorDataGridView(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
				var VendorCode = $('#SUPPLIER_CODE').textbox('getValue');
		 		if(VendorCode){
		 			var items = $('#VendorCodeDetails_tab').datagrid('getRows');
		 			for (var i = 0; i < items.length; i++)
		 			{
		 				if(VendorCode == items[i].SUP_CD){
		 					index = i;
		 				}
		 		   }
		 		   $('#VendorCodeDetails_tab').datagrid('selectRow', index); //选中对应的行
		 		}
			}
		}
		
		
		/*选择供应商并赋值*/
		selectVendorCode=function(item_cd,item_nm){
			  console.log(item_nm);
	    	  $('#SUPPLIER_CODE').textbox('setValue',item_cd);
	    	  $('#SUPPLIER_NAME').textbox('setValue',item_nm);
	    	  $("#VendorCodeDetails").dialog("close");
		}

		
		
	/* 添加物料信息弹出框	 */
	 addMaterial=function() {
		$("#addMaterialDetails").dialog("open").dialog('setTitle', '物料信息详情');
		$('#showMaterial').html('');
		
	}
	
	/**根据条件查询物料信息**/
	 getMaterialDataBySearch = function(){
		var tabName = 'materialDetails_tab';
		var dgrid = $('#'+tabName).datagrid('options');
		if(!dgrid) return;
		var materialCode = $('#materialCode').val();
		var materialName = $('#materialName').val();
		var reqData = {
			ITEM_CD:materialCode,
			ITEM_NM:materialName,
			IFS: 'Z000007',
			pageIndex: dgrid.pageNumber,
			pageSize: dgrid.pageSize
		}
		dialogDataGrid('/iPlant_ajax', tabName, reqData);
	   /*绑定物料详情列表数据*/
	   dialogEditorDataGrid = function(tabName,reqData, jsonData){
		var gridLists = {
			name : tabName,
			dataType : 'json',
			columns : [[
				{field:'ITEM_CD',title:'物料编码',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
				{field:'ITEM_NM',title:'物料名称',width:180,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
				{field:'ITEM_TYPE_NM',title:'物料类型',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
				{field:'UOM_NM',title:'单位',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
			 ]],
			 onClickRow: function(index,row){
				 assignment(row.ITEM_CD,row.ITEM_NM); 
				 
	         }
		}		
		initEditorDataGridView(reqData, gridLists);
		$('#'+tabName).datagrid('loadData', jsonData);
		var MaterialCode = $('#MATERIAL_CODE').searchbox('getValue');
		//alert(MaterialCode)
 		if(MaterialCode){
 			var items = $('#materialDetails_tab').datagrid('getRows');
 			for (var i = 0; i < items.length; i++)
 			{
 				if(MaterialCode == items[i].ITEM_CD){
 					index = i;
 				}
 		   }
 			
 			
 			
 			
 		   $('#materialDetails_tab').datagrid('selectRow', index); //选中对应的行
 		}
	}
}
	 /*点击选择物料searchMaterialForm查询物料信息*/
    doSearch = function(){
   	$("#searchMaterialForm").textbox('setValue','');		//置空搜索框
   	var titleName = '重检超时设置列表添加';
		var dialogName = 'addMaterialDetails';
		var tabName = 'materialDetails_tab';
		var dgrid = $('#materialDetails_tab').datagrid('options');
		var reqData = {
				IFS: 'Z000007',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
		openDialogFrame(tabName,dialogName,titleName,reqData);
    }
   /*选择物料详情并赋值*/
 assignment=function(item_cd,item_nm){
	  console.log(item_nm);
	  $('#MATERIAL_CODE').textbox('setValue',item_cd);
	  $('#MATERIAL_NAME').textbox('setValue',item_nm);
	  $("#addMaterialDetails").dialog("close");
	  
	  
	  
	}
		

 

      

	    /*必填项空值验证*/
		checkSelect=function() {
				pass = true; 
				$("select[required]").each(function(){
					if((this.value == '')&&($(this).combobox('getText')=='')) { 
						text = $(this).parent().prev().text(); 
						$.messager.alert('提示',text+"必填项不能为空"); 
						this.focus(); 
						pass = false; 
						return false;//跳出each 
					} 
				}); 
				return pass; 
			};
		
		savaStation = function() {			
			var IFServerNo = '';
			var reqData = [];
		      if(CompanyOpttype == 0) {

		    	  var checkResult = saveAddValidate();
		    	 
					if(checkResult){
						
						return false;
					}  	
		    	 
				IFServerNo = 'MES_IQC0001'
				isid = 'IQC_RETRY_ID_SEQ.NEXTVAL';
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新,请修改')
					return false;
				}
				
				  
				
				
				
				
				IFServerNo = 'MES_IQC0003'
				var checkedItems = $('#productWConf_tab').datagrid('getSelections');
				row = checkedItems[0];
			if(checkedRow!=0){
				isid = cong_id;
				}else{
					isid = row.IQC_RETRY_ID;
				}
			 }
			 else {
				IFServerNo = 'MES_IQC0002'
			}
		    
		    var MATERIAL_CODE=$('#MATERIAL_CODE').searchbox("getValue");
		    var MATERIAL_NAME=$('#MATERIAL_NAME').val();
			var SUPPLIER_CODE=$('#SUPPLIER_CODE').searchbox("getValue");
			var SUPPLIER_NAME=$('#SUPPLIER_NAME').textbox("getValue"); 
			var TIMES=$('#TIMES').numberbox("getValue"); 
			var F_FIRST=$('#F_FIRST').numberbox("getValue"); 
			var S_SECOND=$('#S_SECOND').numberbox("getValue"); 
			var THIRD=$('#THIRD').numberbox("getValue"); 
			var FOURTH=$('#FOURTH').numberbox("getValue"); 
			var EAWARNING=$('#EARLYWARNING').numberbox("getValue");
			var ROHS_REPORT=$('#ROHS_REPORT').datebox("getValue");
			
			
			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkSelect()) return;
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
			
				  ID:isid ,
				  MATERIAL_CODE:MATERIAL_CODE,
				  MATERIAL_NAME:MATERIAL_NAME,
				  SUPPLIER_CODE:SUPPLIER_CODE,
				  SUPPLIER_NAME:SUPPLIER_NAME,
				  TIMES:TIMES,
				  F_FIRST:F_FIRST,
				  S_SECOND:S_SECOND,
				  THIRD:THIRD,
				  FOURTH:FOURTH,
				  EARLYWARNING:EAWARNING,
				  ROHS_REPORT:ROHS_REPORT,
				  IFS: IFServerNo
				},
				
				
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','productWConf_tab',{IFS:'MES_IQC0002'});
            			$('#enditTab').dialog('close');
            			initGridData();
            		});
                	
				},
			    errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
			
		}
		
			
	};
	application.prototype = {
		init: function() {
			$(function() {			
//				var CompanyOpttype; //0：新增   1:编辑  
				var isid ='';
				var cong_id;
				var checkedRow;
				initGridData();	
		          /*$('#SPCchartType').combobox({
		              data:[
		                  {value:'',text:'--请选择--'},
			              {value:'X-bar R',text:'X-bar R'},
			              {value:'p Chart',text:'p Chart'},
			              {value:'np Chart',text:'np Chart'},
			              {value:'c Chart',text:'c Chart'},
			              {value:'u Chart',text:'u Chart'} 
		              ],
		              valueField:'value',
		              textField:'text',
		              panelHeight:150, 
		            });*/
		          
		          
				
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#btnSearch').click(function() {
					
					getDataBySearch();
				});				
				$('.add').click(function() {
					//insertDataGrid('productWConf_tab',{SPCPROJECT_ID:autoCreateCode('Cfg')});
					addStation();
				});
				$('#btnUpdate').click(function() {
					
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnSearch1').click(function(){
					var titleName = '重检超时设置列表添加';
					var dialogName = 'addMaterialDetails';
					var tabName = 'materialDetails_tab';
					var search_itemCD = $('#search_itemCD').textbox('getValue');
					var reqData = {
						IFS: 'MES_IQC0001',
						ITEM_CD:search_itemCD,
						
					}
					openDialogFrame(tabName,dialogName,titleName,reqData);
				});
				$('#btnDelete').click(function(){
	                deleteStation();
	            });
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var fcfo = new application();
	var CompanyOpttype='';
	fcfo.init();
})();