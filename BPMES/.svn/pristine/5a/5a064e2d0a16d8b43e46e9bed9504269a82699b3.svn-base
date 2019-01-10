/* 启动时加载 */
/*
 */
(function() {
	function application() {
		initGridData = function() {
			var dgrid = dataGrid.datagrid('options');
			if(!dgrid) return;
			var reqData = {
				//IFS: 'S000011', 
				IFS:'D000037',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'Authorization_tab', reqData);
		},
		bindGridData = function(reqData, jsonData) {
			var gridList = {
				name: 'Authorization_tab',
				dataType: 'json',
				singleSelect:false,
				columns: [[
				  /*  {field : "CZ",checkbox : true},
				    {field:'AUTHORIZATION_ID', title: '主键ID', hidden:true,width:280,align:'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'USER_NAME',title: '用户名',width: 160,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
			        {field: 'CHINESE_NAME',title: '中文名',width: 160,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
				    {field: 'ENGLISH_NAME',title: 'English',width: 160,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'MAIL_BOX',title: '邮箱',width: 200,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'JOB_NUMBER',title: '工号',width: 200,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'DEPT_ID',title: '部门编号',width: 200,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'DEPARTMENT',title: '部门',width: 200,align: 'center',formatter: function (value) {if(value != null)return "<span title='" + value + "'>" + value + "</span>";}},
					{field: 'AUDIT_STATUS',title: '审核状态',width: 200,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '已审核';} else { return '未审核';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}},
					{field: 'LOCK_STATE',title: '锁定状态',width: 200,align: 'center',formatter: function(value, row, index) {if(value == 'Y') { return '正常';} else { return '已锁定';}},editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}}*/
				  { field: 'USE_CD', title: '用户编码', width: 100 ,align:'center' },
		           { field: 'EMP_NO', title: '员工号', width: 100 ,align:'center',hidden:true},
                  { field: 'USE_NM', title: '员工名称', width: 100 ,align:'center'},
                  { field: 'GR_CD', title: '所属用户组编码', width: 100 ,align:'center'},
		           { field: 'GR_NM', title: '所属用户组', width: 100 ,align:'center'},
		           { field: 'USE_ST', title: '用户状态', width: 100 ,align:'center',formatter:function(value,row,index) {
		           		if(row.USE_ST=='2'){
		           			return"试用期";
		           		}else if(row.USE_ST=='1'){
		           			return"在职";
		           		}
		           		else{
		           			return"离职";
		           		}
		           }},
                  { field: 'USE_RM', title: '备注', width: 200 ,align:'center'},
		           { field: 'USE_YN', title: '是否启用' , width: 100 ,align:'center',formatter:function(value,row,index) {
		           		if(row.USE_YN=='Y'){
		           			return"启用";
		           		}else{
		           			return"不启用";
		           		}
		           }},
		           { field: 'CRT_ID', title: '创建人', width: 100 ,align:'center'},
		           { field: 'CRT_DT', title: '创建时间', width: 200 ,align:'center'},
		           { field: 'UPT_ID', title: '修改人', width: 100 ,align:'center'},
		           { field: 'UPT_DT', title: '修改时间', width: 200 ,align:'center'},
				]], 
				/**
				 * 单机进入编辑模式
				 */
		  onDblClickRow: function(index,row){
			var checkedRows = $('#Authorization_tab').datagrid('getSelected');
			if(checkedRows){
	    	 CompanyOpttype=1;
	    	 $("#enditTab").dialog("open").dialog('setTitle', '编辑岗位资格技能');
	    	 checkFun();
	    	 $('#USE_CD').textbox('setValue', row.USE_CD==null?'':row.USE_CD);
			 $('#USE_NM').textbox('setValue', row.USE_NM==null?'':row.USE_NM);
			 $('#GR_NM').textbox('setValue', row.GR_NM==null?'':row.GR_NM);
			 $('#USE_ST').textbox('setValue', row.USE_ST==null?'':row.USE_ST);
			 $('#productionStartTime').datebox('setValue',row.productionEndTime==null?'':row.productionEndTime);
			 $('#productionEndTime').datebox('setValue', row.productionEndTime==null?'':row.productionEndTime);
			/* cong_id = row.AUTHORIZATION_ID;*/
			 checkedRow=1;
		    }else{
				$.messager.alert("提示", '请选择记录')
				return false;
		    }
			 
			 
	     }
	}
	initGridView(reqData, gridList);
		dataGrid.datagrid('loadData', jsonData);
		}
		checkFun = function (){
			var qx = getUpdateRight();
			if(qx=="Y"){
				  	
		    	 $('#saveID').show();
		    	 $('#cancleID').show();
			}else{
				CompanyOpttype=2;
				
		    	 $('#saveID').hide();			    	
			}
		}
		addStation = function() {
        	CompanyOpttype = 0;
        	checkFun();
			$("#enditTab").dialog("open").dialog('setTitle', '新建技能项');
			$("#fmStation").form("clear");			
		}	
		/* 编辑岗位资格技能 */	
		updateStation = function() {
			var checkedItems = $('#Authorization_tab').datagrid('getSelections');
			var moveIds = [];
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择记录');
				return false;
			}
			var row = $("#Authorization_tab").datagrid("getSelected");
			if(row) {
				$("#searchCondition").dialog("close");
				$("#enditTab").dialog("open").dialog('setTitle', '授权岗位资格技能');
				 $('#USE_CD').textbox('setValue', row.USE_CD==null?'':row.USE_CD);
				 $('#USE_NM').textbox('setValue', row.USE_NM==null?'':row.USE_NM);
				 $('#GR_NM').textbox('setValue', row.GR_NM==null?'':row.GR_NM);
				 $('#USE_ST').textbox('setValue', row.USE_ST==null?'':row.USE_ST);
				 $('#productionStartTime').datebox('setValue',row.productionEndTime==null?'':row.productionEndTime);
				 $('#productionEndTime').datebox('setValue', row.productionEndTime==null?'':row.productionEndTime);
				 CompanyOpttype = 1;	
				checkedRow = 0;

			}
			checkFun();
		}
		//置空查询输入框
 		setQueryNull=function() {
 			$("#nanan").form("clear");
 		}
 		getDataBySearch = function(){
			var dgrid = $('#Authorization_tab').datagrid('options');
			if(!dgrid) return;
			var USE_CD = $('#searchUSE_CD').textbox('getValue');
			var EMP_NM =$("#searchUSE_NM").textbox('getValue');
			var GR_CD = $('#searchGR_NM').combobox('getValue');
			var reqData = {
					USE_CD:USE_CD,
					EMP_NM:EMP_NM,
					GR_CD:GR_CD,
					IFS:'D000037',
				pageIndex: 1,
				pageSize: dgrid.pageSize
			};
			reqGridData('/iPlant_ajax', 'Authorization_tab',reqData);
		};
 		/**根据条件查询技能列表信息**/
		 getMaterialData = function(){
			var tabName = 'materialDetails_tab';
			var dgrid = $('#'+tabName).datagrid('options');
			if(!dgrid) return;
			var SKILL_NAME = $('#SKILL_NAME').val();
			var SKILL_NA = $('#SKILL_NA').val();
			var USE_CD = $("#USE_CD").textbox('getValue')
			var reqData = {
					SKILL_NAME:SKILL_NAME,
					SKILL_NA:SKILL_NA,
					USE_CD:USE_CD,
				IFS: 'S000015',
				pageIndex: dgrid.pageNumber,
				//async: false,
				pageSize: dgrid.pageSize
			}
			dialogDataGrid('/iPlant_ajax', tabName, reqData);
 		/*绑定技能项列表*/
 		 dialogEditorDataGrid = function(tabName,reqData, jsonData){
				var gridLists = {
					name : tabName,
					dataType : 'json',
					columns : [[
						{field:'SKILL_NAME',title:'技能名称',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
						{field:'DESCRIBE',title:'描述',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}}
					 ]],
					 onDblClickRow: function(index,row){
						 assignment(row.SKILL_NAME);
			         }
				}		
				initEditorDataGridView(reqData, gridLists);
				$('#'+tabName).datagrid('loadData', jsonData);
			}
		 }
		 
		 /**已授权列表信息**/
		 getDataByStation = function(){
			var tabName = '';
			tabName = 'materialDetail11_tab';
			var dgrid = $('#'+tabName).datagrid('options');
			if(!dgrid) return;	
			var USE_CD = $("#USE_CD").textbox('getValue')
			var reqData = {
				USE_CD:USE_CD,
				IFS: 'S000016',
				pageIndex: dgrid.pageNumber,
				pageSize: dgrid.pageSize
			}
			reqGridData('/iPlant_ajax', 'materialDetail11_tab', reqData);
 		/*绑定技能项列表*/
			bindGridData = function(reqData, jsonData){
				var gridLists = {
					name : 'materialDetail11_tab',
					dataType : 'json',
					columns : [[
						{field:'SKILL_NAME',title:'技能名称',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}},
						{field:'DESCRIBE',title:'描述',width:130,align:'center',formatter:function(value) {if (value != null) return "<span title='" + value+ "'>" + value + "</span>";}}
					 ]]
				}		
				initGridView(reqData, gridLists);
				$('#materialDetail11_tab').datagrid('loadData', jsonData);
			}
		 }
		 /**
		  * 移除用户的技能
		  */
		 getbtnRightChoose = function () {
	    		var checkedItems =  $('#materialDetail11_tab').datagrid('getSelections');
	            if (checkedItems.length==0) {
	                $.messager.alert('提示', '请选择选择记录');
	                return;
	            }
	            var row = $("#Authorization_tab").datagrid("getSelected");
	            var EMP_NO = row.EMP_NO//获得员工编码
	            var arrUpdate = new Array();
	            $.each(checkedItems, function (index, item) {
       				arrUpdate.push({SKILL_ID:item.SKILL_ID});//获得多个技能项目
	            });
	            var ajaxDelete = {//删除中间表的数据
                        url: '/iPlant_ajax',
                        dataType: 'JSON',
                        data: {
                            list: arrUpdate,
                            EMP_NO:EMP_NO,
                            IFS: 'S000014'
                        },
                        successCallBack: function (data) {
                        	getMaterialData();//刷新
        					getDataByStation();//刷新
                        }
                    };
                iplantAjaxRequest(ajaxDelete);
	    	},
	    	/**
			  * 授权岗位用户技能
			  */
	    	getbtnLeftChoose = function () {
		    		var checkedItems =  $('#materialDetails_tab').datagrid('getSelections');
		            if (checkedItems.length==0) {
		                $.messager.alert('提示', '请选择选择记录');
		                return;
		            }
		            var row = $("#Authorization_tab").datagrid("getSelected");
		            var EMP_NO = row.EMP_NO
		            var arrUpdate = new Array();
		            $.each(checkedItems, function (index, item) {
           				arrUpdate.push({SKILL_ID:item.SKILL_ID,EMP_NO:EMP_NO});
		            });
		            var ajaxInsert = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                list: arrUpdate,
                                IFS: 'S000012'
                            },
                            successCallBack: function (data) {
                            	getMaterialData();//刷新
            					getDataByStation();//刷新
                            }
                        };
                    iplantAjaxRequest(ajaxInsert);
		    	}	
	};

	application.prototype = {
		init: function() {
			$(function() {
				
				/*所属用户组下拉框*/
				var ajaxParam2={
                        url:'/iPlant_ajax',
                        data:{ IFS:'D000025'},
                            successCallBack:function(data){
                                var rowCollection=createSourceObj(data); 
                                var arr = [];
                                arr.push({"id":"", "text":"全部"});
                                for(var i=0; i< rowCollection.length; i++){
                                	arr.push({"id":rowCollection[i].GR_CD, "text":rowCollection[i].GR_NM});
                                }
                                $('#searchGR_NM').combobox({
                                    data:arr,
                                    valueField:'id',
                                    textField:'text',
                                    panelWidth:150
                                });
                             }
                    }
                    iplantAjaxRequest(ajaxParam2);
				
				//初始化全局变量对象
				dataGrid = $('#Authorization_tab'),dataLabelType=[],showmessage=$('#showMessageInfo'),editIndex = undefined,oldRow=undefined, reg=new RegExp("null","g"),dataNational = [];
				initGridData();
				$('#btnSearch').click(function() {
					getDataBySearch();
				});
				
				$('#btnSearch1').click(function() {
					getMaterialData();
				});
				$('#btnSearch2').click(function() {
					getDataByStation();
				});
				$('.add').click(function() {					
					setDataNull();
					addStation();
				});
				$('#btnUpdate').click(function() {	
					updateStation();
					getMaterialData();
					getDataByStation();
				});
				
				$('.save').click(function() {
					savaStation();
				});
				$('#btnResets').click(function() {
					setQueryNull();
				});
				$('#btnRightChoose').click(function() {
					getbtnRightChoose();
				});
				$('#btnLeftChoose').click(function() {//授权
					getbtnLeftChoose();
				});
			});
		}
	}
	var fcfo = new application();
	fcfo.init();
})();