
(function() {
	function application() {
		initGridData=function(){
			var dgrid=$('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData={
					OBJECTTYPE: '1',
					OPERATETYPE:'1',
					IFS:'WMS_QHold002',
					pageIndex:1,
					pageSize:dgrid.pageSize
			};
			reqGridData('/iPlant_ajax','productWConf_tab',reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'productWConf_tab',
				dataType: 'json',
//				singleSelect:false, 是否单选 
				columns: [
							[
							{
								field: 'HISTORYID',
								title: 'HoldID',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},
							{
								field: 'OBJECTCODE',
								title: '对象编号',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},
							{
								field: 'OBJECTTYPE',
								title: '对象类型',
								width: 150,
								align: 'center',formatter: function (value) {
								if(value =='1')
									return "<span title='" + '工单' + "'>" + '工单' + "</span>";
								else if(value == '2')
                                return "<span title='" + '产品' + "'>" + '产品' + "</span>";
								else if(value == '3')
	                               return "<span title='" + '物料' + "'>" + '物料' + "</span>";
								else if(value == '4')
	                                return "<span title='" + '在制品序列号' + "'>" + '在制品序列号' + "</span>";
									
								}
							},{
								field: 'OPERATETYPE',
								title: '操作类型',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value == '1'){
                                return "<span title='" + 'Hold' + "'>" + 'Hold' + "</span>";
								}
								else{
									return "<span title='" + 'UnHold' + "'>" + 'UnHold' + "</span>";
								}
							}
							},{
									field: 'REMARK',
									title: '原因说明',
									width: 220,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_DT',
								title: '创建日期',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'CRT_ID',
								title: '创建人',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},
							{
								field: 'UPT_DT',
								title: '修改日期',
								width: 180,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							},{
								field: 'UPT_ID',
								title: '修改人',
								width: 150,
								align: 'center',formatter: function (value) {
					           	if(value != null)
                                return "<span title='" + value + "'>" + value + "</span>";}
							}
						]
					]
			};
			initGridView(reqData,gridList);
			$('#productWConf_tab').datagrid('loadData',jsonData);
		};
					
		getDataBySearch = function(objectType1){
			var dgrid = $('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				OPERATETYPE:'1',
				OBJECTTYPE: objectType1,
				IFS: 'WMS_QHold002',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
		};
		
        
		//置空查询输入框
		setQueryNull=function() {
    		$('#txtSPCProjectName').textbox('setValue',"");
    		$("#txtOrderNO").textbox('setValue',"");
    		$("#txtCauseDescription1").textbox('setValue',"");
    		$("#txtMaterialCode").textbox('setValue',"");
    		$("#txtCauseDescription2").textbox('setValue',"");
    		$("#txtSN").textbox('setValue',"");
    		$("#txtCauseDescription3").textbox('setValue',"");
    		$("#txtVendorCode").textbox('setValue',"");
    		$("#txtDateCode").textbox('setValue',"");
    		$("#txtLotCode").textbox('setValue',"");
			$('#txtSN1').textbox('setValue',"");
			$('#txtSN3').textbox('setValue',"");
			$('#txtSN2').textbox('setValue',"");
		};
		
		savaStation = function(number,code,enable) {
			var count=0;
			var id='';
			var operatetype='';
			var Holdorunholdcause='';
			var reqData={
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
					OBJECTCODE:code,
					IFS:'WMS_QHold002'
			},successCallBack: function(a) {
				var op = a.RESPONSE[0].RESPONSE_DATA;
				count=0;
				$.each(op,function(n,obj){
					count=count+1;
					id=obj.HISTORYID;
					objectstatus=obj.OBJECTSTATUS;
					Holdorunholdcause=obj.REMARK;
				});
				if(count == 0) {
					IFServerNo = 'WMS_QHold004';
					operatetype=1;
				} else if(count >= 1) {	//修改
					IFServerNo = 'WMS_QHold005'; 	
					operatetype=2;		//操作类型
					
				} else {
					IFServerNo = 'WMS_QHold002';
				}
				if(count == 0) {
					susMsg = '添加成功';
					errorMsg = '添加失败,请联系管理员';
				} else {
					susMsg = '更新成功';
					errorMsg = '更新失败,请联系管理员';
				}
				var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						HISTORYID:id,
						OBJECTTYPE:number,
						OBJECTCODE: code,
						OBJECTSTATUS:'1',
						HOLDORUNHOLDCAUSE:Holdorunholdcause,
						OPERATETYPE: operatetype,
						REMARK:enable,					
						IFS: IFServerNo
					},
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
	                	$.messager.alert("提示",susMsg,"",function(){
	                		getDataBySearch(number);
	                		setQueryNull();
	            		});
					},
				    errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
						
				};
				iplantAjaxRequest(ajaxParam);
				}
			};
			iplantAjaxRequest(reqData);
			
			
			
		};
		
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
               				arrUpdate.push({HISTORYID:item.HISTORYID});
                     });
               		 
               		 if(arrUpdate.length>0){
         	          /*批量删除*/
                         var ajaxUpdate = {
                             url: '/iPlant_ajax',
                             dataType: 'JSON',
                             data: {
                                 list: arrUpdate,
                                 IFS: 'WMS_QHold006'
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
               			showmessage.html('<font color=red>删除失败！</font>');
               		 }
               	}
            });      
    	};
		getDataBySearch1 = function(objectType1,objectcode){
			var dgrid = $('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				OBJECTCODE:objectcode,
				OBJECTTYPE: objectType1,
				OPERATETYPE:'1',
				IFS: 'WMS_QHold002',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
		};
		savaStation2 = function(code,txtVendorCode,txtDateCode,txtLotCode,enable,number) {
			susMsg = '添加成功';
			errorMsg = '添加失败,请联系管理员';
				var ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
						MATERIALCODE:code,
						VENDORCODE: txtVendorCode,
						DATECODE: txtDateCode,
						LOTCODE:txtLotCode,
						REMARK:enable,					
						IFS: 'WMS_QHold003'
					},
					successCallBack: function(data) {
						var susMsg=getReturnMsg(data);
	                	$.messager.alert("提示",susMsg,"",function(){
	                		getDataBySearch(number);
	                		setQueryNull();
	            		});
					},
				    errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
						
				};
				iplantAjaxRequest(ajaxParam);
		};
	};
	application.prototype = {
		init: function() {
			$(function() {			
				initGridData();	
				var title1='工单QHold';
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#tt').tabs({
				    border:false,
				    onSelect:function(title){
				    	title1=title;
			    		setQueryNull();
				    	if(title === '工单QHold'){
				    		getDataBySearch(1);
				    	}
				    	if(title=== '物料QHold'){
				    		getDataBySearch(3);
				    	}
				    	if(title=== '在制品QHold'){
				    		getDataBySearch(4);
				    	}
				    }
				});
				$('#btnsave').click(function() {
					if(title1 === '工单QHold'){
						var code=$("#txtOrderNO").val();
						var MO=$("#txtCauseDescription1").val();
						if(code==''){
							$.messager.alert('提示', '工单号不能为空！');
							return;
						}
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation(1,code,MO);
			    	}
			    	if(title1 === '物料QHold'){
			    		var code=$("#txtMaterialCode").val();
						var MO=$("#txtCauseDescription2").val();
						var txtVendorCode=$("#txtVendorCode").val();
						var txtDateCode=$("#txtDateCode").val();
						var txtLotCode=$("#txtLotCode").val();
						if(code==''){
							$.messager.alert('提示', '物料编码号不能为空！');
							return;
						}
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation(3,code,MO);
						if(txtVendorCode !='' && txtDateCode!='' && txtLotCode!=''){
							savaStation2(code,txtVendorCode,txtDateCode,txtLotCode,MO,3);
						}
			    	}
			    	if(title1 === '在制品QHold'){
			    		var code=$("#txtSN").val();
						var MO=$("#txtCauseDescription3").val();
						if(code==''){
							$.messager.alert('提示', '产品序列号不能为空！');
							return;
						}
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation(4,code,MO);
			    	}
				});

				$('#btnDelete').click(function() {
					deleteStation();
				});
				$('#btnSearch1').click(function() {
					var txtSN1=$('#txtSN1').val();
					getDataBySearch1(1,txtSN1);
				});
				$('#btnSearch2').click(function() {
					var txtSN2=$('#txtSN2').val();
					getDataBySearch1(3,txtSN2);
				});
				$('#btnSearch3').click(function() {
					var txtSN3=$('#txtSN3').val();
					getDataBySearch1(4,txtSN3);
				});
				$('#btnResets').click(function(){
					setQueryNull();
				});
			});
		}
	};

	var fcfo = new application();
	fcfo.init();
})();