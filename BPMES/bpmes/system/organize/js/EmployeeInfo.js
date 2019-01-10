/* 启动时加载 */
/*
 */
(function() {
	function employeeInfo() {
		var CompanyOpttype;
		initGridData = function() {
				var dgrid = $('#employee_tab').datagrid('options');
				if(!dgrid) return;
				var reqData = {
					IFS: 'D000041',
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'employee_tab', reqData);
				var ajaxParam2={
						url:'/iPlant_ajax',
						data:{IFS:'D000055'},
						successCallBack:function(data){
							dataDeptTree = data.RESPONSE[0].RESPONSE_DATA;
	                   
						}
		        }
		        iplantAjaxRequest(ajaxParam2);
				var ajaxParam3={
			          url:'/iPlant_ajax',
			          data:{
//					          	DPT_CD:newValue,
			          	USE_YN:'Y',
			            IFS:'D000020'},
			            successCallBack:function(data){
			            	var op = data.RESPONSE[0].RESPONSE_DATA;
		                    $.each(op,function(n,obj) {
		                    	dataPosition.push({'value':obj.PS_CD,'text':obj.PS_NM});
						    });
			           }
		        }
		        iplantAjaxRequest(ajaxParam3);
				
			},
			bindGridData = function(reqData, jsonData) {
				var gridList = {
						name: 'employee_tab',
						dataType: 'json',
						columns: [[
							{field: 'EMP_CD',title: '员工编码',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'EMP_NM',title: '中文名',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{required:true, validType:['length[1,30]','specialTextCharacter']}}},
							{field: 'ENG_NM',title: '英文名',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	   options:{validType:['length[1,25]','specialTextCharacter']}}},
					        {field: 'SEX',title: '性别',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'combobox',
					        	options:{valueField:'value',textField:'text',data:dataSex,required:true,editable:false}}},
						    {field: 'EMP_ST',title: '员工状态',width: 100,align: 'center',formatter: function (value,row) {if(value == "1"){return "在职"}else{return "离职"}},editor:{type:'combobox',
							       options:{valueField:'value',textField:'text',data:dataState,required:true,editable:false}}},
							{field: 'DPT_CD',title: '所属部门',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + (row.DPT_NM || value) + "'>" + (row.DPT_NM || value)+ "</span>";},
								editor:{type:'combotree',options:{parentField: "sT_P_CD",textFiled: "sT_C_NM",idFiled: "sT_C_CD",data:dataDeptTree,required:true,editable:false,onChange:function(){}}}}, 
							{field: 'PS_CD',title: '所属岗位',width: 150,align: 'center',formatter: function (value,row) {if(checkNotEmpty(value)) return "<span title='" + (row.PS_NM || value) + "'>" + (row.PS_NM || value)+ "</span>";},
									editor:{type:'combobox',options:{valueField:'value',textField:'text',data:dataPosition,required:true,editable:false,onShowPanel:function(){
										var index = datagridEditorRows();
								    	var ed = $('#employee_tab').datagrid('getEditor', {index: index,field: 'DPT_CD'});
								    	var Rec = $(ed.target).combobox('getValue');
								    	if(Rec == ''){showmessage.html('<font color=red>请先选择部门！！</font>');}
								    	var ajaxParam3={
									          url:'/iPlant_ajax',
									          data:{
									          	DPT_CD:Rec,
									          	USE_YN:'Y',
									            IFS:'D000020'},
									          successCallBack:function(data){
									        	  var op = data.RESPONSE[0].RESPONSE_DATA;
									        	  dataPosition=[];
								                  $.each(op,function(n,obj) {
								                	  dataPosition.push({'value':obj.PS_CD,'text':obj.PS_NM});
												  });
								                  var eddi = $('#employee_tab').datagrid('getEditor', {index: index,field: 'PS_CD'});
								                  //$(eddi.target).combobox({valueField:'value',textField:'text',data:dataPosition});
								                  $(eddi.target).combobox("loadData", dataPosition);
									           }
									       }
									       iplantAjaxRequest(ajaxParam3);
									}}}},
							{field: 'OB_DT',title: '入职日期',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'datebox'}},
							{field: 'TR_DT',title: '转正日期',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'datebox'}},
							{field: 'IC_CN',title: 'IC卡号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{}}},
							{field: 'BAR_CN',title: '条码号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,25]','specialTextCharacter']}}},
							{field: 'BIRTHDAY',title: '生日日期',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'datebox',
									options:{validType:['length[1,25]','specialTextCharacter']}}},
						    {field: 'ID_CD',title: '身份证号',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
									options:{validType:['length[1,25]','specialPosenal','specialTextCharacter']}}},
							{field: 'NP',title: '籍贯',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							        options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'TEL',title: '电话',width: 150,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
								    options:{validType:['length[1,20]','specialTel','specialTextCharacter']}}},
							{field: 'E_MAIL',title: '邮箱',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
					        	    options:{validType:['length[1,100]','specialTextCharacter']}}},
			        	    {field: 'img5',title: '产品图片',width: 80,align: 'center',formatter:function(){
							       return "<img href='javascript:void(0)' class='easyui-linkbutton' src='../../common/IplantCompent/themes/default/images/Folder.png'/>"}},
					        {field: 'DT_TM',title: '离职时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'datebox'}},
						    {field: 'EMP_RM',title: '备注',width: 300,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";},editor:{type:'validatebox',
							        options:{validType:['length[1,100]','specialTextCharacter']}}},
							{field: 'CRT_ID',title: '创建人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}},
							{field: 'CRT_DT',title: '创建时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_ID',title: '修改人',width: 100,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}, 
							{field: 'UPT_DT',title: '修改时间',width: 200,align: 'center',formatter: function (value) {if(checkNotEmpty(value)) return "<span title='" + value + "'>" + value + "</span>";}}
						]],
						/**结束编辑模式的操作*/
					     onEndEdit:function(index,row){
					    	 var ed = $(this).datagrid('getEditor', {index: index,field: 'DPT_CD'});
					    	 row.DPT_CD = $(ed.target).combobox('getValue');
					    	 row.DPT_NM = $(ed.target).combobox('getText');
					    	 var eddi = $(this).datagrid('getEditor', {index: index,field: 'PS_CD'});
					    	 row.PS_CD = $(eddi.target).combobox('getValue');
					    	 row.PS_NM = $(eddi.target).combobox('getText');
					    	 
					     },
					     /**进入编辑模式的操作*/
					     onBeforeEdit:function(index,row){
					    	 showmessage.html('');
					    	 row.editing = true;
					    	 row.edited = false;
					    	 oldRow = JSON.stringify(row).replace(reg,'\"\"');
					    	 $(this).datagrid('refreshRow', index);
					     },
					     /**编辑模式进入之后的操作*/
					     onAfterEdit:function(index,row){
					    	 /**判断是否进行数据变更*/
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
				        
				        /**单击列事件*/
				        onClickCell: function (index,field,value){
				        	var tabName,dialogName,titleName,rowEdit,editem,editorFt,itemCd,reqData,dgrid;
				        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
				        	if(field=='img5'){
				        		endEditingAll(dataGrid);
								titleName = '员工图片',
								dialogName = 'editTab',
								empCD = row.EMP_CD,
								empNM = row.EMP_NM,
								$("#editTab").dialog("open").dialog('setTitle', '员工图片导入');
								$('#txtFileNO').textbox('setValue',empCD);
							    $('#txtFileBelong').textbox('setValue',empNM);
							    /*searchPhotoPath(empCD);*/
				        	}
				        },
				        
				        /**单击进入编辑模式*/
					    onClickRow: function (index, row,field) {
					    	var del = $("#btnDelete");
					    	if(row.EMP_CD=="000000"){
					    		 del.linkbutton("disable");
					    		 
					    	}else{
					    		del.linkbutton("enable");
					    	}
					    	if (editIndex != index){
					    		var ed,fc,editorFt;
					    		if(editIndex!=undefined){
				    				/**判断是否为新增行，并验证新增工厂编码重复*/
					    			var rowEdit = dataGrid.datagrid('getRows')[editIndex],edft = $(this).datagrid('getEditor', {index: editIndex,field: 'EMP_CD'}),editorFt = edft.target,ftCd = editorFt.val();
					    			if(checkNotEmpty(rowEdit.editType)){
					    				if(rowEdit.editType=='add'){
					    					if(checkNotEmpty(ftCd)){
							    				var ajaxParam = {
													url : '/iPlant_ajax',
													dataType : 'JSON',
													data : {
														IFS : 'D000041',
														FT_CD : ftCd,
														pageIndex : 1,
														pageSize : 10
													},
													successCallBack : function(data) {
														rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
														if (rowNum > 0) {
															dataGrid.datagrid('selectRow', editIndex).datagrid('beginEdit', editIndex);
												       		showmessage.html('<font color=red>您输入的员工编码['+ ftCd + ']已有相同,请重新输入!</font>');
												       		return false;
														} else {
															addDatagridEditor(dataGrid,index);
														}
													}
												};
												iplantAjaxRequest(ajaxParam);
							    			}else{
								        	   addDatagridEditor(dataGrid,index);
							    			}
					    				}else{
					    					addDatagridEditor(dataGrid,index);
					    					if(!checkNotEmpty(row.editType)){//如果是修改的情况，ft_cd字段为只读模式
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'EMP_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    				}
					    			}else{
							    		 addDatagridEditor(dataGrid,index);
							    		 if(!checkNotEmpty(row.editType)){
									    		ed = $(this).datagrid('getEditor', {index: index,field: 'EMP_CD'});
									    		fc = ed.target;
									    		fc.prop('readonly',true);
								    		}
					    			}
					    		}else{
					    			addDatagridEditor(dataGrid,index);
					    			if(!checkNotEmpty(row.editType)){
							    		ed = $(this).datagrid('getEditor', {index: index,field: 'EMP_CD'});
							    		fc = ed.target;
							    		fc.prop('readonly',true);
						    		}
					    		}
					    	}
			            }
					}
					initGridView(reqData, gridList);
					dataGrid.datagrid('loadData', jsonData);
		
				},
				changePositionData = function(newValue){
					var ajaxParam3={
					          url:'/iPlant_ajax',
					          data:{
					          	DPT_CD:newValue,
					          	USE_YN:'Y',
					            IFS:'D000020'},
					          successCallBack:function(data){
					        	  var op = data.RESPONSE[0].RESPONSE_DATA;
				                    $.each(op,function(n,obj) {
				                    	dataPosition.push({'value':obj.PS_CD,'text':obj.PS_NM});
								    });
					           }
					        }
					        iplantAjaxRequest(ajaxParam3);
					}
				checkFun = function (){},
				bindTreeData = function (jsonData) {
				    var treeConfig = {
				        name: 'dd',
				        method: 'get',
				        parentField: "sT_P_CD",
				        textFiled: "sT_C_NM",
				        idFiled: "sT_C_CD",
				        data: jsonData,
				        onClick: function (node) {
				            if (node['sT_C_NM']) {
				                var dgrid = $('#employee_tab').datagrid('options');
								if(!dgrid) return;
								var Dept = node['sT_C_CD'];
								var reqData = {
									DPT_CD: Dept,
									IFS: 'D000041',
									pageIndex: 1,
									pageSize: dgrid.pageSize
								}
								reqGridData('/iPlant_ajax', 'employee_tab',reqData);
				            }
				        }
				    }
				    initTree(treeConfig);
				    $('#dd').tree(treeConfig);
		
				},
				initLeftMenu = function () {
				    var reqData = {
				        IFS: 'D000055'
				    }
				    reqTreeData('/iPlant_ajax',reqData);
//					    reqTreeData('../datasource/menu.json', reqData);
				},
				/*验证重复*/
				existemployee = function(employeeCode) {},
				//导入时dialog框
				OpenImprotFramedr = function(){
					$("#editTabupload").dialog("open").dialog('setTitle', '员工信息导入');
				},
				importFile = function (){
		    	   // 以下即为完整客户端路径
		    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
		    	   if(pic.files.length>0){
		    		   file = pic.files[0],fileName = file.name,fileType=file.type;
		    		   if(fileName.indexOf('.')>0){
		    			   temp=fileName.split('.');
		    			   strSrc = temp[temp.length-1];
		    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
		    				   $('#showFileName').html(fileName);
		    			   }else{
		    				   $('#showFileName').html('<font color=red>请输入Excel文件！</font>');
		    				   return false;
		    			   }
		    		   }
		    	   }
			    },
				//导入操作函数
				ImportStation =function(){
			    	var webroot=document.location.origin;
			    	   var pic = document.getElementById('txtPHOTO'),file,fileName,fileType,temp = [],strSrc;
			    	   if(pic.files.length>0){
			    		   file = pic.files[0],fileName = file.name,fileType=file.type;
			    		   if(fileName.indexOf('.')>0){
			    			   temp=fileName.split('.');
			    			   strSrc = temp[temp.length-1];
			    			   if(strSrc.toLowerCase().localeCompare('xlsx') === 0 || strSrc.toLowerCase().localeCompare('xls') === 0 ){
			    				   $('.FILE_BELONG1').val("EMP_CD"),
			    		    	   $('.FILE_CLS1').val("import"),
			    		    	   $('.FILE_TYPE1').val('xlsx'),
			    		    	   $('.importType1').val('1'),
			    		    	   $('#IFS').val('D000071'),
			    		    	   $('#importUplod').submit();
			    				   var formData = new FormData($( "#importUplod" )[0]);  
			    				   $.ajax({
			    		                cache: true,
			    		                type: "POST",
			    		                url:webroot+'/iTaurus/iPlant_ImgUpload',
			    		                data:formData,// 你的formid
			    		                async: false,
			    		                processData:false,
			    		                contentType:false,
			    		                error: function(request) {
			    		                	$.messager.alert("提示", '导入失败！');
			    		                	console.log(request);
			    		                },
			    		                success: function(data) {
			    		                	$('#enditTabupload').dialog('close');
			    		                    console.log(data);
			    		                }
			    		            });
			    			   }else{
			    				   $('#showFileName').html('<font color=red>请输入Excel文件！</font>');
			    				   return false;
			    			   }
			    		   }
			    	   }
				   },
