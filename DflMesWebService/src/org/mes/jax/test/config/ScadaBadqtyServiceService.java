
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
@WebServiceClient(name = "ScadaBadqtyServiceService", targetNamespace = "http://impl.service.jax.mes.org/", wsdlLocation = "http://localhost:8091/DflMesWebService/ScadaBadqtyService?wsdl")
public class ScadaBadqtyServiceService
    extends Service
{

    private final static URL SCADABADQTYSERVICESERVICE_WSDL_LOCATION;
    private final static WebServiceException SCADABADQTYSERVICESERVICE_EXCEPTION;
    private final static QName SCADABADQTYSERVICESERVICE_QNAME = new QName("http://impl.service.jax.mes.org/", "ScadaBadqtyServiceService");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("http://localhost:8091/DflMesWebService/ScadaBadqtyService?wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        SCADABADQTYSERVICESERVICE_WSDL_LOCATION = url;
        SCADABADQTYSERVICESERVICE_EXCEPTION = e;
    }

    public ScadaBadqtyServiceService() {
        super(__getWsdlLocation(), SCADABADQTYSERVICESERVICE_QNAME);
    }

    public ScadaBadqtyServiceService(WebServiceFeature... features) {
        super(__getWsdlLocation(), SCADABADQTYSERVICESERVICE_QNAME, features);
    }

    public ScadaBadqtyServiceService(URL wsdlLocation) {
        super(wsdlLocation, SCADABADQTYSERVICESERVICE_QNAME);
    }

    public ScadaBadqtyServiceService(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, SCADABADQTYSERVICESERVICE_QNAME, features);
    }

    public ScadaBadqtyServiceService(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public ScadaBadqtyServiceService(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName, features);
    }

    /**
     * 
     * @return
     *     returns ScadaBadqtyService
     */
    @WebEndpoint(name = "ScadaBadqtyServicePort")
    public ScadaBadqtyService getScadaBadqtyServicePort() {
        return super.getPort(new QName("http://impl.service.jax.mes.org/", "ScadaBadqtyServicePort"), ScadaBadqtyService.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns ScadaBadqtyService
     */
    @WebEndpoint(name = "ScadaBadqtyServicePort")
    public ScadaBadqtyService getScadaBadqtyServicePort(WebServiceFeature... features) {
        return super.getPort(new QName("http://impl.service.jax.mes.org/", "ScadaBadqtyServicePort"), ScadaBadqtyService.class, features);
    }

    private static URL __getWsdlLocation() {
        if (SCADABADQTYSERVICESERVICE_EXCEPTION!= null) {
            throw SCADABADQTYSERVICESERVICE_EXCEPTION;
        }
        return SCADABADQTYSERVICESERVICE_WSDL_LOCATION;
    }

}
