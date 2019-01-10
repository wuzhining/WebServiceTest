(function(){
	function measurementUnit(){
		moreUnit =function(){
			$('#moreUnitDetail').datagrid({
				columns:[[
					
				]],
				data:[
					
				],
			});
		}
		//左边计量单位树形结构
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'WMS_B00032',
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		}
		//初始化表格数据
		initGridData=function(){
			var dgrid=$('#formTemplate_tab').datagrid('options');
			var typeData;
			if(!dgrid) return;
			var reqData = {
		        IFS: 'WMS_B00032',
		        pageIndex:1,
		    	pageSize:dgrid.pageSize
		    }
	     	reqGridData('/iPlant_ajax','formTemplate_tab', reqData);
		}
		bindGridData = function (reqData,jsonData) {
			var editRow = undefined;
            var grid = {
                name: 'measurementUnit_tab',
                dataType: 'json',
                columns: [[
                    { field: 'FORM_NAME', title: '表单名称', width: 200, align: 'center' },
                    { field: 'FORM_ELEMENTS', title: '表单个数', width: 200, align: 'center' },
                    { field: 'CREATE_DATE', title: '表单时间', width: 200, align: 'center' },
                ]],
            }               
            initGridView(reqData,grid);
            $('#formTemplate_tab').datagrid('loadData', jsonData);
        }
	}
	 //新增计量单位
    addUnit =function(){
    		$("#enditTab1").dialog("open");
    }
	clearUnit =function(){
	
		$('#enditTab1').dialog('close');
	}
	 //保存新怎单计量单位
    singleSavaUnit =function(){
    	var fromName=$("#fromName").val();
    	url = "../../../common/webform/form.html?name="+encodeURIComponent(fromName);//此处拼接内容
        window.location.href = url;
	}
	measurementUnit.prototype ={
		init:function(){
			$(function(){
				dataGrid = $('#formTemplate_tab');
				unitType=0;
				changeType=0;
				/*singleUnit();*/
				moreUnit();
				/*initLeftMenu();*/
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