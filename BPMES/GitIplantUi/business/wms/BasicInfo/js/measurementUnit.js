(function(){
	function measurementUnit(){
		
		singleUnit =function(){
			$('#singleUnitDetail').datagrid({
				columns:[[
					{field:'sort',title:'序号',width:50,align:'center'},
					{field:'UNIT_NAME',title:'计量单位名称',width:100,align:'center',editor:'text'},
					{field:'UNIT_NAME2',title:'主计量单位',width:100,align:'center',editor:{type:'checkbox',options:{on:'是',off:'否'}}},
					{field:'UNIT_NAME3',title:'换算率',width:100,align:'center',editor:'numberbox'},
					{field:'UNIT_NAME4',title:'换算说明',width:100,align:'center',editor:'text'},
				]],
				data:[
					{sort:'1',UNIT_NAME:'',UNIT_NAME2:'',UNIT_NAME3:'',UNIT_NAME4:''},
				],
			});
		}
		moreUnit =function(){
			$('#moreUnitDetail').datagrid({
				columns:[[
					{field:'sort',title:'序号',width:50,align:'center'},
					{field:'UNIT_NAME',title:'计量单位名称',width:100,align:'center',editor:'text'},
					{field:'UNIT_NAME2',title:'主计量单位',width:100,align:'center',editor:{type:'checkbox',options:{on:'是',off:'否'}}},
					{field:'UNIT_NAME3',title:'换算率',width:100,align:'center',editor:'numberbox'},
					{field:'UNIT_NAME4',title:'换算说明',width:100,align:'center',editor:'text'},
				]],
				data:[
					{sort:'1',UNIT_NAME:'个',UNIT_NAME2:'',UNIT_NAME3:'',UNIT_NAME4:''},
					{sort:'2',UNIT_NAME:'包',UNIT_NAME2:'',UNIT_NAME3:'',UNIT_NAME4:''},
					{sort:'3',UNIT_NAME:'箱',UNIT_NAME2:'',UNIT_NAME3:'',UNIT_NAME4:''},
				],
			});
		}
		var editIndex = undefined;
		endEditing = function(){
			if (editIndex == undefined){return true}
			if(unitType==0){
        		if ($('#singleUnitDetail').datagrid('validateRow', editIndex)){
					$('#singleUnitDetail').datagrid('endEdit', editIndex);
					editIndex = undefined;
					return true;
				} else {
					return false;
				}	
        	}else{
        		if ($('#moreUnitDetail').datagrid('validateRow', editIndex)){
					$('#moreUnitDetail').datagrid('endEdit', editIndex);
					editIndex = undefined;
					return true;
				} else {
					return false;
				}
        	}
			
		}
		onClickRow =function(index, field){
            if (editIndex != index){
            	if (endEditing()){
    				if(unitType==0){
    					$('#singleUnitDetail').datagrid('selectRow', index).datagrid('beginEdit', index);
		                var ed = $('#singleUnitDetail').datagrid('getEditor', {index:index,field:field});
		                if (ed){
		                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
		                }
		                editIndex = index;
    				}else{
    					$('#moreUnitDetail').datagrid('selectRow', index).datagrid('beginEdit', index);
		                var ed = $('#moreUnitDetail').datagrid('getEditor', {index:index,field:field});
		                if (ed){
		                    ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
		                }
		                editIndex = index;
    				}
    			}
            }
        }
		//左边计量单位树形结构
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'D000008',
		        DICT_CD: 'UNT01',
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		}
		bindTreeData = function (jsonData) {
		    var treeConfig = {
		        name: 'dd',
		        method: 'get',
		        parentField: "sT_P_CD",
		        textFiled: "DICT_IT_NM",
		        idFiled: "DICT_IT_NM",
		        data: jsonData,
		        onClick: function (node) {
		            if (node['DICT_IT_NM']) {
		                var dgrid = $('#measurementUnit_tab').datagrid('options');
						if(!dgrid) return;
						var Dept = node['DICT_IT_NM'];
						if(Dept=='多计量'){
							unitType=1;
						}else{
							unitType=0;
						}
						var reqData = {
							UNIT_TYPE: Dept,
							IFS: 'WMS_B000010',
							pageIndex: 1,
							pageSize: dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', 'measurementUnit_tab',reqData);
		            }
		        }
		    }
		    initTree(treeConfig);
		    $('#dd').tree(treeConfig);
		}
		//初始化表格数据
		initGridData=function(){
			var dgrid=$('#measurementUnit_tab').datagrid('options');
			var typeData;
			if(!dgrid) return;
			if(unitType==0){
				typeData='单计量';
			}else{
				typeData='多计量';
			}
			var reqData = {
		        IFS: 'WMS_B000010',
		        UNIT_TYPE: typeData,
		        pageIndex:1,
		    	pageSize:dgrid.pageSize
		    }
	     	reqGridData('/iPlant_ajax','measurementUnit_tab', reqData);
		}
		bindGridData = function (reqData,jsonData) {
			var editRow = undefined;
            var grid = {
                name: 'measurementUnit_tab',
                dataType: 'json',
                columns: [[
                    /*{field : "CZ",width : 10,checkbox : true},*/
                    { field: 'UNIT_TYPE', title: '类型', width: 200, align: 'center',hidden:true},
                    { field: 'UNIT_ID', title: '计量单位ID', width: 200, align: 'center' },
                    { field: 'UNIT_NAME', title: '计量单位名称', width: 200, align: 'center' },
                    { field: 'GROUP_NAME', title: '计量单位分组名', width: 200, align: 'center' },
                    { field: 'CHANGE_RATE', title: '换算率', width: 200, align: 'center' },
                    { field: 'NOTE', title: '备注', width: 200, align: 'center' },
                    { field: 'ENABLE', title: '是否启用', width: 100,align:'center',
            			/*formatter: function (value, row, index) {
	                           if (value == 'N') {
	                               return '未启用';
	                           }
	                           else if(value == 'Y') {
	                               return '启用';
	                           }
	                        }*/
				    },
	                { field: 'CREATER_NAME', title: '创建人', width: 150,align:'center'},
                    { field: 'CREATE_DATE', title: '创建时间', width: 200,align:'center'},
				    { field: 'UPDATER_NAME', title: '修改人', width: 150,align:'center'},
				    { field: 'UPDATE_DATE', title: '修改时间', width: 200,align:'center'}
                ]],
               /* onBeforeEdit:function(index,row){
                	if (editRow == undefined){return true}
        			if ($('#measurementUnit_tab').datagrid('validateRow', editRow)){
        				return true;
        			} else {
        				return false;
        			}
			     },
                onDblClickRow: function (index, rowData) {
                	if (editRow != index){
        				if (endEditing()){
        					if($('#measurementUnit_tab').datagrid('selectRow', index)
        							.datagrid('beginEdit', index)
        					){
        						alert(index)
        						editRow = index;
        					}
        				} else {
        					$('measurementUnit_tab').datagrid('selectRow', editRow);
        				}
        			}
                } */
            }               
            initGridView(reqData,grid);
            $('#measurementUnit_tab').datagrid('loadData', jsonData);
        }
        //清空表格数据
        rejectList =function(elm,elm2){
        	$('#'+elm2).textbox('setValue','');
        	$('#'+elm).datagrid({
        		data:[
  					{sort:'1',UNIT_NAME:'',UNIT_NAME2:'',UNIT_NAME3:'',UNIT_NAME4:''},
  				]
        	});
        }
        validSelectedData = function (gridName,type) {
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
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        deleteUnit = function () {
            var isSelectedData = validSelectedData('measurementUnit_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#measurementUnit_tab').datagrid('getSelections');
            //确认提示框
            var delCnt=0;
            var exceptionCode='';
            var deletMes='';
            if(unitType==0){
            	deletMes='您确定要删除您所选择的数据?';
            }else{
            	deletMes='您选择的是组合单位，确定要删除该多计量单位组合？';
            }
            $.messager.confirm('确认框', deletMes, function (r) {
           	 if(r==true){
           		 $.each(checkedItems, function (index, item) {
           			 console.log(item.GROUP_NAME);
           			 delCnt++;
                   	 var ajaxParam = {
                                url: '/iPlant_ajax',
                                dataType: 'JSON',
                                data: {
                                	GROUP_NAME: item.GROUP_NAME,
						            IFS:'WMS_B000011'	
                                },
                                /*async: false,*/
                                successCallBack:function(data){
                                	initGridData();
                                }
                         };
                        iplantAjaxRequest(ajaxParam);
                    });
           	 }
            });     
       },
        //新增计量单位
        addUnit =function(){
        	checkGroupName();
        	if(unitType==0){
        		$("#enditTab1").dialog("open");
        		$('#singleUnitName').textbox('setValue','');
        		singleUnit();	
        	}else{
        		$("#enditTab2").dialog("open");
        		$('#moreUnitName').textbox('setValue','');
        		moreUnit();
        	}
        	changeType=0;
        }
        //保存新怎单计量单位
        singleSavaUnit =function(){
        	var reqData={};
			if (endEditing()){
	            $('#singleUnitDetail').datagrid('acceptChanges');
	        }
			var unitUse;
			var unitList =new Array();
			if($('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME2=='是') unitUse='Y';
             else unitUse='N';
			if(changeType==0){
				unitList.push({UNIT_ID:'',GROUP_NAME:$('#singleUnitName').textbox('getValue'),
					UNIT_NAME :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME,
					MAIN_UNIT :unitUse,CHANGE_RATE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME2,
					CHANGE_RATE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME3,
					NOTE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME4,
					UNIT_TYPE:'单计量',
					ENABLE:'Y',
					CREATER_ID:'',
					CREATE_DATE:''});
				reqData ={
						list:unitList,
						
	                    IFS :'WMS_B000013',
	            };
			}else{
				unitList.push({UNIT_ID:'',GROUP_NAME:$('#singleUnitName').textbox('getValue'),
					UNIT_NAME :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME,
					MAIN_UNIT :unitUse,CHANGE_RATE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME2,
					CHANGE_RATE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME3,
					NOTE :$('#singleUnitDetail').datagrid('getData').rows[0].UNIT_NAME4,
					UNIT_TYPE:'单计量',
					UNIT_ID: updataId[0],
					UPDATER_ID:'',
					UPDATE_DATE:''});
				reqData ={
						list:unitList,
	                    IFS :'WMS_B000012',
	            };
			}
			var susMsg='';
			var errorMsg='';
			if(changeType==0){
				susMsg='添加成功';
				errorMsg='添加失败,请联系管理员';
			}else{
				susMsg='修改成功';
				errorMsg='修改失败,请联系管理员';
			}	
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                    if($.messager.alert('提示', susMsg)){
                         $('#enditTab1').dialog('close');
                         initGridData();     
                    }
                 },
                 errorCallBack:function(){
                     $.messager.alert('提示', errorMsg);
                 }   
            };
            iplantAjaxRequest(ajaxParam);
		}
        moreSavaUnit =function(){
        	var reqData={};
        	if(endEditing()){
        		 $('#moreUnitDetail').datagrid('acceptChanges');
        	}
        	var rows = $('#moreUnitDetail').datagrid('getRows');
		    var ary = [];  
		    for (var j = 0; j < rows.length; j++) {  
		        ary.push(rows[j]['UNIT_NAME2']); //获取指定列  
		    }  
        	var s = ary.join(",");  
        	for(var k=0;k<ary.length;k++) {    
	        	if(s.replace(ary[k],"").indexOf(ary[k])>-1 && ary[k]=='是') {  
		        	$.messager.alert('提示','只能勾选一个单位作为主单位');  
		        	/*break;*/  
		        	return
	        	}  
        	}  
        	var unitUse;
			var unitList =new Array();
			var rows=$('#moreUnitDetail').datagrid('getRows');
			for(var i=0;i<rows.length;i++){
				if($('#moreUnitDetail').datagrid('getData').rows[i].UNIT_NAME2=='是') unitUse='Y';
	             else unitUse='N';
				unitList[i]={UNIT_ID:'',GROUP_NAME:$('#moreUnitName').textbox('getValue'),
						UNIT_NAME :$('#moreUnitDetail').datagrid('getData').rows[i].UNIT_NAME,
						MAIN_UNIT :unitUse,
						CHANGE_RATE :$('#moreUnitDetail').datagrid('getData').rows[i].UNIT_NAME3,
						NOTE :$('#moreUnitDetail').datagrid('getData').rows[i].UNIT_NAME4,
						UNIT_TYPE:'多计量'};
				if(changeType==0){
					unitList[i]=$.extend(unitList[i],{ENABLE:'Y',CREATER_ID:'',CREATE_DATE:''});
				}else{
					unitList[i]=$.extend(unitList[i],{UNIT_ID: updataId[i],UPDATER_ID:'',UPDATE_DATE:''});
				}
			}
			if(changeType==0){
				reqData ={
						list:unitList,
	                    IFS :'WMS_B000013',
	            };
			}else{
				reqData ={
						list:unitList,
	                    IFS :'WMS_B000012',
	            };
			}
			var susMsg='';
			var errorMsg='';
			if(changeType==0){
				susMsg='添加成功';
				errorMsg='添加失败,请联系管理员';
			}else{
				susMsg='修改成功';
				errorMsg='修改失败,请联系管理员';
			}	
            var ajaxParam = {
                 url: '/iPlant_ajax',
                 dataType: 'JSON',
                 data: reqData,
                 successCallBack:function(data){
                    if($.messager.alert('提示', susMsg)){
                         $('#enditTab2').dialog('close');
                         initGridData();     
                    }
                 },
                 errorCallBack:function(){
                     $.messager.alert('提示', errorMsg);
                 }   
            };
            iplantAjaxRequest(ajaxParam);
        }

	}
	UpdateUnit = function(){
		changeType=1;
		var myReqData=[];
		var reqData={};
        var isSelectedData = validSelectedData('measurementUnit_tab', 'Update');
          if (!isSelectedData) {
               $.messager.alert('提示', '请选择一条数据进行修改');
               return;
          }
        var row =$('#measurementUnit_tab').datagrid('getSelected');
        var dgrid = dataGrid.datagrid('options');
        if(row){
        	if(row.UNIT_TYPE=='单计量'){
        		reqData = {
    					IFS: 'WMS_B000010',
    					pageIndex: 1,
    					pageSize: dgrid.pageSize,
    					UNIT_ID:row.UNIT_ID,
    				}
        	}else{
        		reqData = {
    					IFS: 'WMS_B000010',
    					pageIndex: 1,
    					pageSize: dgrid.pageSize,
    					GROUP_NAME:row.GROUP_NAME,
    				}
        	}
			var ajaxParam = {
	                url: '/iPlant_ajax',
	                dataType: 'JSON',
	                data: reqData,
	                successCallBack:function(data){
	                	var MAIN_UNIT=[];
	                	for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
	                		if(data.RESPONSE[0].RESPONSE_DATA[i].MAIN_UNIT=='Y'){
	                			MAIN_UNIT[i]='是';
	                		}else{
	                			MAIN_UNIT[i]='否';
	                		}
	                		updataId[i]=data.RESPONSE[0].RESPONSE_DATA[i].UNIT_ID;
	                		myReqData.push({UNIT_NAME : data.RESPONSE[0].RESPONSE_DATA[i].UNIT_NAME,
	                				UNIT_NAME2 : MAIN_UNIT[i],
		                			UNIT_NAME3 : data.RESPONSE[0].RESPONSE_DATA[i].CHANGE_RATE,
	                			    UNIT_NAME4 : data.RESPONSE[0].RESPONSE_DATA[i].NOTE});
	                	}
	                	if(unitType==0){
	                		$("#enditTab1").dialog("open");
	                		$('#singleUnitName').textbox('setValue',data.RESPONSE[0].RESPONSE_DATA[0].GROUP_NAME);
	                		$('#singleUnitDetail').datagrid({data:myReqData});
	                	}else{
	                		$("#enditTab2").dialog("open");
	                		$('#moreUnitName').textbox('setValue',data.RESPONSE[0].RESPONSE_DATA[0].GROUP_NAME);
	                		$('#moreUnitDetail').datagrid({data:myReqData});
	                	}
	                },
	                errorCallBack:function(){
	                    $.messager.alert('提示', '无数据');
	                }   
	           }; 
        	iplantAjaxRequest(ajaxParam);
        }
      }
	searchUnit =function(){
		var dgrid = dataGrid.datagrid('options');
		var queryGROUP_NAME = $("#unitGroupName").val();
		var queryUNIT_NAME = $("#unitName").val();
		var reqData={};
		if(unitType==0){
			reqData = {
					IFS: 'WMS_B000010',
					pageIndex: 1,
					pageSize: dgrid.pageSize,
					GROUP_NAME:queryGROUP_NAME,
					UNIT_TYPE:'单计量',
					UNIT_NAME:queryUNIT_NAME
				}
		}else{
			reqData = {
					IFS: 'WMS_B000010',
					pageIndex: 1,
					pageSize: dgrid.pageSize,
					GROUP_NAME:queryGROUP_NAME,
					UNIT_TYPE:'多计量',
					UNIT_NAME:queryUNIT_NAME
				}
		}
		reqGridData('../iPlant_ajax', 'measurementUnit_tab', reqData);
	}
	getUnitGroupName =function(){
		var dgrid = dataGrid.datagrid('options');
		var groupName=new Array();
		if(unitType==0){
			reqData = {
					IFS: 'WMS_B000010',
					pageIndex: 1,
					pageSize: dgrid.pageSize,
					UNIT_TYPE:'单计量',
				}
			var ajaxParam = {
	                url: '/iPlant_ajax',
	                dataType: 'JSON',
	                data: reqData,
	                successCallBack:function(data){
	                	for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
	                		groupName.push(data.RESPONSE[0].RESPONSE_DATA[i].GROUP_NAME);
	                	}
	                	for(var j=0;j<groupName.length;j++){
	                		if($('#singleUnitName').val()==groupName[j]){
	                			$.messager.alert('错误','计量单位组名不能重复');
	                			$('#singleUnitName').textbox('setValue','');
	                			break;
	                		}
	                	}
	                },
	                errorCallBack:function(){
	                    $.messager.alert('提示', '无数据');
	                }   
	           };
		}else{
			reqData = {
					IFS: 'WMS_B000010',
					pageIndex: 1,
					pageSize: dgrid.pageSize,
					UNIT_TYPE:'多计量',
				}
			var ajaxParam = {
	                url: '/iPlant_ajax',
	                dataType: 'JSON',
	                data: reqData,
	                successCallBack:function(data){
	                	for(var i=0;i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
	                		groupName.push(data.RESPONSE[0].RESPONSE_DATA[i].GROUP_NAME);
	                	}
	                	for(var j=0;j<groupName.length;j++){
	                		if($('#moreUnitName').val()==groupName[j]){
	                			$.messager.alert('错误','计量单位组名不能重复');
	                			$('#moreUnitName').textbox('setValue','');
	                			break;
	                		}
	                	}
	                },
	                errorCallBack:function(){
	                    $.messager.alert('提示', '无数据');
	                }   
	           };
		}
        iplantAjaxRequest(ajaxParam);
	}
	checkGroupName =function(groupName){
		if(unitType==0){
			$('#singleUnitName').textbox({
				onChange:function(data){
					if(changeType==0){
						getUnitGroupName();
					}
				}
			});
		}else{
			$('#moreUnitName').textbox({
				onChange:function(data){
					if(changeType==0){
						getUnitGroupName();
					}
				}
			});
		}
	}
	clearUnit =function(){
		endEditing();
		$('#enditTab1').dialog('close');
	}
	
	measurementUnit.prototype ={
		init:function(){
			$(function(){
				dataGrid = $('#measurementUnit_tab');
				unitType=0;
				changeType=0;
				updataId=[];
				singleUnit();
				moreUnit();
				initLeftMenu();
				initGridData();
				$('#btnAdd').click(function() {
					addUnit();
				});
				$('#btnSearch').click(function() {
					searchUnit();
				});
				$('#btnDelete').click(function(){
                	deleteUnit();
                });
				$('#btnUpdate').click(function(){
                  UpdateUnit();
                });
			})
		}
	}
	var unit =new measurementUnit();
	unit.init();
})()