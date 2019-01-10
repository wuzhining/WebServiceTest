/* 启动时加载 */
/*
*/
(function(){
	function repairInfo(){
    	initGridData=function(){
    		var dgrid=$('#deviceCollect_tab').datagrid('options');
    		if(!dgrid) return;
       	    var reqData = {
                    IFS: 'T000086',
                    pageIndex:1,
            		pageSize:dgrid.pageSize
            }
       	   reqGridData('/iPlant_ajax','deviceCollect_tab', reqData);
        },
        dataArr={};
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'deviceCollect_tab',
					dataType: 'json', 
					columns: [[
						{ field: 'IP_ADR',  title: 'IP地址', width: 200 ,align:'center'},
						{ field: 'LN_CD',  title: '线别', width: 200,align:'center'},
						{ field: 'ROUT_CD',  title: '工站编码', width: 200,align:'center'},
						{ field: 'ROUT_NAME',  title: '工站名称', width: 200,align:'center'},
						{ field: 'ET_CD',  title: '设备编码', width: 200,align:'center'},
						{ field: 'DICT_IT',  title: '工站类别', width: 200,align:'center'},
						{ field: 'USE_YN',  title: '是否启用', width: 100,align:'center',
							 formatter : function(value, row, index) {
							        if (value == 'Y') {
								       return '启用';
							        } 
							        else {
							    	    return '未启用';
							        }
						         }
						},
						{ field: 'ST_SORT',  title: '排序', width: 100,align:'center'},
						{ field: 'KB_RM',  title: '备注', width: 200,align:'center'},
		                { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
		                { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
		                { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
		                { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'}
				    ]],
				    onClickRow: function(index,row){	
//				    	$('#deviceCollect_tab').datagrid("beginEdit", index);
				     },
				     onBeforeEdit:function(index,row){
//				    	 $("#showMessageInfo").html('');
				     },
				     /**编辑模式进入之后的操作*/
				     onAfterEdit:function(index,row){
				    	 /**判断是否进行数据变更*/
//				    	 row.edited = true;
				     }
			}
			initGridView(reqData,grid);
			$('#deviceCollect_tab').datagrid('loadData',jsonData);
		},
		getDataBySearch = function(){
			var dgrid = $('#deviceCollect_tab').datagrid('options');
				if(!dgrid) return;
					var ip = $('#ip').textbox('getValue');
					var xb = $('#xb').combobox('getValue');
					var gzmc = $('#gzmc').textbox('getValue');
					var reqData = {
							IP_ADR: ip,
							LN_CD: xb,
							ROUT_NAME: gzmc,
							IFS: 'T000086',
							pageIndex: 1,
							pageSize: dgrid.pageSize
					}
					reqGridData('/iPlant_ajax', 'deviceCollect_tab',reqData);
			}	
		deleterepair = function () {
             var checkedItems = $('#deviceCollect_tab').datagrid('getSelections');
             if (checkedItems.length<1) {
                 $.messager.alert('提示', '请选择一条数据进行删除');
                 return;
             }
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
                                     IFS: 'T000089',
                                     IP_ADR : item.IP_ADR
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
        /*是否存在输入的字典项*/
		existDictItem = function(dictCode) {
			var rowNum, tpm = $('#txtIP');
			if (CompanyOpttype == 0) {
				var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/;//正则表达式     
				if(re.test(dictCode))     
				{     
				    if(!( RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256)){
						$.messager.alert('提示', "您输入的"+dictCode+"不是IP地址，请重新输入" );
						tpm.textbox('setValue', '');
						return;
					}
				} else{
					$.messager.alert('提示', "您输入的"+dictCode+"不是IP地址，请重新输入" );
					tpm.textbox('setValue', '');
					return;
				}
				if (tpm.val() != undefined && tpm.val() != ''&& tpm.val() != null) {
					if (dictCode != undefined && dictCode != ''&& dictCode != null) {
						if (tpm.textbox('getValue') != undefined && tpm.textbox('getValue') != '' && tpm.textbox('getValue') != null){
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'T000086',
									IP_ADR : dictCode,
									pageIndex : 1,
									pageSize : 5
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager.alert('提示','您输入的IP地址'+'['+ dictCode+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} 
									else {
										return 1;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
		}
		/* 添加维修项目信息 */
		addrepair=function() {
    			$('#txtIP').textbox('textbox').attr('readonly',false);
    			$('#txtIP').textbox('textbox').attr('disabled',false);
    			$("#enditTab").dialog("open").dialog('setTitle', '采集设备信息');
    			$("#txtIP").textbox('setValue','');
				$("#txtXB").combobox('setValue','');
				$("#txtGZBM").textbox('setValue','');
				$("#txtGZMC").textbox('setValue','');
				$("#txtSBBM").textbox('setValue','');
				$("#txtGZLB").textbox('setValue','');
				$("#txtSFQY").combobox('setValue','');
				$("#txtPX").numberbox('setValue','');
				$("#txtBZ").textbox('setValue','');
    			CompanyOpttype=0;
		},
		/*修改时,验证是否修改任何内容*/
		saveUpdateValidate = function() {
			var checkedItems = $('#deviceCollect_tab').datagrid('getSelections');
			row = checkedItems[0];
			var isUserYn=$("select").combobox('getValue');
			if (row.IP_ADR) {
			
				if(   $('#txtXB').combobox('getValue') == row.LN_CD
				   && $('#txtGZBM').val() ==row.ROUT_CD
				   && $("#txtGZMC").val() ==row.ROUT_NAME
				   && $("#txtGZLB").val()== row.DICT_IT 
				   && $("#txtSBBM").val()==row.ET_CD
				   && $('#txtPX').val()==row.ST_SORT 
				   && isUserYn==row.USE_YN
				   && $("#txtBZ").val() == row.KB_RM
				){
					return true;	
				}
				else {
					return false;
				}
			}
		}
		
		updateDictItem = function() {
			var row = $("#deviceCollect_tab").datagrid("getSelected");
			if (row == null) {
				   $.messager.alert('提示', '请选择一条数据进行修改');
				   return;
			}
			CompanyOpttype=1;
			if (row){
				$("#enditTab").dialog("open").dialog('setTitle','编辑采集设备信息');
				$('#txtIP').textbox('textbox').attr('readonly', true);
				$('#txtIP').textbox('textbox').attr('disabled', true);
				$("#txtIP").textbox('setValue',row.IP_ADR);
				$("#txtXB").combobox('setValue',row.LN_CD);
				$("#txtGZBM").textbox('setValue',row.ROUT_CD);
				$("#txtGZMC").textbox('setValue',row.ROUT_NAME);
				$("#txtSBBM").textbox('setValue',row.ET_CD);
				$("#txtGZLB").textbox('setValue',row.DICT_IT);
				$("#txtSFQY").combobox('setValue',row.USE_YN);
				$("#txtPX").numberbox('setValue',row.ST_SORT);
				$("#txtBZ").textbox('setValue',row.KB_RM);
			}
		},
		saveDictItem=function(){ 
			var ip = $("#txtIP").textbox('getValue');
			// 校验
			if (ip == null ||ip == "") {
					 $.messager.alert('提示', "请输入IP地址" );
					 return;
			}
			 
			// 校验
			if ($("#txtXB").combobox('getValue') == null || $("#txtXB").combobox('getValue') == "") {
					 $.messager.alert('提示', "请选择线别" );
					 return;
			}
			// 校验
			if ($("#txtGZBM").textbox('getValue') == null || $("#txtGZBM").textbox('getValue') == "") {
					 $.messager.alert('提示', "请输入工站编码" );
					 return;
			}
			// 校验
			if ($("#txtGZMC").textbox('getValue') == null || $("#txtGZMC").textbox('getValue') == "") {
					 $.messager.alert('提示', "请输入工站名称" );
					 return;
			}
			// 校验
			if ($("#txtGZLB").textbox('getValue') == null || $("#txtGZLB").textbox('getValue') == "") {
					 $.messager.alert('提示', "请输入工站类别" );
					 return;
			}
			// 校验
			if ($("#txtSBBM").textbox('getValue') == null || $("#txtSBBM").textbox('getValue') == "") {
				 $.messager.alert('提示', "请输入设备编码" );
					 return;
			}
			// 校验
			if ($("#txtSFQY").combobox('getValue') == null || $("#txtSFQY").combobox('getValue') == "") {
					 $.messager.alert('提示', "请选择是否启用" );
					 return;
			}
			// 校验
			if ($("#txtPX").numberbox('getValue') == null || $("#txtPX").numberbox('getValue') == "") {
					 $.messager.alert('提示', "请输入排序" );
					 return;
			}
			var cbUse=$("#txtSFQY").combobox('getValue');
			if(cbUse == '启用'){
				cbUse='Y';
			}else{
				cbUse='N';
			}
			ifs="";
			if (CompanyOpttype == 0) {
				ifs="T000087";
				susMsg = '添加成功';
				errorMsg = '添加失败,请联系管理员';
			} else{
				if (saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
				ifs="T000088";
				susMsg = '更新成功';
				errorMsg = '更新失败,请联系管理员';
			}
			var ajaxParam = {
				url : '/iPlant_ajax',
				dataType : 'JSON',
				data : 
				{
					IFS:ifs,
					IP_ADR:$("#txtIP").textbox('getValue'),
					LN_CD:$("#txtXB").combobox('getValue'),
					ROUT_CD:$("#txtGZBM").textbox('getValue'),
					ROUT_NAME:$("#txtGZMC").textbox('getValue') ,
					ET_CD:$("#txtSBBM").textbox('getValue'),
					DICT_IT:$("#txtGZLB").textbox('getValue'),
					USE_YN:cbUse,
					ST_SORT:$("#txtPX").numberbox('getValue'),
					KB_RM:$("#txtBZ").textbox('getValue')
				},
				successCallBack : function(data) {
					if (data.RESPONSE[0].RESPONSE_HDR.MSG_CODE == '-1007') {
						susMsg = data.RESPONSE[0].RESPONSE_HDR.MSG_TEXT;
					}
					if ($.messager.alert('提示', susMsg)) {
						  $('#enditTab').dialog('close');
						  initGridData();
					}
				},
				errorCallBack : function() {
					$.messager.alert('提示', errorMsg);
				}
			};
			iplantAjaxRequest(ajaxParam);
		}
}
				repairInfo.prototype={
							  init: function () {
						            $(function () {
						            	iplantAjaxRequest({
					                        url:'/iPlant_ajax',
					                        data:{
					                            IFS:'B000029',
					                        	USE_YN:'Y' 
					                        },
					                        successCallBack:function(data){
					                        	var sbArr = [];
					                            sbArr.push({"id":"","text":""});
							    				for(var i=0; i<data.RESPONSE[0].RESPONSE_DATA.length;i++){
							    					sbArr.push({"id":data.RESPONSE[0].RESPONSE_DATA[i].ET_NM,"text":data.RESPONSE[0].RESPONSE_DATA[i].ET_NM});
							    				}
							    				 $('#txtSBBM').combobox({
								    					data:sbArr,
								    					valueField:'id',
								    					textField:'text'
								    			});
					                      }
					                       });
						            	var area = {
						    	                url: "/iPlant_ajax",
						    	                dataType: "JSON",
						    	                data: {IFS: "B000109"},
						    	                successCallBack: function(a) {
						    	                	var dataArea = [];
						    	                	dataArea.push({"value":"","text":""});
						    	                	var op = a.RESPONSE[0].RESPONSE_DATA;
						    	                    $.each(op,function(n,obj) {
						    	                    	dataArea.push({'value':obj.PD_LN_NM,'text':obj.PD_LN_NM});
						    					    });  
						    	                    $('#xb').combobox({
								    					data:dataArea,
								    					valueField:'value',
								    					textField:'text'
								    				});
						    	                    $('#txtXB').combobox({
								    					data:dataArea,
								    					valueField:'value',
								    					textField:'text'
								    				});
						    	                },
						    	                errorCallBack: function() {
						    	                    $.messager.alert("提示", '请联系管理员，查询失败！')
						    	                }
						    	        	};
						    			iplantAjaxRequest(area);
						    			
										    initGridData();
										    var CompanyOpttype=0;
										    $('#btnSearch').click(function() {
										    	getDataBySearch();
											});
											$('.add').click(function(){
												addrepair();
											})
											$('#btnDelete').click(function(){
												deleterepair();
											});
											$('#btnUpdate').click(function() {
												updateDictItem();
											});
											
									});						  							
						         }
					}
 var repair = new repairInfo();
 repair.init();
})();
