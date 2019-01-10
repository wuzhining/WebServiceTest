(function() {
	function publicCode() {
		pageConfig = {//初始化数据
			gridName : windowPageConfig.gridName || 'dict_tab',
			txtDictCode : windowPageConfig.txtDictCode || 'txtDictCode',
			txtDictName : windowPageConfig.txtDictName || 'txtDictName',
			txtDictTp : windowPageConfig.txtDictTp || 'txtDictTp',
			cbMtFlag : windowPageConfig.windowPageConfig || 'cbMtFlag',
			cbUsed : windowPageConfig.windowPageConfig || 'cbUsedFlag',
			title : windowPageConfig.title || '字典管理',
			gcDictCD : windowPageConfig.gcDictCD || '字典编号',
			gcDictName : windowPageConfig.gcDictName || '字典名称'
		}, 
		initGridData = function() {
			//初始化数据
			initCombobox();
			getDataBySearch();
		},
		initCombobox = function(){
			var queryDICT_TP = $('#queryDICT_TP'),txtDictTp = $('#txtDictTp');
			dataPi=[],dataSer=[{'value':'','text':'全部'}];
    		var pi = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {
                    IFS: "D000008",
                    DICT_CD:'SYS01'
                },
                successCallBack: function(a) {
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataPi.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
                    	dataSer.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
				    });  
                    queryDICT_TP.combobox("loadData", dataSer);
                    queryDICT_TP.combobox('select', dataSer[0].value);
                    txtDictTp.combobox("loadData", dataPi);
                    txtDictTp.combobox('select', dataPi[0].value);
                },
                errorCallBack: function() {
                    //$.messager.alert("提示", e)
                	var message = '数据初始化错误!';
					$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
                }
            };
			iplantAjaxRequest(pi);
		},
		bindGridData = function(reqData, jsonData) {
			var grid = {
				name : pageConfig.gridName,
				dataType : 'json',
				columns : [ [// {field : "CZ",width : 10,checkbox : true},
			             {field : 'DICT_CD',title : pageConfig.gcDictCD,width : 200,align : 'center'}, 
			             {field : 'DICT_NM',title : pageConfig.gcDictName,width : 200,align : 'center'},
			             {field : 'MT_FLAG',title : '维护标志',hidden:true,width : 10,align : 'center'},
			             {field : 'DICT_TP',title : '',hidden:true,width : 10,align : 'center'}, 
			             {field : 'DICT_TP_NM',title : '字典标志',width : 200,align : 'center'}, 
			             {field : 'MT_FLAG_NM',title : '维护标志',width : 200,align : 'center'}, 
			             {field : 'USE_YN',title : '是否启用',width : 200,align : 'center',formatter : function(value, row, index) {if (value == 'Y') {return '启用';} else {return '未启用';}}},
			             {field: 'img4',title: '数据字典详细',width: 150,align: 'center',formatter:function(){return "<img href='javascript:void(0)' class='easyui-linkbutton' onclick='openDialogFrame(3)'  src='../../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
			             {field : 'CRT_ID_NM',title : '创建人',width : 200,align : 'center'}, 
			             {field : 'CRT_DT',title : '创建时间',width : 200,align : 'center',formatter : function(value, row, index) {if (row.CRT_DT) {return gridToDate(row.CRT_DT);}}
				}] ],
				onDblClickRow : function(index, row) {
					OptType = 1;
					$("#enditTab").dialog("open").dialog('setTitle', '修改公用代码信息');
					checkFun();
					$('#' + pageConfig.txtDictCode).textbox('setValue',row.DICT_CD == null ? '' : row.DICT_CD);
					$('#' + pageConfig.txtDictName).textbox('setValue',row.DICT_NM == null ? '' : row.DICT_NM);
					$('#' + pageConfig.txtDictTp).combobox('setValue',row.DICT_TP == null ? '' : row.DICT_TP);
					if (row.MT_FLAG == "0") {
						$('#' + pageConfig.cbMtFlag).prop('checked','checked');
					} else {
						$('#' + pageConfig.cbMtFlag).prop('checked', '');
					}
					if (row.USE_YN == "Y") {
						$('#' + pageConfig.cbUsed).prop('checked', 'checked');
					} else {
						$('#' + pageConfig.cbUsed).prop('checked', '');
					}
					var grid = $('#dict_tab');
	            	grid.datagrid('clearSelections'),   
					grid.datagrid('selectRow',index);
				},
				/**单击进入编辑模式*/
		        onClickCell : function (index,field,value) {
		        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,reqData,dgrid;
		        	var rows = $('#' + pageConfig.gridName).datagrid('getRows'),row = rows[index];
		        	status=[];
		        	var grid = $('#dict_tab');
	            	grid.datagrid('clearSelections'),   
					grid.datagrid('selectRow',index);
		        	/**判断是否为可编辑字段*/
		        	if(clickSign==true){
		        		if(field=='img4'){
		        			endEditingAll($('#' + pageConfig.gridName));
							titleName = '字典项详细设置',
							dialogName = 'editTabPosition',
							tabName = 'materialPosition_tab',
							$("#Positiontitle").html("<label>字典代码："+row.DICT_CD+"</label><label>&nbsp;&nbsp;字典名称："+row.DICT_NM+"</label>"),
							dgrid = $('#materialPosition_tab').datagrid('options'),
							dgrid.DICT_CD = row.DICT_CD,
							status=row.MT_FLAG,
							itemCD = row.DICT_CD,
							reqData = {IFS: 'D000008',DICT_CD:row.DICT_CD,pageIndex: dgrid.pageNumber,pageSize: dgrid.pageSize};
							openDialogFrame(tabName,dialogName,titleName,reqData);
			        	}
		        	}
		        }
			}
			initGridView(reqData, grid);
			$('#' + pageConfig.gridName).datagrid('loadData', jsonData);
		}, 
		checkFun = function() {
			var qx = getUpdateRight();
			if(qx=="Y"){
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);
				$('#' + pageConfig.txtDictName).textbox('textbox').attr('disabled', false);
				$('#saveID').show();
				$('#cancleID').show();
			} else {
				OptType = 2;
				$('#' + pageConfig.txtDictCode).textbox('textbox').attr('disabled', true);
				$('#' + pageConfig.txtDictName).textbox('textbox').attr('disabled', true);
				$('#saveID').hide();
//					$('#cancleID').hide();
			}
		},
			/* 验证是否重复 */
		existPublicCode = function(dictCode) {
			var rowNum, tpm = $('#txtDictCode');
			if (getOptType() == 0) {
				if (/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#txtDictCode').textbox('getText'))) {
					var message = '字典代码不能是中文和非法字符，请重新输入。!';
					$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
					$('#txtDictCode').textbox('setValue','');
					return;
				}
				if (tpm.val() != undefined && tpm.val() != '' && tpm.val() != null) {
					if (dictCode != undefined && dictCode != '' && dictCode != null) {
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'D000004',
									DICT_CD : dictCode,
									pageIndex : dgrid.pageNumber,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										var message = '您输入的字典代码['+ dictCode + ']已有相同,请重新输入!';
										$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
										tpm.textbox('setValue', '');
										return false;
									} else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
		},
		OptType = 0, getOptType = function() {
			return this.OptType;
		}, setOptType = function(value) {
			this.OptType = value;
		},
		dialogEditorDataGrid = function(tabName,reqData, jsonData) {
			/*根据tabName判断哪个列表*/
			var columnsTab,edDataGrid,messageInfo,ed,fc;
			if(tabName=='materialPosition_tab'){
				columnsTab=[
					{field: 'DICT_CD',title: '字典项代码',width: 1,hidden:true,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',options:{required:true, validType:['length[1,30]','specialTextCharacter'],editable:false}}},
					{field: 'DICT_IT',title: '代码',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'DICT_IT_NM',title: '名称',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',options:{required:true,validType:['length[1,30]','specialTextCharacter']}}},
					{field: 'DICT_RM',title: '备注',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',options:{validType:['length[1,100]','specialTextCharacter']}}},
					{field: 'USE_YN',title: '是否启用',width: 80,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '启用';} else { return '未启用';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'CRT_ID_NM',title: '创建人',width: 80,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'CRT_DT',title: '创建时间+1',width: 180,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
				];
				edDataGrid = $('#'+tabName);
				messageInfo = $('#showPositionInfo');
			}
			var gridList = {
				name: tabName,
				dataType: 'json',
				pagination:false,
				rownumbers:true,
				loadMsg: '数据加载中...',
				columns: [columnsTab],
				/**结束编辑模式的操作*/
			     onEndEdit:function(index,row){
			    	 clickSign=true;
			     },
			    //**进入编辑模式的操作*//*
			     onBeforeEdit:function(index,row){
			    	 messageInfo.html('');
			    	 row.editing = true;
			    	 row.edited = false;
			    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
			    	 $(this).datagrid('refreshRow', index);
			     },
			     //**编辑模式进入之后的操作*//*
			     onAfterEdit:function(index,row){
			    	 //**判断是否进行数据变更*//*
			    	 var temp = JSON.stringify(row).replace(reg,'\"\"');
			    	 if(temp!=oldRow){
			    		 row.edited = true;
			    	 }
			    	 row.editing = false;
			    	 $(this).datagrid('refreshRow', index);
			     },
		        onCancelEdit:function(index,row){
		            row.editing = false;
		            $(this).datagrid('refreshRow', index);
		        },
		        onClickCell: function (index,field,value) {
			        if(status=='0'){
			        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
			        	var rows = edDataGrid.datagrid('getRows'),row = rows[index];
			        	/**判断是否为可编辑字段*/
			        	addDatagridEditor(edDataGrid,index);
			        	if(!checkNotEmpty(row.editType)){/*如果是修改的情况，ft_cd字段为只读模式*/
				    		ed = $(this).datagrid('getEditor', {index: index,field: 'DICT_IT'});
				    		fc = ed.target;
				    		fc.prop('readonly',true);
			    		}
			        }
		        	if(status=='1'){
				    	  return;
				 	}
		        }
			}
			initGridView(reqData, gridList);
			$('#'+tabName).datagrid('loadData', jsonData);
		},
		openDialogFrame =function(tabName,dialogName,titleName,reqData){
			$.messager.progress({title: '请等待',msg: '数据加载中...',text: '正在进行中...'});
		    if(status=='1'){
				$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
				$('#btnPositionAdd').css("display","none");
				$('#btnPositionSave').css("display","none");
				$('#btnPositionDelete').css("display","none");
				if(checkNotEmpty(reqData)){
					dialogDataGrid('/iPlant_ajax', tabName, reqData);
				}
				$(function(){
		        	$("#tt").tabs({
		        		onSelect:function(data){
		        			var tab=$("#tt").tabs("getSelected");
		        			var index=$("#tt").tabs("getTabIndex",tab);
		        		}
		        	});
		        });
		    } else if(status=='0'){
				$("#"+dialogName).dialog("open").dialog('setTitle', titleName);
				$('#btnPositionAdd').css("display","");
				$('#btnPositionSave').css("display","");
				$('#btnPositionDelete').css("display","");
				if(checkNotEmpty(reqData)){
					dialogDataGrid('/iPlant_ajax', tabName, reqData);
				}
				$(function(){
		        	$("#tt").tabs({
		        		onSelect:function(data){
		        			var tab=$("#tt").tabs("getSelected");
		        			var index=$("#tt").tabs("getTabIndex",tab);
		        		}
		        	});
		        });
		    }
		},
		setDataNull=function () {
			$('#txtDictCode').textbox('setValue', '');
			$('#txtDictName').textbox('setValue', '');
		},
		validSelectedData = function(gridName, type) {
			var checkedItems = $('#' + gridName).datagrid('getSelections');
			var num = 0;
			$.each(checkedItems, function(index, item) {
				num++;
			});
			if (type == 'Update') {
				if (num != 1) {
					return false;
				}
			} else {
				if (num <= 0) {
					return false;
				}
			}
			return true;
		},
		updatePublicCode = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Update');
			if (!isSelectedData) {
				var message = '请选择一条数据进行修改!';
				$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
				return;
			}
			var row = $("#" + pageConfig.gridName).datagrid("getSelected");
			setOptType(1);
			if (row) {
				$("#enditTab").dialog("open").dialog('setTitle','编辑' + pageConfig.title + '维护');
				$('#txtDictCode').textbox('textbox').attr('readonly',true);
				$('#txtDictCode').textbox('textbox').attr('disabled',true);
				// $('#'+pageConfig.txtDictCode).textbox('readonly',true);
				$('#' + pageConfig.txtDictCode).css('background-color','#95B8E7');
				// $('#_easyui_textbox_input1').css('background-color','#95B8E7');
				$('#' + pageConfig.txtDictCode).textbox('setValue',row.DICT_CD == null ? '' : row.DICT_CD);
				$('#' + pageConfig.txtDictName).textbox('setValue',row.DICT_NM == null ? '' : row.DICT_NM);
				$('#' + pageConfig.txtDictTp).combobox('setValue',row.DICT_TP == null ? '' : row.DICT_TP);
				if (row.MT_FLAG == "0") {
					$('#' + pageConfig.cbMtFlag).prop('checked','checked');
				} else {
					$('#' + pageConfig.cbMtFlag).prop('checked', '');
				}
				if (row.USE_YN == "Y") {
					$('#' + pageConfig.cbUsed).prop('checked','checked');
				} else {
					$('#' + pageConfig.cbUsed).prop('checked', '');
				}
			}
			checkFun();
		},
		deletePublicCode = function() {
			var isSelectedData = validSelectedData(pageConfig.gridName,'Delete');
			if (!isSelectedData) {
				var message = '请选择一条数据进行删除!';
				$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
				return;
			}
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
			// 确认提示框
			var delCnt = 0;
			$.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
            	 if(r==true){
            		 $.each(checkedItems, function (index, item) {
            			 delCnt++;
                    	 var ajaxParam = {
                                 url: '/iPlant_ajax',
                                 dataType: 'JSON',
                                 data: {
                                     IFS: 'D000074',
                                     DICT_CD: item.DICT_CD,
                                 },
                                 successCallBack:function(data){
                                 	 if(delCnt==checkedItems.length){
	                              	 	if(data.RESPONSE["0"].RESPONSE_DATA["0"].STATUS =='0'){
	                              	 	 var ajaxParam = {
	                                             url: '/iPlant_ajax',
	                                             dataType: 'JSON',
	                                             data: {
	                                                 IFS: 'D000002',
	                                                 DICT_CD: item.DICT_CD,
	                                             },	
	                                      };
	                                     iplantAjaxRequest(ajaxParam);	
	                                     	var message = '删除成功!';
	                        				$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
                               	         initGridData();
	                              	 	}else{
	                              	 		var message = '删除失败,请先删除字典项详细设置!';
	                        				$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
	                              	 	}
	                            	 }
                         		},
                         		errorCallBack:function(data){
                         			if(delCnt==checkedItems.length){
                         				var message = '删除失败,服务器无响应!';
                        				$.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
                         			}
                         		}
                          	};
                         	iplantAjaxRequest(ajaxParam);
                     });
            	 }
             }); 
		},
		addPublicCode = function() {
			setOptType(0);
			checkFun();
			$('#txtDictCode').textbox('textbox').attr('readonly', false);
			$('#txtDictCode').textbox('textbox').attr('disabled', false);
			$("#enditTab").dialog("open").dialog('setTitle',pageConfig.title + '维护');
			$("#fmcustomtype").form("clear");
			$('#' + pageConfig.txtDictTp).combobox('select', dataPi[0].value);
		},
		saveUpdatePublicCode = function() {
			var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.DICT_CD) {
				var isUserYn = 'N',isMtFlag = '0';
				if ($('#cbUsedFlag').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#cbMtFlag').is(':checked')) {
					isMtFlag = "0";
				} else {
					isMtFlag = "1";
				}
				if ($('#txtDictCode').textbox('getValue') != row.DICT_CD || $('#txtDictName').textbox('getValue') != row.DICT_NM|| $('#txtDictTp').combobox('getValue') != row.DICT_TP || isUserYn != row.USE_YN|| isMtFlag != row.MT_FLAG)
					return true;
			} else {
				return false;
			}
		},
			//置空查询输入框
		setQueryNull=function() {
			$('#queryDICT_CD').textbox('setValue',""),
			$('#queryDICT_NM').textbox('setValue',""),
			$('#queryMT_FLAG').combobox('setValue',""),
			$('#queryDICT_TP').combobox('setValue',"")
			$('#queryUSE_YN').combobox('setValue',"")
		},
		//条件查询
		getDataBySearch = function(){
			var dgrid = $('#' + pageConfig.gridName).datagrid('options');
			if(!dgrid) return;
			var cxDICT_CD = $('#queryDICT_CD').val(),cxDICT_NM = $('#queryDICT_NM').val(),cxMT_FLAG = $('#queryMT_FLAG').combobox("getValue"),
			cxDICT_TP = $('#queryDICT_TP').combobox("getValue"),cxUSE_YN = $('#queryUSE_YN').combobox("getValue");	
			var reqData = {
					DICT_CD: cxDICT_CD,
					DICT_NM: cxDICT_NM,		
					MT_FLAG: cxMT_FLAG,	
					DICT_TP: cxDICT_TP,	
					USE_YN: cxUSE_YN,	
					IFS: 'D000004',
					pageIndex: dgrid.pageNumber,
					pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'publiccode_tab',reqData);
		},
		savePublicCode = function() {
			/* if (!checkDataValid()) return false; */
			if (!checkForm())
				return;
			var IFServerNo = '', isUsed = '',isMtFlag = '';
			if ($("#cbUsedFlag").is(':checked'))
				isUsed = 'Y';
			else
				isUsed = 'N';
			if ($("#cbMtFlag").is(':checked'))
				isMtFlag = '0';
			else
				isMtFlag = '1';
			var reqData = {
				DICT_CD : $("#" + pageConfig.txtDictCode).val(), // 字典代码
				DICT_NM : $("#" + pageConfig.txtDictName).val(), // 字典名称
				DICT_TP : $("#" + pageConfig.txtDictTp).combobox("getValue"),
				MT_FLAG : isMtFlag,
				USE_YN : isUsed// 是否启用
			}
			var optType = getOptType();
			// 新增
			alert(optType);
			if (optType == 0) {
				IFServerNo = 'D000001', $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}else if (optType == 1) {// 修改
				if (!saveUpdatePublicCode()) {
					var message = '内容没有更新，请修改!';
                    $.messager.show({title:'提示',msg:message,timeout:3000,showType:'slide'});
					return false;
				}
				IFServerNo = 'D000003', reqData = $.extend(reqData, {
					CRT_ID : '',
					CRT_IP : '',
					IFS : IFServerNo
				});
			}
			var susMsg = '', errorMsg = '';
			if (optType == 0) {
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else {
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
				url : '/iPlant_ajax',
				dataType : 'JSON',
				data : reqData,
				successCallBack : function(data) {
					if ($.messager.alert('提示', susMsg)) {
						$('#enditTab').dialog('close');
//							setDataNull();
						initGridData();
					}
				},
				errorCallBack : function() {
                    $.messager.show({title:'提示',msg:errorMsg,timeout:3000,showType:'slide'});
				}
			};
			iplantAjaxRequest(ajaxParam);
		}
	};
	publicCode.prototype = {
		init : function() {
			$(function() {
				editIndex = undefined;
				oldRow=undefined, reg=new RegExp("null","g");
				$("body")[0].onkeydown = keyPress;
				$("body")[0].onkeyup = keyRelease;
				initGridData();
				//验证长度
				$("#queryDICT_CD").textbox('textbox').attr('maxlength', 20);
				$("#queryDICT_NM").textbox('textbox').attr('maxlength', 30);
				$("#txtDictCode").textbox('textbox').attr('maxlength', 20);
				$("#txtDictName").textbox('textbox').attr('maxlength', 30);
				//限制输入英文单引号
		        $("input",$("#queryDICT_CD").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){
		                     e.preventDefault();
		                 }else{
		         			e.returnValue = false;
		                 }      
		 			}
		   	   	});
		        $("input",$("#queryDICT_NM").next("span")).keydown(function(e){
		   		   if(e.keyCode==222){
		 				if(e.preventDefault){
		                     e.preventDefault();
		                 }else{
		         			e.returnValue = false;
		                 }      
		 			}
		   	   	});
				$("input",$("#txtDictCode").next("span")).keydown(function(e){
		  		   if(e.keyCode==222){
						if(e.preventDefault){
		                    e.preventDefault();
		                }else{
		        			e.returnValue = false;
		                }      
					}
		  	   	});
				$("input",$("#txtDictName").next("span")).keydown(function(e){
		  		   if(e.keyCode==222){
						if(e.preventDefault){
		                    e.preventDefault();
		                }else{
		        			e.returnValue = false;
		                }      
					}
		  	   	});
				$('#btnSearch').click(function() {
					getDataBySearch();
				});	
				$('#btnResets').click(function(){
		            setQueryNull();
		        });
				$('#btnAdd').click(function() {
					addPublicCode();
				});
				$('#btnFreshen').click(function() {
					initGridData();
				});
				$('#btnUpdate').click(function() {
					updatePublicCode();
				});
				$('#btnsave').click(function() {
					savePublicCode();
				});
				$('.close').click(function() {
//					setDataNull();
					$('#enditTab').dialog('close');
				});
				$('#btnDelete').click(function() {
					deletePublicCode();
				});
				$('.panel-tool-close').click(function() {
					editIndex = undefined;
					status=[];
					$('#showPositionInfo').html('');
				});
				/*字典详细设置*/
				$('#btnPositionAdd').click(function() {		
					var dgrid = $('#materialPosition_tab').datagrid('options');
					insertDataGrid('materialPosition_tab',{DICT_CD:dgrid.DICT_CD,USE_YN:"Y"});/*初始化默认数据*/
				});
				$('#btnPositionDelete').click(function(){
					deleteDataGrid('materialPosition_tab','DICT_IT','D000006','showPositionInfo');
	            });
				$('#btnPositionSave').click(function() {
					saveDataGrid('materialPosition_tab','D000005','D000007','showPositionInfo');
				});
				//判断输入文字的长度
				$("input", $("#txtDictCode").next("span")).keyup(function() {
					checkInputLength('txtDictCode', 20);
				});
				$("input", $("#txtDictName").next("span")).keyup(function() {
					checkInputLength('txtDictName', 50);
				});
				$('.panel-tool-close').click(function(){
					$.messager.progress('close'); 
                });
			});
		}
	};
	var pCode = new publicCode();
	clickSign=true,itemCD="",status="";
	pCode.init();
})();
