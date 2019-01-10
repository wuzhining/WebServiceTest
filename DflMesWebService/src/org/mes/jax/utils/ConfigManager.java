package org.mes.jax.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Properties;

import org.apache.log4j.Logger;

public class ConfigManager {
	String configpath;
	private static Properties properties =new Properties(); 
	FileInputStream fis = null; 
	OutputStream fos ; 
	Logger logger = Logger.getLogger(ConfigManager.class.getName());
	
	//读取文件
	public ConfigManager() {
		//Thread.currentThread().getContextClassLoader().getResource("").toString()获取到的路径结果形式为：
		//file:/F:/CodeRepository/Git/DflMesWebService/WEB-INF/classes/。路径改写为：F:\CodeRepository\Git\DflMesWebService\WEB-INF\
		String path=Thread.currentThread().getContextClassLoader().getResource("").toString();
		path=path.replace('/', '\\'); // 将/换成\
		path=path.replace("file:", ""); //去掉file:
		path=path.replace("classes\\", ""); //去掉class\
		path=path.substring(1); //去掉第一个\,如 \D:\JavaWeb...
		path+="WebServiceDBConfig.ini";
		logger.info("从："+path+"读取配置文件...");
		configpath=path;
		try {
			
			File file= new File(configpath);
			if(!file.exists()) {
				file.createNewFile();
				
				ConfigManager config=new ConfigManager();
				config.setProperty("DRIVER", "oracle.jdbc.OracleDriver");
				config.setProperty("URL", "jdbc:oracle:thin:@139.198.124.208:10125:BPMES");
				config.setProperty("USER", "mes1");
				config.setProperty("PASSWORD", "mes1");
			}
			
			fis = new FileInputStream(configpath);
			properties.load(fis);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
 
	//获取参数值
	public String getProperty(String key)
	{
		Object object = properties.get(key);
		return object.toString();
	}
	
	//设置参数
	public void setProperty(String key, String value)
	{
		try {
			fos = new FileOutputStream(configpath);// 加载读取文件流
			properties.setProperty(key, value);
			properties.store(fos, null);
			fos.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
