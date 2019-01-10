(function($){
	/*变量*/
	var dataArr = {};
	var cjArr = [];
	var ccArr = [];
	var sbArr = [];
	var planCnt={}; /*获取需求已排配数量*/
	var cjSL = {}; /*获取项目需求数量*/
	var lczt = 0; /*默认新增*/
	var lineArray=[];   /*线别数据源*/
	var onLineStatusArray=[]; /*设备上线状态数据源*/
	var ILineData={};
	var IOnLineStatus={};
	var IEquimentData={};
	var IStationData={};
	var cmbBillStatus=[];    /*单据状态数据源*/
	var Opttype;

	/*方法*/
	function initGridData(){
		var dgrid=$('#eqOnlin_tab').datagrid('options');
		if(!dgrid) return;
   	    var reqData = {
                IFS: 'T000040',
                pageIndex:1,
        		pageSize:dgrid.pageSize
       }
   	   reqGridData('/iPlant_ajax','eqOnlin_tab', reqData);
    }
	function bindGridData(reqData, jsonData) {
          var grid = {
              name: 'eqOnlin_tab',
              dataType: 'json',
              columns: [
                  [{
                      field: 'CD',
                      title: '需求编号',
                      hidden: 'true',
                      align: 'center'
                  }, {
                      field: 'RQ_SN',
                      title: '需求编号',
                      hidden: 'true',
                      align: 'center'
                  }, {
                      field: 'IT_NM',
                      title: '项目名',
                      width: 200,
                      align: 'center'
                  }, {
                      field: 'RQ_CN',
                      title: '需求数量',
                      width: 100,
                      align: 'center'
                  }, {
                      field: 'LN_CN',
                      title: '上线数量',
                      width: 200,
                      align: 'center'
                  },{
                      field: 'LN_DT',
                      title: '上线时间',
                      width: 200,
                      align: 'center'
                  }, {
                      field: 'LN_ST',
                      title: '状态',
                      width: 200,
                      hidden:true,
                      align: 'center'
                  },
                  {
                      field: 'LN_NM',
                      title: '状态',
                      width: 200,
                      align: 'center'
                  }, 
                  {
                      field: 'CRT_ID',
                      title: '创建人',
                      width: 100,
                      align: 'center'
                  }, {
                      field: 'CRT_DT',
                      title: '创建时间',
                      width: 200,
                      align: 'center'
                  }, {
                      field: 'UPT_ID',
                      title: '修改人',
                      width: 100,
                      align: 'center'
                  }, {
                      field: 'UPT_DT',
                      title: '修改时间',
                      width: 200,
                      align: 'center'
                  }]
              ],
              onClickRow: function (index, row) {
              },
              onBeforeEdit: function (index, row) {
              },
              /**编辑模式进入之后的操作*/
              onAfterEdit: function (index, row) {
                  /**判断是否进行数据变更*/
              }
          }
          initGridView(reqData, grid);
          $('#eqOnlin_tab').datagrid('loadData', jsonData);
    }
	function initDetailGridData(sn) {
        iplantAjaxRequest({
            url: '/iPlant_ajax',
            data: {
                IFS: 'T000044',
                RQ_SN: sn,
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
                            field: 'RQ_SN',
                            title: '需求编号',
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
                            field: 'IL_ST',
                            title: '状态',
                            width: 100,
                            align: 'center',
                            formatter : function(value, row) {
								if (checkNotEmpty(value))
									return IOnLineStatus[value];
							},
                            editor: {
                                type: "combobox",
                                options: {
                                    valueField: 'id',
                                    textField: 'text',
                                    data: onLineStatusArray,
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
    }
    function getDataBySearch() {
        var reqData = {
            //RT_CD: eqOlinCode,
           // RT_NM: eqOlinName,
            IT_NM: $('#xmCode').textbox('getValue'),
            IFS: 'T000040',
        /*    pageIndex: 1,
            pageSize: dgrid.pageSize*/
        }
        reqGridData('/iPlant_ajax', 'eqOnlin_tab', reqData);
    }
    function deleteEqOline() {
        var row = $('#eqOnlin_tab').datagrid('getSelected');
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
                        IFS: 'T000043',
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
                                            IFS: 'T000047',
                                            RQ_SN: row.RQ_SN
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
    }
    /* 添加设备上线信息 */
    function addEqOline() {
    	Opttype = 0;
        lczt = 0;
        $("#enditTab").dialog("open").dialog('setTitle', '设备上线明细');
        $("#fmCustom").form("clear");
        $("#txtXMM").combobox('readonly', false);
 	   /*项目名称*/
        iplantAjaxRequest({
            url: '/iPlant_ajax',
            data: {
                IFS: 'T000036'
            },
            successCallBack: function (data) {
            	ccArr=[];
            	cjSL=[];
            	planCnt=[];
                for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                    ccArr.push({
                        "id": data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN,
                        "text": data.RESPONSE[0].RESPONSE_DATA[i].IT_NM
                    });
                    cjSL[data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN] = data.RESPONSE[0].RESPONSE_DATA[i].RQ_CN;
                    planCnt[data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN]= data.RESPONSE[0].RESPONSE_DATA[i].OL_QTY;
                }
                initDetailGridData('ccADD');
            }
        });
    }
    function getNowFormatDate() {
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
        return currentdate;
    }
    function saveEqOline() {
        var ifs = "T000041";
        var cd = '';
        if (lczt == 1) {
            ifs = "T000042";
            var row = $('#eqOnlin_tab').datagrid('getSelected');
            cd = row.CD;
        } else {
            cd = autoCreateCode('tpm');
        }
        var xmid = $("#txtXMM").combobox('getValue');
        var xmname = $("#txtXMM").combobox('getText');
        if (xmid == "" || xmid == null) {
            $.messager.alert('提示', '请选择项目名！');
            return;
        }
        var xqsl = $("#txtXQSL").val();
        var sxsl = $("#txtSXSL").val();
        if (sxsl == "" || sxsl == null) {
            $.messager.alert('提示', '请输入上线数量！');
            return;
        }
        var sxsj = $("#txtSXSJ").datebox('getValue');
        console.log(sxsj);
        if (sxsj == "" || sxsj == null) {
            $.messager.alert('提示', '请选择计划上线时间！');
            return;
        }
        /*上线时间应该大于当前时间*/
        var planOnLineTime = new Date(sxsj.replace(/\-/g, "\/"));  
        var curTime = new Date(getNowFormatDate().replace(/\-/g, "\/"));  
        if(planOnLineTime<curTime){
        	  $.messager.alert('提示', '计划上线时间应该大于当前时间！');
              return;
        }
        
        var zt=$("#cmbStatus").combobox('getValue');
        if (zt == "" || zt == null) {
            $.messager.alert('提示', '请选择状态！');
            return;
        }
        var planOnlineCnt=$('#txtPlanCnt').textbox('getValue');
        if(parseInt(sxsl)>(parseInt(xqsl)-parseInt(planOnlineCnt))){
        	 $.messager.alert('提示', '上线数量应该小于可上线数量(可上线数量等于需求数量减去已排配数量)!');
             return;
        }

        var rows = $('#edit_tab').datagrid('getRows');
        if (rows.length < 1) {
            $.messager.alert('提示', '请新增上线设备信息！');
            return;
        } else {
            for (var i = 0; i < rows.length; i++) {
                $('#edit_tab').datagrid('endEdit', i);
            }
        }
        var dataRow = $('#edit_tab').datagrid('getRows');
        var isobj = {};
        var isExists=false;
        var isFinishedLine=true;
        for (var i = 0; i < dataRow.length; i++) {
            dataRow[i].RQ_SN = xmid;
            if (dataRow[i].ET_CD in isobj) {
               isExists=true;
            } 
            else {
                isobj[dataRow[i].ET_CD] = i;
            }
            if(dataRow[i].IL_ST=='ONL01.01'){
            	isFinishedLine=false;
            }
        }
        if(isExists){
        	 $.messager.alert('提示', '存在相同的设备，请确认！');
             return;
        }
        if(!isFinishedLine && zt=='DJI01.02'){
        	 $.messager.alert('提示', '所有设备上线完成才能完成本次上线!');
             return;
        }
        if(parseInt(sxsl)!=dataRow.length){
        	$.messager.alert('提示', '排配设备数量应该等于上线数量');
            return;
        }
        var arrList = [{
            CD: cd,
            RQ_SN: xmid,
            IT_NM: xmname,
            RQ_CN: xqsl,
            LN_CN: sxsl,
            LN_DT: sxsj,
            LN_ST: zt
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
                        IFS: 'T000047',
                        CD:cd,
                        RQ_SN: xmid
                    },
                    successCallBack: function (data) {
                        iplantAjaxRequest({
                            url: '/iPlant_ajax',
                            data: {
                                IFS: 'T000045',
                                CD:cd,
                                list: dataRow
                            },
                            successCallBack: function (data) {
                            	 iplantAjaxRequest({
                                     url: '/iPlant_ajax',
                                     data: {
                                         IFS: 'T000093',
                                         LINECD: cd
                                     },
                                     successCallBack: function (data) {
                                    	 $.messager.alert('提示', data.RESPONSE[0].RESPONSE_DATA[0].OT_MSG, '', function () {
                                              $('#enditTab').dialog('close');
                                              initGridData();
                                         });
                                      }
                                 });
                             
                            }
                        });
                        $('#enditTab').dialog('close');
                        initGridData();
                    }
                });

            }
        });

    }
    function updateEqOline() {
        lczt = 1; /*1表示修改*/
        var row = $('#eqOnlin_tab').datagrid('getSelected');
        if (row == null || row == 'undefine') {
            $.messager.alert('提示', '请选择一条数据进行修改！');
            return;
        }

        $("#enditTab").dialog("open").dialog('setTitle', '设备上线明细');

        $('#txtXMM').combobox({
            data: ccArr,
            valueField: 'id',
            textField: 'text'
        });
        $("#txtXMM").combobox('setValue', row.RQ_SN);
        $("#txtXMM").combobox("readonly",true);
        $("#txtXQSL").textbox('setValue', row.RQ_CN);
        $("#txtSXSL").textbox('setValue', row.LN_CN);
        $("#txtSXSJ").textbox('setValue', row.LN_DT);
        $("#cmbStatus").combobox('setValue', row.LN_ST);
        initDetailGridData(row.CD);
   }
   function bindCommboxData(){
	   iplantAjaxRequest({
           url: '/iPlant_ajax',
           data: {
               IFS: 'B000029',
               USE_YN: 'Y',
               ET_OL:0
           },
           successCallBack: function (data) {
               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                   sbArr.push({
                       "id": data.RESPONSE[0].RESPONSE_DATA[i].ET_CD,
                       "text": data.RESPONSE[0].RESPONSE_DATA[i].ET_NM
                   });
               }
           }
       });
	   iplantAjaxRequest({
           url: '/iPlant_ajax',
           data: {
               IFS: 'B000029',
               USE_YN: 'Y'
           },
           successCallBack: function (data) {
               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                   IEquimentData[data.RESPONSE[0].RESPONSE_DATA[i].ET_CD]=data.RESPONSE[0].RESPONSE_DATA[i].ET_NM;
               }
           }
       });
	   
	   /*项目名称*/
       iplantAjaxRequest({
           url: '/iPlant_ajax',
           data: {
               IFS: 'T000036'
           },
           successCallBack: function (data) {
               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                   ccArr.push({
                       "id": data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN,
                       "text": data.RESPONSE[0].RESPONSE_DATA[i].IT_NM
                   });
                   cjSL[data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN] = data.RESPONSE[0].RESPONSE_DATA[i].RQ_CN;
                   planCnt[data.RESPONSE[0].RESPONSE_DATA[i].RQ_SN]= data.RESPONSE[0].RESPONSE_DATA[i].OL_QTY;
               }
               $('#txtXMM').combobox({
                   data: ccArr,
                   valueField: 'id',
                   textField: 'text',
                   onChange: function (n, o) {
                       if (n != o) {
                           $("#txtXQSL").textbox('setValue', cjSL[n]);
                           $("#txtPlanCnt").textbox('setValue', planCnt[n]);
                       }
                   }
               });
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
       /*单据状态*/
       iplantAjaxRequest({
           url: '/iPlant_ajax',
           data: {
               IFS: 'D000008',
               DICT_CD : 'DJI01',
           },
           successCallBack: function (data) {
               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
            	   cmbBillStatus.push({
                       "id": data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT,
                       "text": data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM
                   });

               }
               $('#cmbStatus').combobox({
                   data: cmbBillStatus,
                   valueField: 'id',
                   textField: 'text'
               });
             
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
       
       /*上线状态*/
       iplantAjaxRequest({
           url: '/iPlant_ajax',
           data: {
               IFS: 'D000008',
               DICT_CD : 'ONL01',
           },
           successCallBack: function (data) {
               for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
            	   onLineStatusArray.push({
                       "id": data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT,
                       "text": data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM
                   });
            	   IOnLineStatus[data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT]=data.RESPONSE[0].RESPONSE_DATA[i].DICT_IT_NM;

               }
             
           }
       });
   }
   window.bindGridData=bindGridData;
   window.saveEqOline=saveEqOline;
   $(function(){
	    bindCommboxData();
		initGridData();
		$('#btnSearch').click(function () {
			getDataBySearch();
		});
		$('.add').click(function () {
			addEqOline();
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
		    if(row.IL_ST=='ONL01.02')
		    {
		    	 $.messager.alert('提示', '设备已上线,不能删除！');
			     return;
		    }
		    var index = $('#edit_tab').datagrid('getRowIndex', row);
		    $('#edit_tab').datagrid('deleteRow', index);
		});
		$('.update').click(function () {
			updateEqOline();
		});
		$('#btnDelete').click(function () {
			deleteEqOline();
		});
		$('.save').click(function () {
			saveEqOline();
		});
	});
})(jQuery);
