/*!
 * table 0.0.1
 * by zhuss
 * Copyright 2017.4
 * Date: 2017.4
 */
(function($){
	var pluginName = 'jqueryTable',
	defaults = {
			width: null, //弹出层宽度
 			height: null,  //弹出层高度
 			autoSize: true,  //是否自适应尺寸,默认自适应
 			autoHide: false,  //是否自自动消失，配合time参数共用
 			zIndex: 99999,  //弹出层定位层级
 			headTitle:null,  //头部标题
 			headContent:null, //头部内容
 			imageCls:null, //图片类
 			row
 	};
	function JqueryTable(element,options){
 		this.element = element;
 		this.settings = $.extend({}, defaults, options);
 		this.init();		
 	}
	JqueryTable.prototype = {	

 		//初始化弹出框
 		init: function(){
 			var that = this,
 			element = this.element;
 			
 			that.render(element);
 			that.setStyle();
 			that.show();
 			//that.trigger(element);
 		},
 		
 		//渲染弹出框
 		render: function(element){
 			var that = this,
 				$this = $(element),
 				dialogHTML = that.create($this),
 				$content = that.parseContent();
 				
 			$this.replaceWith(dialogHTML[0] + dialogHTML[1]);

 			if(typeof($content) === 'object'){
 				$content.appendTo('.dialog-box-content');
 			}else{
 				$('.dialog-box-content').append($content);
 			}
 			
 			$('body').append(dialogHTML[2]);
 		},

 		//创建弹出框
 		create: function(element){
 			var that = this,
 			$this = $(element),
 			title =  that.settings.title,
 			hasBtn = that.settings.hasBtn,
 			hasMask = that.settings.hasMask,
 			hasClose = that.settings.hasClose,
 			confirmValue = that.settings.confirmValue,
 			cancelValue = that.settings.cancelValue,
 			tableHTML = [];
 			tableHTML[0]=' <section class="JqueryTable"><table class="tab_child_css" cellspacing="0" cellpadding="0"><tr><td class="td_title" colspan="4" style="border-right:0;text-align:center;"><strong>'+headTitle+headContent+'</strong></td></tr>';
 			tableHTML[1]='<tr><td colspan="2"><table class="tb_left_child_css" cellspacing="0" cellpadding="0"><tr><td align="center" style="text-align:center;"><img src='+imageCls+' width="220px" height="112px" /></td></tr></table></td>' 
 			tableHTML[2]='<tr><td class="td_info" colspan="4" style="border-right:0;">生产工单：<span id="A01_productWorkOrder"></span></td></tr>'
 			/*
 			   *  <tr>
	      	                   <td colspan='2' width="">
	      	                      <table class='tb_left_child_css' cellspacing='0' cellpadding='0'>
	      	                          <tr>
	      	                             <td align='center' style="text-align:center;"><img src="img/tbj_1.jpg" width="220px" height="112px" /></td>
	      	                          </tr>
	      	                      </table>
	      	                   </td>
	      	                   <td colspan='2' style="border-right:0;">
	      	                       <table cellspacing='0' cellpadding='0' class='tb_right_child_css' border='0' >
	      	                          <tr><td style="border-top:0;border-right:0;">机器名称：贴标机</td></tr>
	      	                          <tr><td style="border-right:0;">累计停机时长：<span id="A01_stoptime"></span></td></tr>
	      	                          <tr><td style="border-right:0;">生产时长：<span id="A01_producttime"></span></td></tr>
	      	                          <tr><td style="border-right:0;">保养时长：<span id="A01_repairtime"></span></td></tr>
	      	                          <tr><td style="border-right:0;">设备点检：<span id="A01_equipcheck"></span></td></tr>
	      	                       </table>
	      	                   </td>
	      	               </tr>
 			   * 
 			   */  


 			if(!title){
 				dialogHTML[0] = '<section class="dialog-box"><div class="dialog-box-container"><div class="dialog-box-content"></div>';			
 			}else{
 				if(!hasClose){
					dialogHTML[0] = '<section class="dialog-box"><div class="dialog-box-container"><div class="dialog-box-title"><h3>'+ title + '</h3></div><div class="dialog-box-content"></div>';
 				}else{					
 					dialogHTML[0] = '<section class="dialog-box"><div class="dialog-box-container"><div class="dialog-box-title"><h3>'+ title + '</h3><span class="dialog-box-close">×</span></div><div class="dialog-box-content"></div>';
 				}
 			}

 			if(!hasBtn){
 				dialogHTML[1] = '</div></section>';
 			}else{
 				if(confirmValue && cancelValue){
 					dialogHTML[1] = '<div class="dialog-btn"><span class="dialog-btn-cancel">' + cancelValue + '</span><span class="dialog-btn-confirm">' + confirmValue + '</span></div></div></section>';
 				}else if(cancelValue){
 					dialogHTML[1] = '<div class="dialog-btn"><span class="dialog-btn-cancel">' + cancelValue + '</span></div></div></section>';
 				}else if(confirmValue){
 					dialogHTML[1] = '<div class="dialog-btn"><span class="dialog-btn-confirm">' + confirmValue + '</span></div></div></section>';
 				}else{
 					dialogHTML[1] = '<div class="dialog-btn"><span class="dialog-btn-cancel">取消</span><span class="dialog-btn-confirm">确定</span></div></div></section>';
 				}
 			}

 			if(!hasMask){
 				dialogHTML[2] = '';
 			}else{
 				dialogHTML[2] = '<div id="dialog-box-mask"></div>';
 			}

 			return dialogHTML;	
 		},

 		

 		//解析并处理弹出框内容
 		parseContent: function(){
 			var that = this,
 				content = that.settings.content,
 				width = that.settings.width,
 				height = that.settings.height,
 				type = that.settings.type,
 				$iframe = $('<iframe>'),
 				random = '?tmp=' + Math.random(),
 				urlReg = /^(https?:\/\/|\/|\.\/|\.\.\/)/;

 			if(urlReg.test(content)){

 				$iframe.attr({
 					src: content + random,
 					frameborder: 'no',
 					scrolling: 'no',
 					name: 'dialog-box-iframe',
 					id: 'dialog-box-iframe'
 				})
 				.on('load',function(){

 					//动态自适应iframe高度;
 					var $iframe = $(window.frames['dialog-box-iframe'].document),
 						$iframeBody = $(window.frames['dialog-box-iframe'].document.body),
 						iframeWidth = $iframe.outerWidth() - 8,
 						iframeHeight = $iframe.outerHeight() - 16,
 						$dialogBox = $('.dialog-box'),
 						$content = $('.dialog-box-content'),
 						$container = $('.dialog-box-container');

 						dialogBoxWidth = iframeWidth + 40;
 						dialogBoxHeight = iframeHeight + 126;
 						
 					if(that.settings.autoSize){	
 						$(this).width(iframeWidth);
 						$(this).height(iframeHeight);

 						$iframeBody.css({
 							margin: '0',
 							padding: '0'
 						});

 						$content.css({
 							width: iframeWidth + 'px',
 							height: iframeHeight + 'px'
 						});

 						$container.css({
 							width: dialogBoxWidth + 'px',
 							height: dialogBoxHeight + 'px'
 						});

 						$dialogBox.css({
 							width: dialogBoxWidth,
 							height: function(){
 								if(type === '' || type === 'normal'){
 									return dialogBoxHeight + 'px';
 								}else if(type === 'error' || type === 'correct'){
 									dialogBoxHeight = dialogBoxHeight + 8;
 									return dialogBoxHeight + 'px';
 								}	
 							},
 							'margin-top': function(){
 								if(type === '' || type === 'normal'){
 									return -Math.round(dialogBoxHeight/2) + 'px';
 								}else if(type === 'error' || type === 'correct'){
 									dialogBoxHeight = dialogBoxHeight + 4;
 									return -Math.round(dialogBoxHeight/2) + 'px';
 								}	
 							},
 							'margin-left': -Math.round(dialogBoxWidth/2) + 'px'
 						});

 					}else{
 						$(this).width(that.settings.width - 40);
 						$(this).height(that.settings.height - 126);
 					}
 				});
				return $iframe;
 			}else{
 				return content;
 			}
 		},

 		//显示弹出框
 		show: function(){
 			$('.dialog-box').css({display:'block'});

 			setTimeout(function(){
 				$('.dialog-box').addClass('show');
 			},50)

 			$('#dialog-box-mask').show();
 		},

 		//隐藏弹出框
 		hide: function(element){
 			var $this = $(element),
 				$dialogBox = $('.dialog-box'),
 				$iframe = $('#dialogBox-box-iframe');

 			$dialogBox.removeClass('show');

 			setTimeout(function(){
 				if($iframe){
 					$iframe.attr('src','_blank');
 				}

 				$dialogBox.replaceWith('<div id="' + $this.attr('id') + '"></div/>');
 				$('#dialog-box-mask').remove();
 			},150)
 		},

 		//设置弹出框样式
 		setStyle: function(){
 			var that = this,
 				$dialog = $('.dialog-box'),
 				$container = $('.dialog-box-container'),
 				$content = $('.dialog-box-content'),
 				$mask  = $('#dialog-box-mask'),
 				type = that.settings.type,
 				EFFECT = 'effect';

 			//弹出框外框样式
 			$dialog.css({
 				width: function(){
 					if(that.settings.width){
 						return that.settings.width + 'px';
 					}else{
 						return;
 					}
 				},
 				height: function(){
 					if(that.settings.height){
 						if(type === '' || type === 'normal'){
 							return that.settings.height + 'px';
 						}else if(type === 'error' || type === 'correct'){
 							return that.settings.height + 4 + 'px';
 						}
 					}else{
 						return;
 					}
 				},
 				'margin-top': function(){
 					var height;
 					if(type === '' || type === 'normal'){
 						height = that.settings.height;
 					}else if(type === 'error' || type === 'correct'){
 						height = that.settings.height + 4;
 					}
 					return -Math.round(height/2) + 'px';
 				},
 				'margin-left': function(){
 					var width = $(this).width();
 					return -Math.round(width/2) + 'px';
 				},
 				'z-index': that.settings.zIndex
 			});

 			//弹出框内层容器样式
 			$container.css({
 				width: function(){
 					if(that.settings.width){
						return that.settings.width + 'px';
 					}else{
 						return;
 					}
 				},
 				height: function(){
 					if(that.settings.height){
 						return that.settings.height + 'px';
 					}else{
 						return;
 					}
 				},
 			});

 			//弹出框内容样式
 			$content.css({
 				width: function(){
 					if(that.settings.width){
 						return that.settings.width - 40 + 'px';
 					}else{
 						return;
 					}
 				},
 				height: function(){
 					if(that.settings.height){
 						return that.settings.height - 126 + 'px';
 					}else{
 						return;
 					}
 				}
 			});

 			//遮罩层样式
 			$mask.css({
 				height: $(document).height() + 'px'
 			});
 		

 			//判断弹出框类型
 			switch(that.settings.type){
 				case 'correct':
 					$container.addClass('correct');
 					break;
 				case 'error':
 					$container.addClass('error');
 					break;
 				default:
 					$container.addClass('normal');;
 					break;
 			}

 			//弹出框多种动画效果
 			switch(that.settings.effect){
 				case 'newspaper':
 					$dialog.addClass(EFFECT + '-newspaper');
 					break;
 				case 'fall':
 					$dialog.addClass(EFFECT + '-fall');
 					break;
 				case 'scaled':
 					$dialog.addClass(EFFECT + '-scaled');
 					break;
 				case 'flip-horizontal':
 					$dialog.addClass(EFFECT + '-flip-horizontal');
 					break;
 				case 'flip-vertical':
 					$dialog.addClass(EFFECT + '-flip-vertical');
 					break;
 				case 'sign':
 					$dialog.addClass(EFFECT + '-sign');
 					break;
 				default:
 					$dialog.addClass(EFFECT + '-fade');
 					break;
 			}

 		},

 		//弹出框触屏器(系列事件)
 		trigger: function(element,event){
 			var that = this,
 				$this = $(element);

 			$('.dialog-box-close,#dialog-box-mask,.dialog-btn-cancel,.dialog-btn-confirm').on('click',function(){
 				that.hide($this);
 			});

 			$(document).keyup(function(event){
 				if(event.keyCode === 27){
 					that.hide($this);
 				}
 			});

 			if(that.settings.autoHide){
 				setTimeout(function(){
 					that.hide($this);
 				},that.settings.time)
 			}

 			if($.isFunction(that.settings.confirm)){
 				$('.dialog-btn-confirm').on('click',function(){
 					that.settings.confirm();
 				})
 			}

 			if($.isFunction(that.settings.cancel)){
 				$('.dialog-btn-cancel').on('click',function(){
 					that.settings.cancel();
 				})
 			}

 		}

 	};

 	$.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new DialogBox(this, options));			
			}
        });
		return this;
    };
	
 })(jQuery)