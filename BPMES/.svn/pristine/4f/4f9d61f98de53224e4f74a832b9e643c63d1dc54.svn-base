package com.iPlant.mes.common;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Comm {

	
//	   /**利用MD5进行加密
//     * @param str  待加密的字符串
//     * @return  加密后的字符串
//     * @throws NoSuchAlgorithmException  没有这种产生消息摘要的算法
//     * @throws UnsupportedEncodingException  
//     */
//    public static String EncoderByMd5(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException{
//        //确定计算方法
//        MessageDigest md5=MessageDigest.getInstance("MD5");
//        BASE64Encoder base64en = new BASE64Encoder();
//        //加密后的字符串
//        String newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
//        return newstr;
//    }
    
    /**利用MD5进行加密
     * @param str  待加密的字符串
     * @return  加密后的字符串
     * @throws NoSuchAlgorithmException  没有这种产生消息摘要的算法
     * @throws UnsupportedEncodingException  
     */
    public static String MD5Encryption(String originString) {
        String result = null;
        if (originString != null) {
            try {
                // 指定加密的方式为MD5
                MessageDigest md = MessageDigest.getInstance("MD5");
                // 进行加密运算
                byte bytes[] = md.digest(originString.getBytes());
                for (int i = 0; i < bytes.length; i++) {
                    // 将整数转换成十六进制形式的字符串 这里与0xff进行与运算的原因是保证转换结果为32位
                    String str = Integer.toHexString(bytes[i] & 0xFF);
                    if (str.length() == 1) {
                        str += "F";
                    }
                    result += str;
                }
            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            }
        }
        return result.toUpperCase();
    }
 
//	/**判断用户密码是否正确
//     * @param newpasswd  用户输入的密码
//     * @param oldpasswd  数据库中存储的密码－－用户密码的摘要
//     * @return
//     * @throws NoSuchAlgorithmException
//     * @throws UnsupportedEncodingException
//     */
//    public static boolean checkpassword(String newpasswd,String oldpasswd) throws NoSuchAlgorithmException, UnsupportedEncodingException{
//        if(MD5Encryption(newpasswd).equals(oldpasswd))
//            return true;
//        else
//            return false;
//    }
    
    
    /**判断用户密码是否正确
     * @param newpasswd  用户输入的密码
     * @param oldpasswd  数据库中存储的密码－－用户密码的摘要
     * @return
     * @throws NoSuchAlgorithmException
     * @throws UnsupportedEncodingException
     */
    public static boolean checkpassword(String newpasswd,String oldpasswd) throws NoSuchAlgorithmException, UnsupportedEncodingException{
        if(MD5Encryption(newpasswd).equals(oldpasswd))
            return true;
        else
            return false;
    }
}
