(function () {
    function RoleMes() {
     pageConfig={
        gridName:'maintainMes_tab',
        maintainCode:'maintainCode',
        maintainName:'maintainName',
        gcDictCD: '知识库类别编码',
        gcDictName:'知识库类别名称',
        dictType:'CEM01',
        title:'维修知识库',
      },
      dataArr={},
      initGridData=function(){    	   				
   				var dgrid=$('#'+pageConfig.gridName).datagrid('options');
   		        if(!dgrid) return;
   		            var reqData = {
   		                    IFS: 'B000041',
   		                    pageIndex:1,
   		                    pageSize:dgrid.pageSize
   		            }
   		        reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
   			}       
        }
      bindGridData = function (reqData,jsonData) {
            var grid = {
                name: pageConfig.gridName,
                dataType: 'json',
                columns: [[  
//                         {field : "CZ",width : 10,checkbox : true},
                         { field: 'KB_CD', title: '知识库代码', width: 100 ,align:'center',hidden:'true'},
                         { field: 'KB_NM', title: '知识库名称', width: 200,align:'center'},
                         { field: 'DICT_IT_NM', title: '知识库类别', width: 100,align:'center'},
                          { field: 'KB_IU', title: '问题原因', width: 200,align:'center'},
                         { field: 'KB_PD', title: '问题描述', width: 200,align:'center'},
                         { field: 'KB_SC', title: '维修办法', width: 200,align:'center'},  
                         { field: 'USE_YN', title: '是否启用', width: 100,align:'center',formatter:function(value,row,index) {
                            if(row.USE_YN=='Y'){
                              return"启用";
                            }else{
                              return"不启用";
                            }
                         }},
                         { field: 'KB_RM', title: '备注', width: 200,align:'center'},    
                         { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
                         { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
                         { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
                         { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'},
                ]],
                onDblClickRow: function(index,row){	
                	OptType=1;
    		    	 $("#enditTab").dialog("open").dialog('setTitle', '查看维修知识库信息');
    		    	 checkFun();
    		    	 $('#maintainCode').textbox('setValue',row.KB_CD==null?'':row.KB_CD);
    	             $('#maintainName').textbox('setValue',row.KB_NM==null?'':row.KB_NM);
    	             $('#maintainType').combobox('setValue',row.DICT_IT==null?'':row.DICT_IT);
    	             $('#maintainType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
    	             $('#problemReason').textbox('setValue',row.KB_IU==null?'':row.KB_IU);
    	             $('#problemDescribe').textbox('setValue',row.KB_PD==null?'':row.KB_PD);
    	             $('#maintainIdea').textbox('setValue',row.KB_SC==null?'':row.KB_SC);
    	             $('#maintainNote').textbox('setValue',row.KB_RM==null?'':row.KB_RM);
    	             if(row.USE_YN=='Y'){
    	                $('#maintainUse').prop('checked','checked');
    	             }else{
    	                $('#maintainUse').prop('checked','');
    	             }
    		     }
            }
            initGridView(reqData,grid);
            $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
      }, 
      checkFun = function (){
    	  var qx = getUpdateRight();
			if(qx=="Y"){
				$('#maintainCode').textbox('textbox').attr('disabled', true);
		    	 $('#maintainName').textbox('textbox').attr('disabled', false);
		    	 $('#problemReason').textbox('textbox').attr('disabled', false);
		    	 $('#problemDescribe').textbox('textbox').attr('disabled', false);
		    	 $('#maintainIdea').textbox('textbox').attr('disabled', false);
		    	 $('#maintainNote').textbox('textbox').attr('disabled', false);
		    	 $('#maintainType').combobox('textbox').attr('disabled', false);
		    	 $('#maintainType').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				OptType=2;
				$('#maintainCode').textbox('textbox').attr('disabled', true);
		    	 $('#maintainName').textbox('textbox').attr('disabled', true);
		    	 $('#problemReason').textbox('textbox').attr('disabled', true);
		    	 $('#problemDescribe').textbox('textbox').attr('disabled', true);
		    	 $('#maintainIdea').textbox('textbox').attr('disabled', true);
		    	 $('#maintainNote').textbox('textbox').attr('disabled', true);
		    	 $('#maintainType').combobox('textbox').attr('disabled', true);
		    	 $('#maintainType').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
			 
    }
      /* 验证是否重复 */
      existMaintainData = function(maintiandataCode) {
			var rowNum, tpm = $('#maintainCode');
			if (getOptType() == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#maintainCode').textbox('getText'))){
		        	$.messager.alert('提示', "维修知识库代码不能是中文和非法字符，请重新输入。","",function(){
						$('#maintainCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (maintiandataCode != undefined && maintiandataCode != ''
							&& maintiandataCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000041',
									KB_CD : maintiandataCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的维修知识库代码['
																+ maintiandataCode
																+ ']已有相同,请重新输入!');
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
}
      OptType=0,
      getOptType=function(){
        return this.OptType;
      },
      setOptType=function(value){
        this.OptType=value;
      },
      /*数据有效性验证*/
      /*checkDataValid = function () {
        var maintainCode = $('#'+pageConfig.maintainCode).val();
        var maintainType =$('#maintainType').combobox('getValue');
        if (maintainCode == ''||maintainType=='') {
            $('#'+pageConfig.maintainCode).textbox({ required: true });
            return false;
        }
        return true;
      },*/
      setDataNull = function () {
          $('#'+pageConfig.maintainCode).textbox({ required: false });
          $("#maintainMes").form("clear");
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
      getDataByCondition = function(){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        var MaintainMesCode = $('#queryMaintainCode').textbox('getValue');
        var MaintainMesName = $('#queryMaintainName').textbox('getValue');
        var zskType = $('#zskType').textbox('getValue');
        var reqData ={
          KB_CD: MaintainMesCode,
          KB_NM: MaintainMesName,
          DICT_IT:zskType,
          IFS:'B000041',
          pageIndex:1,
          pageSize:dgrid.pageSize
        }
          reqGridData('/iPlant_ajax','maintainMes_tab',reqData);
      }
      updateRoleMes = function () {
         var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
         if (!isSelectedData) {
             $.messager.alert('提示', '请选择一条数据进行修改');
             return;
         }
         var row = $("#"+pageConfig.gridName).datagrid("getSelected");
         setOptType(1);
         if (row) {
             $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
             $('#maintainCode').textbox('textbox').attr('readonly', true);
			 $('#maintainCode').textbox('textbox').attr('disabled', true);
             $('#'+pageConfig.maintainCode).css('background-color','#95B8E7');
             $('#maintainCode').textbox('setValue',row.KB_CD==null?'':row.KB_CD);
             $('#maintainName').textbox('setValue',row.KB_NM==null?'':row.KB_NM);
             $('#maintainType').combobox('setValue',row.DICT_IT==null?'':row.DICT_IT);
             $('#maintainType').combobox('setText',row.DICT_IT_NM==null?'':row.DICT_IT_NM);
             $('#problemReason').textbox('setValue',row.KB_IU==null?'':row.KB_IU);
             $('#problemDescribe').textbox('setValue',row.KB_PD==null?'':row.KB_PD);
             $('#maintainIdea').textbox('setValue',row.KB_SC==null?'':row.KB_SC);
             $('#maintainNote').textbox('setValue',row.KB_RM==null?'':row.KB_RM);
             if(row.USE_YN=='Y'){
                $('#maintainUse').prop('checked','checked');
             }else{
                $('#maintainUse').prop('checked','');
             }
          }
         checkFun();
      },
      deleteRoleMes = function () {
           var isSelectedData = validSelectedData(pageConfig.gridName, 'Delete');
           if (!isSelectedData) {
               $.messager.alert('提示', '请选择一条数据进行删除');
               return;
           }
           var checkedItems = $('#' + pageConfig.gridName).datagrid('getSelections');
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
                                  KB_CD: item.KB_CD,
                                  IFS:'B000043'
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
      addRoleMes = function () {
    	  setOptType(0);
          checkFun();
    	   $('#maintainCode').textbox('textbox').attr('readonly',
					false);
		   $('#maintainCode').textbox('textbox').attr('disabled',
					false);
           $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
           $("#maintainMes").form("clear");
           
      },
      saveUpdateValidate = function() {
			var checkedItems = $('#'+pageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if (row.KB_CD) {
				var isUserYn = 'N';
				if ($('#maintainUse').is(':checked')) {
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#maintainCode').textbox('getValue') != (row.KB_CD==null?'':row.KB_CD)
						|| $('#maintainName').textbox('getValue') != (row.KB_NM==null?'':row.KB_NM)
						|| $('#maintainType').textbox('getText') != (row.DICT_IT_NM==null?'':row.DICT_IT_NM)
						|| $('#problemReason').textbox('getValue') != (row.KB_IU==null?'':row.KB_IU)
						|| isUserYn != row.USE_YN
						|| $('#problemDescribe').textbox('getValue') != (row.KB_PD==null?'':row.KB_PD)
						|| $('#maintainIdea').textbox('getValue') != (row.KB_SC==null?'':row.KB_SC)
						|| $('#maintainNote').textbox('getValue') != (row.KB_RM==null?'':row.KB_RM)) {
					return true;
				} else {
					return false;
				}
			}
		}
      saveRoleMes = function () {
      	if(!checkForm()) return;
        /*if (!checkDataValid()){
          $.messager.alert('提示','请输入必选添加信息');
          return 
        };*/
        var MaintainMesId =$('#maintainCode').textbox('getValue');
        var MaintainMesName =$('#maintainName').textbox('getValue');
        var MaintainTypeCode =$('#maintainType').combobox('getValue');
        var MaintainReason =$('#problemReason').textbox('getValue');
        var MaintainDescribe =$('#problemDescribe').textbox('getValue');
        var MaintainIdea =$('#maintainIdea').textbox('getValue');
        var MaintainNote =$('#maintainNote').textbox('getValue');
        var IFServerNo = '',MaintainUse='';
        if($("#maintainUse").is(':checked')) MaintainUse='Y';
        else MaintainUse='N';
           var reqData={
                KB_CD: MaintainMesId,
                KB_NM: MaintainMesName,
                DICT_IT: MaintainTypeCode,
                USE_YN: MaintainUse,
                KB_IU: MaintainReason,
                KB_PD: MaintainDescribe,
                KB_SC: MaintainIdea,
                KB_RM: MaintainNote,
           }
           var optType=getOptType();
           //新增
           if (optType == 0) {
               IFServerNo = 'B000042',
               $.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo}); 
           }
           //修改
           else if (optType == 1) {
        	   if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
               IFServerNo = 'B000044',
               reqData =$.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo});
           }
           var susMsg='',errorMsg='';
           if(optType==0){
             susMsg='添加成功';
             errorMsg='添加失败,请联系管理员';
           }
           else{
             susMsg='更新成功';
             errorMsg='更新失败,请联系管理员';
           }
           var ajaxParam = {
               url: '/iPlant_ajax',
               dataType: 'JSON',
               data: reqData,
               successCallBack:function(data){
                 if($.messager.alert('提示', susMsg)){
                   $('#enditTab').dialog('close');
//                     setDataNull();
                     initGridData();   
                 }
               },
               errorCallBack:function(){
                 $.messager.alert('提示', errorMsg);
               }
               
           };
           iplantAjaxRequest(ajaxParam);
      },
      bindCombogrid =function (jsonData){
        var ajaxParam={
          url:'/iPlant_ajax',
          data:{
            IFS:'D000008',
            DICT_CD:pageConfig.dictType,
          },
          successCallBack:function(data){
            var rowNum=0
            if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
               rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
            }
            var rowCollection=createSourceObj(data);
            var jsonData={
                  total:rowNum,
                  rows:rowCollection
            }
            $('#maintainType').combogrid({
                rows:rowCollection,
                idField:'DICT_IT',
                textField:'DICT_IT_NM',
                panelWidth:800,
                columns: [[
                   { field: 'IT_ID', title: '维修库类别编码', width: 100, align: 'center'},
                   { field: 'DICT_IT_NM',title:'字典项名称',width:100,align:'center'},
                   { field: 'DICT_CD',title: '字典代码',width:75,align:'center'},
                   { field: 'DICT_IT', title: '字典项', width: 75, align: 'center' },
                   { field:'DICT_ORD',title:'取值顺序',width:75,align:'center'},
                   { field: 'CRT_ID', title: '创建人', width: 75, align: 'center' },
                   { field: 'CRT_DT', title: '创建时间', width: 75, align: 'center'},
                   { field: 'UPT_ID', title: '修改人', width: 75, align: 'center' },
                   { field: 'UPT_DT', title: '修改时间', width: 75, align: 'center'},
                   {field: 'USE_YN', title: '是否启用', width: 75, align: 'center',
                       formatter: function (value, row, index) {
                           if (value == 'Y') {
                               return '启用';
                           }
                           else {
                               return '未启用';
                           }
                       }
                   },
                ]],
            });
            $('#maintainType').combogrid("grid").datagrid("loadData", jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
      } 
        initComboboxData=function(){
      		//知识库类别   
	   		iplantAjaxRequest( {
	   			url: '/iPlant_ajax',
	   			data: {IFS:'D000008',DICT_CD:"CKB01",USE_YN:'Y'},
	   			successCallBack: function (data) {
	   				var array = new Array();
	   				var ccArr = [];
	   				ccArr.push({"id":"","text":"全部"});
	   				var rowCollection=createSourceObj(data);
	   				for(var i=0; i<rowCollection.length;i++){
	   					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
	   					ccArr.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
	   				}
	   				
	   				for(var i=0; i<rowCollection.length; i++){
		            	dataArr[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
		            }
	       	
	   				//查询
	   				$('#zskType').combobox({
	   					data:ccArr,
	   					valueField:'id',
	   					textField:'text'
	   				});
	   				//编辑时
	   				$('#maintainType').combobox({
	   					data:array,
	   					valueField:'id',
	   					textField:'text'
	   				});
					if(OptType == 1){
						updateRoleMes();
					}
      			}
			})
    }
    RoleMes.prototype = {
        init: function () {
            $(function () {
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
            	initComboboxData();
                initGridData();
//                bindCombogrid();
                $('#btnAdd').click(function () {
//                	initComboboxData();
                    addRoleMes();
                });
                $('#btnUpdate').click(function () {
//                	initComboboxData();
                    updateRoleMes();
                });
                $('#save').click(function () {
                    saveRoleMes();
                });
                $('.close').click(function () {
                   setDataNull();
                    $('#enditTab').dialog('close');
                    $('#queryTab').dialog('close');
                    initGridData();
                });
                $('#btnDelete').click(function(){
                  deleteRoleMes();
                });
                $('#btnSearch').click(function(){
                	 getDataByCondition(); 
                })
                $('#btnFreshen').click(function() {
                	getDataByCondition();
				});
                $('#confirm').click(function(){
                	getDataByCondition(); 
                });
                $('input',$('#maintainCode').next('span')).keyup(function(){
                  checkInputLength('maintainCode',20);
                })
                $('input',$('#maintainName').next('span')).keyup(function(){
                  checkInputLength('maintainName',30);
                })
                $('input',$('#problemReason').next('span')).keyup(function(){
                  checkInputLength('problemReason',200);
                })
                $('input',$('#problemDescribe').next('span')).keyup(function(){
                  checkInputLength('problemDescribe',200);
                })
                $('input',$('#maintainIdea').next('span')).keyup(function(){
                  checkInputLength('maintainIdea',200);
                })
                $('input',$('#maintainNote').next('span')).keyup(function(){
                  checkInputLength('maintainNote',200);
                })
              //限制输入英文单引号
				$("input",$("#maintainCode").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#maintainName").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#problemReason").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#problemDescribe").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#maintainIdea").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
				$("input",$("#maintainNote").next("span")).keydown(function(e){
	          		   if(e.keyCode==222){
	        				if(e.preventDefault){
	                            e.preventDefault();
	                        }
	                		else
	                		{
	                			e.returnValue = false;
	                        }      
	        			}
	          	   });
            });
        }
    }
    var pCode = new RoleMes();
    pCode.init();
})();