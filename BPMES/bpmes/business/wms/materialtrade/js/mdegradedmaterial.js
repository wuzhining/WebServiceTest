/* 启动时加载 */
/*
 */
(function() {
	function application() {
		initGridData = function() {
			$("ul.tabs").css('background-color',"white");  
			initDataList();
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'package_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [[
					{field: 'MACHINE_NO',title: '设备编号',width: 150,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'CRUSH_NO',title: '碎料单号',width: 180,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'DRAINAGE_NO',title: '水口料号',width: 200,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'MATERIAL_ID',title: '原料编码',width: 180,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'DICT_IT_NM',title: '状态',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'STATUS',title: '状态',width: 0,align: 'center',hidden:true},      
					{field: 'TOTAL_QTY',title: '总数量',width:100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
/*					{field: 'QTY',title: '已投数量',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},*/					
					{field: 'QTY',title: '产出数量',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'UNPACK_QTY',title: '未包装数量',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
					{field: 'UNIT_NAME',title: '单位',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},    
					{field: 'MIN_PACKAGE',title: '最小包装数量',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '制单时间',width: 200,align: 'center'},      
					{field: 'CRT_ID',title: '制单人',width: 100,align: 'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}}
					]],
					onClickRow: function(index,row){
						if(row!=null){
							if(row.STATUS=='WORDERSTATUS-03'){
								$("#btnComplete").addClass("l-btn-disabled");
								$("#btnhuichu").addClass("l-btn-disabled");
							}else{
								$("#btnComplete").removeClass("l-btn-disabled");
								$("#btnhuichu").removeClass("l-btn-disabled");
							}
							OpenCrushAttribute(row.CRUSH_NO,"");
				        	OpenCysAttribute(row.CRUSH_NO,"");
							$("#crushid").html(row.CRUSH_NO);
						}
						if(row==null){
							$('#sernumid').textbox('setValue','');
							//initBarcode('#','');
							$('#crushid').html('');
						}
			       }
			}
			initGridView(reqData, gridList);
			$('#package_tab').datagrid({"onLoadSuccess":function(data){
			     if(data.rows.length>0){
	       		     $(this).datagrid('selectRow',0);
	       		     if(checkNotEmpty(data.rows[0].CRUSH_NO)){
	       		    	crushNo = data.rows[0].CRUSH_NO;
	       		        $('#crushid').html(crushNo);
	       		        OpenCrushAttribute(crushNo,"");
			        	OpenCysAttribute(crushNo,"");
	       		    	if(data.rows[0].STATUS=='WORDERSTATUS-03'){
						   $("#btnComplete").addClass("l-btn-disabled");
						   $("#btnhuichu").addClass("l-btn-disabled");
	       		    	}else{
	       		             $("#btnComplete").removeClass("l-btn-disabled");
						     $("#btnhuichu").removeClass("l-btn-disabled");
	       		    	}
		        	}
			   }
			   if(data.rows[0]==null){
				   $('#crushid').html('#');
				   $('#sernumid').textbox('setValue','');
				  // initBarcode('#','');
			   }
			}}).datagrid('loadData', jsonData);
			$('#package_tab').datagrid('loadData', jsonData);
			if(jsonData.rows.length==0){
				commonShowMessage('没有相关记录');
			}
		},
		//置空查询输入框
		setQueryNull = function () {
		      $('#machineNo').textbox('setValue',"");
		      $('#crushNo').textbox('setValue',"");
		      $('#status').combobox('setValue',"");
		      $('#qProDtBegin').datebox('setValue',"");
		      $('#qProDtEnd').datebox('setValue',"");
	    }
		completeCrush = function(){
			var checkedItems = $('#package_tab').datagrid('getSelections');
			var moveIds = [];	
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				commonShowMessage('请选择一条数据进行完结!');
				return false;
			}
			var row = $("#package_tab").datagrid("getSelected");
			//查询有没有未包装的数量
			if(row.STATUS=='WORDERSTATUS-03'){return false;}
			if(((parseInt(row.UNPACK_QTY)!=0))&&(row.UNPACK_QTY!=null)){
				commonShowMessage('碎料单有未包装数量，不能完结!');
				return;
			}else{
				$.messager.confirm('确认框', '您确定要完结您所选择的碎料单吗?', function (r) {
	                if(r==true){
	                	var ajaxParam = {
	                        url: '/iPlant_ajax',
	                        dataType: 'JSON',
	                        data: {
	                            IFS: 'WMS_ZX00015',
	                            CRUSH_NO:row.CRUSH_NO,
	                            STATUS:'WORDERSTATUS-03'
	                        },
	                        successCallBack:function(data){
	                        	commonShowMessage('碎料单完结成功!');
	                        	initGridData(); 
	                        },
	                        errorCallBack:function(data){
	                        	commonShowMessage('碎料单完结操作失败，请联系管理员!');
	                        	return false; 
	                        }
	        			};
	        			iplantAjaxRequest(ajaxParam);
	                }
	       	 	})
			}
	        
		}
		initDataList = function(){
			var dgrid = $('#package_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				IFS: 'WMS_ZX00010',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'package_tab', reqData);
		}
		queryDataListByCondition=function(){
			var dgrid = $('#package_tab').datagrid('options');
			if(!dgrid) return;
			var machineNo = $('#machineNo').textbox('getValue'),crushNo = $('#crushNo').textbox('getValue'),status = $('#status').combobox('getValue'),crushNo = $('#crushNo').textbox('getValue'),qProDtBegin= $('#qProDtBegin').datebox('getValue'),qProDtEnd= $('#qProDtEnd').datebox('getValue');
			var reqData = {
				IFS: 'WMS_ZX00010',
				MACHINE_NO:machineNo,
				CRUSH_NO:crushNo,
				STATUS:status,
				CRT_BDT:qProDtBegin,
				CRT_EDT:qProDtEnd,
				pageIndex: dgrid.pageNumber,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'package_tab', reqData);
		}
		huishoucrushno=function(){
			var checkedItems = $('#package_tab').datagrid('getSelections');
			var moveIds = [];	
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				commonShowMessage('请选择一条数据进行产出!');
				return false;
			}
			var row = $("#package_tab").datagrid("getSelected");
			if(row.STATUS=="WORDERSTATUS-03"){return false;}
			var ajaxParam = {
	                url: '/iPlant_ajax',
	                dataType: 'JSON',
	                data: {
	                    IFS: 'WMS_ZX00014',
	                    CRUSH_NO:row.CRUSH_NO,
	                },
	                successCallBack:function(data){
	                	if(data.RESPONSE["0"].RESPONSE_DATA["0"].STATUS =='WORDERSTATUS-03'){
	                		commonShowMessage('碎料单完结,不能产出!');
	                		return; 
	                	}else if(data.RESPONSE["0"].RESPONSE_DATA["0"].STATUS =='WORDERSTATUS-02'){
	                		//能进行产出
	                		$("#enditTab").dialog("open").dialog('setTitle', '碎料产出');
	                		showMessage.html("");
	                		$('#CQTY').textbox('setValue','');
	                		var ajax = {
	                                url: '/iPlant_ajax',
	                                dataType: 'JSON',
	                                data: {
	                                    IFS: 'WMS_ZX00016',
	                                    //CRUSH_NO:row.CRUSH_NO,
	                                    MATERIAL_ID:row.MATERIAL_ID,
	                                    //DRAINAGE_NO:row.DRAINAGE_NO
	                                },
	                                successCallBack:function(data){
	                                 $('#QTY').textbox('setValue',row.MIN_PACKAGE==null?0:(row.MIN_PACKAGE));
	                                 $('#QTY').textbox('textbox').attr('readonly', true);
	                			     $('#QTY').textbox('textbox').attr('disabled', true);
	                			     $('#UNIT').textbox('setValue',row.UNIT_NAME==null?0:(row.UNIT_NAME));
	                                 $('#UNIT').textbox('textbox').attr('readonly', true);
	                			     $('#UNIT').textbox('textbox').attr('disabled', true);
	                			     $('#DRAINAGE_NO').textbox('setValue',row.DRAINAGE_NO==null?'':row.DRAINAGE_NO);
	                       		     $('#DRAINAGE_NO').textbox('textbox').attr('readonly', true);
	                				 $('#DRAINAGE_NO').textbox('textbox').attr('disabled', true);
	                				 $('#MATERIAL_ID').textbox('textbox').attr('readonly', true);
	               				     $('#MATERIAL_ID').textbox('textbox').attr('disabled', true);
	               				     $('#UNPACK_QTY').textbox('textbox').attr('readonly', true);
	               				     $('#UNPACK_QTY').textbox('textbox').attr('disabled', true);
	               				     $('#MACHINE_NO').textbox('textbox').attr('readonly', true);
	               				     $('#MACHINE_NO').textbox('textbox').attr('disabled', true);
	               				     $('#CRUSH_NO').textbox('textbox').attr('readonly', true);
	               				     $('#CRUSH_NO').textbox('textbox').attr('disabled', true);
	                       		     $('#CQTY0').textbox('setValue', (parseInt(row.TOTAL_QTY)-parseInt(row.QTY==null?0:row.QTY)));
	               			         $('#CQTY0').textbox('textbox').attr('disabled', true);
	               			         $('#CQTY0').textbox('textbox').attr('disabled', true);
	               			         $('#CQTY').textbox('setValue',"0");
	                       		     $('#MATERIAL_ID').textbox('setValue',row.MATERIAL_ID==null?'':row.MATERIAL_ID);
	                       		     $('#MACHINE_NO').textbox('setValue',row.MACHINE_NO==null?'':row.MACHINE_NO);
	                       		     $('#UNPACK_QTY').textbox('setValue',row.UNPACK_QTY==null?0:(row.UNPACK_QTY));
	                       		     $('#CRUSH_NO').textbox('setValue',row.CRUSH_NO==null?'':row.CRUSH_NO);
	                       		     $('#YorN').prop('checked', '');
	                                }
	                		};
	                		iplantAjaxRequest(ajax);
	                	}
	                }
			 	};
	        	iplantAjaxRequest(ajaxParam);	
			}
		    //产出保存
		var useYn='';
		setcanle=function(){
			$('#CQTY').textbox('setValue',"");
			$('#YorN').prop('checked', '');
			$('#enditTab').dialog('close');
		},
		checkDataValid = function(){
			var cqty = $("#CQTY").textbox("getValue");
			var total = $("#CQTY0").textbox("getValue");
			var qty = $("#QTY").textbox("getValue");
			if(!checkNotEmpty(cqty)){
				showMessage.html("<font color=red>产出数量不能为空.</font>");
				return false;
			}else{
				if(cqty>0){
					if(cqty>total){
						showMessage.html("<font color=red>产出数量不能大于投料数量.</font>");
						return false;
					}else{
						showMessage.html("");
					}
				}else{
					showMessage.html("<font color=red>产出数量不能为0.</font>");
					return false;
				}
			}
			if(!checkNotEmpty(qty)){
				showMessage.html("<font color=red>最小包装数不能为空.</font>");
				return false;
			}else{
				if(qty>0){
					showMessage.html("");
				}else{
					showMessage.html("<font color=red>最小包装数不能为0.</font>");
					return false;
				}
			}
			return true;
		},
		savaStation=function(){
			if ($('#YorN').is(':checked')) { useYn = "1"; } else { useYn = "0"; } 
			var CRUSH_NO= $('#CRUSH_NO').textbox('getValue');
			var DRAINAGE_NO= $('#DRAINAGE_NO').textbox('getValue');
			var CQTY= $('#CQTY').textbox('getValue');
			if(!checkDataValid()){
				return false;
			}else{
				var ajaxParam = {
	                url: '/iPlant_ajax',
	                dataType: 'JSON',
	                data: {
	                    IFS: 'WMS_ZX00018',
	                    CRUSH_NO:CRUSH_NO,
	                    DRAINAGE_NO:DRAINAGE_NO,
	                    CQTY:CQTY,
	                    USEYN:useYn
	                },
	                successCallBack:function(data){
		                if(data.RESPONSE["0"].RESPONSE_DATA["0"].MESSAGE =='1'){
		                	commonShowMessage('碎料单产出成功!');
		                	$('#enditTab').dialog('close');	
		                	initGridData();
		                }	
		            }
				}
				iplantAjaxRequest(ajaxParam);
			}
		},
		OpenCrushAttribute=function(serialnumber,ser){
			var tabName = 'Barcode_tab';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;
			var reqData = {
					IFS: 'WMS_ZX00012',
					CRUSH_NO: serialnumber,
					CRUSH_SN: ser,
					pageIndex: dgridOp.pageNumber,
					pageSize: dgridOp.pageSize	
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
			dialogEditorDataGrid = function(tabName,reqData, jsonData) {
				var columnsTab;
				columnsTab=[
//					    {field : "CZ",width : 10,checkbox : true},
				    { field: 'CRUSH_SN', title: '水口料标签', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},     
				    { field: 'MO_NO', title: '制令单号', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},     
				    { field: 'QTY', title: '数量', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
				    { field: 'UNIT_NAME', title: '单位', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
				    { field: 'EMP_NO', title: '投料人', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
				    { field: 'CRUSH_DT', title: '投料时间', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
				    { field: 'MACHINE_NO', title: '设备编号', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},     
				    { field: 'MACHINE_TYPE', title: '设备类型', width: 100 ,align:'center'}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					singleSelect:true,
					columns: [columnsTab]
				}
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		},
		OpenCysAttribute = function(crushNo,qCrushSn){
			var tabName = 'Barcode_sd';
			var dgridOp = $('#'+tabName).datagrid('options');
			if(!dgridOp) return;	
			var reqDataA = {
					IFS: 'WMS_ZX00013',
					CRUSH_SN: qCrushSn,
					CRUSH_NO: crushNo,
					pageIndex: dgridOp.pageNumber,
					pageSize: dgridOp.pageSize	
			}			
			dialogEditorDataGrid1 = function(tabName,reqDataA, jsonData) {
				var columnsTab,edDataGrid,messageInfo;
				columnsTab=[
						{ field: 'RECYCLE_SN', title: '回收料标签', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},     
						{ field: 'QTY', title: '数量', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
						{ field: 'UNIT_NAME', title: '单位', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
						{ field: 'EMP_NO', title: '回收人员', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
						{ field: 'RECYCLE_DT', title: '回收时间', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},      
						{ field: 'MACHINE_NO', title: '设备编号', width: 200 ,align:'center',formatter: function (value) {if(value != null) return "<span title='" + value + "'>" + value + "</span>";}},     
						{ field: 'MACHINE_TYPE', title: '设备类型', width: 200 ,align:'center'}
				];
				var gridLists = {
					name: tabName,
					dataType: 'json',
					columns: [columnsTab]
				}
				initEditorDataGridView1(reqDataA, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
			myDataGrid('/iPlant_ajax', tabName, reqDataA,dialogEditorDataGrid1);
		}
	};
	
	application.prototype = {
		init: function() {
			$(function() {	
				/*初始化全局变量对象*/
				dataGrid = $('#package_tab'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g"),showMessage = $("#showMessage"),crushNo='';
				initGridData();
				$('#btnSearch').click(function() {queryDataListByCondition();});
				$('#btnSearch0').click(function() {	
					var sernumid=$('#sernumid').textbox('getValue');
					OpenCrushAttribute(crushNo,sernumid);
					OpenCysAttribute(crushNo,sernumid);
				});
				$('#btnReset').click(function(){ setQueryNull();});
				$('#btnComplete').click(function(){ completeCrush(); });
				$('#btnhuichu').click(function(){ huishoucrushno(); });
			});
		}
	}
	var app = new application();
	app.init();
})();