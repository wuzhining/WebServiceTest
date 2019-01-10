/* 启动时加载 */
/*
 */
(function() {
	function eqOfflineInfo() {
		initGridData = function() {
			var dgrid = $('#eqOfflin_tab').datagrid('options');
			if (!dgrid) return;
			var eqOfflineData = {
				IFS: 'T000094',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'eqOfflin_tab', eqOfflineData);
		}, dataArr = {};
		bindGridData = function(eqOfflineData, jsonData) {
			var grid = {
				name: 'eqOfflin_tab',
				dataType: 'json',
				singleSelect:true,
				columns: [
					[{
						field: 'OL_CD',
						title: '下线单号',
						width: 160,
						align: 'center'						
					}, {
						field: 'PL_DT',
						title: '计划下线时间',
						width: 200,
						align: 'center'
					}, {
						field: 'CHK_BY',
						title: '审核人',
						width: 150,
						align: 'center'
					}, {
						field: 'CHK_DT',
						title: '审核时间',
						width: 150,
						align: 'center'
					}, {
						field: 'LN_ST',
						title: '状态',
						width: 100,
						align: 'center'	,
                        formatter : function(value, row) {
							if(value==1){
								return "已完成";
							}else{
								return '未完成';
							}
						}					
					}, {
						field: 'CRT_ID',
						title: '创建人',
						width: 150,
						align: 'center'
					}, {
						field: 'CRT_DT',
						title: '创建时间',
						width: 200,
						align: 'center'
					}, {
						field: 'UPT_ID',
						title: '修改人',
						width: 150,
						align: 'center'
					}, {
						field: 'UPT_DT',
						title: '修改时间',
						width: 200,
						align: 'center'
					}]
				]
			}
			initGridView(eqOfflineData, grid);
			$('#eqOfflin_tab').datagrid('loadData', jsonData);
		}, 
		getDataBySearch = function() {
			var dgrid = $('#eqOfflin_tab').datagrid('options');
			if (!dgrid) return;
			var repairCode = $('#cxEquipCode').textbox('getValue'); //項目名
			var cxStartTime1 = $('#cxStartTime1').textbox('getValue'); //開始時間
			var cxStartTime2 = $('#cxStartTime2').textbox('getValue'); //结束时间
			var reqData = {
				IT_NM: repairCode,
				ST_DATE: cxStartTime1,
				END_DATE: cxStartTime2,
				IFS: 'T000056',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'eqOfflin_tab', reqData);
		}, 
		deleterepair = function() {
			var row = $('#eqOfflin_tab').datagrid('getSelected');
	        if (row == null) {
	            $.messager.alert('提示', '请选择一条数据进行删除');
	            return;
	        }
	        $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
	            if (r == true) {
	                var ajaxParam = {
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data: {
	                        IFS: 'T000097',
	                        CD: row.CD
	                    },
	                    successCallBack: function (data) {
	                            if (data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE == '0') {
	                                $.messager.alert('提示', '删除成功!', '', function () {
	                                    initGridData();
	                                    /*删除子数据*/
	                                    iplantAjaxRequest({
	                                        url: '/iPlant_ajax',
	                                        data: {
	                                            IFS: 'T000101',
	                                            CD:row.CD,
	                                            OL_CD: row.OL_CD
	                                        },
	                                        successCallBack: function (data) {}
	                                    });
	                                });
	                            } else {
	                                $.messager.alert('提示', '删除失败,此数据正在使用!')
	                            }
	                        },
	                        errorCallBack: function (data) {
	                            $.messager.alert('提示', '删除失败,服务器无响应!');
	                        }

	                };
	                iplantAjaxRequest(ajaxParam);
	            }
	        });
		},
//		saveeqOfflineInfo = function() {
//			saveDataGrid('eqOfflin_tab', 'T000057', 'T000058', 'showMessageInfo');
//		}, 
		addEqOffline=function(){
	    	Opttype = 0;
	        lczt = 0;
	        $("#enditTab").dialog("open").dialog('setTitle', '设备下线明细');
	        $("#fmCustom").form("clear");
	        $("#txtXXDH").textbox('readonly', false);
	        $("#txtXXDH").textbox('setValue', autoCreateCode('TPM'));
	        initDetailGridData('ccADD');
	    },
	    initDetailGridData = function (sn) {
	        iplantAjaxRequest({
	            url: '/iPlant_ajax',
	            data: {
	                IFS: 'T000098',
	                OL_CD: sn,
	                pageIndex: 1,
	                pageSize: 1000
	            },
	            successCallBack: function (data) {
	                var jsonData = {
	                    total: 0,
	                    rows: []
	                };
	                if (data.RESPONSE[0].length != 0) {
	                    jsonData.rows = data.RESPONSE[0].RESPONSE_DATA;
	                    jsonData.total = data.RESPONSE[0].RESPONSE_DATA.length;
	                }

	                $('#edit_tab').datagrid({
	                    name: 'edit_tab',
	                    dataType: 'json',
	                    columns: [
	                        [{
	                            field: 'OL_CD',
	                            title: '下线单号',
	                            hidden: 'true',
	                            align: 'center'
	                        }, 
	                        {
	                            field: 'ET_CD',
	                            title: '设备编号',
	                            width: 130,
	                            align: 'center',
	                        	formatter : function(value, row) {
									if (checkNotEmpty(value))
										return IEquimentData[value];
								},
	                            editor: {
	                                type: "combobox",
	                                options: {
	                                    valueField: 'id',
	                                    textField: 'text',
	                                    data: sbArr,
	                                    editable: false
	                                }
	                            }
	                        }, 
	                        {
	                            field: 'EQ_ST',
	                            title: '所属车间',
	                            width: 130,
	                            align: 'center',
	                            formatter : function(value, row) {
									if (checkNotEmpty(value))
										return IStationData[value];
								},
	                            editor: {
	                                type: "combobox",
	                                options: {
	                                    valueField: 'id',
	                                    textField: 'text',
	                                    data: cjArr,
	                                    editable: false
	                                }
	                            }
	                        }, {
	                            field: 'EQ_LN',
	                            title: '所属线别',
	                            width: 130,
	                            align: 'center',
	                            formatter : function(value, row) {
									if (checkNotEmpty(value))
										return ILineData[value];
								},
	                            editor: {
	                                type: "combobox",
	                                options: {
	                                    valueField: 'id',
	                                    textField: 'text',
	                                    data: lineArray,
	                                    editable: false
	                                }
	                            }
	                        },{
	                            field: 'ET_SU',
	                            title: '状态',
	                            width: 100,
	                            align: 'center',
	                            formatter : function(value, row) {
									if(value==0){
										return "未下线";
									}else if(value==1){
										return "已下线";
									}else{
										return value;
									}
								},
	                            editor: {
	                                type: "combobox",
	                                options: {
	                                    valueField: 'id',
	                                    textField: 'text',
	                                    data: [{"id":0,"text":"未下线"},{"id":1,"text":"已下线"}],
	                                    editable: false
	                                }
	                            }
	                        },
	                        {
	                            field: 'CRT_ID',
	                            title: '创建人',
	                            width: 100,
	                            align: 'center'
	                        }, {
	                            field: 'CRT_DT',
	                            title: '创建时间',
	                            width: 160,
	                            align: 'center'
	                        }]
	                    ],
	                    onClickRow: function (index, row) {
	                            $('#edit_tab').datagrid("beginEdit", index);
	                    },
	                    onBeforeEdit: function (index, row) {
	                            /*$("#showMessageInfo").html('');*/
	                    },
	                    /**编辑模式进入之后的操作*/
	                    onAfterEdit: function (index, row) {
	                            /**判断是否进行数据变更*/
	                            row.edited = true;
	                    }
	                });

	                $('#edit_tab').datagrid('loadData', jsonData);
	            }
	        });
	    },
	    saveEqOffline= function(){
	        var ifs = "T000095";
	        var cd = '';
	        if (lczt == 1) {
	            ifs = "T000096";
	            var row = $('#eqOfflin_tab').datagrid('getSelected');
	            cd = row.CD;
	        } else {
	            cd = autoCreateCode('tpm');
	        }
	        
	        var sxsj = $("#txtJHXXSJ").datebox('getValue');
	        if (sxsj == "" || sxsj == null) {
	            $.messager.alert('提示', '请选择计划下线时间！');
	            return;
	        }
	        /*下线时间应该大于当前时间*/
//	        var planOnLineTime = new Date(sxsj.replace(/\-/g, "\/"));  
//	        var curTime = new Date(getNowFormatDate().replace(/\-/g, "\/"));  
//	        if(planOnLineTime<=curTime){
//	        	  $.messager.alert('提示', '计划下线时间应该大于当前时间！');
//	              return;
//	        }

	        var rows = $('#edit_tab').datagrid('getRows');
	        if (rows.length < 1) {
	            $.messager.alert('提示', '请新增下线设备信息！');
	            return;
	        } else {
	            for (var i = 0; i < rows.length; i++) {
	                $('#edit_tab').datagrid('endEdit', i);
	            }
	        }
	        var dataRow = $('#edit_tab').datagrid('getRows');
	        var isobj = {};
	        lnst = 1;
	        for (var i = 0; i < dataRow.length; i++) {
	        	dataRow[i].CD = cd;
	            dataRow[i].OL_CD = $('#txtXXDH').textbox('getValue');
	            if (dataRow[i].ET_CD in isobj) {
	            	$.messager.alert('提示', '存在相同的设备，请确认！');
		             return;
	            } 
	            else {
	                isobj[dataRow[i].ET_CD] = i;
	            }
	            if(dataRow[i].ET_SU==0){
	            	lnst=0;
	            }
	        }
	        
	        var arrList = [{
	            CD: cd,
	            OL_CD: $('#txtXXDH').textbox('getValue'),
	            PL_DT: sxsj,
	            LN_ST:lnst
	        }];
	        iplantAjaxRequest({
	            url: '/iPlant_ajax',
	            data: {
	                IFS: ifs,
	                list: arrList
	            },
	            successCallBack: function (data) {
	            	/*整删 整增*/
	                iplantAjaxRequest({
	                    url: '/iPlant_ajax',
	                    data: {
	                        IFS: 'T000101',
	                        CD:cd,
	                        OL_CD: $('#txtXXDH').textbox('getValue')
	                    },
	                    successCallBack: function (data) {
	                        iplantAjaxRequest({
	                            url: '/iPlant_ajax',
	                            data: {
	                                IFS: 'T000099',
	                                CD:cd,
	                                list: dataRow
	                            },
	                            successCallBack: function (data) {
	                            	$.messager.alert('提示', '保存成功！', '', function () {
                                        $('#enditTab').dialog('close');
                                        initGridData();
                                   });
	                             
	                            }
	                        });
	                    }
	                });

	            }
	        });

	    }
		updaterepair = function() {
			lczt = 1; /*1表示修改*/
	        var row = $('#eqOfflin_tab').datagrid('getSelected');
	        if (row == null || row == 'undefine') {
	            $.messager.alert('提示', '请选择一条数据进行修改！');
	            return;
	        }

	        $("#enditTab").dialog("open").dialog('setTitle', '设备下线明细');

	        $("#txtXXDH").textbox('setValue', row.OL_CD);
	        $("#txtJHXXSJ").textbox('setValue', row.PL_DT);
	        initDetailGridData(row.OL_CD);
		}
		,
		bindCommboxData= function(){
			   iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'B000029',
		               USE_YN: 'Y'
		           },
		           successCallBack: function (data) {
		               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
		                   sbArr.push({
		                       "id": data.RESPONSE[0].RESPONSE_DATA[i].ET_CD,
		                       "text": data.RESPONSE[0].RESPONSE_DATA[i].ET_NM
		                   });
		                   IEquimentData[data.RESPONSE[0].RESPONSE_DATA[i].ET_CD]=data.RESPONSE[0].RESPONSE_DATA[i].ET_NM;
		               }
		           }
		       });
			   /*所属车间*/
		       iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'B000025'
		           },
		           successCallBack: function (data) {
		               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
		                   cjArr.push({
		                       "id": data.RESPONSE[0].RESPONSE_DATA[i].PL_CD,
		                       "text": data.RESPONSE[0].RESPONSE_DATA[i].PL_NM
		                   });
		                   IStationData[data.RESPONSE[0].RESPONSE_DATA[i].PL_CD]=data.RESPONSE[0].RESPONSE_DATA[i].PL_NM;

		               }
		           }
		       });
		      
		       /*线别*/
		       iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'B000109'
		           },
		           successCallBack: function (data) {
		        	   for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
		        		   lineArray.push({
		                       "id": data.RESPONSE[0].RESPONSE_DATA[i].PD_LN_CD,
		                       "text": data.RESPONSE[0].RESPONSE_DATA[i].PD_LN_NM
		                   });
		        		   ILineData[data.RESPONSE[0].RESPONSE_DATA[i].PD_LN_CD]=data.RESPONSE[0].RESPONSE_DATA[i].PD_LN_NM;

		               }
		             
		           }
		       });
		       
		       
		   },
		   getNowFormatDate = function() {
		        var date = new Date();
		        var seperator1 = "-";
		        var seperator2 = ":";
		        var month = date.getMonth() + 1;
		        var strDate = date.getDate();
		        if (month >= 1 && month <= 9) {
		            month = "0" + month;
		        }
		        if (strDate >= 0 && strDate <= 9) {
		            strDate = "0" + strDate;
		        }
		        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
		                + " " + date.getHours() + seperator2 + date.getMinutes()
		                + seperator2 + date.getSeconds();
		   }  
	}
	eqOfflineInfo.prototype = {
		init: function() {
			$(function() {
				bindCommboxData();
				initGridData();
				var CompanyOpttype;
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				$('#btnSave').click(function() {
					saveeqOfflineInfo();
				});
				$('.add').click(function () {
					lczt=0;
					addEqOffline();
				});
				$('#btnDelete').click(function() {
					deleterepair();
				});
				$('#btnUpdate').click(function() {
					updaterepair();
				})
				$('.close').click(function() {
					$('#enditTab').dialog('close');
				})
				$('.closeCustoms').click(function() {
					$('#searchCondition').dialog('close');
				});
				$('#ccadd').click(function () {
				    $('#edit_tab').datagrid('insertRow', {
				        index: 0,
				        row: {}
				    });
				    $('#edit_tab').datagrid('beginEdit', 0);
				});
				$('#ccdel').click(function () {
				    var row = $('#edit_tab').datagrid('getSelected');
				    if (row == null) {
				        $.messager.alert('提示', '请选择一条数据进行删除！');
				        return;
				    }
				    if(row.IL_ST=='1')
				    {
				    	 $.messager.alert('提示', '设备已下线,不能删除！');
					     return;
				    }
				    var index = $('#edit_tab').datagrid('getRowIndex', row);
				    $('#edit_tab').datagrid('deleteRow', index);
				});
			});
		}
	}
	var eqOffline = new eqOfflineInfo();
	eqOffline.init();
	var lczt=0;
	var sbArr=[];
	var cjArr=[];
	var lineArray =[];
	var IStationData={};
	var IEquimentData={};
	var ILineData={};
})();