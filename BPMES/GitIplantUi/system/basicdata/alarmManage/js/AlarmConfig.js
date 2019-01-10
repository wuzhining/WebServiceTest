/* 启动时加载 */
/* 报警配置管理
 */
(function () {
    function alarmconfig() {
    	
    	/****************数据列表层部分*****************************************************************************************************************************************************/
    	
    	/*初始化列表数据*/
        initGridData = function () {
            var dgrid = $('#alarmconfig_tab').datagrid('options');
            if (!dgrid) return;
            var reqData = {
                IFS: 'A000051',
                pageIndex: 1,
                pageSize: dgrid.pageSize
            }
            reqGridData('/iPlant_ajax', 'alarmconfig_tab', reqData);
        }
        /*绑定列表数据*/
        bindGridData = function (reqData, jsonData) {
            var grid = {
                name: 'alarmconfig_tab',
                dataType: 'json',
                fitColumns: false,
                fit: true,
                columns: [[
//                           {field: "CZ",width : 10,checkbox : true},
                           {field: 'AD_CD',title: '报警配置编码',width: 120,align: 'center'}, 
                           {field: 'AP_CD',title: '报警项目代码',width: 120,align: 'center'}, 
                           {field: 'AP_NM',title: '报警项目',width: 120,align: 'center'},
                           {field: 'AP_EP',title: '报警说明',width: 320,align: 'center'},
                           {field: 'AP_TP',title: '报警类型',hidden:true,width: 320,align: 'center'},
                           {field: 'CRT_ID',title: '创建人',width: 100,align: 'center'},
                           {field: 'CRT_DT', title: '创建时间',width: 150, align: 'center'},
                           {field: 'UPT_ID',title: '修改人',width: 100,align: 'center'},
                           {field: 'UPT_DT',title: '修改时间',width: 150,align: 'center'}
                ]],
                onDblClickRow: function(index,row){
//			    	        var row = $("#alarmconfig_tab").datagrid("getSelected");
	            treenode = row.AP_TP;
	            agrounp = row.AD_CD;
	            if (row) {
	                $("#enditTab").dialog("open").dialog('setTitle', '编辑报警配置');
	                $("#fmAlarmConfig").form("clear");
	                $('#txtAlarmCode').textbox('readonly', true);
	                $('#txtAlarmCode').textbox('setValue', row.AP_CD);
	                $('#txtAlarmName').textbox('readonly', true);
	                $('#txtAlarmName').textbox('setValue', row.AP_NM);
	                $('#txtSetCode').textbox('readonly', true);
	                $('#txtSetCode').textbox('setValue', row.AD_CD);
	                
	                ajaxGrounpParam('LV1', 'tb_group_selectedlv1');
	                ajaxGrounpParam('LV2', 'tb_group_selectedlv2');
	                ajaxGrounpParam('LV3', 'tb_group_selectedlv3');
	                ajaxGrounpParam('LV4', 'tb_group_selectedlv4');

	                ajaxMachineParam('tb_machine_selected')
	                $('#alarm_west_accordion_parents').css('visibility','hidden');
	                $('#alarm_west_accordion_parents').css('width','100px');
	                var ajaxParam = {
	                    url: '/iPlant_ajax',
	                    data: { IFS: 'A000047' },
	                    successCallBack: function (data) {
	                        var rowCollection = createSourceObj(data);
	                        var jsonData = rowCollection;
	                        eachTree(jsonData, row.AP_CD, row.AD_CD);
	                    }
	                }
	                iplantAjaxRequest(ajaxParam);
	           }
	           initGroupData1(agrounp);
	           initMachineData1();
	           AlarmConfigOpttype = 1;
              }
            }
            initGridView(reqData, grid);
            dataCount=jsonData.total;
            $('#alarmconfig_tab').datagrid('loadData', jsonData);
        },
        /*验证选择的数据*/
		validSelectedData = function (gridName, type) {
			var checkedItems = $('#' + gridName).datagrid('getSelections');
			var num = 0;
			$.each(checkedItems, function (index, item) {
			        num++;
			});
			if (type == 'Update') {
				if (num != 1) {
			        return false;
			    }
			} 
			else{
				if (num <= 0) {
			        return false;
			    }
			}
			return true;
		},
		/*删除数据操作*/
		deleteData = function(){
			var iCount=0;
			var isSelectedData = validSelectedData('alarmconfig_tab', 'Delete');
			if (!isSelectedData){
			     $.messager.alert('提示', '请选择数据进行删除');
			     return;
			}
			var IFServerNo = '';
			var checkedItems = $('#alarmconfig_tab').datagrid('getSelections');
			
			//确认提示框
			$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
				if(r==true){
					for(var i=0; i<checkedItems.length;i++){
						var row=checkedItems[i];
						if (row.AP_TP == 1) {
		  			        IFServerNo = 'A000031'
		  			    }
						else if (row.AP_TP == 2) {
		  			        IFServerNo = 'A000035'
		  			    }
						var ajaxParam = {
		  			        url: '/iPlant_ajax',
		  			        async: false,
		  			        dataType: 'JSON',
		  			        data:{
		  			        	AD_CD: row.AD_CD,
		  			            IFS: IFServerNo
		  			        },
		  			        successCallBack:function(data){
		                     	iCount++;
		                        if(checkedItems.length==iCount){
		                        	if(data.RESPONSE["0"].RESPONSE_HDR.MSG_CODE=='0'){
		                        		var msg = "删除成功";
			                    		$.messager.alert("提示",msg,"",function(){
			                    			initGridData();
			                    		});
		                        	}else{
		                        		$.messager.alert("提示",'删除失败,此数据正在应用')
		                        	}
		                    		
		                    	}
		                    },
		  			        errorCallBack:function(data){
		  			        	if(checkedItems.length==iCount){
                         			$.messager.alert('提示','删除失败,服务器无响应!')
                         		}
		  			        }
		  			    }
						iplantAjaxRequest(ajaxParam);
		         }
		      }
		   });
		}
        
    	/**************查询条件层************************************************************************************************************************************************************/
        /*弹出查询条件层*/
        openSearchLayer=function(){
            $("#searchCondition").dialog("open").dialog('setTitle', '查询报警配置信息');
            $("#fmSearchCondition").form("clear");
            initSearchAlarmItem();
        },
        /*初始化查询层报警项目*/
        initSearchAlarmItem=function(){
        	iplantAjaxRequest({
                url: '/iPlant_ajax',
                data: { IFS: 'A000013' },
                successCallBack: function (data) {
                    var array = new Array();
                    array.push({ "id": "", "text": "全部"});
                    for (var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
                        array.push({ "id": data.RESPONSE[0].RESPONSE_DATA[i].AP_CD, "text": data.RESPONSE[0].RESPONSE_DATA[i].AP_NM });
                    }
                    $('#txtAlarmCodeCondition').combobox({
                        data: array,
                        valueField: 'id',
                        textField: 'text'
                    });
                }
            });
        },
        /*根据查询条件获取数据*/
		getDataBySearch = function () {
		    var dgrid = $('#alarmconfig_tab').datagrid('options');
		    if (!dgrid) return;
		    var setCode = $('#txtSetCodeCondition').val();
		    var alarmCode = $('#txtAlarmCodeCondition').combobox('getValue');
		    var reqData = {
		        AD_CD: setCode,
		        AP_CD: alarmCode,
		        IFS: 'A000051',
		        pageIndex: 1,
		        pageSize: dgrid.pageSize
		    }
		    reqGridData('/iPlant_ajax', 'alarmconfig_tab', reqData);
		},
        /**************报警配置维护层************************************************************************************************************************************************************/
		/*打开报警配置维护层*/
		openConfigLayout = function () {
            $("#enditTab").dialog("open").dialog('setTitle', '报警配置维护');
            setDataNull();
            $("#fmAlarmConfig").form("clear");
            initAlarmItem();
            initGroupData();
            initMachineData();
            treenode=0;
            AlarmConfigOpttype = 0;
            checkInputData();
            $('#alarm_west_accordion_parents').css('width','180px');
            $('#alarm_west_accordion_parents').css('visibility','visible');
       },
		/*初始化报警项树形结构*/
        initAlarmItem = function () {
            var reqData = {
                IFS: 'A000047'
            }
            reqTreeData('/iPlant_ajax', reqData);
        },
        /*绑定左侧树形结构*/
        bindTreeData = function (jsonData) {
			    if (!jsonData) return;
			    var treeConfig = {
			        name: 'alarm_west_accordion',
			        lines: true,
			        method: 'get',
			        parentField: "sT_P_CD",
			        textFiled: "sT_C_NM",
			        idFiled: "sT_C_CD",
			        data: jsonData,
			        onClick: function (node) {
			            $(this).tree(node.state === 'closed' ? 'expand' : 'collapse', node.target);
			            if (node.attr1) {
			                setControlProperty(node);
			                attr1 = node.attr2;
			                attr2 = node.attr3;
			                attr3 = node.attr4;
			                treenode = node.attr1;
			                $('#txtAlarmCode').textbox('setValue', node.sT_C_CD);
			                $('#txtAlarmCode').textbox('readonly', true);
			                $('#txtAlarmName').textbox('setValue', node.sT_C_NM);
			                $('#txtAlarmName').textbox('readonly', true);
			                var ajaxParam = {
			                    url: '/iPlant_ajax',
			                    data: {
			                        IFS: 'A000052',
			                        AP_CD: node.sT_C_CD
			                    },
			                    successCallBack: function (data) {
			                        var needata = data.RESPONSE[0].RESPONSE_DATA[0].AD_CD;
			                        $('#txtSetCode').textbox('setValue', needata);
			                        $('#txtSetCode').textbox('readonly', true);
			                    }
			                }
			                iplantAjaxRequest(ajaxParam);
			            }
			        }
			    }
			    initTree(treeConfig);
			    $('#alarm_west_accordion').tree(treeConfig);
		},
		setControlProperty = function (node) {
            if (node.attr1 == 1) {
                $('#lblFriDescLv1').hide();
                $('#parahiden1').hide();
                $('#lblSecDescLv1').text(node.attr2);
                $('#lblThreeDescLv1').text(node.attr3);
                $('#lblFriDescLv2').hide();
                $('#parahiden2').hide();
                $('#lblSecDescLv2').text(node.attr2);
                $('#lblThreeDescLv2').text(node.attr3);
                $('#lblFriDescLv3').hide();
                $('#parahiden3').hide();
                $('#lblSecDescLv3').text(node.attr2);
                $('#lblThreeDescLv3').text(node.attr3);
                $('#lblFriDescLv4').hide();
                $('#parahiden4').hide();
                $('#lblSecDescLv4').text(node.attr2);
                $('#lblThreeDescLv4').text(node.attr3);

            } 
            else if (node.attr1 == 2) {
                $('#lblFriDescLv1').show();
                $('#parahiden1').show();
                $('#lblSecDescLv1').text(node.attr3);
                $('#lblThreeDescLv1').text(node.attr4);
                $('#lblFriDescLv2').show();
                $('#parahiden2').show();
                $('#lblSecDescLv2').text(node.attr3);
                $('#lblThreeDescLv2').text(node.attr4);
                $('#lblFriDescLv3').show();
                $('#parahiden3').show();
                $('#lblSecDescLv3').text(node.attr3);
                $('#lblThreeDescLv3').text(node.attr4);
                $('#lblFriDescLv4').show();
                $('#parahiden4').show();
                $('#lblSecDescLv4').text(node.attr3);
                $('#lblThreeDescLv4').text(node.attr4);
            }
        },
        /*初始化班组列表值  新增*/
	    initGroupData = function () {
			sentData('LV1', 'tb_grouplv1', 'tb_group_selectedlv1', 'btnAddLv1', 'btnRemoveLv1');
			sentData('LV2', 'tb_grouplv2', 'tb_group_selectedlv2', 'btnAddLv2', 'btnRemoveLv2');
			sentData('LV3', 'tb_grouplv3', 'tb_group_selectedlv3', 'btnAddLv3', 'btnRemoveLv3');
			sentData('LV4', 'tb_grouplv4', 'tb_group_selectedlv4', 'btnAddLv4', 'btnRemoveLv4');
	    },
	    sentData = function (level, grounplev1, grounplev2, btnAdd, btnRemove) {
            var reqData = {
                IFS: 'A000001',
                USE_YN:'Y',
                AD_HC: level //报警层级
            }
            var gridLv = {
                code: 'AT_CD',
                codeTitle: '班组编码',
                name: 'AT_NM',
                nameTitle: '班组名称',
                focuseGridId: grounplev1,
                targetGridId: grounplev2
            }
            reqComboData('/iPlant_ajax', reqData, gridLv);
            registBtnEvent(gridLv, btnAdd);
            var gridRemoveLv = {
                code: 'AT_CD',
                codeTitle: '班组编码',
                name: 'AT_NM',
                nameTitle: '班组名称',
                focuseGridId: grounplev2,
                targetGridId: grounplev1
            }
            registBtnEvent(gridRemoveLv, btnRemove);
        },
        /*初始化机器数据*/
		initMachineData = function () {
			var reqData = {
			      IFS: 'B000029'
			}
			var grid = {
			    code: 'ET_CD',
			    codeTitle: '设备唯一码',
			    name: 'ET_NM',
			    nameTitle: '设备编号',
			    focuseGridId: 'tb_machine',
			    targetGridId: 'tb_machine_selected'
		    }
			reqComboData('/iPlant_ajax', reqData, grid);
			registBtnEvent(grid, 'btnAddMachine');
			var gridRemove = {
			        code: 'ET_CD',
			        codeTitle: '设备唯一码',
			        name: 'ET_NM',
			        nameTitle: '设备编号',
			        focuseGridId: 'tb_machine_selected',
			        targetGridId: 'tb_machine'
			}
			registBtnEvent(gridRemove, 'btnRemoveMachine');
	     },
	    /*点击修改按钮*/ 
	    updateAlarmConfig = function () {
	            var checkedItems = $('#alarmconfig_tab').datagrid('getSelections');
	            var moveIds = [];
	            var num = 0;
	            $.each(checkedItems, function (index, item) {
	                moveIds.push(item.moveid);
	                num++;
	            });
	            if (num != 1) {
	                $.messager.alert('提示', '请选择一条数据进行修改');
	                return false;
	            }
	            var row = $("#alarmconfig_tab").datagrid("getSelected");
	            treenode = row.AP_TP;
	            agrounp = row.AD_CD;
	            if (row) {
	                $("#enditTab").dialog("open").dialog('setTitle', '编辑报警配置');
	                $("#fmAlarmConfig").form("clear");
	                $('#txtAlarmCode').textbox('readonly', true);
	                $('#txtAlarmCode').textbox('setValue', row.AP_CD);
	                $('#txtAlarmName').textbox('readonly', true);
	                $('#txtAlarmName').textbox('setValue', row.AP_NM);
	                $('#txtSetCode').textbox('readonly', true);
	                $('#txtSetCode').textbox('setValue', row.AD_CD);
	                
	                ajaxGrounpParam('LV1', 'tb_group_selectedlv1');
	                ajaxGrounpParam('LV2', 'tb_group_selectedlv2');
	                ajaxGrounpParam('LV3', 'tb_group_selectedlv3');
	                ajaxGrounpParam('LV4', 'tb_group_selectedlv4');

	                ajaxMachineParam('tb_machine_selected')
	                $('#alarm_west_accordion_parents').css('visibility','hidden');
	                $('#alarm_west_accordion_parents').css('width','100px');
	                var ajaxParam = {
	                    url: '/iPlant_ajax',
	                    data: { IFS: 'A000047' },
	                    successCallBack: function (data) {
	                        var rowCollection = createSourceObj(data);
	                        var jsonData = rowCollection;
	                        eachTree(jsonData, row.AP_CD, row.AD_CD);
	                    }
	                }
	                iplantAjaxRequest(ajaxParam);
	           }
	           initGroupData1(agrounp);
	           initMachineData1();
	           AlarmConfigOpttype = 1;
	    },
	    /*获取双条件配置值*/
	    ajaxLvl = function (condition1, condition2, configCode, alarmCode, levl) {
        	var ajaxParam = {
        	    url: '/iPlant_ajax',
			    data:{
			       IFS: 'A000053',
			       AD_CD: configCode,
			            AP_CD: alarmCode,
			            AD_HC: levl
			       },
			       successCallBack: function (data) {
			            var needata1 = data.RESPONSE[0].RESPONSE_DATA[0].AD_CN1;
			            var needata2 = data.RESPONSE[0].RESPONSE_DATA[0].AD_CN2;
			            $('#' + condition1).textbox('setValue', needata1);
			            $('#' + condition2).textbox('setValue', needata2);
			        }

			    }
			    iplantAjaxRequest(ajaxParam);
	    }
	    /*获取单条件配置值*/
        ajaxLv2 = function (condition1, configCode, alarmCode, levl) {
            var ajaxParam = {
                url: '/iPlant_ajax',
                data: {
                    IFS: 'A000053',
                    AD_CD: configCode,
                    AP_CD: alarmCode,
                    AD_HC: levl
                },
                successCallBack: function (data) {
                    var needata1 = data.RESPONSE[0].RESPONSE_DATA[0].AD_CN1;
                    $('#' + condition1).textbox('setValue', needata1);
                }

            }
            iplantAjaxRequest(ajaxParam);
        }
	    initGroupData1 = function (agrounp) {
            sentData1('LV1', 'tb_grouplv1', 'tb_group_selectedlv1', 'btnAddLv1', 'btnRemoveLv1', agrounp);
            sentData1('LV2', 'tb_grouplv2', 'tb_group_selectedlv2', 'btnAddLv2', 'btnRemoveLv2', agrounp);
            sentData1('LV3', 'tb_grouplv3', 'tb_group_selectedlv3', 'btnAddLv3', 'btnRemoveLv3', agrounp);
            sentData1('LV4', 'tb_grouplv4', 'tb_group_selectedlv4', 'btnAddLv4', 'btnRemoveLv4', agrounp);
        },
        sentData1 = function (level, grounplev1, grounplev2, btnAdd, btnRemove, agrounp) {
              var reqData = {
                  IFS: 'A000048',
                  AD_CD: agrounp,
                  AD_HC: level //报警层级
              }
              var gridLv = {
                  code: 'AT_CD',
                  codeTitle: '班组编码',
                  name: 'AT_NM',
                  nameTitle: '班组名称',
                  focuseGridId: grounplev1,
                  targetGridId: grounplev2
              }
              reqComboData('/iPlant_ajax', reqData, gridLv);
              registBtnEvent(gridLv, btnAdd);
              var gridRemoveLv = {
                  code: 'AT_CD',
                  codeTitle: '班组编码',
                  name: 'AT_NM',
                  nameTitle: '班组名称',
                  focuseGridId: grounplev2,
                  targetGridId: grounplev1
              }
              registBtnEvent(gridRemoveLv, btnRemove);
        },
        bindGroupData = function (alarmSetCode, alarmLevel) {
            /*获取未选择的班组数据*/
            var reqData = {
                IFS: 'A000048',
                AD_CD: alarmSetCode,
                AD_HC: alarmLevel
            }
        },
        initMachineData1 = function () {
			 var reqData = {
			     AD_CD: $('#txtSetCode').val(),
			     IFS: 'A000049'
			 }
			 var grid = {
			       code: 'ET_CD',
			       codeTitle: '设备唯一码',
			       name: 'ET_NM',
			       nameTitle: '设备编号',
			       focuseGridId: 'tb_machine',
			       targetGridId: 'tb_machine_selected'
			 }
			 reqComboData('/iPlant_ajax', reqData, grid);
			 registBtnEvent(grid, 'btnAddMachine');
			 var gridRemove = {
			       code: 'ET_CD',
			       codeTitle: '设备唯一码',
			       name: 'ET_NM',
			       nameTitle: '设备编号',
			       focuseGridId: 'tb_machine_selected',
			       targetGridId: 'tb_machine'
			 }
			 registBtnEvent(gridRemove, 'btnRemoveMachine');
	     },
        
	    /*保存前所选机器不能为空*/
	    sendMchineData = function(treenode, AlarmConfigOpttype, grounpName) {
//	            if (AlarmConfigOpttype == 0) {
//	                IFServerNo = 'A000028'
//	            } 
//	            else if (AlarmConfigOpttype == 1) {
//	                IFServerNo = 'A000026'
//	            } 
//	            else {
//	                IFServerNo = 'A000027'
//	            }
//	            var num = 0;
//	            var list = [];
//	            var getData = $('#' + grounpName).datagrid('getRows');
//	            $.each(getData, function (i, item) {
//	                listObj1 = { AD_CD: $('#txtSetCode').val(), ET_NM: item.ET_CD, IFS: IFServerNo, AP_TP: treenode };
//	                list.pop(listObj1);
//	                listObj2 = '{' + 'ET_NM' + ':' + "'" + item.ET_NM + "'" + '}';
//	                num++;
//	                var ajaxParamEmpoyee = {
//	                    url: '/iPlant_ajax',
//	                    dataType: 'JSON',
//	                    data: {
//	                        AD_CD: $('#txtSetCode').val(),
//	                        ET_CD: getData[i].ET_CD,
//	                        IFS: IFServerNo,
//	                        AP_TP: treenode
//	                    }
//	                }
//	                iplantAjaxRequest(ajaxParamEmpoyee);
//	           });
	    	 
	    	 
	    	 var getData = $('#' + grounpName).datagrid('getRows');
	    	 var arr=[];
	    	 var txtSetCode = $('#txtSetCode').val()
     		for(i=0; i<getData.length; i++){
     			arr.push({ AD_CD: $('#txtSetCode').val(), ET_CD: getData[i].ET_CD});
     		}
     		var ajaxParamEmpoyee = {//批量删除 设备编号
	                	async: false,
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data:{
	                    	AD_CD: txtSetCode,
	                    IFS: 'A000026'
	                    },successCallBack: function(data) {
	                    	if(arr.length > 0){
	                    		var ajaxParam1 = {
		        	                	async: false,
		        	                    url: '/iPlant_ajax',
		        	                    dataType: 'JSON',
		        	                    data:{
		        	                    list:arr,
		        	                    IFS: 'A000028'
		        	                    },successCallBack: function(data) {
		        	                    	
		        	                    }
		        	                };
		        	                iplantAjaxRequest(ajaxParam1);
	                    	}
	                    }
	                };
	                iplantAjaxRequest(ajaxParamEmpoyee);
	     },
	     saveAlarmConfig = function(){
	    	    var getData = $('#tb_machine_selected').datagrid('getRows');
	            if (getData == null || getData.length==0){
	                $.messager.alert('提示', '设备数据不能为空，请选择设备!');
	                return;
	            }
	            if (treenode == 0) {
	                var row = $("#alarmconfig_tab").datagrid("getSelected");
	                if(row){
	                	treenode = row.AP_TP;	 
	                }
	                $.messager.alert('提示', '请选择报警项目!');
	                return;
	            }
	            if(!checkInputAllData(treenode)){
	            	return
	            }
	            if(!checkGetSelect('treenode','tb_group_selectedlv1','txtFriConditionLv1','txtSecConditionLv1','第一层')){
	            	return;
	            }
	            if(!checkGetSelect('treenode','tb_group_selectedlv2','txtFriConditionLv2','txtSecConditionLv2','第二层')){
	            	return;
	            }
	            if(!checkGetSelect('treenode','tb_group_selectedlv3','txtFriConditionLv3','txtSecConditionLv3','第三层')){
	            	return;
	            }
	            if(!checkGetSelect('treenode','tb_group_selectedlv4','txtFriConditionLv4','txtSecConditionLv4','第四层')){
	            	return;
	            }
	            var IFServerNo = '';
	            if (treenode == 1) {
	                if (AlarmConfigOpttype == 0) {
	                    IFServerNo = 'A000032';
	                } 
	                else if (AlarmConfigOpttype == 1) {
	                    IFServerNo = 'A000030';
	                } 
	                else {
	                    IFServerNo = 'A000031';
	                }
	            }
	            else if (treenode == 2) {
	                if (AlarmConfigOpttype == 0) {
	                    IFServerNo = 'A000036';
	                } 
	                else if (AlarmConfigOpttype == 1) {
	                    IFServerNo = 'A000034';
	                } 
	                else {
	                    IFServerNo = 'A000035';
	                }
	            }
	            var susMsg = '', errorMsg = '';
	            if (AlarmConfigOpttype == 0) {
	                susMsg = '添加成功';
	                errorMsg = '添加失败,请联系管理员';
	            }
	            else {
	                susMsg = '更新成功';
	                errorMsg = '更新失败,请联系管理员';
	            }
	            sendConditionData(treenode, IFServerNo, 'txtFriConditionLv1', 'txtSecConditionLv1', 'LV1');
	            sendConditionData(treenode, IFServerNo, 'txtFriConditionLv2', 'txtSecConditionLv2', 'LV2');
	            sendConditionData(treenode, IFServerNo, 'txtFriConditionLv3', 'txtSecConditionLv3', 'LV3');
	            sendConditionData(treenode, IFServerNo, 'txtFriConditionLv4', 'txtSecConditionLv4', 'LV4');

	            sendData(treenode, AlarmConfigOpttype, 'LV1', 'tb_group_selectedlv1');
//	            sendData(treenode, AlarmConfigOpttype, 'LV2', 'tb_group_selectedlv2');
//	            sendData(treenode, AlarmConfigOpttype, 'LV3', 'tb_group_selectedlv3');
//	            sendData(treenode, AlarmConfigOpttype, 'LV4', 'tb_group_selectedlv4');
	            sendMchineData(treenode, AlarmConfigOpttype, 'tb_machine_selected');
	            $.messager.alert("提示",susMsg,"",function(){
        			initGridData();
        		});
	            $("#enditTab").dialog("close");
	    },
	    ajaxclass = function (condition1, condition2, configCode, alarmCode, levl) {
            var ajaxParam = {
                url: '/iPlant_ajax',
                data: {
                    IFS: 'A000021',
                    AD_CD: configCode,
                    AP_CD: alarmCode,
                    AD_HC: levl
                },
                successCallBack: function (data) {
                    var needata1 = data.RESPONSE[0].RESPONSE_DATA[0].AD_CN1;
                    var needata2 = data.RESPONSE[0].RESPONSE_DATA[0].AD_CN2;
                    $('#' + condition1).textbox('setValue', needata1);
                    $('#' + condition2).textbox('setValue', needata2);
                }

            }
            iplantAjaxRequest(ajaxParam);
        },
        sendConditionData = function (treenode, IFServerNo, content1, content2, levl) {
            var Cam = '';
            if (treenode == 1) {
                Cam = $('#' + content2).val();
                directories = attr1 + Cam + attr2;
            } else {
                Cam = $('#' + content1).val();
                if(Cam&&$('#' + content2).val()==''){
                	return
                }else{

                }
                directories = attr1 + Cam + attr2 + $('#' + content1).val() + attr3;
            }
            var ajaxParam = {
                url: '/iPlant_ajax',
                data: {
                    IFS: IFServerNo,
                    AD_CD: $('#txtSetCode').val(),
                    AP_NM: $('#txtAlarmName').val(),
                    AP_CD: $('#txtAlarmCode').val(),
                    AD_CN1: Cam,
                    AD_CN2: $('#' + content2).val(),
                    AP_TP: treenode,
                    AP_EP: directories,
                    AD_HC: levl

                }
            }
            iplantAjaxRequest(ajaxParam);
        },
        /*根据层级获取班组信息*/
        getDataEmployee = function () {
            var deptName = $('#txtGrounp').val();
            var reqData = {
                EMP_NM: deptName,
                IFS: 'D000016'
            }
            reqGroundData('/iPlant_ajax', reqData);
        },
        removeGridData=function(gridId){
        	$("#" + gridId).datagrid('loadData',{total:0,rows:[]});
        },
        setDataNull = function(){
            $('#txtGrounpCode').textbox({
                required: false
            });
            $('#txtGrounpCode').textbox('setValue', '');
            $('#txtGrounpName').textbox('setValue', '');
            $("#tb_group_selectedlv1").datagrid('loadData',{total:0,rows:[]});
            $("#tb_group_selectedlv2").datagrid('loadData',{total:0,rows:[]});
            $("#tb_group_selectedlv3").datagrid('loadData',{total:0,rows:[]});
            $("#tb_group_selectedlv4").datagrid('loadData',{total:0,rows:[]});
            $("#tb_machine_selected").datagrid('loadData',{total:0,rows:[]});
        },
        /*遍历树的data*/
        eachTree = function (jsonData, rowData1, rowData2) {
            if (!jsonData) return;
            $.each(jsonData, function (i, item) {
                treenode = item.attr1;
                attr1 = item.attr2;
                attr2 = item.attr3;
                attr3 = item.attr4;
                if (item.sT_C_CD == rowData1) {
                	if (item.attr1 == 1) {
                        $('#lblFriDescLv1').hide();
                        $('#parahiden1').hide();
                        $('#lblSecDescLv1').text(item.attr2);
                        $('#lblThreeDescLv1').text(item.attr3);
                        $('#lblFriDescLv2').hide();
                        $('#parahiden2').hide();
                        $('#lblSecDescLv2').text(item.attr2);
                        $('#lblThreeDescLv2').text(item.attr3);
                        $('#lblFriDescLv3').hide();
                        $('#parahiden3').hide();
                        $('#lblSecDescLv3').text(item.attr2);
                        $('#lblThreeDescLv3').text(item.attr3);
                        $('#lblFriDescLv4').hide();
                        $('#parahiden4').hide();
                        $('#lblSecDescLv4').text(item.attr2);
                        $('#lblThreeDescLv4').text(item.attr3);
                        ajaxLv2('txtSecConditionLv1', rowData2, rowData1, 'LV1');
                        ajaxLv2('txtSecConditionLv2', rowData2, rowData1, 'LV2');
                        ajaxLv2('txtSecConditionLv3', rowData2, rowData1, 'LV3');
                        ajaxLv2('txtSecConditionLv4', rowData2, rowData1, 'LV4');
                    } 
                	else {
                        $('#lblFriDescLv1').show();
                        $('#parahiden1').show();
                        $('#lblSecDescLv1').text(item.attr3);
                        $('#lblThreeDescLv1').text(item.attr4);
                        $('#lblFriDescLv2').show();
                        $('#parahiden2').show();
                        $('#lblSecDescLv2').text(item.attr3);
                        $('#lblThreeDescLv2').text(item.attr4);
                        $('#lblFriDescLv3').show();
                        $('#parahiden3').show();
                        $('#lblSecDescLv3').text(item.attr3);
                        $('#lblThreeDescLv3').text(item.attr4);
                        $('#lblFriDescLv4').show();
                        $('#parahiden4').show();
                        $('#lblSecDescLv4').text(item.attr3);
                        $('#lblThreeDescLv4').text(item.attr4);
                        ajaxLvl('txtFriConditionLv1', 'txtSecConditionLv1', rowData2, rowData1, 'LV1');
                        ajaxLvl('txtFriConditionLv2', 'txtSecConditionLv2', rowData2, rowData1, 'LV2');
                        ajaxLvl('txtFriConditionLv3', 'txtSecConditionLv3', rowData2, rowData1, 'LV3');
                        ajaxLvl('txtFriConditionLv4', 'txtSecConditionLv4', rowData2, rowData1, 'LV4');
                    }
                } 
                else if (item.sT_C_CD != rowData1) {
                    eachTree(jsonData[i]['children'], rowData1, rowData2);
                }
            })
            return jsonData;
        },
        ajaxGrounpParam = function (levl, grounpName) {
            var reqData = {
                AD_CD: $('#txtSetCode').val(),
                AD_HC: levl,
                IFS: 'A000021'
            }
            reqGroundData1('/iPlant_ajax', reqData, grounpName);
        },
        ajaxMachineParam = function (grounpName) {
            var reqData = {
                AD_CD: $('#txtSetCode').val(),
                IFS: 'A000025'
            }
            reqGroundData1('/iPlant_ajax', reqData, grounpName);
        },
        sendData = function (treenode, AlarmConfigOpttype, levl, grounpName) {
//            if (AlarmConfigOpttype == 0) {
//                IFServerNo = 'A000024'
//            } 
//            else if (AlarmConfigOpttype == 1) {
//                IFServerNo = 'A000022'
//
//            } 
//            else {
//                IFServerNo = 'A000023'
//            }
//            var num = 1;
//            var getData = $('#' + grounpName).datagrid('getRows');
//            $.each(getData, function (i, item) {
//                num++;
//                var ajaxParamEmpoyee = {
//                    url: '/iPlant_ajax',
//                    dataType: 'JSON',
//                    data: {
//                        AD_CD: $('#txtSetCode').val(),
//                        AT_NM: getData[i].AT_NM,
//                        AT_CD: getData[i].AT_CD,
//                        IFS: IFServerNo,
//                        AP_TP: treenode,
//                        AD_HC: levl
//                   }
//                }
//                iplantAjaxRequest(ajaxParamEmpoyee);
//            });
        	var getDataa = $('#tb_group_selectedlv1').datagrid('getRows');
        	var getDatab = $('#tb_group_selectedlv2').datagrid('getRows');
        	var getDatac = $('#tb_group_selectedlv3').datagrid('getRows');
        	var getDatad = $('#tb_group_selectedlv4').datagrid('getRows');
        	var arr=[];
	    	var txtSetCode = $('#txtSetCode').val();
	    	if(txtSetCode==''){
	    	    $.messager.alert('提示','报警配置编码不能为空');
	    		return;
	    	}
	    	//第一层
    		for(i=0; i<getDataa.length; i++){
    			arr.push({ AD_CD: txtSetCode,AT_CD: getDataa[i].AT_CD, AT_NM: getDataa[i].AT_NM,AD_HC: 'LV1'});
    		}
    		//第二层
    		for(i=0; i<getDatab.length; i++){
    			arr.push({ AD_CD: txtSetCode,AT_CD: getDatab[i].AT_CD, AT_NM: getDatab[i].AT_NM,AD_HC:'LV2'});
    		}
    		//第三层
    		for(i=0; i<getDatac.length; i++){
    			arr.push({ AD_CD: txtSetCode,AT_CD: getDatac[i].AT_CD, AT_NM: getDatac[i].AT_NM,AD_HC:'LV3'});
    		}
    		//第四层
    		for(i=0; i<getDatad.length; i++){
    			arr.push({ AD_CD: txtSetCode,AT_CD: getDatad[i].AT_CD, AT_NM: getDatad[i].AT_NM,AD_HC:'LV4'});
    		}
    		var ajaxParamEmpoyee = {//批量删除 设备编号
	                	async: false,
	                    url: '/iPlant_ajax',
	                    dataType: 'JSON',
	                    data:{
	                    	AD_CD: txtSetCode,
	                    IFS: 'A000022'
	                    },successCallBack: function(data) {
	                    	if(arr.length > 0){
	                    		var ajaxParam1 = {
		        	                	async: false,
		        	                    url: '/iPlant_ajax',
		        	                    dataType: 'JSON',
		        	                    data:{
		        	                    list:arr,
		        	                    IFS: 'A000024'
		        	                    },successCallBack: function(data) {
		        	                    	
		        	                    }
		        	                };
		        	                iplantAjaxRequest(ajaxParam1);
	                    	}
	                    }
	                };
	                iplantAjaxRequest(ajaxParamEmpoyee);
        }
        checkInputData =function(){
        	$('#txtFriConditionLv1').numberbox({
        		onChange:function(){
        			var FriConditionLv1=$('#txtFriConditionLv1').numberbox('getValue');
        			var FriConditionLv2=$('#txtFriConditionLv2').numberbox('getValue');
        			var FriConditionLv3=$('#txtFriConditionLv3').numberbox('getValue');
        			var FriConditionLv4=$('#txtFriConditionLv4').numberbox('getValue');
        			if(FriConditionLv2==''){
        				$('#txtFriConditionLv2').numberbox('setValue',FriConditionLv1);
        			}
        			if(FriConditionLv3==''){
        			    $('#txtFriConditionLv3').numberbox('setValue',FriConditionLv1);
        		    }
        			if(FriConditionLv4==''){
        			    $('#txtFriConditionLv4').numberbox('setValue',FriConditionLv1);	
        		    }
        	    }
        	}) 
        }
        checkInputAllData =function(treenode){
        	var ConditionLv1 =$('#txtFriConditionLv1').val();
        	var ConditionLv2 =$('#txtFriConditionLv2').val();
        	var ConditionLv3 =$('#txtFriConditionLv3').val();
        	var ConditionLv4 =$('#txtFriConditionLv4').val();
        	var SecConditionLv1 =$('#txtSecConditionLv1').val();
        	var SecConditionLv2 =$('#txtSecConditionLv2').val();
        	var SecConditionLv3 =$('#txtSecConditionLv3').val();
        	var SecConditionLv4 =$('#txtSecConditionLv4').val();
        	if(treenode == 1){
        		if(SecConditionLv1==''&&SecConditionLv1==''&&SecConditionLv1==''&&SecConditionLv1==''){
        			$.messager.alert('提示','报警配置不完整，至少输入一个层级的报警数据');
		            return false;	
        		}
        	}else{
        		if((ConditionLv1==''||SecConditionLv1=='')&&(ConditionLv2==''||SecConditionLv2=='')&&(ConditionLv3==''||SecConditionLv3=='')&&(ConditionLv4=''||SecConditionLv4=='')){
        			$.messager.alert('提示','报警配置不完整，至少输入一个层级的报警数据');
		            return false;	
        		}
        	}
        	return true;
        }
        checkGetSelect =function(treenode,element,Condition1,Condition2,Lvl){
        	var myCondition1 =$('#'+Condition1).val();
        	var myCondition2 =$('#'+Condition2).val();
        	if(treenode == 1){
        		if(myCondition2){
        			var getData = $('#'+element).datagrid('getRows');
		            if (getData == null || getData.length==0){
		                $.messager.alert('提示',Lvl+'级的报警配置不完整，请确认');
		                return false;
		            }
        		}
        	}else{
        		if(myCondition1||myCondition2){
        			var getData = $('#'+element).datagrid('getRows');
		            if (getData == null || getData.length==0){
		                $.messager.alert('提示',Lvl+'级的报警配置不完整，请确认');
		                return false;
		            }
        		}
        	}
        	return true;
        }
    }
    alarmconfig.prototype = {
    		init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                var treenode=0, attr1 = '',attr2 = '',attr3 = '',AlarmConfigOpttype=0;
                /*
                 * 1.点击左侧菜单  绑定报警配置列表信息
                 * 2.注册添加、修改、删除、查询按钮点击事件
                 * 3.添加
                 *   { 
                 *       a.弹出报警配置维护层
                 *         {
                 *             a.1 绑定左边报警项目树形结构
                 *                 {
                 *                    a.1.1 给报警配置编码、报警项目代码文本框赋值显示
                 *                    a.1.2 点击树节点显示相应报警配置描述信息,根据单双条件控制条件文本框的显示与隐藏
                 *                    a.1.3 绑定一、二、三、四层左侧下拉列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *                    a.1.4 绑定机台左侧下拉列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *                    a.1.5 文本输入框输入数据有效性验证(只能输入数字和小数点)
                 *                    a.1.6 点击保存按钮
                 *                          {
                 *                              a.1.6.1 验证是否选择机台，未选择机台，提示请选择设备 return;
                 *                              a.1.6.2 将一、二、三、四层右侧选择列表数据组合成List json协议
                 *                              a.1.6.3 调用保存接口保存数据
                 *                                      {
                 *                                           a.1.6.3.1   回调提示相应的操作信息
                 *                                           a.1.6.3.2   重新绑定报警配置列表数据
                 *                                      }
                 *                          }
                 *                    
                 *                 }
                 *         }
                 *    }
                 *4.更新
                 *  {
                 *      a.弹出报警配置维护层
                 *      {
                 *          a.1  隐藏报警配置左侧树形结构，设置报警配置维护界面宽度
                 *          a.2  给报警配置编码、报警项目代码文本框赋值显示
                 *          a.3  根据点击行数据的单双条件控制条件文本框的显示与隐藏
                 *          a.4  绑定一、二、三、四层左侧下拉列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *          a.5  绑定一、二、三、四层右侧下拉选择列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *          a.6  绑定机台左侧下拉列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *          a.7  绑定机台右侧下拉列表数据,注册左右移动按钮点击事件、列表行双击事件
                 *          a。8 文本输入框输入数据有效性验证(只能输入数字和小数点)
                 *          a.9 点击保存按钮
                 *              {
                 *                 a.9.1 验证是否选择机台，未选择机台，提示请选择设备 return;
                 *                 a.9.2 将一、二、三、四层左侧侧选择列表数据组合成List json协议
                 *                 a.9.3 将一、二、三、四层右侧选择列表数据组合成List json协议
                 *                 a.9.4 将机台左侧列表数据组合成List json协议
                 *                 a.9.5 将机台右侧选择列表数据组合成List json协议
                 *                 a.9.6 调用保存接口保存数据
                 *                       {
                 *                          a.9.6.1   回调提示相应的操作信息
                 *                          a.9.6.2   重新绑定报警配置列表数据
                 *                       }
                 *             }
                 *      }
                 *  }
                 */
                initSearchAlarmItem();
                initGridData();
                setTimeout("initGridData()", 0);
                $('#btnSearch').click(function () {
                	getDataBySearch();
                });
                $('#btnFreshen').click(function () {
                	getDataBySearch();
                });
                $('#btnAdd').click(function () {
                    openConfigLayout();
                })
                $('#btnUpdate').click(function () {
                    updateAlarmConfig();
                })
                $('#btnDelete').click(function () {
                    deleteData();
                })
                $('.save').click(function () {
                    saveAlarmConfig();
                })
                $('.close').click(function () {
                    setDataNull();
                    $('#enditTab').dialog('close');
                })
                $('.linkbtn').click(function () {
                    getDataEmployee();
                })
                $('.saveGround').click(function () {
                    getDataBySearch();
                    $('#searchCondition').dialog('close');
                });
                $('.closeGround').click(function () {
                    $('#searchCondition').dialog('close');
                });
                $("input",$("#txtFriConditionLv1").next("span")).keydown(function(e){
                	//precision
                	//$('#txtFriConditionLv1').textbox('options').precision="2" 
                    /*if(e.keyCode==189 || e.keyCode==109){
        				if(e.preventDefault){
                            e.preventDefault();
                        }
                		else
                		{
                			e.returnValue = false;
                        }      
        			}*/
                	
                	
        		});
            	              
            });
        }
    }
    var config = new alarmconfig();
    config.init();
})();