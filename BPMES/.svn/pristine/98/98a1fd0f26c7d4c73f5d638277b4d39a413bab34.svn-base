package com.iPlant.mes.util;
/** 
 * @author  lipl
 */  
public class StringToIntUtil {

	  
	public static int parseInt(String string) throws MyException {  
	        /* 异常情况1：字符串为null */  
	        if (string == null) {  
	            throw new MyException("字符串为null!");  
	        }  
	        int length = string.length(), offset = 0;  
	        /* 异常情况2：字符串长度为0 */  
	        if (length == 0) {  
	            throw new MyException("字符串长度为0！");  
	        }  
	        boolean negative = string.charAt(offset) == '-';  
	        /* 异常情况3：字符串为'-' */  
	        if (negative && ++offset == length) {  
	            throw new MyException("字符串为：'-'！");  
	        }  
	        int result = 0;  
	        char[] temp = string.toCharArray();  
	        while (offset < length) {  
	            char digit = temp[offset++];  
	            if (digit <= '9' && digit >= '0') {  
	                int currentDigit = digit - '0';  
	                /* 
	                 * 异常情况4：已经等于Integer.MAX_VALUE / 10，判断要添加的最后一位的情况： 
	                 * 如果是负数的话，最后一位最大是8 如果是正数的话最后一位最大是7 
	                 */  
	                if (result == Integer.MAX_VALUE / 10) {  
	   
	                    if ((negative == false && currentDigit > 7)  
	                            || (negative && currentDigit > 8)) {  
	                        throw new MyException("溢出！");  
	                    }  
	                    /* 
	                     * 异常情况5：已经大于Integer.MAX_VALUE / 10 
	                     * 无论最后一位是什么都会超过Integer.MAX_VALUE 
	                     */  
	                } else if (result > Integer.MAX_VALUE / 10) {  
	                    throw new MyException("溢出！");  
	                }  
	   
	                int next = result * 10 + currentDigit;  
	                result = next;  
	            }  
	        }  
	        if (negative) {  
	            result = -result;  
	        }  
	        return result;  
	    }  
	    

	    public static void main(String[] args) {  
	        try {  
	            System.out.println(parseInt("-214748368"));  
//	            System.out.println(parseInt("-214748351"));  
//	            System.out.println(parseInt("-2147483648"));  
//	            System.out.println(parseInt("-21474836410"));  
	        } catch (MyException e) {  
	            e.printStackTrace();  
	        }  
	   
	    }  
	   
	   
	}  
	   
	/* 自定义异常 */  
	class MyException extends Exception {  
	    /** 
	     * 
	     */  
	    private static final long serialVersionUID = 1749149488419303367L;  
	    String message;  
	   
	    public MyException(String message) {  
	        // TODO 自动生成的构造函数存根  
	        this.message = message;  
	    }  
	   
	    @Override  
	    public String getMessage() {  
	        // TODO 自动生成的方法存根  
	        return message;  
	    }  
	   
	
}
