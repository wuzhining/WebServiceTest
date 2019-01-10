package com.iPlant.mes.common.web;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.iPlant.frame.util.StringUtils;

@SuppressWarnings("serial")
public class ImageFileDownloadServlet extends HttpServlet {
	
	private String filePath;
	
	public ImageFileDownloadServlet() throws IOException {
		initServlet();
	}
	
	/**
	 * 初始化文件上传组件的相关参数
	 * 
	 * @throws IOException
	 */
	private void initServlet() throws IOException {
		String fileUploadProperties = getInitParameter("fileUploadProperties");
		Properties props = new Properties();
		InputStream in = this.getClass().getResourceAsStream(fileUploadProperties);
		props.load(in);
		filePath = props.getProperty("file.savepath");
		if (StringUtils.isEmpty(filePath)) {
			throw new IOException("需要设置上传文件的保存路径");
		}
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
		String path = req.getParameter("path");
		// 没有传图片路径则直接返回
		if (StringUtils.isEmpty(path)) {
			return;
		}
		//请求的图片路径不合法则直接返回
		if (!path.contains(filePath)) {
			return;
		}
		resp.setContentType("image/jpeg");
		FileInputStream fileInputStream = null;
		BufferedInputStream bufInputStream = null;
		BufferedOutputStream bufOutSteam = null;
		try {
			fileInputStream = new FileInputStream(path);
			bufInputStream = new BufferedInputStream(fileInputStream);
			bufOutSteam = new BufferedOutputStream(resp.getOutputStream());
			byte[] data = new byte[10*1024];
			int size = 0;
            size = bufInputStream.read(data);
            while (size != -1) {
            	bufOutSteam.write(data, 0, size);
                size = bufInputStream.read(data);
            }
            bufOutSteam.flush();
		} catch (FileNotFoundException e) {
			
		} catch (IOException e) {
			
		} finally {
			if (fileInputStream != null) {
				try {
					fileInputStream.close();
				} catch (IOException e) {
				}
			}
			if (bufInputStream != null) {
				try {
					bufInputStream.close();
				} catch (IOException e) {
				}
			}
			if (bufOutSteam != null) {
				try {
					bufOutSteam.close();
				} catch (IOException e) {
				}
			}
		}
	}

	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
		doGet(req, resp);
	}
	
	

}
