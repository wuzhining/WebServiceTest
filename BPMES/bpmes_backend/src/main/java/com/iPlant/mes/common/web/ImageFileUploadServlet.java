package com.iPlant.mes.common.web;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.iPlant.frame.util.StringUtils;

import net.sf.json.JSONObject;

/**
 * 文件上传Servlet
 * 
 * @author Peng
 * @version 1.0
 * 
 */
public class ImageFileUploadServlet extends HttpServlet {

	/**
	 * 序列化ＩＤ
	 */
	private static final long serialVersionUID = -6543261050043217324L;
	
	// 上传文件的缓存大小
	private static final int TEMP_FILE_CACHE_SIZE = 100 * 1024;
	
	//允许上传的文件类型
	private String acceptType;
	
	//允许上传的文件大小
	private String acceptLength;
	
	//文件保存在服务器上的路径
	private String savePath;
	
	//文件临时保存目录
	private String tempPath;
	
	//文件临时存放目录区
	private File tempFilePath;
	
	//文件保存目录
	private File saveFilePath;
	
	private Map<String, String> resultMap = new HashMap<String, String>();

	public ImageFileUploadServlet() throws IOException {
		initServlet();
	}
	
	/**
	 * 初始化文件上传组件的相关参数
	 * 
	 * @throws IOException
	 */
	private void initServlet() throws IOException {
		// 文件上传相关配置所在文件的路径
		String fileUploadProperties = getInitParameter("fileUploadProperties");
		Properties props = new Properties();
		InputStream in = this.getClass().getResourceAsStream(fileUploadProperties);
		props.load(in);
		acceptType = props.getProperty("file.accepttype");
		if (StringUtils.isEmpty(acceptType)) {
			throw new IOException("需要设置允许上传的文件类型");
		}
		acceptLength = props.getProperty("file.acceptlength");
		if (StringUtils.isEmpty(acceptLength)) {
			throw new IOException("需要设置允许上传的文件大小");
		}
		savePath = props.getProperty("file.savepath");
		if (StringUtils.isEmpty(savePath)) {
			throw new IOException("需要设置上传文件的保存路径");
		}
		tempPath = props.getProperty("file.temppath");
		if (StringUtils.isEmpty(tempPath)) {
			throw new IOException("需要设置文件临时缓存区");
		}
		tempFilePath = new File(tempPath);
		if (!tempFilePath.exists()) {
			tempFilePath.mkdirs();
		}
		saveFilePath = new File(savePath);
		if (!saveFilePath.exists()) {
			saveFilePath.mkdirs();
		}
	}
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		doPost(req, resp);
	}
	
	@SuppressWarnings("unchecked")
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		boolean isMultipart = ServletFileUpload.isMultipartContent(req);
		try {
			if (isMultipart) {
				DiskFileItemFactory fileFactory = new DiskFileItemFactory();
				fileFactory.setSizeThreshold(TEMP_FILE_CACHE_SIZE);
				fileFactory.setRepository(tempFilePath);
				ServletFileUpload servletFileUpload = new ServletFileUpload(fileFactory);
				List<FileItem> items = servletFileUpload.parseRequest(req);
				Iterator<FileItem> fileIterator = items.iterator();
				while(fileIterator.hasNext()) {
					FileItem fileItem = fileIterator.next();
					if (!fileItem.isFormField()) {
						long fileSize = fileItem.getSize();
						if (fileSize > Long.valueOf(acceptLength).longValue()) {
							resultMap.put("status", "0");
							resultMap.put("msg", "文件大小不能超过"+Long.valueOf(acceptLength)/1021/1024+"MB");
							break;
						}
						if (!fileItem.getContentType().contains("image")) {
							resultMap.put("status", "0");
							resultMap.put("msg", "请上传图片");
							break;
						}
						String fullPathName = fileItem.getName(); //文件的完整上传路径
						int fileNamePosition = fullPathName.lastIndexOf("\\"); //具体文件名的开始位置
						String fileName = fullPathName.substring(fileNamePosition + 1); //获取图片的文件名
						String fileNameFullPath = savePath + File.separator + UUID.randomUUID() + fileName;
						File fileFullPath = new File(fileNameFullPath);
						fileItem.write(fileFullPath);
						resultMap.put("status", "1");
						resultMap.put("msg", fileNameFullPath);
					}
				}
			} else {
				resultMap.put("status", "0");
				resultMap.put("msg", "没有上传文件");
			}
		} catch(FileUploadException e) {
			resultMap.put("status", "0");
			resultMap.put("msg", "系统出现异常："+e.getMessage());
		} catch (Exception e) {
			resultMap.put("status", "0");
			resultMap.put("msg", "系统出现异常："+e.getMessage());
		}
		resp.setContentType("text/plain");
		JSONObject jsonObject = JSONObject.fromObject(resultMap);
		resp.getWriter().write(jsonObject.toString());
	}

	@Override
	protected void service(HttpServletRequest arg0, HttpServletResponse arg1) throws ServletException, IOException {
		
	}
	
	
	
	

}
