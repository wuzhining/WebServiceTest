/*initGridView = function (reqData, grid) {
	var ccArray = [];
  	var cc = initHeight();
  	ccArray.push(cc);
    if (!grid) return
    $('#' + grid.name).datagrid({
        title: grid.title,
        dataType: grid.dataType,
        pagination: grid.pagination || true,
        pageSize: cc,
        pageList: ccArray,
        fit:true,
        striped:true,
        columns: grid.columns,
        rownumbers: grid.rownumbers,
        loadMsg: '数据加载中...',
        onClickRow: grid.onClickRow || function (index, row) {},
        onDblClickRow: grid.onDblClickRow || function (index, row) {}
    });
    $('#' + grid.name).datagrid({ loadFilter: pagerFilter });
};
reqGridData = function (url, gridId, reqData){
	 var ajaxParam = {
         url: url,
         data: reqData,
         successCallBack: function (data) {
        	if (data) {
        		var rowNum = 0
        		if(!data.RESPONSE["0"].RESPONSE_HDR) rowNum=0;
        		else if (data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS) {
                   rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                }
        		if (rowNum == 0) {
                    $.messager.alert('提示', '没有相关记录');
                }
        		var rowCollection = createSourceObj(data);
        		var jsonData = {
        		    total: rowNum,
        		    rows: rowCollection,
        		    IFS: reqData.IFS,
        		    gridId: gridId
        	    }
        		if (reqData.DICT_CD) {
                   $.extend(jsonData, { DICT_CD: reqData.DICT_CD });
                }
        		bindGridData(reqData, jsonData);
           }
       }
    }
    iplantAjaxRequest(ajaxParam);
};

iplantAjaxRequest = function (ajaxParam) {
    var reqData = ajaxParam.data;
    $.extend(reqData, { reqType: 'WEB' });
    var reqUrl = '/iTaurus/iPlant_ajax';
    var reqStr = '';
    if (reqData != null) {
          reqStr = '{\"REQ\":[{\"REQ_DATA\":' + JSON.stringify(reqData) + '}]}';
    }
    var params = {
        url: reqUrl,
        type: 'POST',
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        async: String(ajaxParam.async) == 'false' ? false : true,
        data: { "reqStr": reqStr },
        success: ajaxParam.successCallBack || function (data) {
        },
        error: ajaxParam.errorCallBack || function (e) {
        }
     }
    $.ajax(params);
};

define(function(require, exports, module){
	//引入使用到的JS模块
	var jq=require('./IplantCompent/jquery.min.js');
	var eUI=require('./IplantCompent/jquery.easyui.min.js');
});*/
(function () {
    function menuManage() {
      pageConfig={
          gridName:'MenuModuleMan_tab',
          MenuModuleCode:'MenuModuleCode',
          MenuModuleName:'MenuModuleName',
          menuModuleUse:'menuModuleUse',
          title:'模块管理',
      }
      initCombox=function(){
    	  /**获取模块所属系统*/
    	  var sysType = {
              url: "/iPlant_ajax",
              dataType: "JSON",
              data: {IFS: "D000008",DICT_CD:'SYS01'},
              successCallBack: function(a) {
              		var op = a.RESPONSE[0].RESPONSE_DATA;
              		$.each(op,function(n,obj) {
              			dataList.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
              			dataQueryList.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
              		});
             		$("#sysBel").combobox("loadData", dataList);
              		if(dataList.length>0){
              			$('#sysBel').combobox('select', dataList[0].value);
              		}
             		$("#querySysBel").combobox("loadData", dataQueryList);
             		if(dataQueryList.length>0){
              			$('#querySysBel').combobox('select', dataQueryList[0].value);
              		}
              },
              errorCallBack: function() {
                  $.messager.alert("提示", '请联系管理员，查询失败！')
              }
          };
    	  iplantAjaxRequest(sysType);
      }
      initGridData=function(){
    	  /**获取模块所属系统*//*
    	  var sysType = {
              url: "/iPlant_ajax",
              dataType: "JSON",
              data: {IFS: "D000008",DICT_CD:'SYS01'},
              successCallBack: function(a) {
              		var op = a.RESPONSE[0].RESPONSE_DATA;
              		$.each(op,function(n,obj) {
              			dataList.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
              			dataQueryList.push({'value':obj.DICT_IT,'text':obj.DICT_IT_NM});
              		});
             		$("#sysBel").combobox("loadData", dataList);
              		if(dataList.length>0){
              			$('#sysBel').combobox('select', dataList[0].value);
              		}
             		$("#querySysBel").combobox("loadData", dataQueryList);
             		if(dataQueryList.length>0){
              			$('#querySysBel').combobox('select', dataQueryList[0].value);
              		}
              },
              errorCallBack: function() {
                  $.messager.alert("提示", '请联系管理员，查询失败！')
              }
          };
    	  iplantAjaxRequest(sysType);*/
    	  toComboboxData(),toMenuLvl();
    	  var dgrid=$('#'+pageConfig.gridName).datagrid('options');
    	  if(!dgrid) return;
            	var reqData = {
                    IFS: 'D000012',
                    pageIndex:1,
                    pageSize:dgrid.pageSize
          }
          reqGridData('/iPlant_ajax',pageConfig.gridName, reqData);
      },
      
      bindGridData = function (reqData,jsonData) {
        var grid = {
            name: pageConfig.gridName,
            dataType: 'json',
            columns:[[
//               {field : "CZ",width : 10,checkbox : true},
               { field: 'MN_CD', title: '菜单编码', width: 100 ,align:'center'},
               { field: 'MN_NM', title: '菜单名称', width: 200 ,align:'center'},
               { field: 'MN_TP_NM', title: '菜单类别', width: 100 ,align:'center',formatter:function(value,row,index) {if(row.MN_TP=='2'){return "APP";}else{return "Web";}}},
               { field: 'SYS_BEL_NM', title: '所属系统', width: 100 ,align:'center',formatter:function(value,row,index) { return row.SYS_BEL_NM;}},
               { field: 'USE_YN', title: '是否启用', width: 100 ,align:'center',formatter:function(value,row,index) {if(row.USE_YN=='Y'){ return"启用";}else{ return"不启用";}}},
               { field: 'LINK_URL', title: '连接地址', width: 200 ,align:'center'},
               { field: 'MN_LEVL', title: '菜单等级', width: 100 ,align:'center' /*formatter:function(value,row,index) {if(row.MN_LEVL=='lvl1'){ return"第一级";} else if(row.MN_LEVL=='lvl2'){return"第二级";}else{return"第三级";}*/},
               { field: 'MN_ENG', title: '菜单英文名', width: 100 ,align:'center'},
               { field: 'MN_MD', title: '属于模块编码', width: 100 ,align:'center'},
               { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
               { field: 'CRT_DT', title: '创建时间', width: 200 ,align:'center'},
               { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
               { field: 'UPT_DT', title: '修改时间', width: 200 ,align:'center'},
               { field: 'LINK_ICON', title: '图标连接', width: 200 ,align:'center'},
               { field: 'MN_TP', title: '',hidden:true, width: 5 ,align:'center'},
               { field: 'SYS_BEL', title: '',hidden:true, width: 5 ,align:'center'}
            ]],
            onDblClickRow: function(index,row){
            	 var grid = $('#'+pageConfig.gridName);
		    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
		    	 OptType=1;
		    	 checkFun();
		    	 $('#MenuModuleCode').textbox('setValue',row.MN_CD==null?'':row.MN_CD);
	             $('#MenuModuleName').textbox('setValue',row.MN_NM==null?'':row.MN_NM);
	             $('#MenuType').combobox('setValue',row.MN_TP==null?'':row.MN_TP);
	             $('#sysBel').combobox('setValue',row.SYS_BEL==null?'':row.SYS_BEL);
	             $('#MenuModuleLink').textbox('setValue',row.LINK_URL==null?'':row.LINK_URL);
	             $('#MenuModuleEName').textbox('setValue',row.MN_ENG==null?'':row.MN_ENG);
	             $('#MenuModuleUse').val(row.USE_YN);
	             $('#MenuModuleLevl').combobox('select',row.MN_LEVL);
//	             $('#MenuModuleLevl').combobox('setValue',row.MN_LEVL==null?'':row.MN_LEVL);
	             $('#pictureLink').textbox('setValue',row.LINK_ICON==null?'':row.LINK_ICON);
	             myMenuModuleTo = row.MN_MD;
	             if(row.USE_YN=='Y'){$('#MenuModuleUse').prop('checked','checked');}else{$('#MenuModuleUse').prop('checked','');}
	             grid.datagrid('clearSelections'),   
				 grid.datagrid('selectRow',index);
		     }
        }
        initGridView(reqData,grid);
        $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
      }, 
      checkFun = function (){
    	  var qx = getUpdateRight();
			if(qx=="Y"){
				$('#MenuModuleCode').textbox('textbox').attr('disabled', true);
		    	 $('#MenuModuleName').textbox('textbox').attr('disabled', false);
		    	 $('#MenuModuleLink').textbox('textbox').attr('disabled', false);
		    	 $('#MenuModuleEName').textbox('textbox').attr('disabled', false);
		    	 $('#pictureLink').textbox('textbox').attr('disabled', false);
		    	 $('#MenuType').combobox('textbox').attr('disabled', false);
		    	 $('#sysBel').combobox('textbox').attr('disabled', false);
		    	 $('#MenuModuleLevl').combobox('textbox').attr('disabled', false);
		    	 $('#MenuModuleTo').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				OptType=2;
				$('#MenuModuleCode').textbox('textbox').attr('disabled', true);
		    	 $('#MenuModuleName').textbox('textbox').attr('disabled', true);
		    	 $('#MenuModuleLink').textbox('textbox').attr('disabled', true);
		    	 $('#MenuModuleEName').textbox('textbox').attr('disabled', true);
		    	 $('#pictureLink').textbox('textbox').attr('disabled', true);
		    	 $('#MenuType').combobox('textbox').attr('disabled', true);
		    	 $('#sysBel').combobox('textbox').attr('disabled', true);
		    	 $('#MenuModuleLevl').combobox('textbox').attr('disabled', true);
		    	 $('#MenuModuleTo').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		}
      OptType=0,
      myMenuModuleTo ='';
      getOptType=function(){
        return this.OptType;
      },
      setOptType=function(value){
        this.OptType=value;
      },
      /*数据有效性验证*/
      checkDataValid = function () {
              /*数据不能为空验证*/
              var dictCode = $('#'+pageConfig.MenuModuleCode).val();
              var MenuModuleLevl =$('#MenuModuleLevl').combobox('getValue');
              var MenuModuleTo =$('#MenuModuleTo').combobox('getValue');
              var MenuModuleName =$('#MenuModuleName').textbox('getValue');
              if (dictCode == ''||MenuModuleLevl==''||MenuModuleTo==''||MenuModuleName=='') {
                  $('#'+pageConfig.MenuModuleCode).textbox({ required: true });
                  return false;
              }
              return true;
      },
      setDataNull = function () {
              $('#'+pageConfig.MenuModuleCode).textbox({ required: false });
              $("#MenuModuleMes").form("clear");
      }
      validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + gridName).datagrid('getSelections'), num = 0;
            $.each(checkedItems, function (index, item) { num++;});
            if (type == 'Update') {
                if (num != 1) { return false;}
            }else {
                if (num <= 0) { return false;}
            }
            return true;
      },
      getDataByCondition = function(){
	        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
	        var menuMoudleCode = $('#queryMenuMoudleCode').textbox('getValue');
	        var menuMoudleNum = $('#queryMenuMoudleName').textbox('getValue');
	        var menuMoudleLevl =$('#queryMenuModuleLevl').combobox('getValue');
	        var querySysBel =$('#querySysBel').combobox('getValue');
	        var reqData ={
		          MN_CD: menuMoudleCode,
		          MN_NM: menuMoudleNum,
		          MN_LEVL: menuMoudleLevl,
		          QU_SYS_BEL: querySysBel,
		          pageIndex:1,
		          pageSize:dgrid.pageSize,
		          IFS:'D000012'
	        };
	       /* if(menuMoudleCode=='' && menuMoudleNum=='' && menuMoudleLevl==''){
	          $.messager.alert('提示','请输入选择条件');
	        }*/
	//        else{
	//          reqGridData('/iPlant_ajax','MenuModuleMan_tab',reqData)
	//          $('#queryTab').dialog('close'); 
	//        }
	        reqGridData('/iPlant_ajax','MenuModuleMan_tab',reqData)
	        $('#queryTab').dialog('close');
      },
      updatemenuManage = function () {
         var row = $("#"+pageConfig.gridName).datagrid("getSelected");
         if (row) {
        	 $('#queryTab').dialog('close');
             $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
             $('#MenuModuleCode').textbox('textbox').attr('readonly', false);
    		 $('#MenuModuleCode').textbox('textbox').attr('disabled', false);               
             $('#MenuModuleCode').textbox('setValue',row.MN_CD==null?'':row.MN_CD);
             $('#MenuModuleName').textbox('setValue',row.MN_NM==null?'':row.MN_NM);
             $('#MenuType').combobox('select',row.MN_TP);
             $('#sysBel').combobox('select',row.SYS_BEL);
             $('#MenuModuleLink').textbox('setValue',row.LINK_URL==null?'':row.LINK_URL);
             $('#MenuModuleEName').textbox('setValue',row.MN_ENG==null?'':row.MN_ENG);
             $('#MenuModuleUse').val(row.USE_YN);
             $('#MenuModuleLevl').combobox('select',row.MN_LEVL);
             $('#pictureLink').textbox('setValue',row.LINK_ICON==null?'':row.LINK_ICON);
             /*$('#MenuModuleTo').combobox('setValue',myMenuModuleTo);*/
             myMenuModuleTo = row.MN_MD;
             if(row.USE_YN=='Y'){
                $('#MenuModuleUse').prop('checked','checked');
             }else{
                $('#MenuModuleUse').prop('checked','');
             };
          }
         checkFun();
      },
      deletemenuManage = function () {
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
                     MN_CD: item.MN_CD,
                     IFS:'D000010'
                     },
                     successCallBack:function(){
                       if(delCnt==checkedItems.length){
                          initGridData();
                       }
                     }
                   };
                   iplantAjaxRequest(ajaxParam);
                   deleteTreeData();
                 });
           }
         });     
      },
      addmenuManage = function () {
    	 setOptType(0);
         checkFun();
    	 $('#MenuModuleCode').textbox('textbox').attr('readonly', false);
		 $('#MenuModuleCode').textbox('textbox').attr('disabled', false);
         $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
         $("#MenuModuleMes").form("clear");
         $("#sysBel").combobox("loadData", dataList);
	   	  if(dataList.length>0){
	   		  $('#sysBel').combobox('select', dataList[0].value);
	   	  }
      },
      savemenuManage = function () {
         if (!checkDataValid()){
                $.messager.alert('提示','请输入必选添加信息');
                return
            };
         var menuModuleId =$('#MenuModuleCode').textbox('getValue');
         var menuModuleName =$('#MenuModuleName').textbox('getValue');
         var menuModuleEName =$('#MenuModuleEName').textbox('getValue');
         var menuModuleLink =$('#MenuModuleLink').textbox('getValue');
         var MenuType =$('#MenuType').combobox('getValue');
         var sysBel =$('#sysBel').combobox('getValue');
         var menuModuleTo =$('#MenuModuleTo').combobox('getValue');
         var menuModuleLevl =$('#MenuModuleLevl').combobox('getValue');
         var linkIcon =$('#pictureLink').textbox('getValue');
         var menuModuleUse ='';
         if($("#MenuModuleUse").is(':checked')) menuModuleUse='Y'; else menuModuleUse='N';
         var reqData={
            MN_CD: menuModuleId,
            MN_NM: menuModuleName,
            MN_TP: MenuType,
            SYS_BEL: sysBel,
            USE_YN: menuModuleUse,
            LINK_URL: menuModuleLink,
            MN_LEVL: menuModuleLevl,
            MN_ENG: menuModuleEName,
            MN_MD: menuModuleTo,
            LINK_ICON: linkIcon,
         }
         var optType=getOptType();
         //新增
         if (optType == 0) {
             IFServerNo = 'D000009',
             $.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo}); 
         }
         //修改
         else if (optType == 1) {
        	 if (!saveUpdateValidate()) {
					$.messager.alert("提示", '内容没有更新，请修改',"",function(){
					})
					return;
				}
             IFServerNo = 'D000011',
             reqData =$.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo});
         }
         var susMsg='',errorMsg='';
         if(optType==1){
           susMsg='更新成功';
           errorMsg='更新失败,请联系管理员';
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
//                   setDataNull();
                   initGridData();   
               }
             },
             errorCallBack:function(){
               $.messager.alert('提示', errorMsg);
             }
         };
         iplantAjaxRequest(ajaxParam);
         saveTreeData();
      }
      saveTreeData =function(){
        /*if (!checkDataValid()) return;*/
        var childModuleId =$('#MenuModuleCode').textbox('getValue');
        var parentModuleTo =$('#MenuModuleTo').combobox('getValue');
        var menuModuleLevl =$('#MenuModuleLevl').combobox('getValue');
        var type ='1';
        var IFServerNo ='';
        var reqData ={};
        var optType=getOptType();
        if(optType=='0'){
          IFServerNo='D000048';
        }else if(optType=='1'){
          IFServerNo='D000050';
        }
        if(menuModuleLevl=='lvl1'){
          reqData={
            ST_P_CD: 'N/A',
            ST_C_CD: childModuleId,
            ST_TP: type,
            IFS: IFServerNo,
          }
        }else{
           reqData={
            ST_P_CD: parentModuleTo,
            ST_C_CD: childModuleId,
            ST_TP: type,
            IFS: IFServerNo
          }
        }
        var susMsg='添加成功',errorMsg='添加失败,请联系管理员';
        var ajaxParam = {
             url: '/iPlant_ajax',
             dataType: 'JSON',
             data: reqData,    
         };
         iplantAjaxRequest(ajaxParam);
      }
      deleteTreeData =function(){
        var row = $("#"+pageConfig.gridName).datagrid("getSelected");
        if(row){
          var ajaxParam = {
             url: '/iPlant_ajax',
             dataType: 'JSON',
             data: {
             ST_C_CD: row.MN_CD,
             IFS:'D000049'
             },
             successCallBack:function(){
                $.messager.alert('提示','已在系统菜单栏删除该数据');
                initGridData();
             }
          };
          iplantAjaxRequest(ajaxParam);
        }
      },
      toComboboxData =function(){
        $('#MenuType').combobox({
          data:[
            {value:'2',text:'APP'},
            {value:'1',text:'Web'}
          ],
          valueField:'value',
          textField:'text',
          panelHeight:80,
        });
      },
      toMenuLvl =function(){
        var myLvl ='';
        var ajaxParam ={};
        $('#MenuModuleLevl').combobox({
          data:[
              {value:'lvl1',text:'第一级'},
              {value:'lvl2',text:'第二级'},
              {value:'lvl3',text:'第三级'}
          ],
          valueField:'value',
          textField:'text',
          panelHeight:80,
          onSelect:function(record){
            if(record.value=='lvl2'){
              myLvl ='lvl1';
              ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'D000012',
                    MN_LEVL:myLvl,
                    USE_YN:'Y'
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                      rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                      $("#MenuModuleTo").combobox('readonly',false);
                      $("#MenuModuleTo").combobox({
                          panelHeight:200,
                          data:rowCollection,
                          valueField:'MN_CD', 
                        //  valueField:'MN_MD',
                          textField:'MN_NM',
                      });
                      $('#MenuModuleTo').combobox('setValue',myMenuModuleTo);                                                                                    
                }
              }
              iplantAjaxRequest(ajaxParam);
            }else if(record.value=='lvl3'){
              myLvl ='lvl2';
              ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'D000012',
                    MN_LEVL:myLvl,
                    USE_YN:'Y'
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                      rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                      $("#MenuModuleTo").combobox('readonly',false)
                      $("#MenuModuleTo").combobox({
                          panelHeight:200,
                          data:rowCollection,
                          valueField:'MN_CD',  
                          textField:'MN_NM',
                      });
                      $('#MenuModuleTo').combobox('setValue',myMenuModuleTo);                                                                                    
                }
              }
              iplantAjaxRequest(ajaxParam);
            }else if(record.value=='lvl1'){
              $("#MenuModuleTo").combobox('clear');
              $('#MenuModuleTo').combobox('setValue','main');
              /*$("#MenuModuleTo").combobox('readonly',true);*/
              return
            }else{
              return
            }
          }
        })
      },
      /* 验证是否重复 */
		existCompany = function(companyCode) {
			var rowNum, tpm = $('#MenuModuleCode');
			if (OptType == 0) {
				if(/[　，。、！？：“”［］——（）…！＠＃￥＆＊＋＞＜；：‘\u4e00-\u9fa5\s\n\r\t]+/.test($('#MenuModuleCode').textbox('getText'))){
		        	$.messager.alert('提示', "菜单编码不能是中文和非法字符，请重新输入。","",function(){
						$('#MenuModuleCode').textbox('setValue', '');
					});
		        	return;
		        }
				if (tpm.val() != undefined && tpm.val() != ''
						&& tpm.val() != null) {
					if (companyCode != undefined && companyCode != ''
							&& companyCode != null) {
						if (tpm.textbox('getValue') != undefined
								&& tpm.textbox('getValue') != ''
								&& tpm.textbox('getValue') != null) {
							var ajaxParam = {
								url : '/iPlant_ajax',
								dataType : 'JSON',
								data : {
									IFS : 'D000012',
									MN_CD : companyCode,
									pageIndex : 1,
									pageSize : 10
								},
								successCallBack : function(data) {
									rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
									if (rowNum > 0) {
										$.messager.alert('提示','您输入的用户编码['+ companyCode+ ']已有相同,请重新输入!');
										tpm.textbox('setValue', '');
										return false;
									} else {
										return true;
									}
								}
							};
							iplantAjaxRequest(ajaxParam);
						}
					}
				}
			}
      },
      saveUpdateValidate = function() {
			var checkedItems = $('#'+pageConfig.gridName).datagrid('getSelections');
			row = checkedItems[0];
			if(row.MN_NM==null){
				row.MN_NM="";
			}
			if(row.MN_TP==null){
				row.MN_TP="";
			}
			if(row.SYS_BEL==null){
				row.SYS_BEL="";
			}
			if(row.LINK_URL==null){
				row.LINK_URL="";
			}
			if(row.USE_YN==null){
				row.USE_YN="";
			}
			if(row.MN_LEVL==null){
				row.MN_LEVL="";
			}
			if(row.MN_MD==null){
				row.MN_MD="";
			}
			if(row.MN_ENG==null){
				row.MN_ENG="";
			}
			if(row.LINK_ICON==null){
				row.LINK_ICON="";
			}
			if (row.MN_CD) {
				var isUserYn = 'N';
				if($("#MenuModuleUse").is(':checked')){
					isUserYn = "Y";
				} else {
					isUserYn = "N";
				}
				if ($('#MenuModuleName').textbox('getValue') != row.MN_NM//菜单名
						|| $('#MenuModuleLevl').combobox('getValue') != row.MN_LEVL//菜单等级
						|| $('#MenuModuleTo').combobox('getValue') != row.MN_MD//所属模块编码
						|| $('#MenuType').combobox('getValue') != row.MN_TP//菜单类别
						|| $('#sysBel').combobox('getValue') != row.SYS_BEL//菜单类别
						|| $('#MenuModuleLink').textbox('getValue') != row.LINK_URL//链接地址
						|| $('#MenuModuleEName').textbox('getValue') != row.MN_ENG//菜单英文名
						|| $('#pictureLink').textbox('getValue') != row.LINK_ICON//图标地址
						|| isUserYn != row.USE_YN//是否启用
				) {
					return true;
				} else {
					return false;
				}
			}
		}
    }
    menuManage.prototype = {
        init: function () {
            $(function () {
            	dataList=[],dataQueryList=[{'value':'','text':'全部'}];
            	$("body")[0].onkeydown = keyPress;
                $("body")[0].onkeyup = keyRelease;
                initGridData();
                initCombox();
                $('#btnAdd').click(function () {
                    $('#' + pageConfig.gridName).datagrid('clearSelections');
                    addmenuManage();
                    toMenuLvl();  
                });  
                $('#btnUpdate').click(function () {
                  var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
                    if (!isSelectedData) {
                      $.messager.alert('提示', '请选择一条数据进行修改');
                      return;
                    }
                  setOptType(1);
                  toMenuLvl();
                  updatemenuManage();
                });
                $('#save').click(function () {
                    savemenuManage();
                });
                $('.close').click(function () {
                    setDataNull();
                    $('#enditTab').dialog('close');
                    $('#queryTab').dialog('close');
                    initGridData();
                });
                $('.panel-tool-close').click(function () {
                    setDataNull();
                    $('#enditTab').dialog('close');
                    $('#queryTab').dialog('close');
                    initGridData();
                });
                $('#btnDelete').click(function(){
                  deletemenuManage();
                });
                $('#btnSearch').click(function(){
                	getDataByCondition(); 
                  /*$('#enditTab').dialog('close');
                  $('#queryTab').dialog('open').dialog('setTitle', '查询用户信息');
                  $("#queryMenuModuleMes").form("clear");*/
                })
                $('#btnFreshen').click(function() {
                	getDataByCondition();
				});
                $("input",$("#MenuModuleName").next("span")).keyup(function(){
                  checkInputLength('MenuModuleName',30);
                })
                $("input",$("#MenuModuleLink").next("span")).keyup(function(){
                  checkInputLength('MenuModuleLink',200);
                })
                $("input",$("#MenuModuleEName").next("span")).keyup(function(){
                  checkInputLength('MenuModuleEName',30);
                })
                $("input",$("#pictureLink").next("span")).keyup(function(){
                  checkInputLength('pictureLink',20);
                })
              //限制输入英文单引号
				$("input",$("#MenuModuleCode").next("span")).keydown(function(e){
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
				$("input",$("#MenuModuleName").next("span")).keydown(function(e){
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
				$("input",$("#MenuModuleLink").next("span")).keydown(function(e){
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
				$("input",$("#MenuModuleEName").next("span")).keydown(function(e){
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
				$("input",$("#pictureLink").next("span")).keydown(function(e){
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
    var pCode = new menuManage();
    pCode.init();
})();
