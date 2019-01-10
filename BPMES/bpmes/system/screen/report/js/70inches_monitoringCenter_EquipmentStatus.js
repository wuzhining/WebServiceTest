
(function(){
	function csbkbInfo(){
		ccfunc = function (){
			iplantAjaxRequest({
		           url: '/iPlant_ajax',
		           data: {
		               IFS: 'MES_R0083',
		               LINE_CD:lx,
		           },
		           successCallBack: function (data) {
		        	  
		           }
		       });
		}
	}
		csbkbInfo.prototype={
				init: function () {
						$(function () {
							lx = getQueryString("line");
							ccfunc();
							var t=setInterval(function  () {
								ccfunc();
							},5000);
							
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var lx ="";
		csbkb.init();
})();
