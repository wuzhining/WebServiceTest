
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
		machinesType = function(){
			$('.green li div').css('background-image',"url('image/66PX_green.png')");
			n1=parseInt(Math.random()*(16-0+1) + 0); //输出1～16之间的随机整数
			n2=parseInt(Math.random()*(16-0+1) + 0);
			if(n1 == n2){
				arguments.callee();
			};
			$('.green li:eq('+n1+') div').css('background-image',"url('image/66PX_red.png')");
			$('.green li:eq('+n2+') div').css('background-image',"url('image/66PX_yellow.png')");
		}
	}
		csbkbInfo.prototype={
				init: function () {
						$(function () {
							lx = getQueryString("line");
							ccfunc();
							machinesType();
							var t=setInterval(function  () {
								ccfunc();
								machinesType();
							},1800000);
							
						});						  							
					}
				}
				
		var csbkb = new csbkbInfo();
		var lx ="",n1,n2;
		csbkb.init();
})();
