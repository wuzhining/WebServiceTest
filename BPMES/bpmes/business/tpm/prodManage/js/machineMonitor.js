/**
 * 
 */
    /*$(function() {

      var inputBox=document.createElement('input');
      inputBox.id='J_input';
      inputBox.width=230;
      inputBox.height=25;
     
      $('body').html(inputBox);
      var input=$('#J_input');
      //$('body').appendChild(inputBox);
      //$('body').html(inputBox);
      //用来获取字数
      function getNum(){
    	if(!input.val()) return 0;
        return input.val().length;
      }

      //渲染元素
      function render(){
        var num = getNum();

        //没有字数的容器就新建一个
        if ($('#J_input_count').length == 0) {
          input.after('<span id="J_input_count"></span>');
        };

        $('#J_input_count').html(num+'个字');
        
      }

      //监听事件
      input.on('keyup',function(){
        render();
      });

      //初始化，第一次渲染
      render();


    })*/


    /*var textCount = {
    	input:null,
    	init:function(config){
    		this.input =$(config.id);
    		this.bind();
    		//这边范围对应的对象，可以实现链式调用
    		return this;
        },
        bind:function(){
            var self = this;
            this.input.on('keyup',function(){
                self.render(); 
            });
        },
        getNum:function(){
        	if(!this.input.val()) return 0;
            return this.input.val().length;
        },
        //渲染元素
        render:function(){
           var num = this.getNum();
           if ($('#J_input_count').length == 0){
                this.input.after('<span id="J_input_count"></span>');
           };
           $('#J_input_count').html(num+'个字');
        },
        showMsg:function(){
        	alert('ddd');
        }
    }
    $(function(){
    	//动态添加input元素
    	var inputBox=document.createElement('input');
        inputBox.id='J_input';
        inputBox.width=230;
        inputBox.height=25;
        $('body').html(inputBox);
        var txtCount=textCount.init({id:'#J_input'});
        txtCount.showMsg();
        txtCount.render();
    })*/

    /*var TextCount = (function(){
    	//私有方法，外面将访问不到
    	var _bind = function(that){
    		that.input.on('keyup',function(){
    			that.render();
            });
        }
    	var _getNum = function(that){
    		if(!that.input.val()) return 0;
    		return that.input.val().length;
        }
    	var TextCountFun = function(config){
    		
    	}
    	TextCountFun.prototype.init = function(config) {
    		this.input = $(config.id);
    		this.countId=$(config.countId);
    		_bind(this);
    		return this;
    	};
    	TextCountFun.prototype.render = function() {
    		var num = _getNum(this);
    		if ($('#'+this.countId).length == 0) {
                 this.input.after('<span id='+this.countId+'></span>');
            };
            $('#'+this.countId).html(num+'个字');
        };
        
        //返回构造函数
        return TextCountFun;
    })();
    /*$(function() {
    	//动态添加input元素
    	var inputBox=document.createElement('input');
        inputBox.id='J_input';
        inputBox.width=230;
        inputBox.height=25;
        $('body').html(inputBox);
        new TextCount().init({id:'#J_input',countId:'J_input_count'}).render();
    })*/
var TextCount=function(){
    	//私有方法，外面将访问不到
    	var _bind = function(that){
    		that.input.on('keyup',function(){
    			that.render();
            });
        }
    	var _getNum = function(that){
    		if(!that.input.val()) return 0;
    		return that.input.val().length;
        }
    	var TextCountFun = function(config){
    		
    	}
    	TextCountFun.prototype.init = function(config) {
    		this.input = $(config.id);
    		this.countId=$(config.countId);
    		_bind(this);
    		return this;
    	};
    	TextCountFun.prototype.render = function() {
    		var num = _getNum(this);
    		if ($('#'+this.countId).length == 0) {
                 this.input.after('<span id='+this.countId+'></span>');
            };
            $('#'+this.countId).html(num+'个字');
        };
        
        //返回构造函数
        return TextCountFun;
    }