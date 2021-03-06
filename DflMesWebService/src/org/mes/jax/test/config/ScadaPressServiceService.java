
package org.mes.jax.test.config;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.WebServiceFeature;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2.9-b130926.1035
 * Generated source version: 2.2
 * 
 */
@WebServiceClient(name = "ScadaPressServiceService", targetNamespace = "http://impl.service.jax.mes.org/", wsdlLocation = "http://localhost:8091/DflMesWebService/ScadaPressService?wsdl")
public class ScadaPressServiceService
    extends Service
{

    private final static URL SCADAPRESSSERVICESERVICE_WSDL_LOCATION;
    private final static WebServiceException SCADAPRESSSERVICESERVICE_EXCEPTION;
    private final static QName SCADAPRESSSERVICESERVICE_QNAME = new QName("http://impl.service.jax.mes.org/", "ScadaPressServiceService");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("http://localhost:8091/DflMesWebService/ScadaPressService?wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        SCADAPRESSSERVICESERVICE_WSDL_LOCATION = url;
        SCADAPRESSSERVICESERVICE_EXCEPTION = e;
    }

    public ScadaPressServiceService() {
        super(__getWsdlLocation(), SCADAPRESSSERVICESERVICE_QNAME);
    }

    public ScadaPressServiceService(WebServiceFeature... features) {
        super(__getWsdlLocation(), SCADAPRESSSERVICESERVICE_QNAME, features);
    }

    public ScadaPressServiceService(URL wsdlLocation) {
        super(wsdlLocation, SCADAPRESSSERVICESERVICE_QNAME);
    }

    public ScadaPressServiceService(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, SCADAPRESSSERVICESERVICE_QNAME, features);
    }

    public ScadaPressServiceService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ScadaPressServiceService(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName, features);
    }

    /**
     * 
     * @return
     *     returns ScadaPressService
     */
    @WebEndpoint(name = "ScadaPressServicePort")
    public ScadaPressService getScadaPressServicePort() {
        return super.getPort(new QName("http://impl.service.jax.mes.org/", "ScadaPressServicePort"), ScadaPressService.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns ScadaPressService
     */
    @WebEndpoint(name = "ScadaPressServicePort")
    public ScadaPressService getScadaPressServicePort(WebServiceFeature... features) {
        return super.getPort(new QName("http://impl.service.jax.mes.org/", "ScadaPressServicePort"), ScadaPressService.class, features);
    }

    private static URL __getWsdlLocation() {
        if (SCADAPRESSSERVICESERVICE_EXCEPTION!= null) {
            throw SCADAPRESSSERVICESERVICE_EXCEPTION;
        }
        return SCADAPRESSSERVICESERVICE_WSDL_LOCATION;
    }

}
