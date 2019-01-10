/* 启动时加载 */
/*
 */
(function() {
	function MatterFile() {
		getSelectedCondtion = function() {
			// 维修单号
			iplantAjaxRequest({
				url : '/iPlant_ajax',
				data : {
					IFS : 'T000073'
				},
				successCallBack : function(data) {
					var array = new Array();
					array.push({
						"id" : "",
						"text" : "全部"
					});
					var rowCollection = createSourceObj(data);
					for (var i = 0; i < rowCollection.length; i++) {
						array.push({
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
						dataPi.push({
							"id" : rowCollection[i].ITEM_CD,
							"text" : rowCollection[i].ITEM_NM
						});
					}

					// 查询
					$('#cxMatterNO').combobox({
						data : array,
						valueField : 'id',
						textField : 'text'
					});
				}
			});
		}
		var fileName="",fileType="",filePath="",isExist = false,fileNameArray='';
		initGridData = function() {
			fileName="",
			fileType="",
			filePath="";
			var dgrid = $('#MatterFileinfo_tab').datagrid('options');
			if(!dgrid) return;
				
			var reqData = {
					IFS: 'T000074',
					MT_SN: $("#cxMatterNO").combobox("getValue"),
					MT_VM: $("#cxVersionNum").textbox("getValue"),
					pageIndex: 1,
					pageSize: dgrid.pageSize
				}
				reqGridData('/iPlant_ajax', 'MatterFileinfo_tab', reqData);
			},
			bindGridData = function(reqData, jsonData) {
				var grid = {
					name: 'MatterFileinfo_tab',
					dataType: 'json',
					columns: [
						[
						 {field: 'MT_SN',title: '物料编号',width: 100,align: 'center'}, 
						 {field: 'MT_NM',title: '物料名称',width: 160,align: 'center'}, 
						 {field: 'MT_VN',title: '版本号',width: 100,align: 'center'}, 
						 {field: 'FI_TP',title: '文件类型',width: 100,align: 'center'},
						 {field: 'OD_FM',title: '旧文件名',width: 300,align: 'center'}, 
						 {field: 'FI_SZ',title: '文件大小',width: 100,align: 'center'}, 
						 {field: 'SF_NM',title: '保存文件名',width: 300,align: 'center'}, 
						 {field: 'FI_PH',title: '文件保存路径',width: 400,align: 'center',formatter:function(value,row,index){//使用formatter格式化刷子
			        		   if(value !=null && value != null){
			        			   var index = value.lastIndexOf('\\');
			        			   console.log(index);
			        			   return value.substring(0,index);
			        		   }
						 }}, 
						 {field: 'FI_RM',title: '备注',width: 300,align: 'center'}
						 /*{field: 'CRT_ID',title: '创建人',width: 80,align: 'center'}, 
						 {field: 'CRT_DT',title: '创建时间',width: 150,align: 'center'}, 
						 {field: 'UPT_ID',title: '修改人',width: 80,align: 'center'}, 
						 {field: 'UPT_DT',title: '修改时间',width: 150,align: 'center'},
						 {field: 'CCXZ',title: '下载',width: 60,align: 'center',formatter:function(value,row,index){//使用formatter格式化刷子
			        		   if(row.SF_NM !=null && row.SF_NM !=""){
			        			   if(isIe){
			        				   return '<a href="#" onclick="downLoadImage(\''+fomateUrl(row.FI_PH)+'\')" >下载 </a>';
			        			   }else{
			        				   //console.log(getRootPath_dc()+row.FI_PH);
			        				   //console.log(fomateUrl(row.FI_PH));
			        				   return '<a href=\''+fomateUrl(row.FI_PH)+'\' download=\''+row.SF_NM+'\' >下载 </a>';
			        			   }
			        		   }else{
			        			   return "";
			        		   }
						 }}*/
				      ]],
					
					
					 /**单击进入编辑模式*/
			       /* onClickCell: function (index,field,value) {
			        	var rows = dataGrid.datagrid('getRows'),row = rows[index];
						    window.location.href=row.FI_PH;
					},*/
					
					onDblClickRow: function(index,row){
						if(row) {
							CompanyOpttype = 1;
							$("#editTab").dialog("open").dialog('setTitle', '修改物料档案信息');
				            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
				            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
				            $('#txtMatterNO').combobox('textbox').attr('readonly',true);
				            $('#txtMatterNO').combobox('textbox').attr('disabled',true);
							$('#txtVersionNum').textbox('setValue', row.MT_VN);
							$('#txtMatterNO').combobox('setValue', row.MT_SN);
							$('#txtFileType').combobox('setValue', row.FI_TP);
							$('#txtReMarkS').textbox('setValue', row.FI_RM);
							$('#showFileName').html(row.SF_NM);
							$("#showFileName").attr("title",row.SF_NM); 
//							console.log($("#showFileName").attr("title",row.SF_NM));
							var file = document.getElementById('txtFJ');
							var img = document.getElementById('imgPicture');
//							img.src = filterUrlPath(row.FILE_SAVE_PATH);
//							var grid = $('#MatterFileinfo_tab');
//			            	grid.datagrid('clearSelections');   
//							grid.datagrid('selectRow',index);
						}
					}
				}
				initGridView(reqData, grid);
				$('#MatterFileinfo_tab').datagrid('loadData', jsonData);
		},
		getRootPath_dc = function() {
            var pathName = window.location.pathname.substring(1);
            var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
            if (webName == "") {
                return window.location.protocol + '//' + window.location.host;
            }
            else {
                return window.location.protocol + '//' + window.location.host + '/' + webName;
            }
        },
        fomateUrl = function (url){
        	var str = url.replace(/\\/g,"\/");
        	var strArr  = str.split('upload');
        	var imagePathURL= getRootPath_dc()+ "/upload"+strArr[1] ;
        	return imagePathURL;
        }
        downLoadImage =function(url){
        	var oPop = window.open(url,"","width=1, height=1, top=5000, left=5000"); 
        	for(; oPop.document.readyState != "complete"; ) 
        	{ 
        	if (oPop.document.readyState == "complete")break; 
        	} 
        	oPop.document.execCommand("saveAs"); 
        	oPop.close(); 
        },
		/*清空表单*/
		setDataNull = function () {
            $('#txtVersionNum').textbox('setValue','');
            $("#txtMatterNO").combobox('select', '');
            $('#txtReMarkS').textbox('setValue','');
            $('#showFileName').html('');
		},
          /*保存前的验证操作*/
        checkDataValid = function() {
         	 var target = true,
         	 a = $("#txtPRODUCTMODEL").val(),
         	 b = $("#txtPRODUCTSERIES").val(),
         	 c = $("input[name='PRODUCTATTRIBUTES']:checked").val(),
         	 d = $("input[name='FOREXPORT']:checked").val(),
         	 //e = $('#txtPICTURE').val();
         	 e = $('#showFileName').text();
         	 if ("" == a || "" == b ) {
         		$.messager.alert("提示", "请添加必选信息")
             	target=false;
         	 }else{
	         	 if("" == c ){
	         		$.messager.alert('提示', '请选择产品属性');
	         		target=false;
	         	 }
	         	 if("" == d ){
	         		$.messager.alert('提示', '请选择外销');
	         		target=false;
	         	 }
	         	if("" == e ){
	         		$.messager.alert('提示', '请选择图片文件');
	         		target=false;
	         	 }
         	}
         	return target;
        },
         /*验证是否重复*/
         existProduct=function(sn,vn){
// 			var rowNum;
// 			if(CompanyOpttype==0){
// 				if(product!=undefined && product!='' && product!=null){
// 					if(tpm.textbox('getValue')!=undefined && tpm.textbox('getValue')!='' && tpm.textbox('getValue')!=null){
 	 	    		var ajaxParam = {
 	 	    				url: '/iPlant_ajax',
 	 	    				dataType: 'JSON',
 	 	    				async: false,
 	 	    				data: {
 	 	                       	IFS: 'T000074',
 	 	                       	MT_VN:vn,
 	 	                       	MT_SN:sn,
 	 	  					 	pageIndex: 1,
 	 	  					 	pageSize: $('#MatterFileinfo_tab').pageSize
 	 	    				},
 	 	    				successCallBack:function(data){
 	 	    					var rowNum = parseInt(data.RESPONSE["0"].RESPONSE_HDR.DATA_ROWS);
 	 	                   	 	if(rowNum>0){
 	 	                   			$.messager.alert('提示', '您的录入信息相同,请重新输入!');
 	 	                   			$('#txtVersionNum').textbox('setValue','');
 	 	                   			$("#txtMatterNO").combobox('select', '');
 	 	                   			isExist=false;
 	 	                   	 	}else{
 	 	                   	 		isExist=true;
 	 	                   	 	}
 	 	                   	}
 	 	    			};
 	 	               	iplantAjaxRequest(ajaxParam);
// 	 	    	 }
// 			}
         },
		/* 查询信息 */
		searchProductInformation=function() {
			var a = $('#MatterFileinfo_tab'),
			b = $("#cxMatterNO").combobox("getValue"),
            c = $("#cxVersionNum").textbox("getValue"),
            e = {
				MT_SN: b,
				MT_VN: c,
				IFS: "T000074",
                pageIndex: 1,
                pageSize: a.pageSize                
            };
            reqGridData("/iPlant_ajax", "MatterFileinfo_tab", e)
		},
		validSelectedData = function (gridName,type) {
            var checkedItems = $('#' + 'MatterFileinfo_tab').datagrid('getSelections');
            var num = 0;
            $.each(checkedItems, function (index, item) {
               num++;
            });
            if (type == 'Update') {
                if (num != 1) {
                    return false;
                }
            }
            else {
                if (num <= 0) {
                    return false;
                }
            }
            return true;
        },
        /*删除操作*/
		deleteConfig = function () {
            var isSelectedData = validSelectedData('MatterFileinfo_tab', 'Delete');
            if (!isSelectedData) {
                $.messager.alert('提示', '请选择一条数据进行删除');
                return;
            }
            var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections');
            //确认提示框
            var delCnt=0;
            $.messager.confirm('确认框', '您确定要删除您所选择的数据?', function (r) {
           	 if(r==true){
           		 $.each(checkedItems, function (index, item) {
           			 delCnt++;
                   	 var ajaxParam = {
                            url: '/iPlant_ajax',
                            dataType: 'JSON',
                            data: {
                                IFS: 'T000077',
                                CD: item.CD,
                            },
                            successCallBack:function(){
                           	 if(delCnt==checkedItems.length){
                           	    initGridData();
                           	 }
                           }
                        };
                        iplantAjaxRequest(ajaxParam);
                    });
           	 	}
            });      
       },
       showPic = function (){
    	   var pic = document.getElementById('file');
    	   fileName ="";
    	   for(var i=0; i<pic.files.length; i++){
    		   
    		   if(i==0){
    			   fileName=pic.files[i].name;
    		   }else{
    			   fileName=fileName+","+pic.files[i].name;
    		   }
    		   
    	   }
    	   console.log(fileName);
    	   $('#showFileName').html(fileName);
       },
       /* 修改设备档案信息 */
       updateStation = function() {
			var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections');
			var moveIds = [];
			var num = 0;
			$.each(checkedItems, function(index, item) {
				moveIds.push(item.moveid);
				num++;
			});
			if(num != 1) {
				$.messager.alert('提示', '请选择一条数据进行修改');
				return false;
			}
			var row = $("#MatterFileinfo_tab").datagrid("getSelected");
			$("#txtMatterNO").combobox("loadData", dataPi);
			if(row) {
				CompanyOpttype = 1;
				$("#editTab").dialog("open").dialog('setTitle', '修改设备档案信息');
	            $('#txtVersionNum').textbox('textbox').attr('readonly',true);
	            $('#txtVersionNum').textbox('textbox').attr('disabled',true);
	            $('#txtMatterNO').combobox('textbox').attr('readonly',true);
	            $('#txtMatterNO').combobox('textbox').attr('disabled',true);
				$('#txtVersionNum').textbox('setValue', row.MT_VN);
				$('#txtMatterNO').combobox('setValue', row.MT_SN);
				$('#txtFileType').combobox('setValue', row.FI_TP);
				$('#txtOldFileNum').textbox('setValue', row.OD_FM);
				$('#txtFileSize').textbox('setValue', row.FI_SZ);
				$('#txtSaveFile').textbox('setValue', row.SF_NM);
				$('#txtFilePath').textbox('setValue', row.FI_PH);
				$('#txtReMarkS').textbox('setValue', row.FI_RM);
				$('#showFileName').html(row.SF_NM);
	    		$("#showFileName").attr("title",row.SF_NM);			  
	    		$("#showFileName").attr("title",row.SF_NM);			    							
	    		var file = document.getElementById('txtFJ');
				var img = document.getElementById('imgPicture');
//				img.src = filterUrlPath(row.FILE_SAVE_PATH);
//				grid.datagrid('clearSelections'), 
//				grid.datagrid('selectRow',index);
	    		$("#showFileName").attr("title",row.SF_NM);			    							
	    		var file = document.getElementById('file');
//				var img = document.getElementById('imgPicture');
//				img.src = filterUrlPath(row.FILE_SAVE_PATH);
//				var grid = $('#MatterFileinfo_tab');
//				grid.datagrid('clearSelections'), 
//				grid.datagrid('selectRow',row);
			}
		},
		/*是否修改变更的验证*/
		saveUpdateValidate=function(){
			var checkedItems = $('#MatterFileinfo_tab').datagrid('getSelections'),row = checkedItems[0];
			//var FileName = document.getElementById('showFileName');
			//var file = document.getElementById('txtFJ');
			if(row.CD){
				if(
				$('#txtVersionNum').textbox('getValue')!=row.MT_VN ||
				$('#txtMatterNO').combobox('getValue')!=row.MT_SN ||
	         	$('#txtReMarkS').textbox('getValue')!=row.SF_NM ||
	         	$('#showFileName').html()!=row.FI_RM){
					return true;
				}else{
					return false;
				}
			}
		},
		/* 添加商品移动信息 */
		addStation = function() {
			$("#searchCondition").dialog("close");
			$("#editTab").dialog("open").dialog('setTitle', '添加设备档案信息');
			$("#fmMatterFile").form("clear");
            $('#txtVersionNum').textbox('textbox').attr('readonly',false);
            $('#txtVersionNum').textbox('textbox').attr('disabled',false);
            $('#txtMatterNO').combobox('textbox').attr('readonly',false);
            $('#txtMatterNO').combobox('textbox').attr('disabled',false);
			$('#txtMatterNO').combobox({
				data : dataPi,
				valueField : 'id',
				textField : 'text'
			});
			CompanyOpttype = 0;
		},
		/*新增修改的保存操作*/
		savaStation = function() {
//			if(!checkDataValid()){
//				return false;
//			}
			var IFServerNo = '',reqData = [],susMsg = '',errorMsg = '',ajaxParam;
			if(CompanyOpttype == 0) {
				existProduct($('#txtMatterNO').combobox('getValue'),$('#txtVersionNum').textbox('getValue'));
				if(!isExist){
					return;
				};
				var cd  = autoCreateCode('tpm');
				susMsg = '添加成功',errorMsg = '添加失败,请联系管理员';
				/*判断是否上传图片*/
				 var clValue=$('#txtMatterNO').combobox('getValue');
			    if(fileName!=undefined && fileName!='' && fileName!=null){
			    	var input = document.getElementById("file");
	                var formdata = false;
	                if (window.FormData) {
	                    formdata = new FormData();
	                }
	               
	                    var i = 0, len = input.files.length, img, reader, file;

	                    for ( ; i < len; i++ ) {
	                    	formdata = new FormData();
	                        file = input.files[i];
	                        	if ( window.FileReader ) {
	                                reader = new FileReader();
	                                reader.onloadend = function (e) {
	                                    //showUploadedItem(e.target.result, file.fileName);
	                                };
	                                reader.readAsDataURL(file);
	                            }

	                            if (formdata) {
	                                formdata.append("image", file);
	                                formdata.append("extra",'extra-data');
	                                
	                                formdata.append("FILE_CLS", "import");
	                                formdata.append("FILE_BELONG", cd);
	                                formdata.append("FILE_TYPE", "img");
	                                formdata.append("FILE_NAME", "cctest");
	                                formdata.append("importType",0);
	                            }

	                            if (formdata) {
//	                                jQuery('div#response').html('<br /><img src="js03.gif"/>');

	                                jQuery.ajax({
	                                    url: "/iTaurus/iPlant_ImgUpload",
	                                    type: "POST",
	                                    data: formdata,
	                                    async: false,
	                                    processData: false,
	                                    contentType: false,
	                                    success: function (res) {
//	                                     jQuery('div#response').html("Successfully uploaded");
	                                    }
	                                });
	                            }
	                    }
				}
			   
//				$('#fmMatterFile').submit();
				IFServerNo = 'T000075';
				ajaxParam = {
	           				url: '/iPlant_ajax',
	           				dataType: 'JSON',
	           				data: {
	           					CD: cd,
	           					MT_VN: $('#txtVersionNum').textbox('getValue'),
	           					MT_SN :$('#txtMatterNO').combobox('getValue'),
	           					FI_RM:$('#txtReMarkS').textbox('getValue'),
	           					SF_NM:$('#showFileName').html(),
	           					IFS: 'T000075'
	           				},
	           				 successCallBack: function(data) {
	           					 
	           					 setTimeout(function(){
	           						$.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
	           					 }, 1000);
	           				},
	           				errorCallBack: function() {
	           					$.messager.alert('提示', errorMsg);
	           				}
	           			};
	           			iplantAjaxRequest(ajaxParam);
	           			$("#editTab").dialog("close");
			} else if(CompanyOpttype == 1) {
				susMsg = '更新成功',errorMsg = '更新失败,请联系管理员';
				if(!saveUpdateValidate()){
            		$.messager.alert("提示", '内容没有更新，请修改') 
            		return false;
            	}
				//判断是否变更了文件信息
				var row = $("#MatterFileinfo_tab").datagrid("getSelected");
				//console.log("fileName="+fileName);
				if(row){
					if(fileName!=undefined && fileName!="" && fileName!=null && row.SAVE_FILE_NM!=fileName){
						var input = document.getElementById("file");
		                var formdata = false;
//		                if (window.FormData) {
//		                    formdata = new FormData();
//		                }
		               
		                    var i = 0, len = input.files.length, img, reader, file;

		                    for ( ; i < len; i++ ) {
		                    	formdata = new FormData();
		                        file = input.files[i];
		                        	if ( window.FileReader ) {
		                                reader = new FileReader();
		                                reader.onloadend = function (e) {
		                                    //showUploadedItem(e.target.result, file.fileName);
		                                };
		                                reader.readAsDataURL(file);
		                            }

		                            if (formdata) {
		                                formdata.append("image", file);
		                                formdata.append("extra",'extra-data');
		                                formdata.append("FILE_CLS", "import");
		                                formdata.append("FILE_BELONG", row.CD);
		                                formdata.append("FILE_TYPE", "img");
		                                formdata.append("FILE_NAME", "cctest");
		                                formdata.append("importType",0);
		                            }

		                            if (formdata) {

		                                jQuery.ajax({
		                                    url: "/iTaurus/iPlant_ImgUpload",
		                                    type: "POST",
		                                    data: formdata,
		                                    async: false,
		                                    processData: false,
		                                    contentType: false,
		                                    success: function (res) {
		                                    }
		                                });
		                            }
		                    }
					}
				}
				IFServerNo = 'T000076';
				if(fileName!=undefined && fileName!='' && fileName!=null){
        	 	}else{
        	 		fileName = $('#textFJ').val();
        	 	}
				ajaxParam = {
					url: '/iPlant_ajax',
					dataType: 'JSON',
					data: {
							CD: row.CD,
        					MT_VN: $('#txtVersionNum').textbox('getValue'),
        					MT_SN:$('#txtMatterNO').combobox('getValue'),
        					FI_RM: $('#txtReMarkS').textbox('getValue'),
        					SF_NM:$('#showFileName').html(),
        					OD_FM: row.SF_NM,
        					IFS: 'T000076'
					},
					 successCallBack: function(data) {
						 setTimeout(function(){
							 $.messager.alert("提示", susMsg) && ($("#editTab").dialog("close"), setDataNull(), initGridData())
						 }, 1000);
						 

					},
					errorCallBack: function() {
						$.messager.alert('提示', errorMsg);
					}
				};
				iplantAjaxRequest(ajaxParam);
				$("#editTab").dialog("close");
			} else {
				IFServerNo = 'T000077';
			}
			 
		}
	};
	    
	var quence = new Array();//待上传的文件队列，包含切块的文件
	/**
	* 用户选择文件之后的响应函数，将文件信息展示在页面，同时对大文件的切块大小、块的起止进行计算、入列等
	*/
	showFileList=function(files) {
		if(!files) {
			return;
		}
		var chunkSize = 5 * 1024 * 1024;  //切块的阀值：5M
		$(files).each(function(idx,e){
			$("#showFileName").html($("#showFileName").html()+" "+e.name);
			if(e.size > chunkSize) {
				//文件大于阀值，进行切块
				//切块发送
				var chunks = Math.max(Math.floor(fileSize / chunkSize), 1)+1;//分割块数
				for(var i=0 ; i<chunks; i++) {
					var startIdx = i*chunkSize;//块的起始位置
					var endIdx = startIdx+chunkSize;//块的结束位置
					if(endIdx > fileSize) {
						endIdx = fileSize;
					}
					var lastChunk = false;
					if(i == (chunks-1)) {
						lastChunk = true;
					}
					//封装成一个task，入列
					var task = {
						file:e,
						chunked:true,
						startIdx:startIdx,
						endIdx:endIdx,
						currChunk:i,
						totalChunk:chunks
					}
					quence.push(task);
		      }
		} 
		else 
		{
			var task = {
				file:e
			}
			quence.push(task);
		}
	 });
  }
  /**
   *  上传器，绑定一个XMLHttpRequest对象，处理分配给其的上传任务
  **/
  Uploader=function(name) {
	  this.url="./iTaurus/iPlant_ImgUpload";      //服务端处理url
	  this.req = new XMLHttpRequest();
	  this.tasks; //任务队列
	  this.taskIdx = 0; //当前处理的tasks的下标
	  this.name=name;
	  this.status=0;  //状态，0：初始；1：所有任务成功；2：异常
	  
	  //上传 动作
	  this.upload = function(uploader) {
		  this.req.responseType = "json";
		  
		  //注册load事件（即一次异步请求收到服务端的响应）
		  this.req.addEventListener("load", function(){
		  //更新对应的进度条
		  //progressUpdate(this.response.uuid, this.response.fileSize);
		  //从任务队列中取一个再次发送
		  var task = uploader.tasks[uploader.taskIdx];
		  if(task) {
			   console.log(uploader.name + "：当前执行的任务编号：" +uploader.taskIdx);
			   this.open("POST", uploader.url);
			   this.send(uploader.buildFormData(task));
			   uploader.taskIdx++;
		  }
		  else
		  {
			  console.log("处理完毕");
			  uploader.status=1;
		  }
	  });

	   //处理第一个
	   var task = this.tasks[this.taskIdx];
	   if(task) {
		   console.log(uploader.name + "：当前执行的任务编号：" +this.taskIdx);
		   this.req.open("POST", "/iTaurus/iPlant_ImgUpload");
		   this.req.send(this.buildFormData(task));
		   this.taskIdx++;
	   } 
	   else 
	   {
		   uploader.status=1;
	   }
	}
	
	//提交任务
	this.submit = function(tasks) {
	     this.tasks = tasks;
	}
	
	//构造表单数据
	this.buildFormData = function(task) {
		var file = task.file;
		var formData = new FormData();
		var clValue=$('#txtMatterNO').combobox('getValue');
		formData.append("FILE_CLS","cctest");
		formData.append("FILE_BELONG",clValue);
		formData.append("FILE_TYPE",fie.type);
		formData.append("FILE_NAME",fie.name);
		formData.append("importType",0);
		
		var chunked = task.chunked;
		if(chunked) {
			//分块
			formData.append("chunked",  task.chunked);
			formData.append("data", file.slice(task.startIdx, task.endIdx));//截取文件块
			formData.append("currChunk", task.currChunk);
			formData.append("totalChunk", task.totalChunk);
	   } 
	   else 
	   {
	       formData.append("data", file);
	   }
	   return formData;
   }
}
  /**
   *用户点击“上传”按钮
  */
  doUpload=function() {
		//创建4个Uploader上传器（4条线程）
		var uploader0 = new Uploader("uploader0");
		var task0 = new Array();
		var uploader1 = new Uploader("uploader1");
		var task1 = new Array();
		
		var uploader2 = new Uploader("uploader2");
		var task2 = new Array();
		
		var uploader3 = new Uploader("uploader3");
		var task3 = new Array();

		//将文件列表取模hash，分配给4个上传器
		for(var i=0 ; i<quence.length; i++) {
			if(i%4==0) {
				task0.push(quence[i]);
			}
			else if(i%4==1) {
				task1.push(quence[i]);
			}
			else if(i%4==2) {
				task2.push(quence[i]);
			}
			else if(i%4==3) {
				task3.push(quence[i]);
			}
		}
		
		//提交任务，启动线程上传
		uploader0.submit(task0);
		uploader0.upload(uploader0);
		uploader1.submit(task1);
		uploader1.upload(uploader1);
		uploader2.submit(task2);
		uploader2.upload(uploader2);
		
		uploader3.submit(task3);
		uploader3.upload(uploader3);   
		  
	  
    }
	
	MatterFile.prototype = {
		init: function() {
			$(function() {
				 
				   if (!!window.ActiveXObject || "ActiveXObject" in window){
					  //$("#ccID").attr("onclick","downLoadImage();");
				    	isIe = true;
				  }
				  else{
				    	isIe = false;
				  		//var str = getRootPath_dc()+ "/upload/2017-03-13/image/21489387143272.png";
				  		//$("#ccID").attr("href",str);
				  		//$("#ccID").attr("download",'ccccc');
				  }
				var CompanyOpttype; //0：新增   1:编辑
				getSelectedCondtion();
				initGridData();
				
				$('#btnSearch').click(function() {
					searchProductInformation();
				});
				$('.add').click(function() {
					addStation();
				});

				$('.update').click(function() {
					updateStation();
				});

				$('.save').click(function() {
					savaStation();
				});
				
				$('.delete').click(function() {
					deleteConfig();
				});
				
				$('.close').click(function() {
					setDataNull();
					$('#editTab').dialog('close');
				});
			});
		}
	}
	var matterfile = new MatterFile();
	var dataGrid = $('#MatterFileinfo_tab');
	var dataPi=[];
	var isIe = true;
	matterfile.init();
})();

