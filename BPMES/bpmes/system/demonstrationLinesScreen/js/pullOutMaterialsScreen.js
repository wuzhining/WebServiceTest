(function() {
	$(function() {
			/*获取url中的拉线编码参数*/
			var lineCd = getQueryString('line'),flag = 0;;
			function tableInfoajaxResend(){
				var Defer = $.Deferred();          //声明一个Defer对象
				var tableInfo = {
					url: "/iPlant_ajax",
			        dataType: "JSON",
			        async:false,
			        data: {
			        	IFS: "MES_R0001",
			        	LINE_CD:lineCd
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
				iplantAjaxRequest(tableInfo);
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
				var strHtml = myTemplate({'tableData':arr[index]});
				$('#main-body').html(strHtml);
				/*var tdHeight = $("#tableTemplate").css('height');
				$("#tableTemplate tr td").css('line-height',tdHeight);*/	/*table td中的行高等于高，让文本上下居中*/
				flag+=1;
			};
			
			function Refresh(){
				tableInfoajaxResend().then(function(arr){
					PagingData(arr);
					clearInterval(intervalTableData);
					intervalTableData = setInterval(function(){
						PagingData(arr);
					}, 10000);	
				});
			};
			var interval,intervalTableData;
			Refresh();
			clearInterval(interval);
			interval = setInterval(Refresh, 30000);
		});
	})();