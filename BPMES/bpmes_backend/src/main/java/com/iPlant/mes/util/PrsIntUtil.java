package com.iPlant.mes.util;

public class PrsIntUtil {

	   public  PrsIntUtil ()     
	    {
		   
	    }
	    public static int zh(String s)
	    {
	      int l=0;
	     char a[]=s.toCharArray();
	     if(a[0]=='-')
	     {
	      for(int i=1;i<a.length;i++)
	      {
	       l=l*10+(a[i]-48);
	       
	      }
	      l=l*(-1);
	      
	     }
	     else
	     {
	      for(int i=0;i<a.length;i++)
	      {
	       l=l*10+(a[i]-48);
	       
	      }
	     }   
	     return l;
	    }
}