//					setDataNull = function () {
//			              $('#txtStationCode').textbox({ required: false });
//			              $('#txtStationCode').textbox('setValue','');
//			              $('#txtStationName').textbox('setValue','');
//			          }
				/*员工状态 */
				employeeType =function(){
					$('#txtEmployeeCondition').combobox({
		                data:[
		                    {value:'1',text:'在职'},
		                    {value:'2',text:'离职'}
		                ],
		                valueField:'value',
		                textField:'text',
		                panelHeight:80
		            });
				}
//					getDataByCondition = function() {
//						$('#enditTab').dialog('close');
//						$("#searchCondition").dialog("open").dialog('setTitle', '查询员工信息');
//						$("#fmSearchCondition").form("clear");
////						bindCombogrid();
//						}
				/*员工查询*/
				getDataBySearch = function(){
						var dgrid = $('#employee_tab').datagrid('options');
						if(!dgrid) return;
						var employeeCode = $('#employeeCode').val();
						var employeeName = $('#employeeName').val();
						var stationEnglishName = $('#stationEnglishName').val();
						var employeeDept = $('#employeeDept').combobox('getValue');
						var employeeJob = $('#employeeJob').combobox('getValue');
						var reqData = {
							EMP_CD: employeeCode,
							EMP_NM: employeeName,
							ENG_NM: stationEnglishName,
							DPT_CD: employeeDept,
							PS_CD: employeeJob,
							IFS: 'D000041',
							pageIndex: 1,
							pageSize: dgrid.pageSize
						}
						reqGridData('/iPlant_ajax', 'employee_tab',reqData);
					}
			    /* 修改商品移动信息 */
				updateEmployee = function() {}
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
		        //删除信息
			
				/* 添加商品移动信息 */
			
		        /*验证修改内容是否重复*/
		        saveUpdateValidate = function() {}
		        formatterDate = function(value) {
		        	if(value==''){return value;}
					var date = new Date(value), year = date.getFullYear().toString(), month = (date
							.getMonth() + 1), day = date.getDate().toString(), hour = date
							.getHours().toString(), minutes = date.getMinutes()
							.toString(), seconds = date.getSeconds().toString();
					if (month < 10)
						month = "0" + month;
					if (day < 10)
						day = "0" + day;
					if (hour < 10)
						hour = "0" + hour;
					if (minutes < 10)
						minutes = "0" + minutes;
					if (seconds < 10)
						seconds = "0" + seconds;
					return year + "-" + month + "-" + day;
				}
				
