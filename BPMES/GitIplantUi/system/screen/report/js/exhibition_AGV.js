
(function(){
	var agvLocation1=[2,7,8,9];
	var agvLocation2=[1,2,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44];
	
	 function animatFunc(left,top){
		$('#AGV_Car').animate({
		    left : left,
		    top:top
		},2000);
	};
	function locationHidden(){
		for(var i=0; i<28; i++){
			$("#Location"+agvLocation2[i]).hide();
		}
	}
	function locationShow(){
		var ajaxParam={
		    url: '/iPlant_ajax',
		    data:{
		    	IFS: 'ST00117',
		    	AGV_CD:2
			},
			successCallBack:function(data){
				var obj=data.RESPONSE[0].RESPONSE_DATA;
				if(obj!=null){
					
				}
		    }
		}
		iplantAjaxRequest(ajaxParam);
		agvRunLocation1Show();	
		
	}
	
	function agvRunLocation1Show(){
		var ajaxAgvParam={
			    url: '/iPlant_ajax',
			    data:{
			    	IFS: 'ST00117',
			    	AGV_CD:1
				},
				successCallBack:function(data){
					var obj=data.RESPONSE[0].RESPONSE_DATA;
					if(obj!=null){
						
				    }
				}
			}
			iplantAjaxRequest(ajaxAgvParam);
	}
	
	$(function(){
		
		var height = document.getElementById("cctest").offsetHeight;
		var width = document.getElementById("cctest").offsetWidth;
		animatFunc(100,100);
	    var t=setInterval(function() {
	    	
		},10000);
   });
})();
