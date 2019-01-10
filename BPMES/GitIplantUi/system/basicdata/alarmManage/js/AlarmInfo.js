(function(){
	function alarmInfo(){
		initGridData=function(){
			var dgrid=$('#alarmInfo_tab').datagrid('options');
			if(!dgrid) return;
			var reqData = {
		        IFS: 'A000043',
            	AI_HD: 0,
		        pageIndex:1,
		    	pageSize:dgrid.pageSize
		    }
	     	reqGridData('/iPlant_ajax','alarmInfo_tab', reqData);
		},
		bindGridData=function(reqData,jsonData){
			var grid={
					name:'alarmInfo_tab',
					dataType: 'json',
					pagination:false,
					columns: [[
				//{field:'AI_ID',title:'报警记录ID',width:100,align:'center'},
	           //{field:'ET_CD',title:'设备唯一码',width:100,align:'center'},
	           {field:'ET_NM',title:'设备编号',width:150,align:'center'},
	           //{field:'AD_CD',title:'报警配置编码',width:100,align:'center'},
	           {field:'AP_NM',title:'报警项目名称',width:180,align:'center'},
	           {field:'AD_HC',title:'报警层级',width:100,align:'center'
//formatter:function(value,row,index) {
//                if(row.AD_HC=='LV1'){
//                  return"第一级";
//                }else if(row.AD_HC=='LV2'){
//                  return"第二级";
//                }else if(row.AD_HC=='LV3'){
//                  return"第三级";
//                }else{
//                  return"第四级";
//                }
//			}
               },
	           {field:'EMP_NM',title:'员工姓名',width:100,align:'center'},
	           //{field:'CP_NO',title:'手机号',width:150,align:'center'},
	           //{field:'E_MAIL',title:'邮箱',width:150,align:'center'},
				//{field:'USE_CD',title:'APP账号',width:100,align:'center'},
	           {field:'AI_CT',title:'报警信息内容',width:450,align:'center'},
	           {field:'AI_CDT',title:'报警时间',width:180,align:'center'},
	           {field:'AI_ST',title:'发送状态',width:100,align:'center'},
	           {field:'AI_SDT',title:'发送时间',width:180,align:'center'},
	           {field:'AI_RV',title:'响应状态',width:100,align:'center'},
	           {field:'AI_RDT',title:'响应时间',width:180,align:'center'},
	           {field:'AI_RS',title:'响应人',width:100,align:'center'},
	           {field:'AI_HD',title:'反馈状态',width:100,align:'center'},
			   {field:'AI_HDT',title:'反馈时间',width:180,align:'center'},
			   {field:'AI_HR',title:'反馈人',width:100,align:'center'},
				//{field:'AI_RT',title:'处理结果',width:100,align:'center'}
				//{field:'CRT_DT',title:'创建时间',width:100,align:'center'},
				{field:'AI_RM',title:'备注',width:100,align:'center'}
				]]
			}
			initGridView(reqData,grid);
			$('#alarmInfo_tab').datagrid('loadData',jsonData);
		},
		getRightDate =function(){
            var ds='';
            var db='';
            $('#startDate').datetimebox().datetimebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endDate').datetimebox().datetimebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
            $('#startDate2').datetimebox().datetimebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var d1 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=d1;
                }
            });
            $('#endDate2').datetimebox().datetimebox('calendar').calendar({
                validator: function(date){
                    var now = new Date();
                    var de =new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    return date<=de;
                }
            });
        }
     	onDYalarmInfo=function(){
	         alert("功能未实现");
     	},
     	onschalarmInfo=function(){
     		$('#queryTab').dialog('open').dialog('setTitle', "查询条件");
     		bindEquipCode();
     	}
     	bindEquipCode =function(){
     		ajaxParam={
                url:'/iPlant_ajax',
                data:{
                    IFS:'B000029',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                      rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                      $("#txtSBBH").combobox({
                          panelHeight:200,
                          data:rowCollection,
                          valueField:'ET_CD',  
                          textField:'ET_NM',
                      });                                                                                    
                }
            }
            iplantAjaxRequest(ajaxParam);
            ajaxParam1={
                url:'/iPlant_ajax',
                data:{
                    IFS:'D000016',
                },
                successCallBack:function(data){
                    var rowNum=0
                    if(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS){
                      rowNum=parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
                    }
                    var rowCollection=createSourceObj(data);
                      $("#txtBJUSER").combobox({
                          panelHeight:200,
                          data:rowCollection,
                          valueField:'EMP_CD',  
                          textField:'EMP_NM',
                      });                                                                                    
                }
            }
            iplantAjaxRequest(ajaxParam1);
            var ajaxParam2={
	          url:'/iPlant_ajax',
	          data:{
	            IFS:'A000013',
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
//	            $('#txtBJXMDM').combogrid({
//	                rows:rowCollection,
//	                idField:'AP_CD',
//	                textField:'AP_NM',
//	                panelHeight:200,
//	                columns: [[
//	                   { field: 'AP_CD', title: '报警项目代码', width: 80, align: 'center' },
//	                   { field: 'AP_NM',title:'报警项目名称',width:80,align:'center'},
//	                ]],
//	            });
//	            $('#txtBJXMDM').combogrid("grid").datagrid("loadData", jsonData);
				$('#txtBJXMDM').combobox({
	                data:rowCollection,
	                valueField:'AP_CD',
	                textField:'AP_NM',
	                panelHeight:200
	            });    
	          }
	        }
	        iplantAjaxRequest(ajaxParam2); 
            $("#txtBJCJ").combobox({
	            panelHeight:100,
	            valueField:'id',  
	            textField:'text',
	            data:[
	            {id:'LV1',text:'LV1'},
	            {id:'LV2',text:'LV2'},
	            {id:'LV3',text:'LV3'},
	            {id:'LV4',text:'LV4'},
	            ]
	        });
	        $("#txtBJDONE").combobox({
	            panelHeight:100,
	            valueField:'id',  
	            textField:'text',
	            data:[
	            {id:'0',text:'全部'},
	            {id:'1',text:'待处理'},
	            {id:'2',text:'已处理'},
	            {id:'3',text:'无法处理'},
	            {id:'4',text:'更换备件'}
	            ]
	        });
	        $("#txtBJACCPT").combobox({
	            panelHeight:100,
	            valueField:'id',  
	            textField:'text',
	            data:[
	            {id:'0',text:'未响应'},
	            {id:'1',text:'已响应'}
	            ]
	        });                                                           
     	}
     	checkDate =function(){
     		var startDate = $('#startDate').datetimebox('getValue');
  			 if(startDate!=""){
  				 startDate.substring(0,21);
  			 }			
  	         var endDate = $('#endDate').datetimebox('getValue');
  	         if(endDate!=""){
  	        	endDate.substring(0,21);
  			 }
  			 var BegDate  = $('#startDate2').datetimebox('getValue');
  			 if(BegDate !=""){
  				 BegDate.substring(0,21);
  			 }
  	         var OverDate = $('#endDate2').datetimebox('getValue');
  	         if(OverDate!=""){
  	        	OverDate.substring(0,21);
  			 }
  			 if(startDate !=''&& endDate !=''){
  	        	var strA= startDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	var strB= endDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	if(strA>strB){
  	        		$('#endDate').datetimebox('setValue', '').datetimebox('hidePanel');
  	        		$.messager.alert('提示', '开始发送时间小于结束发送时间！');
          			return;
  	        	}
  	          }
  	          if(BegDate !=''&& OverDate !=''){
  	        	var strA= BegDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	var strB= OverDate.replace(/\-/g, "").replace(/\:/g, "").replace(/\s+/g,"");
  	        	if(strA>strB){
  	        		$.messager.alert('提示', '开始接收时间小于结束接收时间！');
  	        		$('#endDate2').datetimebox('setValue', '').datetimebox('hidePanel');
          			return;
  	        	}
  	          }
  	         var newDate =new Date();
  	       	 newDate=newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate() + ' ' + newDate.getHours() + ':' + newDate.getMinutes() + ':' + newDate.getSeconds();
  	         if(startDate&&endDate==''){
  	         	endDate =newDate;
  	         	$('#endDate').datetimebox('setValue',newDate);
  	         }
  	         if(BegDate&&OverDate==''){
  	         	OverDate =newDate;
  	         	$('#endDate2').datetimebox('setValue',newDate);
  	         }
  	         if(startDate==''&&endDate){
  	         	$.messager.alert('提示', '请输入开始发送时间');
  	         	return
  	         }
  	         if(BegDate==''&&OverDate){
  	         	$.messager.alert('提示', '请输入开始接收时间');
  	         	return
  	         }
     	}
     	serchInfomation  =function(){
    		 var startDate = $('#startDate').datetimebox('getValue');
  			 if(startDate!=""){
  				 startDate.substring(0,21);
  			 }			
  	         var endDate = $('#endDate').datetimebox('getValue');
  	         if(endDate!=""){
  	        	endDate.substring(0,21);
  			 }
  			 var BegDate  = $('#startDate2').datetimebox('getValue');
  			 if(BegDate !=""){
  				 BegDate.substring(0,21);
  			 }
  	         var OverDate = $('#endDate2').datetimebox('getValue');
  	         if(OverDate!=""){
  	        	OverDate.substring(0,21);
  			 }
  	         var txtSBBH=$('#txtSBBH').textbox('getValue');
  			 var txtBJXMDM=$('#txtBJXMDM').textbox('getValue');
  			 var txtBJCJ=$('#txtBJCJ').textbox('getValue');
  			 var txtBJUSER=$('#txtBJUSER').textbox('getValue');
  			 var txtBJACCPT=$('#txtBJACCPT').textbox('getValue');
  			 var txtBJDONE=$('#txtBJDONE').textbox('getValue');
  	         var reqData ={
        		IFS:'A000043',
        		StartDate :startDate,
        		EndDate :endDate,
        		BegDate :BegDate,
        		OverDate :OverDate,
                ET_CD:txtSBBH,
                AP_CD:txtBJXMDM,
                AD_HC:txtBJCJ,
                EMP_CD:txtBJUSER,
                AI_RV:txtBJACCPT,
                AI_HD:txtBJDONE,
                pageIndex:1,
                pageSize:$('#alarmInfo_tab').datagrid('options').pageSize
  	         };
  	         reqGridData('/iPlant_ajax',"alarmInfo_tab",reqData);
  	         $('#queryTab').dialog('close'); 
     	},
     	serchInfomationonce  =function(){
 	         var txtSBBH=$('#ccSBBH').combobox('getValue');
 			 var txtBJXMDM=$('#ccBJXMDM').combobox('getValue');
 			 var txtBJCJ=$('#ccBJCJ').combobox('getValue');
 	         var reqData ={
 	        		 IFS:'A000043',
 	        		 ET_CD:txtSBBH,
 	        		 AP_CD:txtBJXMDM,
 	        		 AD_HC:txtBJCJ,
 	        		 pageIndex:1,
 	        		 pageSize:$('#alarmInfo_tab').datagrid('options').pageSize
 	         };
 	         reqGridData('/iPlant_ajax',"alarmInfo_tab",reqData);
 	         $('#queryTab').dialog('close'); 
    	},
     	closeDialog =function(){
     		$('#startDate').datetimebox('setValue','');
            $('#endDate').datetimebox('setValue','');
            $('#startDate2').datetimebox('setValue','');
            $('#endDate2').datetimebox('setValue','');
         	$('#txtSBBH').textbox('getValue','');
         	$('#txtBJXMDM').textbox('getValue','');
		 	$('#txtBJCJ').textbox('getValue','');
			$('#txtBJUSER').textbox('getValue','');
            $('#queryTab').dialog('close');	
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
                    $('#ccBJXMDM').combobox({
                        data: array,
                        valueField: 'id',
                        textField: 'text'
                    });
                    $("#ccBJCJ").combobox({
        	            panelHeight:150,
        	            valueField:'id',  
        	            textField:'text',
        	            data:[
        	            {id:'',text:'全部'},
        	            {id:'LV1',text:'LV1'},
        	            {id:'LV2',text:'LV2'},
        	            {id:'LV3',text:'LV3'},
        	            {id:'LV4',text:'LV4'},
        	            ]
        	        });
                }
            });
        	
        	ajaxParam={
                    url:'/iPlant_ajax',
                    data:{
                        IFS:'B000029',
                    },
                    successCallBack:function(data){
                    	var array = new Array();
                        var arrStr=createSourceObj(data);
                        array.push({ "id": "", "text": "全部"});
                        for (var i = 0; i < arrStr.length; i++) {
                            array.push({ "id": arrStr[i].ET_CD, "text": arrStr[i].ET_NM });
                        }
                          $("#ccSBBH").combobox({
                              panelHeight:200,
                              data:array,
                              valueField:'id',  
                              textField:'text',
                          });                                                                                    
                    }
                };
               iplantAjaxRequest(ajaxParam);
        }
    }
	alarmInfo.prototype={
	    init:function(){
	    	 $(function(){
	    		   initSearchAlarmItem();
	        	   initGridData();
	        	   getRightDate();
	        	   $('#btnGaoSearch').click(function () {
	        	   		closeDialog();
	                    onschalarmInfo();
	                });
	        	   $('#btnSearch').click(function () {
	        		   serchInfomationonce();
	                });
	        	   $('#btnFreshen').click(function () {
	        		   serchInfomationonce();
	                });
	        	   $('#onDY').click(function () {
	                    onDYalarmInfo();
	                });
	        	   $('#save').mouseover(function(){
	        	   		checkDate();
	        	   });
	         });
        }
   }
	var bc = new alarmInfo();
    bc.init();
})();