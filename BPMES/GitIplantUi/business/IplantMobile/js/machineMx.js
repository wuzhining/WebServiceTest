(function(){
	function machineMx(){
		initData = function(zt){
			 var ajaxParam={
	     				url:'/iPlant_ajax',
	     				dataType:'JSON',
	     				data:{
	     					DICT_IT:zt,
	     					IFS:"J000008"
	     				},
	                    successCallBack:function(data){
	                     	 //赋值
	                     	 arrRow = createSourceObj(data);
	                     	 //初始化 table
	                     	 var _row;   
		       	    		 var _cell;   
		       	    		//var ccId = getQueryString("ccId");
		       	    		 var ccId = parseInt((document.body.clientWidth-150)/180);
		       	    		 //获取展示行
		       	    		 var rowCount = parseInt((arrRow.length)/parseInt(ccId));
		       	    		 //获取多余列
		       	    		 var yCount=(arrRow.length)%parseInt(ccId);
		       	    		 if(yCount>0){
		       	    			rowCount++;
		       	    		 }
		       	    		 
		       	    		 if(arrRow.length>0){
			       	    		 for(var i = 0; i < rowCount; i++) {   
			       	    		     _row = document.createElement("tr");
			       	    		 	 _row.align="left";
			       	    		  
			       	    		     document.getElementById("zfaxxGrid").appendChild(_row);   
			       	    		     for(var j = 0; j < ccId; j++) {   
			       	    		 		if(i==rowCount-1 && j>=yCount && yCount!=0){
			       	    		 			_cell = document.createElement("td");
			       	    		 			_cell.style.width=100/parseInt(ccId)+"%"; 
					       	    		    _row.appendChild(_cell);
			       	    		 		}else{
			       	    		 		_cell = document.createElement("td");  
			       	    		 		_cell.style.width=100/parseInt(ccId)+"%"; 
					       	    		_row.appendChild(_cell);
			       	    		 		var rowD ={};
			       	    		 		rowD = arrRow[i*ccId+j];	
			       	    		 		//加载div
			       	    		 		var _maindiv = document.createElement("div"); 
			       	    		 		var bg = "bg1";
			       	    		 		
				       	    		 	if(rowD.DICT_IT=="RDI01.01"){
		                    				bg="bg1";
		                    			}else if(rowD.DICT_IT=="RDI01.02"){
		                    				bg="bg4";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.04"){
		                    				bg="bg2";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.05"){
		                    				bg="bg5";
		                    			}
		                    			else if(rowD.DICT_IT=="RDI01.07"){
		                    				bg="bg6";
		                    			}
		                    			else{
		                    				bg="bg3";
		                    			}
				       	    		 	//_maindiv.style="width:120;height:190px;background:url(js/"+bg+".jpg);background-size:100% 190px;text-align:left;";
				       	    		 	_maindiv.style.width="180px";
				       	    		 	_maindiv.style.height="190px";
				       	    		 	_maindiv.style.background="url(../../common/RootImages/"+bg+".jpg)";
				       	    		 	_maindiv.style.backgroundSize = "100% 190px";
				       	    		 	_maindiv.style.textAlign = "left";
				       	    		 	_maindiv.id = "ccFlag"+parseInt(i*ccId+j);
				       	    		 	
				       	    		 	_maindiv.ondblclick = function clickImg(){
					       	    		 	var allTabs = $("#cctabs").tabs('tabs');
						       	    		 for(var i = 0, len = allTabs.length; i < len; i++) {
						       	    			 //因为tabs删除之后会重新对其元素进行排序，所以在删除方法时候只需要进行删除1即可(因为我想保留第一个元素，如果不想保留就改成0即可)
						       	    			 $("#cctabs").tabs('close', 0);
						       	    		}
				       	    		 		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
				       	    		 	$('#enditTab').dialog({    
			       	    		 			title: '详细信息',       
			       	    		 			closed: false,    
			       	    		 			cache: false,    
			       	    		 			top:scrollTop+50 
			       	    		 		});
				       	    		 	var mainId = this.id;
				       	    		 	var iTemp = mainId.split("ccFlag")[1];
				       	    		 	var ccRow = {};
				       	    		 	ccrow = arrRow[iTemp];
				       	    		 	$("#txtWLBM").text(ccrow.ET_NM);
				       	    		 	if(ccrow.DO_CD !=null){
				       	    		 		$("#txtJQBH").text(ccrow.DO_CD);
				       	    		 	}else{
				       	    		 		$("#txtJQBH").text("");
				       	    		 	}
				       	    		 	
	    		    					$("#txtSCCS").text("");
	    		    					$("#txtJQZT").text("");
	    		    					$("#txtSCKSSJ").text("");
	    		    					$("#txtJDSJ").text("");
	    		    					$("#txtYCKSSJ").text("");
				       	    		 	iplantAjaxRequest( {
				    		    			url: '/iPlant_ajax',
				    		    			data: {IFS:'J000001',
				    		    				ET_CD:ccrow.ET_CD,
				    		    				DICT_IT:ccrow.DICT_IT,
				    		    				pageIndex: 1,
				    		    				pageSize:9999
				    		    				},
				    		    			successCallBack: function (data) {
//				    		    				var ccArr = new Array();
				    		    				var ccArr = createSourceObj(data);
//				    		    				for(i=0; i<ccData.length;i++){
//				    		    					if(ccData[i].ET_CD==ccrow.ET_CD){
//				    		    						ccArr.push(ccData[i]);
//				    		    					}
//				    		    				}
				    		    				if(ccArr.length>0){
				    		    					//设置值
				    		    					
				    		    					
				    		    					$("#txtSCCS").text(ccArr[0].PD_TT);
				    		    					if(ccArr[0].DICT_IT_NM !=null )
				    		    						$("#txtJQZT").text(ccArr[0].DICT_IT_NM);
				    		    					//设置背景色
				    		    					if(ccArr[0].DICT_IT=="RDI01.01"){//正常
				    		    						document.getElementById("txtJQZT").style.backgroundColor="#37B42A";
					                    			}else if(ccArr[0].DICT_IT=="RDI01.02"){//待机空闲
					                    				document.getElementById("txtJQZT").style.backgroundColor="#FF8416";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.04"){//挺急
					                    				document.getElementById("txtJQZT").style.backgroundColor="#E54E12";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.05"){//计划停机
					                    				document.getElementById("txtJQZT").style.backgroundColor="#0FAEE2";
					                    			}
					                    			else if(ccArr[0].DICT_IT=="RDI01.07"){//通讯失败
					                    				document.getElementById("txtJQZT").style.backgroundColor="#B3B3B3";
					                    			}else{//异常
					                    				document.getElementById("txtJQZT").style.backgroundColor="#E5C012";
					                    			}
				    		    					if(ccArr[0].P_BGN_DATE !=null)
				    		    						$("#txtSCKSSJ").text(ccArr[0].P_BGN_DATE);
				    		    					if(ccArr[0].PD_AT !=null && ccArr[0].PD_AT !=null)
				    		    						$("#txtJDSJ").text(ccArr[0].PD_AT);
				    		    					else
				    		    						$("#txtJDSJ").text("");
				    		    					var row = document.getElementById("ccycsj");
				    		    					if(ccArr[0].DICT_IT=="RDI01.01"){
				    		    						row.style.display = "none";  
					                    			}else{
					                    				row.style.display = "table-row" ;
					                    				if(ccArr[0].CL_BGN_DATE !=null)
					                    					$("#txtYCKSSJ").text(ccArr[0].CL_BGN_DATE);
					                    				else
					                    					$("#txtYCKSSJ").text("");
					                    			}
				    		    					
				    		    					for(var i=0; i<ccArr.length; i++){
				    		    						addTab(ccArr[i].PT_CD,ccArr[i].ET_CD);
				    		    					}
				    		    				}
				    		    			}
				    		    		});
				       	    		 		
//				       	    		 		var x=document.getElementById('cctable').createCaption();
//				       	    		 		x.innerHTML="My table caption";
//				       	    		 		x.align="left";
				       	    		 	};
				       	    		 	_cell.appendChild(_maindiv);
			       	    		 		//添加div 下子内容
			       	    		 			var _div = document.createElement("div"); 
			       			 				_div.align= "left";
			       			 				//_div.style="width:100%;height:15%;text-align:left;line-height:25px;";
			       			 				_div.style.width="100%";
			       			 				_div.style.height="15%";
			       			 				_div.style.textAlign="left";
			       			 				_div.style.lineHeight="25px";
			       			 				_div.style.padding="0 0 0 5px";
			       			 				_div.innerText = " 设备编号："+rowD.ET_NM;
			       			 				_maindiv.appendChild(_div);
			       			 				//添加图片 div子内容
			       			 				_img =  document.createElement("img");
			       			 				if(rowD.ET_PL != null && rowD.ET_PL !=""){
			       			 					_img.src = "../../common/RootImages/"+rowD.ET_PL;
			       			 				}else{
			       			 					_img.src = "../../common/RootImages/ZSJ.png";
			       			 				}
//			       			 				if(rowD.E_DICT_IT=="CEM01.007"){
//			       			 					_img.src = "../RootImages/CYJ.png";
//			       			 				}else if(rowD.E_DICT_IT=="CEM01.001"){
//			       			 					_img.src = "../RootImages/ZSJ.png";
//			       			 				}else if(rowD.E_DICT_IT=="CEM01.002"){
//			       			 					_img.src = "../RootImages/CNC.png";
//			       			 				}else{
//			       			 					_img.src = "../RootImages/ZSJ.png";
//			       			 				}
			       			 				_img.style.width = "100%";
			       			 				_img.style.height = "40%";
			       			 				_maindiv.appendChild(_img);
			       	    		 		
			       	    		 			//添加div 下子内容
			       			 				var _diva = document.createElement("div"); 
			       			 				//_diva.style="width:100%;height:15%;text-align:left";
			       			 				_diva.style.width="100%";
			       			 				_diva.style.height="15%";
			       			 				_diva.id = "accFlag"+parseInt(i*ccId+j);
			       			 				_diva.style.textAlign="left";
			       			 				_diva.style.padding="0 0 0 5px";
				       			 			if(rowD.DO_CD !=null){
			       			 					_diva.innerText ="派工单号："+rowD.DO_CD;
			       			 				}else{
			       			 					_diva.innerText ="派工单号：";
			       			 				}
			       			 				_maindiv.appendChild(_diva);
			       			 				
			       			 				//添加div 下子内容  background:#89cff0;
			       			 				var _divb = document.createElement("div"); 
			       			 				//_divb.style="width:100%;height:15%;text-align:left";
			       			 				_divb.style.width="100%";
			       			 				_divb.style.height="15%";
			       			 				_divb.id = "bccFlag"+parseInt(i*ccId+j);
			       			 				_divb.style.textAlign="left";
			       			 				//DICT_IT:"RDI01.01" 正常生产
			                    			if(rowD.DICT_IT=="RDI01.01"){
			                    				_divb.innerText = "生产数量："+rowD.PD_TT_NUM;
			                    			}
			                    			//待机空闲
			                    			else if(rowD.DICT_IT=="RDI01.02"){
			                    				_divb.innerText = "异常原因：待机空闲";
			                    			}
			                    			//停机在生产
			                    			else if(rowD.DICT_IT=="RDI01.03"){
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
			                    					_divb.innerText = "异常原因：停机在生产";
//			                    				}
			                    				
			                    			}
			                    			//停机
			                    			else if(rowD.DICT_IT=="RDI01.04"){
			                    				if(rowD.CL_NM !=null){
			                    					_divb.innerText = "停机原因："+rowD.CL_NM;
			                    				}else{
			                    					_divb.innerText = "停机原因：";
			                    				}
			                    			}
			                    			//计划停机
			                    			else if(rowD.DICT_IT=="RDI01.05"){
			                    				if(rowD.CL_NM !=null){
			                    					_divb.innerText = "停机原因："+rowD.CL_NM;
			                    				}else{
			                    					_divb.innerText = "停机原因：";
			                    				}
			                    			}
			                    			// 异常生产
			                    			else if(rowD.DICT_IT=="RDI01.06"){
			                    				_divb.innerText = "异常原因：异常生产";
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
//			                    					_divb.innerText = "异常原因：";
//			                    				}
			                    			}
			                    			//通信失败
			                    			else if(rowD.DICT_IT=="RDI01.07"){
			                    				_divb.innerText = "异常原因：通讯失败";
			                    			}
			                    			//无派单生产
			                    			else if(rowD.DICT_IT=="RDI01.08"){
			                    				_divb.innerText = "异常原因：无派单生产";
//			                    				if(rowD.CL_NM !=null){
//			                    					_divb.innerText = "异常原因："+rowD.CL_NM;
//			                    				}else{
//			                    					_divb.innerText = "异常原因：";
//			                    				}
			                    			}else{
			                    				str = "异常原因：待机空闲";
			                    			}
			       			 				_divb.style.padding="0 0 0 5px";
			       			 				_maindiv.appendChild(_divb);
			       			 				
			       			 				//添加div 下子内容
			       			 				var _divc = document.createElement("div"); 
			       			 				//_divc.style="width:100%;height:15%;text-align:left";
			       			 				_divc.style.width="100%";
			       			 				_divc.style.height="15%";
			       			 				_divc.id = "cccFlag"+parseInt(i*ccId+j);
			       			 				_divc.style.textAlign="left";
			       			 				_divc.style.padding="0 0 0 5px";
			       			 				//正常生产
				       			 			if(rowD.DICT_IT=="RDI01.01"){
			                    				_divc.innerText = "稼动时长："+rowD.PD_AT;
			                    			}
			                    			//待机空闲
			                    			else if(rowD.DICT_IT=="RDI01.02"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//停机在生产
			                    			else if(rowD.DICT_IT=="RDI01.03"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//停机
			                    			else if(rowD.DICT_IT=="RDI01.04"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "停机时长：";
			                    				}else{
			                    					_divc.innerText = "停机时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//计划停机
			                    			else if(rowD.DICT_IT=="RDI01.05"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "停机时长：";
			                    				}else{
			                    					_divc.innerText = "停机时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//无派单生产
			                    			else if(rowD.DICT_IT=="RDI01.06"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}
			                    			//通信失败
			                    			else if(rowD.DICT_IT=="RDI01.07"){
//			                    				if(rowD.CL_WT==null){
			                    					_divc.innerText = "";
//			                    				}else{
//			                    					_divc.innerText = "时长："+rowD.CL_WT;
//			                    				}
			                    			}
			                    			//异常生产
			                    			else if(rowD.DICT_IT=="RDI01.08"){
			                    				if(rowD.LASTTIME==null){
			                    					_divc.innerText = "异常时长：";
			                    				}else{
			                    					_divc.innerText = "异常时长："+rowD.LASTTIME;
			                    				}
			                    			}else{
			                    				_divc.innerText = "异常时长：";
			                    			}
			       			 				_maindiv.appendChild(_divc);
			       	    		 		}
			       	    		 		 
			       	    		     }   
			       	    		 }
		       	    		 
		       	    		 }
	                     }
	     		};
	     		iplantAjaxRequest(ajaxParam); 
		},
		addTab = function (subtitle,sbid) {
		    if (!$('#cctabs').tabs('exists', subtitle)) {
		        $('#cctabs').tabs('add', {
		            title: subtitle,
		            content: createFrame(subtitle,sbid),
		            //closable: true,
		            width: $('#mainPanle').width(),
		            height: $('#mainPanle').height()
		        });
		        $('#cctabs').tabs({
		            border: false,
		            onSelect: function (title) {
		                var pp = $("#cctabs").tabs("getSelected");
		                var tabObj = pp.panel("options").tab;    // 相应的 tab 对象
		                var iframe = $(pp.panel('options').content);
		                var src = iframe.attr('src');
//		                if (src != undefined) {
//		                    $('#tabs').tabs('update', { tab: pp, options: { content: createFrame(src) } });
//		                }
		            }
		        });
		    }
		    $('#cctabs').tabs('select', subtitle);
		},
	    createFrame = function (subtitle,sbid) {
			var s = '<iframe name="mainFrame" scrolling="no" frameborder="0" allowTransparency="true"  src="' + 'marimx.html?wlbm='+subtitle+'&sbid='+sbid + '" style="width:100%;height:99%;background-color: transparent;"></iframe>';
	        return s;
	    },
		initMachi  = function (zt){
			var ajaxParam={
     				url:'/iPlant_ajax',
     				dataType:'JSON',
     				data:{
     					DICT_IT:zt,
     					IFS:"J000008"
     				},
                    successCallBack:function(data){
                    	var ccList = createSourceObj(data);
                    	if(arrRow.length>0){
                    		for(var i=0; i<arrRow.length; i++){
                    			if(ccList.length>0){
                    				for(var j=0; j<ccList.length; j++){
                    					if(ccList[j].ET_CD==arrRow[i].ET_CD){
                    						//校验状态 是否不相等
//                    						if(ccList[j].DICT_IT != arrRow[i].DICT_IT){
                    							var bg="";
        				       	    		 	if(ccList[j].DICT_IT=="RDI01.01"){
        		                    				bg="bg1";
        		                    			}else if(ccList[j].DICT_IT=="RDI01.02"){
        		                    				bg="bg4";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.04"){
        		                    				bg="bg2";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.06"){
        		                    				bg="bg5";
        		                    			}
        		                    			else if(ccList[j].DICT_IT=="RDI01.07"){
        		                    				bg="bg6";
        		                    			}
        		                    			else{
        		                    				bg="bg3";
        		                    			}
        				       	    		 	
        				       	    		 	//背景状态
                    						    var mdiv = document.getElementById("ccFlag"+i);
                    						    mdiv.style.background="url(../../common/RootImages/"+bg+".jpg)";
                    						    mdiv.style.backgroundSize = "100% 190px";
                    						    
                    						    //工单
                    						    var adiv = document.getElementById("accFlag"+i);
                    						    if(ccList[j].DO_CD !=null ){
                    						    	adiv.innerHTML = "派工单号："+ccList[j].DO_CD;
                    						    }else{
                    						    	adiv.innerHTML = "派工单号：";
                    						    }
                    						    
                    						    /***********异常原因********************/
                    						    var bdiv = document.getElementById("bccFlag"+i);
                    							var str = "";
                    							//DICT_IT:"RDI01.01" 正常生产
    			                    			if(ccList[j].DICT_IT=="RDI01.01"){
    			                    				str = "生产数量："+ccList[j].PD_TT_NUM;
    			                    			}
    			                    			//待机空闲
    			                    			else if(ccList[j].DICT_IT=="RDI01.02"){
    			                    				str = "异常原因：待机空闲";
    			                    			}
    			                    			//停机在生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.03"){
    			                    				str = "异常原因：停机在生产"
//    			                    				if(ccList[j].CL_NM !=null){
//    			                    					str = "异常原因："+ccList[j].CL_NM;
//    			                    				}
//    			                    				else{
//    			                    					str = "异常原因："
//    			                    				}
    			                    			}
    			                    			//停机
    			                    			else if(ccList[j].DICT_IT=="RDI01.04"){
    			                    				if(ccList[j].CL_NM !=null){
    			                    					str = "停机原因："+ccList[j].CL_NM;
    			                    				}
    			                    				else{
    			                    					str = "停机原因："
    			                    				}
    			                    			}
    			                    			//计划停机
    			                    			else if(ccList[j].DICT_IT=="RDI01.06"){
    			                    				if(ccList[j].CL_NM !=null){
    			                    					str = "停机原因："+ccList[j].CL_NM;
    			                    				}
    			                    				else{
    			                    					str = "停机原因："
    			                    				}
    			                    			}
    			                    			// 异常生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.05"){
    			                    				str = "异常原因：异常生产"
    			                    				/*if(ccList[j].CL_NM !=null){
    			                    					str = "异常原因："+ccList[j].CL_NM;
    			                    				}
    			                    				else{
    			                    					str = "异常原因："
    			                    				}*/
    			                    			}
    			                    			//通信失败
    			                    			else if(ccList[j].DICT_IT=="RDI01.07"){
    			                    				str= "异常原因：通讯失败";
    			                    			}
    			                    			//无派单生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.08"){
    			                    				str = "异常原因：无派单生产"
//    			                    				if(ccList[j].CL_NM !=null){
//    			                    					str = "异常原因："+ccList[j].CL_NM;
//    			                    				}
//    			                    				else{
//    			                    					str = "异常原因："
//    			                    				}
    			                    			}else{
    			                    				str = "异常原因：待机空闲";
    			                    			}
                    						    bdiv.innerHTML = str;
                    						    
                    						    /***************时长****************/
                    						    var cdiv = document.getElementById("cccFlag"+i);
    				       			 			//正常生产
    				       			 			if(ccList[j].DICT_IT=="RDI01.01"){
    			                    				cdiv.innerText = "稼动时长："+ccList[j].PD_AT;
    			                    			}
    			                    			//待机空闲
    			                    			else if(ccList[j].DICT_IT=="RDI01.02"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "异常时长：";
    			                    				}else{
    			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}
    			                    			//停机在生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.03"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "异常时长：";
    			                    				}else{
    			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}
    			                    			//停机
    			                    			else if(ccList[j].DICT_IT=="RDI01.04"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "停机时长：";
    			                    				}else{
    			                    					cdiv.innerText = "停机时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}
    			                    			//计划停机
    			                    			else if(ccList[j].DICT_IT=="RDI01.06"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "停机时长：";
    			                    				}else{
    			                    					cdiv.innerText = "停机时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}
    			                    			//异常生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.05"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "异常时长：";
    			                    				}else{
    			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}
    			                    			//通信失败
    			                    			else if(ccList[j].DICT_IT=="RDI01.07"){
//    			                    				if(ccList[j].CL_WT==null){
    			                    					cdiv.innerText = "";
//    			                    				}else{
//    			                    					cdiv.innerText = "时长："+ccList[j].CL_WT;
//    			                    				}
    			                    			}
    			                    			//无派单生产
    			                    			else if(ccList[j].DICT_IT=="RDI01.08"){
    			                    				if(ccList[j].LASTTIME==null){
    			                    					cdiv.innerText = "异常时长：";
    			                    				}else{
    			                    					cdiv.innerText = "异常时长："+ccList[j].LASTTIME;
    			                    				}
    			                    			}else{
    			                    				cdiv.innerText = "异常时长：";
    			                    			}
                    						break;
                    					}
                    				}
                    			}
                    		}
                    	}
                     }
     		};
     		iplantAjaxRequest(ajaxParam); 
		}
    }
	machineMx.prototype={
	    init:function(){
	    	 $(function(){
	    		 var zt = getQueryString("zt");
	    		 initData(zt);
	    		 var arrRow=[];
	    		 
	    		 var t=setInterval(function  () {
	    			 initMachi(zt);
	   		     },10000); 
	    	  
	         });
        }
   }
	var bc = new machineMx();
    bc.init();
})();