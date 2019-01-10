(function() {
	function measurementUnit() {
		// 左边计量单位树形结构
		initLeftMenu = function() {
			var reqData = {
				IFS : 'WMS_B00026',
				DICT_CD : 'UNT01',
			};
			reqTreeData('/iPlant_ajax', reqData);
		};
		bindTreeData = function(jsonData) { // 树形节点
			var treeConfig = {
				name : 'tre',
				method : 'get',
				parentField : "sT_C_CD",
				textFiled : "sT_C_NM",
				idFiled : "sT_C_NM",
				data : jsonData,
				onClick : function(node) {
					alert(node['sT_C_NM']);
					alert(node['sT_C_CD']);
					
					if (node['sT_C_NM']) {
						var dgrid = $('#factory_tab').datagrid('options');
						if (!dgrid)
							return;
						var Dept = node['sT_C_NM'];
						var reqData = {
							STORE_NAME : Dept,
							IFS : 'WMS_B00020',
							pageIndex : 1, 
							pageSize : dgrid.pageSize
						};
						reqGridData('/iPlant_ajax', 'factory_tab', reqData); // 数据网格
					}
				}
			};
			initTree(treeConfig);
			$('#tre').tree(treeConfig);
		};
		// 初始化表格数据
		
	}

	measurementUnit.prototype = {
		init : function() {
			$(function() {
				// 初始化全局变量对象
				dataGrid = $('#factory_tab'), dataCompany = [],dataFactory = [], showmessage = $('#showMessageInfo'),editIndex = undefined, oldRow = undefined,reg = new RegExp("null", "g");
				unitType = 0;
				changeType = 0;
				updataId = [];

				initLeftMenu();
				//获取工厂类别下拉
				$("#btnAdd").click(function() {					
					alert("ad");
				});
				
				$('.delete').click(function(){
					alert("de");
			    });
				
				$('.update').click(function() {
					alert("up");
				});
				 //点击树型菜单节点
			    function treeClick(event, treeId, treeNode, clickFlag) {
			        page.menuCode = treeNode.id;
			        window.location.href="${ctx }/menu/list?menuCode="+page.menuCode;
			    }
				
				
			});
			
		}
	};
	var unit = new measurementUnit();
	unit.init();




})();
function conditionQuery(){
	var dgrid = dataGrid.datagrid('options');
	var storageCd=$("#storage_CD").val();
	var storageNm=$("#storage_NM").val();
	var reqData = {
			IFS: 'WMS_B00020',
			pageIndex: 1,
			pageSize: dgrid.pageSize,
			STORE_ID:storageCd,
			STORE_NAME:storageNm
		};
		reqGridData('../iPlant_ajax', 'factory_tab', reqData);
}