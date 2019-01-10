/**
 * 数据类型扩展类
 */
$.extend(String.prototype,{
	/********************************************************************字符串对象扩展*******************************************************************************************/
    /**
	 * 判断字符串是否以某个字符串开始
	 */
	startWith : function(str){
		if(str==null||str==""||this.length==0||str.length>this.length)
			return false;
		if(this.substr(0,str.length)==str)
			return true;
		else
			return false;
		return true;
	},
	/**
	 * 判断字符串是否以某个字符串结尾
	 */
	endWith : function(str){
		if(str==null||str==""||this.length==0||str.length>this.length)
			return false;
		if(this.substring(this.length-str.length)==str)
			return true;
		else
			return false;
		return true;
	}
	/********************************************************************数字扩展***********************************************************************************************/
	
	/********************************************************************数据类型转换扩展*****************************************************************************************/

})(jQuery)