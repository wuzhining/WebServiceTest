package com.wzn.test;

package lppx2;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Event;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Listener;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.ole.win32.OleFrame;
import org.eclipse.swt.ole.win32.OleControlSite;
import org.eclipse.swt.ole.win32.OleAutomation;
import org.eclipse.swt.ole.win32.Variant;
import org.eclipse.swt.graphics.Color;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.widgets.FileDialog;
import java.io.*;
public class Lppx2 extends Composite {
private Label label = null;
private Label label1 = null;
private Text t_fileName = null;
private Label label2 = null;
private Text t_qty = null;
private Button b_print = null;
private OleControlSite CsCs = null ;
private OleAutomation CsAuto = null ;
private OleDispatch CsAppActiveDoc = null ;
private OleDispatch CsAppDocs = null ;
private OleFrame myFrame ;
private File currentFile = null ;
private Label l_messages = null;
private Button b_browse = null;
private FileDialog fd = null ;
public Lppx2(Composite parent, int style) {
super(parent, style);
initialize();
}
public static void main(String[] args) {
// TODO Auto-generated method stub
/* Before this is run, be sure to set up the launch configuration (Arguments->VM Arguments)
* for the correct SWT library path in order to run with the SWT dlls.
* The dlls are located in the SWT plugin jar.
* For example, on Windows the Eclipse SWT 3.1 plugin jar is:
* installation_directory\plugins\org.eclipse.swt.win32_3.1.0.jar
*/
Display display = Display.getDefault();
Shell shell = new Shell(display);
shell.setLayout(new FillLayout());
shell.setSize(new Point(550, 200));
new Lppx2(shell, SWT.NONE);
shell.open();
while (!shell.isDisposed()) {
if (!display.readAndDispatch())
display.sleep();
}
display.dispose();
}
private void quitAppNow ()
{
CsAppDocs.Invoke(“CloseAllDocuments”, new Variant[] {new Variant (false)}) ;
int[] cmdId = CsAuto.getIDsOfNames(new String[]{“Quit”}) ;
if (cmdId != null)
{
CsAuto.invoke(cmdId[0]) ;
}
CsAuto.dispose() ;
CsCs.dispose() ;
myFrame.dispose() ;
CsAuto = null ;
CsCs = null ;
myFrame = null ;
this.dispose () ;
}
private void initialize() {
this.getShell().setText(“Java_Lppx2.Application”);
this.getShell().addListener(SWT.Close,new Listener(){
public void handleEvent(Event event) {
quitAppNow () ;
}
}) ;
label = new Label(this, SWT.NONE);
label.setBounds(new org.eclipse.swt.graphics.Rectangle(199,10,112,28));
label.setText(“Active X for CodeSoft\nJava Demo”);
label.setAlignment(SWT.CENTER) ;
label1 = new Label(this, SWT.NONE);
label1.setBounds(new org.eclipse.swt.graphics.Rectangle(21,68,33,13));
label1.setText(“Open :”);
t_fileName = new Text(this, SWT.BORDER);
t_fileName.setBounds(new org.eclipse.swt.graphics.Rectangle(67,63,172,23));
t_fileName.addModifyListener(new org.eclipse.swt.events.ModifyListener() {
public void modifyText(org.eclipse.swt.events.ModifyEvent e) {
currentFile = new File (t_fileName.getText());
if ((!currentFile.canRead()) || (t_fileName.getText().length() < 4))
{
l_messages.setText(“Unable to read file : ” + t_fileName.getText()) ;
}
else
{
// Close all documents then open selected file
l_messages.setText(“Operation in progress”) ;
Variant [] arg = new Variant[1] ;
arg[0] = new Variant (false) ;
CsAppDocs.Invoke (“CloseAll”,arg) ;
arg[0] = new Variant (currentFile.getAbsolutePath()) ;
if (CsAppDocs.Invoke (“Open”,arg) != null)
{
l_messages.setText(currentFile.getAbsolutePath() + ” is now opened”) ;
}
else
{
l_messages.setText(“Unable to open ” + currentFile.getAbsolutePath()) ;
}
}
}
});
label2 = new Label(this, SWT.NONE);
label2.setBounds(new org.eclipse.swt.graphics.Rectangle(366,68,25,13));
label2.setText(“Qty :”);
t_qty = new Text(this, SWT.BORDER);
t_qty.setBounds(new org.eclipse.swt.graphics.Rectangle(398,63,45,22));
t_qty.setText(“1”);
b_print = new Button(this, SWT.NONE);
b_print.setBounds(new org.eclipse.swt.graphics.Rectangle(462,63,38,23));
b_print.setText(“Print”);
this.setSize(new org.eclipse.swt.graphics.Point(523,221));
// Creating ActiveX control
myFrame = new OleFrame (this,SWT.NONE) ;
CsCs = new OleControlSite (myFrame,SWT.NONE,”Lppx2.Application”) ;
CsAuto = new OleAutomation (CsCs) ;
Variant v2 = new OleDispatch(CsAuto).Invoke(“Documents”, new Variant[] {});
CsAppDocs = new OleDispatch (v2.getAutomation()) ;
fd = new FileDialog (this.getShell()) ;
fd.setFilterExtensions(new String[]{“*.lab”,”*.*”}) ;
l_messages = new Label(this, SWT.NONE);
l_messages.setBounds(new org.eclipse.swt.graphics.Rectangle(5,129,509,53));
l_messages.setText(“Waiting …”);
l_messages.setForeground(new Color (null,0,0,125)) ;
l_messages.setAlignment(SWT.CENTER) ;
b_browse = new Button(this, SWT.NONE);
b_browse.setBounds(new org.eclipse.swt.graphics.Rectangle(243,63,59,23));
b_browse.setText(“Browse…”);
b_browse.addSelectionListener(new org.eclipse.swt.events.SelectionAdapter() {
public void widgetSelected(org.eclipse.swt.events.SelectionEvent e) {
Variant v2 = new OleDispatch(CsAuto).Invoke(“DefaultFilePath”, new Variant[] {});
fd.setFilterPath(v2.getString()) ;
String s = fd.open() ;
if (s!= null)
{
t_fileName.setText(s) ;
}
}
});
b_print.addSelectionListener(new org.eclipse.swt.events.SelectionAdapter() {
public void widgetSelected(org.eclipse.swt.events.SelectionEvent e) {
try
{
// Print current document with qty argument
Integer a = new Integer (t_qty.getText()) ;
l_messages.setText(“Operation in progress”) ;
Variant [] arg = new Variant[1] ;
arg[0] = new Variant ((short)a.intValue()) ;
Variant v2 = new OleDispatch(CsAuto).Invoke(“ActiveDocument”, new Variant[] {});
try
{
CsAppActiveDoc = new OleDispatch (v2.getAutomation()) ;
}
catch (Exception excpt)
{
l_messages.setText(“You can’t print anything until a document is opened !”) ;
return ;
}
if (CsAppActiveDoc.Invoke (“PrintDocument”,arg) != null)
{
l_messages.setText(“Ok”) ;
}
else
{
l_messages.setText(“Unable to print !”) ;
}
}
catch (java.lang.NumberFormatException excpt)
{
l_messages.setText(“Qty field must be an integer value !\n\n” + excpt.getMessage()) ;
return ;
}
}
});
}
} // @jve:decl-index=0:visual-constraint=”9,5″

