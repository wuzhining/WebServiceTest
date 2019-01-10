$(function(){
	var flag = 0;
	/*加载产线信息主表信息并创建模板，写入HTML页面*/
	function tableInfoajaxResend(){
		var url = "HTTP://192.168.1.106:8080/Warehouse/iPlant_app"
		var Defer = $.Deferred();          //声明一个Defer对象
		var tableInfo = {
	        dataType: "JSON",
	        async:false,
	        data: {
	        	IFS: "WMS_REP00216",
	        },
	        successCallBack: function(a) {
	        	if(a.RESPONSE[0].RESPONSE_DATA.length>0){
	        		var mData = createSourceObj(a);
	        		var arr = sliceArray(mData,20);
					Defer.resolve(arr);               //在Defer对象的resolve状态中把combobox对象传出去
	        	}
	        },
	        errorCallBack: function() {
	        }
	    };
		WarehouseAjaxRequest(url,tableInfo);
		return Defer.promise();                                   //返回一个promise对象
	};
	
	/*分页加载数据*/
	function PagingData(arr){
		var lengh = arr.length,index;
		if(flag < lengh){
			index = flag;
		}else{
			index = 0;
			flag = 0;
		}
		var myTemplate = Handlebars.compile($("#tableTemplate").html());
		Handlebars.registerHelper('if_even', function(value, options) {
		    if(value == '0') {
		        return options.fn(this);
		    } else {
		        return options.inverse(this);
		    }
		});
		var strHtml = myTemplate({'tableData':arr[index]});
		$('#main-body').html(strHtml);
		var tdHeight = $("#tableTemplate").css('height');
		$("#tableTemplate tr td").css('line-height',tdHeight);	/*table td中的行高等于高，让文本上下居中*/
		flag+=1;
	}
	function Refresh(){
		tableInfoajaxResend().then(function(arr){
			PagingData(arr);
			clearInterval(intervalTableData);
			intervalTableData = setInterval(function(){
				PagingData(arr);
			}, 10000);	
		});
	};
	var interval,intervalTimer,intervalTableData;
	Refresh();
	clearInterval(interval);
	interval = setInterval(Refresh, 30000);
});



