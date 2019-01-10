/* 启动时加载 */
/*
 */
(function() {
	function application() {
		getSelectedCondtion = function() {
			// 设备编号
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'B000029'
				},
				successCallBack : function(data) {
					var array = new Array();
					var rowCollection = createSourceObj(data);
					var array = new Array();
					array.push({
						"id" : "",
						"text" : "全部"
					});
					for (var i = 0; i < rowCollection.length; i++) {
						array.push({
							"id" : rowCollection[i].ET_CD,
							"text" : rowCollection[i].ET_NM
						});
					}

					// 查询
					$('#cxEquipCode').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});

				}
			});
		},
		initGridData = function() {
				var dgrid = $('#Apply_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'P000021',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'Apply_tab', reqData);
				
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'Apply_tab',
					dataType: 'json',
					columns: [
						[
//						{field : "CZ",width : 10,checkbox : true},
							{
								
								field: 'TF_SN',
								title: '调拨单号',								
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'DICT_IT',
								title: '',
								hidden:'ture',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'DICT_IT_NM',
								title: '设备类型',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ET_CD',
								title: '',
								width: 100,
								hidden:'ture',
								align: 'center',								
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'ET_NM',
								title: '设备编号',
								width: 100,
								align: 'center',								
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'EQ_LN',
								title: '',
								hidden:'ture',
								width: 200,
								align: 'center',
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'EQ_LN_NM',
								title: '所属线别',
								width: 200,
								align: 'center',
								formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'TF_LN',
								title: '',
								hidden:'ture',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'TF_LN_NM',
								title: '调拨线别',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'TC_ID',
								title: '',
								hidden:'ture',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'EMP_NM',
								title: '负责人',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'CRT_DT',
								title: '创建时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}								
							}, {
								field: 'UPT_ID',
								title: '修改人',
								width: 100,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
							}, {
								field: 'UPT_DT',
								title: '修改时间',
								width: 200,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                return "<span title='" + value + "'>" + value + "</span>";}
								}, 

						]
					],
					onDblClickRow: function(index,row){	
				    	 CompanyOpttype=1;
				    	 $("#enditTab").dialog("open").dialog('setTitle', '修改调拨申请信息');
				    	 checkFun();
				    	    $('#txtApplyCode').textbox('setValue', row.TF_SN==null?'':row.TF_SN);
							$('#txtEquipType').combobox('setValue', row.DICT_IT==null?'':row.DICT_IT);
							$('#txtEquipment').combobox('setValue', row.ET_CD==null?'':row.ET_CD);
							$('#txtOldLine').combobox('setValue', row.EQ_LN==null?'':row.EQ_LN);
							$('#txtNewLine').combobox('setValue', row.TF_LN==null?'':row.TF_LN);
							$('#txtMenber').combobox('setValue', row.TC_ID==null?'':row.TC_ID);							
				     }
				}
				initGridView(reqData, grid);
				$('#Apply_tab').datagrid('loadData', jsonData);
			}
			checkFun = function (){
				var qx = getUpdateRight();
				if(qx=="Y"){
					 $('#txtApplyCode').textbox('textbox').attr('disabled', true);
			    	 $('#txtEquipType').combobox('textbox').attr('disabled', false);
			    	 $('#txtEquipment').combobox('textbox').attr('disabled', false);
			    	 $('#txtOldLine').combobox('textbox').attr('disabled', false);
			    	 $('#txtNewLine').combobox('textbox').attr('disabled', false);
			    	 $('#txtMenber').combobox('textbox').attr('disabled', false);
			    	 $('#saveID').show();
			    	 $('#cancleID').show();
				}else{
					CompanyOpttype=2;
					$('#txtApplyCode').textbox('textbox').attr('disabled', true);
			    	 $('#txtEquipType').combobox('textbox').attr('disabled', false);
			    	 $('#txtEquipment').combobox('textbox').attr('disabled', false);
			    	 $('#txtOldLine').combobox('textbox').attr('disabled', false);
			    	 $('#txtNewLine').combobox('textbox').attr('disabled', false);
			    	 $('#txtMenber').combobox('textbox').attr('disabled', false);
			    	 $('#saveID').hide();
//			    	 $('#cancleID').hide();
				}
				 
			}		
		setDataNull = function () {           
              $('#txtApplyCode').textbox('setValue','');              
          }
		getDataBySearch = function(){
				var dgrid = $('#Apply_tab').datagrid('options');
				if(!dgrid) return;
				var cxApplyNum = $('#cxApplyNum').val();
				var cxEquipCode = $('#cxEquipCode').combobox('getValue');				
				var reqData = {
					TF_SN: cxApplyNum,
					ET_CD: cxEquipCode,					
					IFS: 'P000021',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'Apply_tab',reqData);
			}
			/* 修改商品移动信息 */
			var staFactory;
			var staCategory;
			var Line1;
			var Line2;
			var Member;
		updateStation = function() {
			var checkedItems = $('#Apply_tab').datagrid('getSelections');
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
			var row = $("#Apply_tab").datagrid("getSelected");
			if(row) {
				staFactory=row.ET_CD;
				staCategory=row.DICT_IT_NM;
				Line1=row.EQ_LN;
				Line2=row.TF_LN;
				Member=row.TC_ID;
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '编辑调拨申请信息');
				$('#txtApplyCode').textbox('textbox').attr('readonly', true);
				$('#txtApplyCode').textbox('textbox').attr('disabled', true);
				$('#txtApplyCode').textbox('setValue', row.TF_SN==null?'':row.TF_SN);
				$('#txtEquipType').combobox('setValue', row.DICT_IT==null?'':row.DICT_IT);
				$('#txtEquipment').combobox('setValue', row.ET_CD==null?'':row.ET_CD);				
				$('#txtOldLine').combobox('setValue', row.EQ_LN==null?'':row.EQ_LN);
				$('#txtNewLine').combobox('setValue', row.TF_LN==null?'':row.TF_LN);
				$('#txtMenber').combobox('setValue', row.TC_ID==null?'':row.TC_ID);
				CompanyOpttype = 1;				
			}
			checkFun();
		}
		validSelectedData = function (gridName,type) {
            var checkedItems = $(gridName).datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        deleteStation = function () {
             var isSelectedData = validSelectedData('#Apply_tab', 'Delete');
             if (!isSelectedData) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
             var checkedItems = $('#Apply_tab').datagrid('getSelections');
             //确认提示框
             var delCnt=0;
             $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            			 delCnt++;
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'P000023',
                                     TF_SN: item.TF_SN,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
	                              	 		$.messager.alert('提示', '删除成功!','',function(){
	                                	      initGridData();
	                                     });	
	                              	 	}else{
	                              	 		$.messager.alert('提示','删除失败,此数据正在使用!')
	                              	 	}
	                                     
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				$.messager.alert('提示','删除失败,服务器无响应!');
                         			}
                         		}
                          };
                         iplantAjaxRequest(ajaxParam);
                     });
            	 }
             });      
        },
        dataArr={},
        
        getApplyOrder =function(){
            var workOrderData='';
            var ajaxParam={
                url:'/iPlant_ajax',
                data:{
                      IFS:'P000025',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                        rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                        workOrderData=data.RESPONSE["0"].RESPONSE_DATA[0];
                    }
                    $('#txtApplyCode').textbox('setValue',workOrderData.TF_SN).textbox('readonly').textbox({ required: true });                                                                         
                }
            } 
            iplantAjaxRequest(ajaxParam); 
        }
		/* 添加商品移动信息 */
		addStation = function() {
        	CompanyOpttype = 0;
        	getApplyOrder();
        	checkFun();
        	$('#txtApplyCode').textbox('textbox').attr('readonly',
					false);
			$('#txtApplyCode').textbox('textbox').attr('disabled',
					false);
			$("#enditTab").dialog("open").dialog('setTitle', '车间信息添加');
			$("#fmStation").form("clear");			
		}
        /*验证修改内容是否重复*/
        saveUpdateValidate = function() {
			var checkedItems = $('#Apply_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.TF_SN) {
//				var isUserYn = 'N';
//				if ($('#txtStationUse').is(':checked')) {
//					isUserYn = "Y";
//				} else {
//					isUserYn = "N";
//				}
				if ($('#txtApplyCode').textbox('getValue') != (row.TF_SN==null?'':row.TF_SN)
						|| $('#txtEquipType').combobox('getValue') != (row.DICT_IT==null?'':row.DICT_IT)
						|| $('#txtEquipment').combobox('getValue') != (row.ET_CD==null?'':row.ET_CD)						
						|| $('#txtOldLine').combobox('getValue') != (row.EQ_LN==null?'':row.EQ_LN)						
						|| $('#txtNewLine').combobox('getValue') != (row.TF_LN==null?'':row.TF_LN)  
					    || $('#txtMenber').combobox('getValue') != (row.TC_ID==null?'':row.TC_ID)) {
					return true;
				} else {
					return false;
				}
			}
		}
		savaStation = function() {
			
			var IFServerNo = '';
			var reqData = [];
		    if(CompanyOpttype == 0) {
				IFServerNo = 'P000022'
			} else if(CompanyOpttype == 1) {
				if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				IFServerNo = 'P000024'
			} else {
				IFServerNo = 'P000021'
			}
			var susMsg = '',
				errorMsg = '';
			if(CompanyOpttype == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			if(!checkForm()) return;
			var ajaxParam = {
				url: '/iPlant_ajax',
				dataType: 'JSON',
				data: {
					TF_SN: $('#txtApplyCode').val(),
					DICT_IT: $('#txtEquipType').combobox('getValue'),
  				    ET_CD: $('#txtEquipment').combobox('getValue'),
					EQ_LN: $('#txtOldLine').combobox('getValue'),
					TF_LN: $('#txtNewLine').combobox('getValue'),
					TC_ID: $('#txtMenber').combobox('getValue'),					
					IFS: IFServerNo
				},
				successCallBack: function(data) {
					var susMsg=getReturnMsg(data);
                	$.messager.alert("提示",susMsg,"",function(){
            			reqGridData('/iPlant_ajax','Apply_tab',{IFS:'P000021'});
            			$('#enditTab').dialog('close');
            			setDataNull();
            			initGridData();
            		});
				},
				errorCallBack: function() {
					$.messager.alert('提示', errorMsg);
				}
					
			};
			iplantAjaxRequest(ajaxParam);
			
		},
		initCombogridData = function() {
				var reqData = {
					IFS: 'B000029'
				}
				reqCombogridData('/iPlant_ajax', reqData);
			},

			bindCombogrid = function() {
				var ajaxParam2={
				          url:'/iPlant_ajax',
				          data:{
				            IFS:'B000029',
				          	USE_YN:'Y'
				          },
				          successCallBack:function(data){
				            var rowNum=0
				            if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
				               rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
				            }
				            var rowCollection=createSourceObj(data);
				            for(var i=0; i<rowCollection.length; i++){
				            	dataArr[rowCollection[i].ET_CD]=rowCollection[i].ET_NM;
				            }
				            var jsonData={
				                  total:rowNum,
				                  rows:rowCollection
				            }				           
				       		$('#txtEquipment').combobox({
				                data:rowCollection,
				                valueField: 'ET_CD',
								textField: 'ET_NM',
				                panelWidth:200,
								})
				       		if(CompanyOpttype == 1){
				       			$('#txtEquipment').combobox('setValue', staFactory);
				
				       		}
				          	}
				       }
				iplantAjaxRequest(ajaxParam2);
				}
			
	}
	application.prototype = {
		init: function() {
			$(function() {
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'B000029',USE_YN:'Y'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					equipNum.push({"id":rowCollection[i].ET_CD,"text":rowCollection[i].ET_NM});
	    				}
	    				
	    				$('#txtEquipment').combobox({
							data : equipNum,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				
				//设备类型
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'D000008',DICT_CD:"CEM01",USE_YN:'Y'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					equipType.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
	    				}
	    				
	    				$('#txtEquipType').combobox({
							data : equipType,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				
				//所属线别
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'B000109'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					underLine.push({"id":rowCollection[i].PD_LN_CD,"text":rowCollection[i].PD_LN_NM});
	    				}
	    				
	    				$('#txtOldLine').combobox({
							data : underLine,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				
				//负责人
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS : 'D000041',EMP_ST : '1'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					header.push({"id":rowCollection[i].EMP_CD,"text":rowCollection[i].EMP_NM});
	    				}
	    				
	    				$('#txtMenber').combobox({
							data : header,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				
				//调拨线别
				iplantAjaxRequest( {
	    			url: '/iPlant_ajax',
	    			data: {IFS:'B000109'},
	    			successCallBack: function (data) {
	    				var rowCollection = createSourceObj(data);
	    				for(var i=0; i<rowCollection.length;i++){
	    					allotLine.push({"id":rowCollection[i].PD_LN_CD,"text":rowCollection[i].PD_LN_NM});
	    				}

	    				$('#txtNewLine').combobox({
							data : allotLine,
							valueField : 'id',
							textField : 'text'
						});
	    			}
	    		});
				var CompanyOpttype; //0：新增   1:编辑
				getSelectedCondtion();
				initGridData();							
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnFreshen').click(function() {
					getDataBySearch();
				});
				$('.add').click(function() {					
//					bindCombogrid();
					addStation();
				});
				$('#btnUpdate').click(function() {					
					bindCombogrid();
					updateStation();
				});
				$('.save').click(function() {
					savaStation();
				});
				$('#btnDelete').click(function(){
	                deleteStation();
	            });
				$('.close').click(function() {
					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('.panel-tool-close').click(function() {
					setDataNull();
				});
			});
		}
	}
	var fcfo = new application();
	 // 初始化全局变量对象
	var dataGrid = $('#fmStation');
	var equipType = [];
	var equipNum = [];
	var underLine = []; 
	var allotLine = [];
	var header = [];
	fcfo.init();
})();