(function () {
    function FunModule() {
      pageConfig={
        FunctionModuleCode:'EquipCode',
        dictType: 'CEM01',
        gridName:'EquipMes_tab',
        EquipCode:'EquipCode',
        EquipName:'EquipName',
        title:'设备管理',
      },
      dataArr={},
      operator='',
      initGridData=function(){ 
    	  //负责人
//    	  iplantAjaxRequest( {
//    		  url: '/iPlant_ajax',
//    		  data:{IFS:'D000041',},
//    		  successCallBack: function (data) {
//  				var array = new Array();
//  				var rowCollection=createSourceObj(data);
//  				for(var i=0; i<rowCollection.length;i++){
//  					array.push({"id":rowCollection[i].EMP_CD,"text":rowCollection[i].EMP_NM});
//  				}
//  				//编辑时
//  				$('#principal').combobox({
//  					data:array,
//  					valueField:'id',
//  					textField:'text'
//  				});
//  			}
//    	  });

    	  //设备类别   
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'D000008',DICT_CD:"CEM01",},
    			successCallBack: function (data) {
    				var array = new Array();
    				var rowCollection=createSourceObj(data);
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
    				}
    				
  		            for(var i=0; i<rowCollection.length; i++){
  		            	dataArr[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
  		            }
        	
    				//查询
    				$('#sbType').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				//编辑时
    				$('#equipTypeCode').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				var tparray=[{"id":"","text":""},{"id":"CNC.png","text":"CNC.png"},{"id":"CYJ.png","text":"CYJ.png"},{"id":"ZSJ.png","text":"ZSJ.png"},{"id":"LSJ.png","text":"LSJ.png"}
    				,{"id":"AGV.png","text":"AGV.png"}
    				,{"id":"AOI.png","text":"AOI.png"}
    				,{"id":"SPI.png","text":"SPI.png"}
    				,{"id":"bcptest.png","text":"bcptest.png"}
    				,{"id":"bfl.png","text":"bfl.png"}
    				,{"id":"cptest.png","text":"cptest.png"}
    				,{"id":"fbj.png","text":"fbj.png"}
    				,{"id":"hcsb.png","text":"hcsb.png"}
    				,{"id":"hll.png","text":"hll.png"}
    				,{"id":"sxtp.png","text":"sxtp.png"}
    				,{"id":"tbj.png","text":"tbj.png"}
    				,{"id":"ycj.png","text":"ycj.png"}
    				,{"id":"zdbzj.png","text":"zdbzj.png"}
    				,{"id":"zdzzj.png","text":"zdzzj.png"}];
    				$('#txtSBTP').combobox({
    					data:tparray,
    					valueField:'id',
    					textField:'text'
    				});
    			}
    		});
    		
    		//所属车间
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'B000025'},
    			successCallBack: function (data) {
    				var array = new Array();
    				var rowCollection=createSourceObj(data);
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].PL_CD,"text":rowCollection[i].PL_NM});
    				}
    				//编辑时
    				$('#toWorkshop').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    			}
    		});
    		
    	//拉线编码
		var company = {
                url: "/iPlant_ajax",
                dataType: "JSON",
                data: {IFS: "B000109"},
                successCallBack: function(a) {
                	var dataFactory = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
				    });  
                    $('#lineCD').combobox({
                        data:dataFactory,
                        valueField:'value',
                        textField:'text'
                      });
                },
                errorCallBack: function() {
                    $.messager.alert("提示", '请联系管理员，查询失败！')
                }
            };
		iplantAjaxRequest(company);
			
			/*工序路线下拉框*/
			var routeName = {
	                url: "/iPlant_ajax",
	                dataType: "JSON",
	                data: {IFS: "GX00011"},
	                successCallBack: function(a) {
	                	var dataRouteName = [];
	                	var op = a.RESPONSE[0].RESPONSE_DATA;
	                    $.each(op,function(n,obj) {
	                    	dataRouteName.push({'value':obj.ROUT_CD,'text':obj.ROUT_NAME});
					    });  
	                    $('#routeCD').combobox({
	                        data:dataRouteName,
	                        valueField:'value',
	                        textField:'text'
	                      });
	                },
	                errorCallBack: function() {
	                    $.messager.alert("提示", '请联系管理员，查询失败！')
	                }
	            };
			iplantAjaxRequest(routeName);
    		
    		
        //车间区域
        iplantAjaxRequest( {
          url: '/iPlant_ajax',
          data: {IFS:'B000053'},
          successCallBack: function (data) {
            var array = new Array();
            var rowCollection=createSourceObj(data);
            for(var i=0; i<rowCollection.length;i++){
              array.push({"id":rowCollection[i].LC_CD,"text":rowCollection[i].LC_NM});
            }
            //编辑时
            $('#toWorkshopArea').combobox({
              data:array,
              valueField:'id',
              textField:'text'
            });
          }
        });
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        if(!dgrid) return;
          var reqData = {
            IFS: 'B000029',
            pageIndex:1,
            pageSize:dgrid.pageSize
          }
         reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
        },
      bindGridData = function (reqData,jsonData) {
        var grid = {
          name: pageConfig.gridName,
          dataType: 'json',
          columns: [[
//               {field : "CZ",width : 10,checkbox : true},
               { field: 'ET_CD', title: '设备唯一码', width: 100,align:'center'},
               { field: 'ET_NM', title: '设备名称', width: 200,align:'center'},
               { field: 'ET_UT', title: '设备型号', width: 200,align:'center'},
               { field: 'DICT_IT', title: '设备类别', width: 100,align:'center',
      					formatter: function(value, row, index) {
      						if(value != '') {
      							return dataArr[value];
      						} else {
      							return value;
      						}
      					}},
               { field: 'PL_NM', title: '所属车间', width: 100,align:'center'},
               { field: 'LC_NM', title: '车间区域', width: 100,align:'center'},
               {field: 'LINE_CD',title: '拉线编码',width: 100,align: 'center'},
               {field: 'ROUT_CD',title: '工位编码',width: 100,align: 'center'}, 
               { field: 'EMP_NM', title: '负责人', width: 100,align:'center'},
               { field: 'ET_MT', title: '制造厂商', width: 200,align:'center'},
               { field: 'ET_MD', title: '制造日期', width: 200,align:'center'},
               { field: 'ET_QT', title: '资产编号', width: 200,align:'center'},
               { field: 'ET_PT', title: '入厂日期', width: 200,align:'center'},
               { field: 'ET_PW', title: '机器功率', width: 100,align:'center'},
               { field: 'ET_TT', title: '设备吨位', width: 100,align:'center'},
               { field: 'ET_ST', title: '一级保养', width: 100,align:'center',
            	   formatter : function(value, row, index) {
            		   if(value==null || value==""){
            			   return "";
            		   }else if(value<24){
            			   	return parseInt(value)%24+"小时";
            		   }else if(value){
            			   return "1天";
            		   }else{
            			   return parseInt(parseInt(value)/24)+"天"+parseInt(value)%24+"小时";
            			   }
					}   
               },
               { field: 'ET_LT', title: '二级保养', width: 100,align:'center',
            	   formatter : function(value, row, index) {
            		   if(value==null || value==""){
            			   return "";
            		   }else if(value<24){
            			   	return parseInt(value)%24+"小时";
            		   }else if(value){
            			   return "1天";
            		   }else{
            			   return parseInt(parseInt(value)/24)+"天"+parseInt(value)%24+"小时";
            			   }
					}    
               },
               { field: 'ET_PL', title: '设备图片', width: 100,align:'center'},
               { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
               { field: 'CRT_DT', title: '创建时间', width: 200,align:'center'},
               { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
               { field: 'UPT_DT', title: '修改时间', width: 200,align:'center'},
          ]],
          onDblClickRow: function(index,row){	
        	     OptType=1;
		    	 $("#enditTab").dialog("open").dialog('setTitle', '查看设备信息');
		    	 checkFun();
		    	 $('#EquipCode').textbox('setValue',row.ET_CD==null?'':row.ET_CD);
		          $('#EquipName').textbox('setValue',row.ET_NM==null?'':row.ET_NM);
		          $('#EquipType').textbox('setValue',row.ET_UT==null?'':row.ET_UT);
		          $('#manufacturer').textbox('setValue',row.ET_MT==null?'':row.ET_MT); 
		          $('#EquipNum').textbox('setValue',row.ET_QT==null?'':row.ET_QT);
		          $('#equipPower').textbox('setValue',row.ET_PW==null?'':row.ET_PW);
		          $('#principal').combobox('setValue',row.ET_RES==null?'':row.ET_RES);
		          $('#equipTypeCode').combobox('setValue',row.DICT_IT==null?'':row.DICT_IT);
		          $('#txtSBTP').combobox('setValue',row.ET_PL==null?'':row.ET_PL);
		          $('#toWorkshop').combobox('setValue',row.PL_CD==null?'':row.PL_CD);
		          $('#toWorkshopArea').combobox('setValue',row.LC_CD==null?'':row.LC_CD);
		          $('#lineCD').combobox('setValue',row.LINE_CD==null?'':row.LINE_CD);
		          $('#routeCD').combobox('setValue',row.ROUT_CD==null?'':row.ROUT_CD);
		          $('#EquipTonnage').textbox('setValue',row.ET_TT==null?'':row.ET_TT);
		          $('#maintenanceFirTH').textbox('setValue',row.ET_ST==null?'':parseInt(parseInt(row.ET_ST)/24));
			      $('#maintenanceFirXS').textbox('setValue',row.ET_ST==null?'':parseInt(row.ET_ST)%24);
			        
			      $('#maintenanceSecTH').textbox('setValue',row.ET_LT==null?'':parseInt(parseInt(row.ET_LT)/24));
			      $('#maintenanceSecXS').textbox('setValue',row.ET_LT==null?'':parseInt(row.ET_LT)%24);
		          
//		          $('#maintenanceFir').textbox('setValue',row.ET_ST);
//		          $('#maintenanceSec').textbox('setValue',row.ET_LT);
		          $('#useData').datebox('setValue',row.ET_PT==null?'':row.ET_PT);
		          $('#prodData').datebox('setValue',row.ET_MD==null?'':row.ET_MD)
		     }
        }
        initGridView(reqData,grid);
        $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
      },  
      checkFun = function (){
    	  var qx = getUpdateRight();
			if(qx=="Y"){
				$('#principal').combobox('textbox').attr('disabled', false);
				$('#EquipCode').textbox('textbox').attr('disabled', true);
		    	 $('#EquipName').textbox('textbox').attr('disabled', false);
		    	 $('#EquipType').textbox('textbox').attr('disabled', false);
		    	 $('#EquipNum').textbox('textbox').attr('disabled', false);
		    	 $('#manufacturer').textbox('textbox').attr('disabled', false);
		    	 $('#equipPower').textbox('textbox').attr('disabled', false);
		    	 $('#EquipTonnage').textbox('textbox').attr('disabled', false);
		    	 $('#maintenanceFirTH').textbox('textbox').attr('disabled', false);
		    	 $('#maintenanceFirXS').textbox('textbox').attr('disabled', false);
		    	 $('#maintenanceSecTH').textbox('textbox').attr('disabled', false);
		    	 $('#maintenanceSecXS').textbox('textbox').attr('disabled', false);
		    	 $('#useData').datebox('textbox').attr('disabled', false);
		    	 $('#prodData').datebox('textbox').attr('disabled', false);
		    	 $('#equipTypeCode').combobox('textbox').attr('disabled', false);
		    	 $('#txtSBTP').combobox('textbox').attr('disabled', false);
		    	 $('#toWorkshop').combobox('textbox').attr('disabled', false);
		    	 $('#toWorkshopArea').combobox('textbox').attr('disabled', false);
		    	 $('#lineCD').combobox('textbox').attr('disabled', false);
		         $('#routeCD').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				OptType=2;
				$('#principal').combobox('textbox').attr('disabled', true);
				$('#EquipCode').textbox('textbox').attr('disabled', true);
		    	 $('#EquipName').textbox('textbox').attr('disabled', true);
		    	 $('#EquipType').textbox('textbox').attr('disabled', true);
		    	 $('#EquipNum').textbox('textbox').attr('disabled', true);
		    	 $('#manufacturer').textbox('textbox').attr('disabled', true);
		    	 $('#equipPower').textbox('textbox').attr('disabled', true);
		    	 $('#EquipTonnage').textbox('textbox').attr('disabled', true);
		    	 $('#maintenanceFirTH').textbox('textbox').attr('disabled', true);
		    	 $('#maintenanceFirXS').textbox('textbox').attr('disabled', true);
		    	 $('#maintenanceSecTH').textbox('textbox').attr('disabled', true);
		    	 $('#maintenanceSecXS').textbox('textbox').attr('disabled', true);
		    	 $('#useData').datebox('textbox').attr('disabled', true);
		    	 $('#prodData').datebox('textbox').attr('disabled', true);
		    	 $('#equipTypeCode').combobox('textbox').attr('disabled', true);
		    	 $('#txtSBTP').combobox('textbox').attr('disabled', true);
		    	 $('#toWorkshop').combobox('textbox').attr('disabled', true);
		    	 $('#toWorkshopArea').combobox('textbox').attr('disabled', true);
		    	 $('#lineCD').combobox('textbox').attr('disabled', true);
		         $('#routeCD').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
		    	 $('#cancleID').hide();
			}
			 
    }
      /*验证重复*/
		existequipment = function(equipmentCode) {
			var rowNum, tpm = $('#EquipCode');
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#EquipCode').textbox('getText'))){
		        	$.messager.alert('提示', "设备唯一码不能是中文和非法字符，请重新输入。","",function(){
						$('#EquipCode').textbox('setValue', '');
						
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (equipmentCode != undefined && equipmentCode != ''
							&& equipmentCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'B000029',
									ET_CD : equipmentCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager
												.alert(
														'提示',
														'您输入的设备唯一码['
																+ equipmentCode
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
      combogrdType=0;
      getOptType=function(){
        return this.OptType;
      },
      setOptType=function(value){
        this.OptType=value;
      },
      getCombogridType=function(){
        return this.combogrdType;
      },
      setCombogridType=function(value){
        this.combogrdType=value;
      },
      /*数据有效性验证*/
      /*checkDataValid = function () {
        var dictCode = $('#'+pageConfig.FunctionModuleCode).val();
        var equipTypeCode =$('#equipTypeCode').combobox('getValue');
        var toWorkshop =$('#toWorkshop').combobox('getValue');
        if (dictCode == ''||equipTypeCode==''||toWorkshop=='') {
          $('#'+pageConfig.FunctionModuleCode).textbox({ required: true });
          return false;
        }
        return true;
      },*/
//      setDataNull = function () {
//        $('#'+pageConfig.FunctionModuleCode).textbox({ required: false });               
//      }
      getRightDate =function(){
        $('#prodData').datebox().datebox('calendar').calendar({
            validator: function(date){
                var now = new Date();
                var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return date<=d1;
            }
        });
        $('#useData').datebox().datebox('calendar').calendar({
            validator: function(date){
                var now = new Date();
                var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                return  date<=de;
            }
        });
      }
      onSelect =function(d){
        var issd = this.id == 'prodData', prodData = issd ? d : new Date($('#prodData').datebox('getValue')), useData = issd ? new Date($('#useData').datebox('getValue')) : d;
          if (useData < prodData) {
            $('#useData').datebox('setValue', '').datebox('hidePanel');
            $.messager.alert('错误','入厂日期早于制造日期');
          }
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
      getOperator =function(){
        //获取操作员
        var loginUser = $.cookie('UserName');
        var ajaxParam = {
           url: '/iPlant_ajax',
           dataType: 'JSON',
           data: {
               IFS: 'D000037',
               USE_CD:loginUser,
           },
           successCallBack:function(data){
              operator=data.RESPONSE[0].RESPONSE_DATA[0].EMP_NO;
           }
        };
       iplantAjaxRequest(ajaxParam);
      }
      addEquipType =function(){
        var EquipMesId =$('#EquipCode').textbox('getValue');
        var EquipMesName =$('#EquipName').textbox('getValue');
        var ajaxParam = {
           url: '/iPlant_ajax',
           dataType: 'JSON',
           data: {
               IFS: 'B000086',
               ET_CD:EquipMesId,
               ET_NM:EquipMesName,
               EMP_CD:operator,
               DICT_IT:'RDI01.02',
               DICT_IT_NM:'待机空闲',
           },
           successCallBack:function(data){
           }
        };
       console.log(ajaxParam.data);  
       iplantAjaxRequest(ajaxParam);
      }
      addUserMes = function () {
    	  initComboboxData();
    	  setOptType(0); 
          checkFun();
    	$('#EquipCode').textbox('textbox').attr('readonly',
					false);
	    $('#EquipCode').textbox('textbox').attr('disabled',
					false);
        $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
        $("#EquipMes").form("clear");
        getOperator();
      },
      deleteUserMes = function () {
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
                              ET_CD: item.ET_CD,
                              IFS:'B000031'
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
      updateUserMes = function () {
        var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
        if (!isSelectedData) {
          $.messager.alert('提示', '请选择一条数据进行修改');
          return;
        }
        var row = $("#"+pageConfig.gridName).datagrid("getSelected");
        setOptType(1);
        if (row) {
          $('#enditTab').dialog('open').dialog('setTitle','设备信息管理维护');         
         
          $('#EquipCode').textbox('textbox').attr('readonly', true);
		  $('#EquipCode').textbox('textbox').attr('disabled', true);
		  $('#EquipCode').textbox('setValue',row.ET_CD==null?'':row.ET_CD);
          $('#EquipName').textbox('setValue',row.ET_NM==null?'':row.ET_NM);
          $('#EquipType').textbox('setValue',row.ET_UT==null?'':row.ET_UT);
          $('#manufacturer').textbox('setValue',row.ET_MT==null?'':row.ET_MT); 
          $('#EquipNum').textbox('setValue',row.ET_QT==null?'':row.ET_QT);
          $('#equipPower').textbox('setValue',row.ET_PW==null?'':row.ET_PW);
          $('#principal').combobox('setValue',row.ET_RES==null?'':row.ET_RES);
          $('#equipTypeCode').combobox('setValue',row.DICT_IT==null?'':row.DICT_IT);
          $('#txtSBTP').combobox('setValue',row.ET_PL==null?'':row.ET_PL);
          $('#toWorkshop').combobox('setValue',row.PL_CD==null?'':row.PL_CD);
          $('#toWorkshopArea').combobox('setValue',row.LC_CD==null?'':row.LC_CD);
          
          $('#lineCD').combobox('setValue',row.LINE_CD==null?'':row.LINE_CD);
          $('#routeCD').combobox('setValue',row.ROUT_CD==null?'':row.ROUT_CD);
          
          $('#EquipTonnage').textbox('setValue',row.ET_TT==null?'':row.ET_TT);
          $('#maintenanceFirTH').textbox('setValue',row.ET_ST==null?'':parseInt(parseInt(row.ET_ST)/24));
	      $('#maintenanceFirXS').textbox('setValue',row.ET_ST==null?'':parseInt(row.ET_ST)%24);
	        
	      $('#maintenanceSecTH').textbox('setValue',row.ET_LT==null?'':parseInt(parseInt(row.ET_LT)/24));
	      $('#maintenanceSecXS').textbox('setValue',row.ET_LT==null?'':parseInt(row.ET_LT)%24);
          
//          $('#maintenanceFir').textbox('setValue',row.ET_ST);
//          $('#maintenanceSec').textbox('setValue',row.ET_LT);
          $('#useData').datebox('setValue',row.ET_PT==null?'':row.ET_CD);
          $('#prodData').datebox('setValue',row.ET_MD==null?'':row.ET_CD);
        }
        checkFun();
      },
      getDataByCondition =function(){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        var EquipMesCode = $('#queryEquipCode').textbox('getValue');
        var EquipMesName = $('#queryEquipName').textbox('getValue');
        var sbType = $('#sbType').combobox('getValue');
        var reqData ={
          ET_CD: EquipMesCode,
          ET_NM: EquipMesName,
          DICT_IT: sbType,
          pageIndex:1,
          pageSize:dgrid.pageSize,
          IFS:'B000029'
        }
        reqGridData('/iPlant_ajax','EquipMes_tab',reqData);
      }
      /*验证修改内容是否重复*/
      saveUpdateValidate = function() {
			var checkedItems = $('#EquipMes_tab').datagrid('getSelections');
			row = checkedItems[0];
			if (row.ET_CD) {
				if ($('#EquipCode').textbox('getValue') != (row.ET_CD==null?'':row.ET_CD)
						|| $('#EquipName').textbox('getValue') != (row.ET_NM==null?'':row.ET_NM)
						|| $('#principal').combobox('getValue',row.ET_RES==null?'':row.ET_RES)
						|| $('#toWorkshop').combobox('getValue') != (row.PL_CD==null?'':row.PL_CD)
						|| $('#toWorkshopArea').combobox('getValue') != (row.LC_CD==null?'':row.LC_CD)
						
						||$('#lineCD').combobox('getValue') != (row.LINE_CD==null?'':row.LINE_CD)
						||$('#routeCD').combobox('getValue') != (row.ROUT_CD==null?'':row.ROUT_CD)
						
						|| $('#equipTypeCode').combobox('getValue') != (row.DICT_IT==null?'':row.DICT_IT)
						|| $('#EquipType').textbox('getValue') != (row.ET_UT==null?'':row.ET_UT)	
						|| $('#manufacturer').textbox('getValue') != (row.ET_MT==null?'':row.ET_MT)	
						|| $('#EquipNum').textbox('getValue') != (row.ET_QT==null?'':row.ET_QT)	
						|| $('#prodData').datebox('getValue') != formatterDate(row.ET_MD==null?'':row.ET_MD)	
						|| $('#useData').datebox('getValue') != formatterDate(row.ET_PT==null?'':row.ET_PT)
						|| $('#equipPower').textbox('getValue') != (row.ET_PW==null?'':row.ET_PW)
						|| $('#EquipTonnage').textbox('getValue') != (row.ET_TT==null?'':row.ET_TT)
						|| $('#maintenanceFirTH').textbox('getValue') != (row.ET_ST==null?'':parseInt(parseInt(row.ET_ST)/24))
						|| $('#maintenanceFirXS').textbox('getValue') != (row.ET_ST==null?'':parseInt(row.ET_ST)%24)
						|| $('#maintenanceSecTH').textbox('getValue') != (row.ET_LT==null?'':parseInt(parseInt(row.ET_LT)/24))
						|| $('#maintenanceSecXS').textbox('getValue') != (row.ET_LT==null?'':parseInt(row.ET_LT)%24)
//						|| $('#maintenanceFir').textbox('getValue') != (row.ET_ST==null?'':row.ET_ST)
//						|| $('#maintenanceSec').textbox('getValue') != (row.ET_LT==null?'':row.ET_LT)
						|| $('#txtSBTP').combobox('getValue') != (row.ET_PL==null?'':row.ET_PL)) {
					return true;
				} else {
					return false;
				}
			}
		}
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
      saveUserMes = function () {
        /*if (!checkDataValid()){
          $.messager.alert('提示','请输入必选添加信息');
          return 
        };*/
        if(!checkForm()) return;
        var EquipMesId =$('#EquipCode').textbox('getValue');
        var EquipMesName =$('#EquipName').textbox('getValue');
        var EquipType =$('#EquipType').textbox('getValue');
        var Equipmanufacturer =$('#manufacturer').textbox('getValue');
        var EquipprodData =$('#prodData').datebox('getValue');
        var EquipNum =$('#EquipNum').textbox('getValue');
        var EquipuseData =$('#useData').datebox('getValue');
        var EquipPower =$('#equipPower').textbox('getValue');
        var Principal=$('#principal').combobox('getValue');
        var EquipTypeCode =$('#equipTypeCode').combobox('getValue');
        var EquiptoWorkshop =$('#toWorkshop').combobox('getValue');
        var EquiptoWorkshopArea =$('#toWorkshopArea').combobox('getValue');
        
        var EquiplineCD = $('#lineCD').combobox('getValue');
        var EquiprouteCD = $('#routeCD').combobox('getValue');
        
        var EquipTonnage =$('#EquipTonnage').textbox('getValue');
        var strTempSec,strTempFir;
        
        var str1 = $('#maintenanceFirTH').val();
        var str2 = $('#maintenanceFirXS').val();
        if(str1=="" && str2==""){
        	strTempFir="";
        }else if( str1=="" && str2 !="" ){
        	strTempFir=parseInt($('#maintenanceFirXS').val());
        }else if( str1!="" && str2 =="" ){
        	strTempFir=parseInt($('#maintenanceFirTH').val())*24;
        }else{
        	strTempFir = parseInt($('#maintenanceFirTH').val())*24+parseInt($('#maintenanceFirXS').val());
        }
        
        var str3 = $('#maintenanceSecTH').val();
        var str4 = $('#maintenanceSecXS').val();
        if(str3=="" && str4==""){
        	strTempSec="";
        }else if( str3=="" && str4 !="" ){
        	strTempSec=parseInt($('#maintenanceSecXS').val());
        }else if( str3!="" && str4 =="" ){
        	strTempSec=parseInt($('#maintenanceSecTH').val())*24;
        }else{
        	strTempSec = parseInt($('#maintenanceSecTH').val())*24+parseInt($('#maintenanceSecXS').val());
        }
        
        //var strTempFir = parseInt($('#maintenanceFirTH').val())*24+parseInt($('#maintenanceFirXS').val());
//        if($('#maintenanceFirTH').val()==""){
//        	strTempSec=0;
//        }else{
//        	strTempSec = parseInt($('#maintenanceSecTH').val())*24+parseInt($('#maintenanceSecXS').val());
//        }
        
//        var EquipmaintenanceFir =$('#maintenanceFir').textbox('getValue');
//        var EquipmaintenanceSec =$('#maintenanceSec').textbox('getValue');
        var txtSBTP =$('#txtSBTP').combobox('getValue');
        var reqData={
          ET_CD:EquipMesId,
          ET_NM:EquipMesName,
          ET_UT:EquipType,
          ET_MT:Equipmanufacturer,
          ET_MD:EquipprodData,
          ET_QT:EquipNum,
          ET_PT:EquipuseData,
          ET_PW:EquipPower,
          ET_RES:Principal,
          DICT_IT:EquipTypeCode,
          PL_CD:EquiptoWorkshop,
          LC_CD:EquiptoWorkshopArea,
          
          LINE_CD:EquiplineCD,
          ROUT_CD:EquiprouteCD,
          
          ET_TT:EquipTonnage,
          ET_ST:strTempFir,
          ET_LT:strTempSec,
          ET_PL:txtSBTP
        }
        var optType=getOptType();
         //新增
         if (optType == 0) {
             IFServerNo = 'B000030',
             $.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo}); 
         }
         //修改
         else if (optType == 1) {
        	 if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改')
					return false;
				}
             IFServerNo = 'B000032',
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
         if(!checkForm()) return;
         var strTempFir = parseInt($('#maintenanceFirTH').val())*24+parseInt($('#maintenanceFirXS').val());
         var strTempSec = parseInt($('#maintenanceSecTH').val())*24+parseInt($('#maintenanceSecXS').val());
         var ajaxParam = {
             url: '/iPlant_ajax',
             dataType: 'JSON',
             data: reqData,
             successCallBack:function(data){
//            	 var susMsg=getReturnMsg(data);
//             	$.messager.alert("提示",susMsg,"",function(){
//         			reqGridData('/iPlant_ajax','EquipMes_tab',{IFS:'B000029'});
//         			$('#enditTab').dialog('close');
//         			setDataNull();
//         			initGridData();
//         		});
               if($.messager.alert('提示', susMsg)){
                 $('#enditTab').dialog('close');
//                   setDataNull();
                   initGridData();   
               }
             },
             errorCallBack:function(){
               $.messager.alert('提示', errorMsg);
             }
         };
         iplantAjaxRequest(ajaxParam);
         if (optType == 0){
            addEquipType();
         }
      } 
      /*bindCombogrid =function (jsonData){
        var ajaxParam={
          url:'/iPlant_ajax',
          data:{
            IFS:'B000025',
          	USE_YN:'Y'
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
            $('#toWorkshop').combogrid({
                rows:rowCollection,
                idField:'PL_CD',
                textField:'PL_NM',
                panelWidth:800,
                columns: [[
                   { field: 'PL_CD', title: '车间编号', width: 100,align:'center'},
                   { field: 'PL_NM', title: '车间名称', width: 100,align:'center'},
                   { field: 'PL_ST', title: '车间状态', width: 100,align:'center'},
                   { field: 'USE_YN', title: '是否启用', width: 100,align:'center',formatter:function(value,row,index) {
                      if(row.USE_YN=='Y'){
                        return"启用";
                      }else{
                        return"不启用";
                      }
                   }},
                   { field: 'PL_LEVL', title: '车间等级', width: 100,align:'center'},
                   { field: 'FT_CD', title: '所属工厂', width: 100,align:'center'},
                   { field: 'DICT_IT', title: '车间类别', width: 100,align:'center'},
                   { field: 'CRT_ID', title: '创建人', width: 100,align:'center'},
                   { field: 'CRT_DT', title: '创建时间', width: 100,align:'center'},
                   { field: 'UPT_ID', title: '修改人', width: 100,align:'center'},
                   { field: 'UPT_DT', title: '修改时间', width: 100,align:'center'},
                   { field: 'FT_RM', title: '备注', width: 100,align:'center'}  
                ]],
            });
            $('#toWorkshop').combogrid("grid").datagrid("loadData", jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam);
        var ajaxParam2={
          url:'/iPlant_ajax',
          data:{
            IFS:'D000008',
            DICT_CD: pageConfig.dictType,
            USE_YN:'Y'
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
            $('#equipTypeCode').combogrid({
                rows:rowCollection,
                idField:'DICT_IT',
                textField:'DICT_IT_NM',
                panelWidth:800,
                columns: [[
                   { field: 'IT_ID', title: '设备类别编码', width: 100, align: 'center' },
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
            $('#equipTypeCode').combogrid("grid").datagrid("loadData", jsonData);
            }
        }
        iplantAjaxRequest(ajaxParam2);
      }*/
         	//设备类别   
    	initComboboxData=function(){
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'D000008',DICT_CD:"CEM01",USE_YN:'Y'},
    			successCallBack: function (data) {
    				var array = new Array();
    				var ccArr =[];
    				var rowCollection=createSourceObj(data);
    				ccArr.push({"id":"","text":"全部"});
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
    					ccArr.push({"id":rowCollection[i].DICT_IT,"text":rowCollection[i].DICT_IT_NM});
    				}
    				
  		            for(var i=0; i<rowCollection.length; i++){
  		            	dataArr[rowCollection[i].DICT_IT]=rowCollection[i].DICT_IT_NM;
  		            }
        	
    				//查询
    				$('#sbType').combobox({
    					data:ccArr,
    					valueField:'id',
    					textField:'text'
    				});
    				//编辑时
    				$('#equipTypeCode').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				if(OptType == 1){
		            	updateUserMes();
		            }
    			}
    		});
    		
    		//所属车间
    		iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'B000025',USE_YN:'Y'},
    			successCallBack: function (data) {
    				var array = new Array();
    				var rowCollection=createSourceObj(data);
    				for(var i=0; i<rowCollection.length;i++){
    					array.push({"id":rowCollection[i].PL_CD,"text":rowCollection[i].PL_NM});
    				}
    				//编辑时
    				$('#toWorkshop').combobox({
    					data:array,
    					valueField:'id',
    					textField:'text'
    				});
    				if(OptType == 1){
		            	updateUserMes();
		            }
    			}
    		});
    		
    		//拉线编码
    		iplantAjaxRequest( {
		          url: '/iPlant_ajax',
		          data: {IFS:'B000109',USE_YN:'Y'},
		          successCallBack: function (a) {
	        	    var dataFactory = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataFactory.push({'value':obj.PD_LN_CD,'text':obj.PD_LN_NM});
				    });  
                    $('#lineCD').combobox({
                        data:dataFactory,
                        valueField:'value',
                        textField:'text'
                      });
		            if(OptType == 1){
		            	updateUserMes();
		            }
		            
		          }
				});
			/*工序路线下拉框*/
			 iplantAjaxRequest( {
		          url: '/iPlant_ajax',
		          data: {IFS:'GX00011',USE_YN:'Y'},
		          successCallBack: function (a) {
		        	var dataRouteName = [];
                	var op = a.RESPONSE[0].RESPONSE_DATA;
                    $.each(op,function(n,obj) {
                    	dataRouteName.push({'value':obj.ROUT_CD,'text':obj.ROUT_NAME});
				    });  
                    $('#routeCD').combobox({
                        data:dataRouteName,
                        valueField:'value',
                        textField:'text'
                      });
		            if(OptType == 1){
		            	updateUserMes();
		            }
		            
		          }
				});
        //车间区域
        iplantAjaxRequest( {
          url: '/iPlant_ajax',
          data: {IFS:'B000053',USE_YN:'Y'},
          successCallBack: function (data) {
            var array = new Array();
            var rowCollection=createSourceObj(data);
            for(var i=0; i<rowCollection.length;i++){
              array.push({"id":rowCollection[i].LC_CD,"text":rowCollection[i].LC_NM});
            }
            //编辑时
            $('#toWorkshopArea').combobox({
              data:array,
              valueField:'id',
              textField:'text'
            });
            if(OptType == 1){
            	updateUserMes();
            }
            
          }
		});
      //负责人
  	  iplantAjaxRequest( {
  		  url: '/iPlant_ajax',
  		  data:{IFS:'D000041'},
  		  successCallBack: function (data) {
				var array = new Array();
				var rowCollection=createSourceObj(data);
				for(var i=0; i<rowCollection.length;i++){
					array.push({"id":rowCollection[i].EMP_CD,"text":rowCollection[i].EMP_NM});
				}
				//编辑时
				$('#principal').combobox({
					data:array,
					valueField:'id',
					textField:'text'
				});
				
				if(OptType == 1){
	            	updateUserMes();
	            }
			}
  	  });
        
    	}
    }
    FunModule.prototype = {
      init: function () {
        $(function () {
          $("body")[0].onkeydown = keyPress;
          $("body")[0].onkeyup = keyRelease;
          initComboboxData();
          initGridData();
          getRightDate();
//          bindCombogrid();
          $('#btnAdd').click(function () {
              addUserMes();
          });
          $('#btnUpdate').click(function () {
          	
              updateUserMes();
          });
          $('#save').click(function () {
              saveUserMes();
          });
//          $('#sbType').combobox('textbox').bind('focus',function(){  
//		          	initComboboxData();
//		         }); 
          $('.close').click(function () {
//              setDataNull();
              $('#enditTab').dialog('close');
              $('#queryTab').dialog('close');
              initGridData();
          });
          $('#btnDelete').click(function(){
            deleteUserMes();
          });
          $('#btnSearch').click(function(){
        	  getDataByCondition(); 
          })
          $('#btnFreshen').click(function(){
        	  getDataByCondition(); 
          })
          $('#confirm').click(function(){
            getDataByCondition(); 
          })
          $('input',$('#EquipCode').next('span')).keyup(function(){
            checkInputLength("EquipCode",20);
          })
          $('input',$("#EquipName").next('span')).keyup(function(){
            checkInputLength('EquipName',50);
          })
          $('input',$('#EquipType').next('span')).keyup(function(){
            checkInputLength('EquipType',200);
          })
          $('input',$('#manufacturer').next('span')).keyup(function(){
            checkInputLength('manufacturer',200);
          })
          $('input',$('#EquipNum').next('span')).keyup(function(){
            checkInputLength('EquipNum',50);
          })
          $('input',$('#equipPower').next('span')).keyup(function(){
            checkInputLength('equipPower',30);
          })
          $('input',$('#EquipTonnage').next('span')).keyup(function(){
            checkInputLength('EquipTonnage',30);
          })
          $('input',$('#maintenanceFir').next('span')).keyup(function(){
            checkInputLength('maintenanceFir',30);
          })
          $('input',$('#maintenanceSec').next('span')).keyup(function(){
            checkInputLength('maintenanceSec',30);
          })
        //限制输入英文单引号
			$("input",$("#EquipCode").next("span")).keydown(function(e){
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
			$("input",$("#EquipName").next("span")).keydown(function(e){
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
			$("input",$("#EquipType").next("span")).keydown(function(e){
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
			$("input",$("#manufacturer").next("span")).keydown(function(e){
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
			$("input",$("#EquipNum").next("span")).keydown(function(e){
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
			$("input",$("#equipPower").next("span")).keydown(function(e){
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
			$("input",$("#EquipTonnage").next("span")).keydown(function(e){
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
			$("input",$("#maintenanceFir").next("span")).keydown(function(e){
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
			$("input",$("#maintenanceSec").next("span")).keydown(function(e){
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
    var FUser = new FunModule();
    FUser.init();
})();