//					initComboTreeData = function() {
//							var reqData = {
//								IFS: 'D000055'
//							}
//							reqComboTreeData('/iPlant_ajax', reqData);
//					}
//					bindCombotree = function(jsonData) {
//						var treeConfig = {
//							name: 'txtEmployeeDept',
//					        method: 'get',
//					        parentField: "sT_P_CD",
//					        textFiled: "sT_C_NM",
//					        idFiled: "sT_C_CD",
//					        data:jsonData
//					        };
//					        initTree(treeConfig);
//					    	var n = $('#txtEmployeeDept').combotree('tree');
//							n.tree(treeConfig);
//					    	var n = $('#employeeDept').combotree('tree');
//							n.tree(treeConfig);
//					}
				
				bindCombogrid =function (jsonData){
					var listData = [];
			        var ajaxParam2={
			          url:'/iPlant_ajax',
			          data:{
			          	DPT_CD:$('#employeeDept').textbox('getValue'),
			            IFS:'D000020'},
			          successCallBack:function(data){
			          	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
						listData.push({
							"id": data.RESPONSE[0].RESPONSE_DATA[i].PS_CD,
							"text": data.RESPONSE[0].RESPONSE_DATA[i].PS_NM
						});
			           }
						$('#employeeJob').combobox({
						data: listData,
						valueField: 'id',
						textField: 'text'
						});
			            
			            }
			        }
			        iplantAjaxRequest(ajaxParam2);
				}
				bindComboboxData =function (jsonData){
					var listData1 = [];
			        var ajaxParam2={
			          url:'/iPlant_ajax',
			          data:{
			          	DPT_CD:$('#txtEmployeeDept').textbox('getValue'),
			          	USE_YN:'Y',
			            IFS:'D000020'},
			          successCallBack:function(data){
			          	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
						listData1.push({
							"id": data.RESPONSE[0].RESPONSE_DATA[i].PS_CD,
							"text": data.RESPONSE[0].RESPONSE_DATA[i].PS_NM
						});
			           }
						$('#txtEmployeeJob').combobox({
						data: listData1,
						valueField: 'id',
						textField: 'text'
						});
						if(CompanyOpttype == 1){
			                $('#txtEmployeeJob').combobox('setValue',job);
//								updateEmployee();
			           }
						}
			        }
			        iplantAjaxRequest(ajaxParam2);
			        
				}
				bindComboboxData1 =function (jsonData){
					var listData1 = [];
			        var ajaxParam2={
			          url:'/iPlant_ajax',
			          data:{
			          	DPT_CD:$('#txtEmployeeDept').textbox('getValue'),
			          	USE_YN:'Y',
			            IFS:'D000020'},
			          successCallBack:function(data){
			          	for(var i = 0; i < data.RESPONSE[0].RESPONSE_DATA.length; i++) {
						listData1.push({
							"id": data.RESPONSE[0].RESPONSE_DATA[i].PS_CD,
							"text": data.RESPONSE[0].RESPONSE_DATA[i].PS_NM
						});
			           }
						$('#txtEmployeeJob').combobox({
						data: listData1,
						valueField: 'id',
						textField: 'text'
						});
						if(CompanyOpttype == 1){
			            	$('#txtEmployeeJob').combobox('setValue',job);
//								updateEmployee();
			           }
			            }
			        }
			        iplantAjaxRequest(ajaxParam2); 
			  }
        }
	
	/*显示图片*/
    showPic = function (){
 	   var img = document.getElementById('imgPicture'),pic = document.getElementById('txtFJ'),file,strSrc;
 	   var pic = $('input[type="file"]')[1];
 	   getPicPath(img,pic,img);
 	   if(pic.files.length>0){
 		   file = pic.files[0],fileName = file.name,fileType=file.type,filePath=file.path;
 		   var temp = [];
 		   if(fileName.indexOf('.')>0){
 			   temp=fileName.split('.');
 			   strSrc = temp[temp.length-1];
 			   if(strSrc.localeCompare('jpg')===0 || strSrc.localeCompare('jpeg') === 0 || strSrc.localeCompare('gif') === 0 || strSrc.localeCompare('png') === 0 || strSrc.localeCompare('pdf') === 0 || strSrc.localeCompare('xlsx') === 0){
 				   $('#showFileName2').html(fileName);
 			   }
 		   }
 	   }
    },
    
    /*查询图片路径*/
    /*searchPhotoPath = function(empCD){
    	ajaxParam = {
   				url: '/iPlant_ajax',
   				dataType: 'JSON',
   				data: {
					EMP_CD: empCD,
                    IFS: 'D000041'
   				},
   				 successCallBack: function(data) {
   					 var url = data.RESPONSE[0].RESPONSE_DATA[0].EMP_PIC;
   					 $('#empPhoto').attr('src','file:///'+url);
   					
   				},
   				errorCallBack: function() {
   					$.messager.alert('提示', errorMsg);
   				}
   			};
   			iplantAjaxRequest(ajaxParam);
    }*/
	
	/*保存员工图片路径*/
    savaStation = function() {
		var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '',ajaxParam,photoURL;
			susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
			/*判断是否上传图片*/
			if(fileName!=undefined && fileName!='' && fileName!=null){
				$('.FILE_CLS2').val($('#txtFileNO').textbox('getValue'));//标识字段
				$('.FILE_BELONG2').val($('#txtFileBelong').textbox('getValue'));//图片表和引用表关联字段
				$('#showFileName2').val(fileName);//文件名称
				$('.FILE_TYPE2').val(fileType);//文件类型
				$('.importType2').val('0');//上传文件方式，0是一般文件，1是excel表格上传
				$('#fmEquipmentFile').submit();
				$("#file_upload_return").load(function(){//获取iframe中的内容
					var body = $(window.frames['file_upload_return'].document.body);
					var url = body[0].textContent ;
					url = url.replace(/\\/g,"/");
					var photopash = JSON.parse(url);
					photoURL = photopash[0].data[0].图片保存地址 ;
					ajaxParam = {
		           				url: '/iPlant_ajax',
		           				dataType: 'JSON',
		           				data: {
		           					EMP_PIC: photoURL,
		    						EMP_CD: empCD,
		                            IFS: 'D000150'
		           				},
		           				 successCallBack: function(data) {
		           					$.messager.alert('提示', susMsg);
		           				},
		           				errorCallBack: function() {
		           					$.messager.alert('提示', errorMsg);
		           				}
		           			};
		           			iplantAjaxRequest(ajaxParam);
		           			$("#editTab").dialog("close");
				});
			}
    };
	
		employeeInfo.prototype = {
			init: function() {
				$(function() {
					dataGrid = $('#employee_tab'),dataPosition=[],dataDeptTree=[],dataSex = [{'value':'男','text':'男'},{'value':'女','text':'女'}],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g");
					$("body")[0].onkeydown = keyPress;
	                $("body")[0].onkeyup = keyRelease;	
	                dataState = [{'value':'1','text':'在职'},{'value':'2','text':'离职'}];
					var job = '';
					var jobs = '';
					var CompanyOpttype; //0：新增   1:编辑						
					initGridData();
					initLeftMenu();					
//						initComboTreeData();
					$('#employeeJob').combobox('readonly',true);
					$('#txtEmployeeJob').combobox('readonly',true);
					$('#employeeDept').combobox({  
		         		onChange:function(){
		         			$('#employeeJob').combobox('readonly',false);
		            		bindCombogrid();
						}
		    		})
					$('#txtEmployeeDept').combobox({  
		         		onChange:function(){
		         			$('#txtEmployeeJob').combobox('readonly',false);
		            		bindComboboxData();
						}
		         		})
		   
					$('#btnSearch').click(function() {
						getDataBySearch();
					});
					
					$('#btnFreshen').click(function() {
						getDataBySearch();
					});
					
					$('.add').click(function() {
						insertDataGrid('employee_tab',{EMP_CD:"",EMP_NM:""});
					});
					$('.save').click(function() {
						saveDataGrid('employee_tab','D000013','D000015','showMessageInfo');
					});
					
					$('#btnImport').click(function() {						
						OpenImprotFramedr();		//导入
					});
					
					$('#btnDelete').click(function(){
						if($('#btnDelete').linkbutton('options').disabled){
							return false;
						}else{
							deleteDataGrid('employee_tab','EMP_CD','D000014','showMessageInfo');
						}
	                });
					$('.panel-tool-close').click(function() {
//							setDataNull();
					});									
					
				});
			}
		}
		var emfo = new employeeInfo();var empCD,empNM;
		emfo.init();
})();