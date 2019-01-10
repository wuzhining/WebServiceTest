package com.wzn.test;

import javax.print.Doc;
import javax.print.DocFlavor;
import javax.print.PrintException;
import javax.print.PrintService;
import javax.print.PrintServiceLookup;
import javax.print.SimpleDoc;
import javax.print.attribute.PrintServiceAttribute;
import javax.print.attribute.standard.PrinterName;

import fr.w3blog.zpl.constant.ZebraFont;
import fr.w3blog.zpl.model.ZebraLabel;
//import fr.w3blog.zpl.model.ZebraUtils;
import fr.w3blog.zpl.model.element.ZebraBarCode39;
import fr.w3blog.zpl.model.element.ZebraText;

public class PrintTest {
	public static void main(String[] args) {
		ZebraLabel zebraLabel = new ZebraLabel(412, 412);
		zebraLabel.setDefaultZebraFont(ZebraFont.ZEBRA_ZERO);

		zebraLabel.addElement(new ZebraText(10, 84, "Product:", 14));
		zebraLabel.addElement(new ZebraText(395, 85, "Camera", 14));

		zebraLabel.addElement(new ZebraText(10, 161, "CA201212AA", 14));

		//Add Code Bar 39
		zebraLabel.addElement(new ZebraBarCode39(10, 297, "CA201212AA", 118, 2, 2));
		

		zebraLabel.addElement(new ZebraText(10, 365, "Qté:", 11));
		zebraLabel.addElement(new ZebraText(180, 365, "3", 11));
		zebraLabel.addElement(new ZebraText(317, 365, "QA", 11));

		zebraLabel.addElement(new ZebraText(10, 520, "Ref log:", 11));
		zebraLabel.addElement(new ZebraText(180, 520, "0035", 11));
		zebraLabel.addElement(new ZebraText(10, 596, "Ref client:", 11));
		zebraLabel.addElement(new ZebraText(180, 599, "1234", 11));
		
		zebraLabel.getZplCode();
		
		PrintService[] services = PrintServiceLookup.lookupPrintServices(null, null);
		
		PrintService psZebra = null;
		String printerName="ZDesigner GK888t (EPL)";
		for (int i = 0; i < services.length; i++) {
		        PrintServiceAttribute attr = services[i].getAttribute(PrinterName.class);
		        String sPrinterName = ((PrinterName) attr).getValue();
//			if (sPrinterName.toLowerCase().indexOf(printerName) >= 0) {
			if (sPrinterName.equals(printerName)) {
			       psZebra = services[i];
				break;
			}
		}
		String zplCode = "~DGR:SAMPLE.GRF," + 
				4 + "," + // 图形中的总字节数 
				4 + "," // 每行的字节数 
				+ "hha" // 该数据字符串用于定义图像,也表示图像的 ASCII 十六进制。每个字符表示横向的 8 个点。 
				+ "~SD" + "AA" + "^XA" + "^FO50,20^XGR:SAMPLE.GRF,2,2^FS" // FO后面的为起始坐标,^SF前的两个参数分别为横向、纵向扩展比例 
				+ "^XZ";// 指令结束 
				// 调用打印机,发送ZPL指令 
//		Doc doc = new SimpleDoc(  zplCode.getBytes(), DocFlavor.BYTE_ARRAY.AUTOSENSE, null); 
		Doc doc = new SimpleDoc(  zebraLabel.getZplCode().getBytes(), DocFlavor.BYTE_ARRAY.AUTOSENSE, null); 
		try {
			psZebra.createPrintJob().print(doc, null);
		} catch (PrintException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		};
		
//		ZebraUtils.printZpl(zebraLabel, ip, port);
	}
}
