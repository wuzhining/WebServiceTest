(function () {
    function FunModule() {
      pageConfig={
        gridName:'FunctionMan_tab',
        FunctionModuleCode:'FunctionModuleCode',
        FunctionModuleName:'FunctionModuleName',
        FunctionModuleUse:'FunctionModuleUseFlag',
        title:'功能管理',
      },
      initGridData=function(){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        if(!dgrid) return
          var reqData = {
            IFS: 'D000029',
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
//             {field : "CZ",width : 10,checkbox : true},
             { field: 'FUN_CD', title: '功能编码', width: 100 ,align:'center'},
             { field: 'FUN_NM', title: '功能名称', width: 200 ,align:'center'},
             { field: 'FUN_TP', title: '功能类别', width: 100 ,align:'center'},            
             { field: 'MN_CD', title: '所属菜单', width: 100 ,align:'center'},
             { field: 'MN_NM', title: '所属菜单名称', width: 100 ,align:'center'},
             { field: 'FUN_ST', title: '功能状态', width: 100 ,align:'center',formatter:function(value,row,index) {
                if(value=='0'){
                  return"功能状态1";
                }else if(value=='1'){
                  return"功能状态2";
                }else{
                  return"功能状态3";
                }
             }},
             { field: 'USE_YN', title: '是否启用', width: 100 ,align:'center',formatter:function(value,row,index) {
                if(row.USE_YN=='Y'){
                  return"启用";
                }else{
                  return"不启用";
                }
             }},
             { field: 'FUN_LEVL', title: '功能等级', width: 100 ,align:'center',formatter:function(value,row,index) {
                if(value=='0'){
                  return"功能等级1";
                }else if(value=='1'){
                  return"功能等级2";
                }else{
                  return"功能等级3";
                }
             }},
             { field: 'LINK_URL', title: '连接地址', width: 200 ,align:'center'},
             { field: 'FUN_ENG', title: '功能英文名', width: 100 ,align:'center'},
             { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
             { field: 'CRT_DT', title: '创建时间', width: 200 ,align:'center'},
             { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
             { field: 'UPT_DT', title: '修改时间', width: 200 ,align:'center'}
          ]],
		     onDblClickRow: function(index,row){	
		    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
		    	 checkFun();
		    	 $('#FunctionModuleCode').textbox('setValue',row.FUN_CD==null?'':row.FUN_CD);
		          $('#FunctionModuleName').textbox('setValue',row.FUN_NM==null?'':row.FUN_NM);
		          $('#FunctionModuleType').combobox('setValue',row.FUN_TP==null?'':row.FUN_TP);
		          $('#FunctionModuleMenu').textbox('setValue',row.MN_CD==null?'':row.MN_CD);
		          $('#FunctionModuleSta').combobox('setValue',row.FUN_ST==null?'':row.FUN_ST);
		          $('#FunctionModuleLevl').combobox('setValue',row.FUN_LEVL==null?'':row.FUN_LEVL);
		          $('#linkUrl').textbox('setValue',row.LINK_URL==null?'':row.LINK_URL);
		          $('#FunctionModuleEName').textbox('setValue',row.FUN_ENG==null?'':row.FUN_ENG);
		          $('#FunctionModuleUse').val(row.USE_YN==null?'':row.USE_YN);
		          if(row.USE_YN=='Y'){
		           $('#FunctionModuleUse').prop('checked','checked');
		          }else{
		            $('#FunctionModuleUse').prop('checked','');
		          }
		     }
        }
      initGridView(reqData,grid);
      $('#'+pageConfig.gridName).datagrid('loadData', jsonData);
      },
      checkFun = function (){
    	  var qx = getUpdateRight();
			if(qx=="Y"){
				OptType=1;
				 $('#FunctionModuleCode').textbox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleName').textbox('textbox').attr('disabled', false);
		    	 $('#FunctionModuleMenu').textbox('textbox').attr('disabled', false);
		    	 $('#FunctionModuleEName').textbox('textbox').attr('disabled', false);
		    	 $('#linkUrl').textbox('textbox').attr('disabled', false);
		    	 $('#FunctionModuleType').combobox('textbox').attr('disabled', false);
		    	 $('#FunctionModuleSta').combobox('textbox').attr('disabled', false);
		    	 $('#FunctionModuleLevl').combobox('textbox').attr('disabled', false);
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				$('#FunctionModuleCode').textbox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleName').textbox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleMenu').textbox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleEName').textbox('textbox').attr('disabled', true);
		    	 $('#linkUrl').textbox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleType').combobox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleSta').combobox('textbox').attr('disabled', true);
		    	 $('#FunctionModuleLevl').combobox('textbox').attr('disabled', true);
		    	 $('#saveID').hide();
//		    	 $('#cancleID').hide();
			}
			 
		},
      changWorld =function(){

      },
      OptType=0,
      getOptType=function(){
        return this.OptType;
      },
      setOptType=function(value){
        this.OptType=value;
      },
      /*数据有效性验证*/
      checkDataValid = function () {
        /*数据不能为空验证*/
        var dictCode = $('#'+pageConfig.FunctionModuleCode).val();
        var FunctionModuleMenu =$('#FunctionModuleMenu').combobox('getValue');
        var FunctionModuleType =$('#FunctionModuleType').combobox('getValue');
        var FunctionModuleSta =$('#FunctionModuleSta').combobox('getValue');
        var FunctionModuleLevl =$('#FunctionModuleLevl').combobox('getValue');
        var FunctionModuleName =$('#FunctionModuleName').textbox('getValue');
        if (dictCode == ''||FunctionModuleMenu==''||FunctionModuleName==''||FunctionModuleType==''||FunctionModuleSta==''||FunctionModuleLevl=='') {
          $('#'+pageConfig.FunctionModuleCode).textbox({ required: true });
          return false;
        }
        return true;
      },
      setDataNull = function(){
    	  $('#FunctionModuleCode').textbox('setValue',"");
          $('#FunctionModuleName').textbox('setValue',"");
          $('#FunctionModuleType').combobox('setValue',"");
          $('#FunctionModuleMenu').textbox('setValue',"");
          $('#FunctionModuleSta').combobox('setValue',"");
          $('#FunctionModuleLevl').combobox('setValue',"");
          $('#linkUrl').textbox('setValue',"");
          $('#FunctionModuleEName').textbox('setValue',"");
          $('#FunctionModuleUse').val("");
          $('#enditTab').dialog('close');
      },
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
      addFuncMes = function () {
    	setOptType(0);
    	$('#FunctionModuleCode').textbox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleName').textbox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleMenu').textbox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleEName').textbox('textbox').attr('disabled', false);
   	 	$('#linkUrl').textbox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleType').combobox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleSta').combobox('textbox').attr('disabled', false);
   	 	$('#FunctionModuleLevl').combobox('textbox').attr('disabled', false);
   	 	$('#saveID').show();
   	 	$('#cancleID').show();
        $("#enditTab").dialog("open").dialog('setTitle', pageConfig.title+'维护');
        $("#FunctionMes").form("clear");
        toComboboxData();
      },
      deleteFuncMes = function () {
        var isSelectedData = validSelectedData(pageConfig.gridName, 'Delete');
        if (!isSelectedData) {
          $.messager.alert('提示', '请选择一条数据进行删除');
          return
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
                              FUN_CD: item.FUN_CD,
                              IFS:'D000031' 
                           },
                           successCallBack:function(){
                             if(delCnt==checkedItems.length){
                                initGridData();
                             }
                           }
                 
                    };
                   iplantAjaxRequest(ajaxParam);
               });
         }
        });      
      },
      updateFuncMes = function () {
        toComboboxData();
        var isSelectedData = validSelectedData(pageConfig.gridName, 'Update');
        if (!isSelectedData) {
          $.messager.alert('提示', '请选择一条数据进行修改');
          return
        }
        var row = $("#"+pageConfig.gridName).datagrid("getSelected");
        setOptType(1);
        if (row) {
          $('#queryTab').dialog('close');
          $("#enditTab").dialog("open").dialog('setTitle', '编辑'+pageConfig.title+'维护');
          $('#'+pageConfig.FunctionModuleCode).textbox('readonly',true);
          $('#'+pageConfig.FunctionModuleCode).css('background-color','#95B8E7');         
          $('#FunctionModuleCode').textbox('setValue',row.FUN_CD==null?'':row.FUN_CD);
          $('#FunctionModuleName').textbox('setValue',row.FUN_NM==null?'':row.FUN_NM);
          $('#FunctionModuleType').combobox('setValue',row.FUN_TP==null?'':row.FUN_TP);
          $('#FunctionModuleMenu').textbox('setValue',row.MN_CD==null?'':row.MN_CD);
          $('#FunctionModuleSta').combobox('setValue',row.FUN_ST==null?'':row.FUN_ST);
          $('#FunctionModuleLevl').combobox('setValue',row.FUN_LEVL==null?'':row.FUN_LEVL);
          $('#linkUrl').textbox('setValue',row.LINK_URL==null?'':row.LINK_URL);
          $('#FunctionModuleEName').textbox('setValue',row.FUN_ENG==null?'':row.FUN_ENG);
          $('#FunctionModuleUse').val(row.USE_YN==null?'':row.USE_YN);
          if(row.USE_YN=='Y'){
           $('#FunctionModuleUse').prop('checked','checked');
          }else{
            $('#FunctionModuleUse').prop('checked','');
          };
        }
        checkFun();
      },
      getDataByCondition =function (){
        var dgrid=$('#'+pageConfig.gridName).datagrid('options');
        var queryFunctionModuleCode = $('#queryFunctionModuleCode').textbox('getValue');
        var queryMenuModuleCode = $('#queryMenuModuleCode').textbox('getValue');
        var queryFunctionModuleName = $('#queryFunctionModuleName').textbox('getValue');
        var queryFunctionModuleUse =$('#queryFunctionModuleUse').combobox('getValue');
        var reqData ={
          FUN_CD: queryFunctionModuleCode,
          FUN_NM: queryFunctionModuleName,
          MN_CD: queryMenuModuleCode,
          USE_YN: queryFunctionModuleUse,
          IFS:'D000029',
          pageIndex:1,
          pageSize:dgrid.pageSize
        };
        reqGridData('/iPlant_ajax','FunctionMan_tab',reqData)
//        if(queryFunctionModuleCode==''&&queryFunctionModuleName==''&&queryFunctionModuleUse==''){
//          $.messager.alert('提示','请输入选择条件');
//        }else{
//          reqGridData('/iPlant_ajax','FunctionMan_tab',reqData)
//          $('#queryTab').dialog('close'); 
//        }
      },
      saveFuncMes = function () {
        if (!checkDataValid()){
          $.messager.alert('提示','请输入必选添加信息');
          return
        };
        //校验
        var ajaxParam = {
    		async: false,
			url : '/iPlant_ajax',
			dataType : 'JSON',
			data : {
				IFS : 'D000029',
				FUN_CD : $('#FunctionModuleCode').textbox('getValue'),
				MN_CD:$('#FunctionModuleMenu').textbox('getValue'),
				pageIndex : 1,
				pageSize : 10
			},
			successCallBack : function(data) {
				rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
				if (rowNum > 0) {
					$.messager.alert('提示','您输入的所属菜单'+$('#FunctionModuleMenu').textbox('getText')+'下的功能编码['+ $('#FunctionModuleCode').textbox('getValue') + ']已有相同,请重新输入!');
//						tpm.textbox('setValue', '');
					return;
				}else{
					//执行添加修改操作
					saveFunc();
				}
			}
		};
		iplantAjaxRequest(ajaxParam);
      },
      saveFunc = function(){
    	  var FunctionModuleCode =$('#FunctionModuleCode').textbox('getValue');
          var FunctionModuleName =$('#FunctionModuleName').textbox('getValue');
          var FunctionModuleType =$('#FunctionModuleType').combobox('getValue');
          var FunctionModuleMenu =$('#FunctionModuleMenu').textbox('getValue');
          var FunctionModuleEName =$('#FunctionModuleEName').textbox('getValue');
          var link =$('#linkUrl').textbox('getValue');
          var FunctionModuleSta =$('#FunctionModuleSta').combobox('getValue');
          var FunctionModuleLevl =$('#FunctionModuleLevl').combobox('getValue');      
          var IFServerNo = '';
          var FunctionModuleUse='';
          if($("#FunctionModuleUse").is(':checked')) FunctionModuleUse='Y';
          else FunctionModuleUse='N';
          var reqData={
            FUN_CD: FunctionModuleCode,
            FUN_NM: FunctionModuleName,
            FUN_TP: FunctionModuleType,
            MN_CD: FunctionModuleMenu,
            FUN_ST: FunctionModuleSta,
            USE_YN: FunctionModuleUse,
            FUN_LEVL: FunctionModuleLevl,
            LINK_URL: link,
            FUN_ENG: FunctionModuleEName, 
          }
          var optType=getOptType();
           //新增
           if (optType == 0) {
               IFServerNo = 'D000030',
               $.extend(reqData, { CRT_ID: '',CRT_IP: '',IFS:IFServerNo}); 
           }
           //修改
           else if (optType == 1) {
               IFServerNo = 'D000032',
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
      toComboboxData = function (){
        $('#FunctionModuleType').combobox({
          data:[
            {value:'功能',text:'功能'},
            {value:'菜单',text:'菜单'},
          ],
          valueField:'value',
          textField:'text',
          panelHeight:80 
        });
        $('#FunctionModuleSta').combobox({
          data:[
            {value:'0',text:'功能状态1'},
            {value:'1',text:'功能状态2'},
            {value:'2',text:'功能状态3'}
          ],
          valueField:'value',
          textField:'text',
          panelHeight:80 
        });
        $('#FunctionModuleLevl').combobox({
          data:[
            {value:'0',text:'功能等级1'},
            {value:'1',text:'功能等级2'},
            {value:'2',text:'功能等级3'}
          ],
          valueField:'value',
          textField:'text',
          panelHeight:80
        });
      },
      bindCombogrid =function (jsonData){
        var ajaxParam={
          url:'/iPlant_ajax',
          data:{
                IFS:'D000012',
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
            $('#FunctionModuleMenu').combobox({
                data:rowCollection,
                valueField:'MN_CD',
                textField:'MN_NM',
                panelWidth:200,
//              columns:[[
//                { field: 'MN_CD', title: '菜单编号', width: 100 ,align:'center'},
//                { field: 'MN_NM', title: '菜单名称', width: 200 ,align:'center'},
//                { field: 'MN_TP', title: '菜单类别', width: 100 ,align:'center',formatter:function(value,row,index) {
//                  if(row.MN_TP=='1'){
//                    return"Web";
//                  }else{
//                    return"App";
//                  }
//                }},
//                { field: 'USE_YN', title: '是否启用', width: 100 ,align:'center',formatter:function(value,row,index) {
//                  if(row.USE_YN=='Y'){
//                    return"启用";
//                  }else{
//                    return"不启用";
//                  }
//                }},
//                { field: 'LINK_URL', title: '连接地址', width: 200 ,align:'center'},
//                { field: 'MN_LEVL', title: '菜单等级', width: 100 ,align:'center'},
//                { field: 'MN_ENG', title: '菜单英文名', width: 100 ,align:'center'},
//                { field: 'MN_MD', title: '属于模块编码', width: 100 ,align:'center'},
//                { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
//                { field: 'CRT_DT', title: '创建时间', width: 100 ,align:'center'},
//                { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
//                { field: 'UPT_DT', title: '修改时间', width: 100 ,align:'center'}
//              ]],
            });

//          $('#FunctionModuleMenu').combogrid("grid").datagrid("loadData", jsonData);


          }
        }
        iplantAjaxRequest(ajaxParam);
      }
    }
    FunModule.prototype = {
      init: function () {
        $(function () {
        	$("body")[0].onkeydown = keyPress;
            $("body")[0].onkeyup = keyRelease;
          initGridData();
          $('#queryFunctionModuleUse').combobox({
              data:[
              {value:'',text:'全部'},
              {value:'Y',text:'启用'},
              {value:'N',text:'不启用'}
              ],
              valueField:'value',
              textField:'text',
              panelHeight:80, 
            });
          $('#btnAdd').click(function () {
              addFuncMes();
              bindCombogrid();
          });
          $('#btnFreshen').click(function() {
        	  initGridData();
			});
          $('#btnUpdate').click(function () {
              
              bindCombogrid();
          });
          $('#save').click(function () {
              saveFuncMes();
          });
          $('.close').click(function () {
//              setDataNull();
              $('#enditTab').dialog('close');
              $('#queryTab').dialog('close');
              initGridData();
          });
          $('#btnDelete').click(function(){
            deleteFuncMes();
          });
          $('#btnSearch').click(function(){
        	  getDataByCondition(); 
          });
          $("input",$("#FunctionModuleCode").next("span")).keyup(function(){
            checkInputLength('FunctionModuleCode',20);
          })
          $("input",$("#FunctionModuleName").next("span")).keyup(function(){
            checkInputLength('FunctionModuleName',30);
          })
          $("input",$("#linkUrl").next("span")).keyup(function(){
            checkInputLength('linkUrl',200);
          })
          $("input",$("#FunctionModuleEName").next("span")).keyup(function(){
            checkInputLength('FunctionModuleEName',30);
          })
        });
      }
    }
    var FUser = new FunModule();
    FUser.init();
})();
