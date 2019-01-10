(function(){
	function position(){
		var Dept = '';
		//左边计量单位树形结构
		initLeftMenu = function () {
		    var reqData = {
		        IFS: 'WMS_B00021',
		    }
		    reqTreeData('/iPlant_ajax',reqData);
		}
		bindTreeData = function (jsonData) {
		    var treeConfig = {
		        name: 'dd',
		        method: 'get',
		        parentField: "sT_P_CD",
		        textFiled: "sT_C_NM",
		        idFiled: "sT_C_CD",
		        data: jsonData,
		        onClick: function (node) {
		        	if(node.attr1=="3"){
		        		$("#ccFrame").attr("src","wmsposMx.html?zt="+node.id);
		        	}	
		        },
		        onLoadSuccess:function(node, data){
		        	var strongnews = {
			                url: "/iPlant_ajax",
			                dataType: "JSON",
			                data: {
								IFS : 'WMS_B000018',
								pageIndex : 1,
								pageSize : 1
							},
			                successCallBack: function(a) {
			                	if(a.RESPONSE[0].RESPONSE_DATA.length>0){
			                	var op = a.RESPONSE[0].RESPONSE_DATA;
			                	var node = $('#dd').tree('find', op[0].SHELF_ID);
			                	$('#dd').tree('select', node.target);
			                	$("#ccFrame").attr("src","wmsposMx.html?zt="+op[0].SHELF_ID);
			                	}
			                },
			                errorCallBack: function() {
			                    $.messager.alert("提示", '请联系管理员，查询失败！')
			                }
			            };
						iplantAjaxRequest(strongnews);
		        }
		    }
		    initTree(treeConfig);
		    $('#dd').tree(treeConfig);
		}
    }
	position.prototype={
	    init:function(){
	    	 $(function(){
	    	  dataGrid = $('#employee_tab');
	    	  initLeftMenu();
	         });
        }
   }
	var bc = new position();
    bc.init();
})();