
(function() {
	function application() {
		initGridData=function(){
			var dgrid=$('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData={
					OBJECTTYPE: '1',
					OPERATETYPE:'2',
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
				singleSelect:false,
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
								title: '编号',
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
							},
								{
									field: 'REMARK',
									title: '原因说明',
									width: 220,
									align: 'center',formatter: function (value) {
						           	if(value != null)
	                                return "<span title='" + value + "'>" + value + "</span>";}
								},
							
							{
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
				OBJECTTYPE: objectType1,
				OPERATETYPE:'2',
				IFS: 'WMS_QHold002',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
		};
		
		getDataBySearch1 = function(objectType1,objectcode){
			var dgrid = $('#productWConf_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
				OBJECTCODE:objectcode,
				OBJECTTYPE: objectType1,
				OPERATETYPE:'2',
				IFS: 'WMS_QHold002',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'productWConf_tab',reqData);
		};
        
		//置空查询输入框
		setQueryNull=function() {
    		$("#txtCauseDescription1").textbox('setValue',"");
    		$("#txtCauseDescription2").textbox('setValue',"");
    		$("#txtCauseDescription3").textbox('setValue',"");
			$('#txtSN1').textbox('setValue',"");
			$('#txtSN3').textbox('setValue',"");
			$('#txtSN2').textbox('setValue',"");
		};
		

		savaStation2 = function(enable,number) {
            var checkedItems = $('#productWConf_tab').datagrid('getSelections');
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
            
            if(row){
    			susMsg = '修改成功';
    			errorMsg = '修改失败,请联系管理员';
    				var ajaxParam = {
    					url: '/iPlant_ajax',
    					dataType: 'JSON',
    					data: {
    						HOLDORUNHOLDCAUSE:row.REMARK,
    						HISTORYID:row.HISTORYID,
    						OPERATETYPE: '1',
    						REMARK:enable,
    						OBJECTSTATUS:row.OPERATETYPE,
    						IFS: 'WMS_QHold005'
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
		
	};
	application.prototype = {
		init: function() {
			$(function() {			
				initGridData();
				var title1='工单UnHold';
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#tt').tabs({
				    border:false,
				    onSelect:function(title){
				    	title1=title;
			    		setQueryNull();
				    	if(title === '工单UnHold'){
				    		getDataBySearch(1);
				    	}
				    	if(title=== '物料UnHold'){
				    		getDataBySearch(3);
				    	}
				    	if(title=== '在制品UnHold'){
				    		getDataBySearch(4);
				    	}
				    }
				});
				$('#btnSave').click(function() {
					if(title1 === '工单UnHold'){
						var MO=$("#txtCauseDescription1").val();
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation2(MO,1);
			    	}
			    	if(title1 === '物料UnHold'){
						var MO=$("#txtCauseDescription2").val();
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation2(MO,3);
			    	}
			    	if(title1 === '在制品UnHold'){
						var MO=$("#txtCauseDescription3").val();
						if(MO==''){
							$.messager.alert('提示', '原因说明不能为空！');
							return;
						}
						savaStation2(MO,4);
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