(function(){
	function marimx(){
		initData=function (wlbm,sbid){
			iplantAjaxRequest( {
    			url: '/iPlant_ajax',
    			data: {IFS:'J000001'},
    			successCallBack: function (data) {
    				var ccData = createSourceObj(data);
    				for(i=0; i<ccData.length;i++){
    					if(sbid==ccData[i].ET_CD && ccData[i].PT_CD==wlbm){
    						var row = {};
    						row=ccData[i];
    						
   	    		 			//物料编码
   	    		 			$('#txtWLBM').text(row.PT_CD);
   	    		 			
   	    		 			//指令单号
	    		 			if(row.MO_CD!=null)
	    		 				$('#txtGD').text(row.MO_CD);
   	    		 			//产品出数
   	    		 			if(row.PT_NUM!=null)
   	    		 				$('#txtCPCS').text(row.PT_NUM);

   	    		 			//生产总数
   	    		 			if(row.PD_TT_NUM!=null)
   	    		 				$('#txtSCZS').text(row.PD_TT_NUM);
   	    		 			
   	    		 			//产品名称
   	    		 			if(row.PT_NM!=null)
   	    		 				$('#txtCPMC').text(row.PT_NM);
   	    		 			//不良数
   	    		 			if(row.BR_NUM!=null)
   	    		 				$('#txtBLS').text(row.BR_NUM);
   	    		 			//派工
   	    		 			if(row.MO_NUM!=null)
   	    		 				$('#txtPGNUM').text(row.MO_NUM);
   	    		 			//不良率
   	    		 			if(row.PCT!=null)
   	    		 				$('#txtBLV').text(row.PCT);
   	    		 			break;
    					}
    				}
    			}
    		});
		}
    }
	marimx.prototype={
	    init:function(){
	    	 $(function(){
	    		 var wlbm = getQueryString("wlbm");
	    		 var sbid = getQueryString("sbid");
	    		 if(wlbm!=null && wlbm != "")
	    			 initData(wlbm,sbid);
	         });
        }
   }
	var bc = new marimx();
    bc.init();
})();