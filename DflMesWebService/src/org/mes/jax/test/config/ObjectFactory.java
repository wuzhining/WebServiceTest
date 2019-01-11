
package org.mes.jax.test.config;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the org.mes.jax.test.config package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetMachineParam_QNAME = new QName("http://impl.service.jax.mes.org/", "getMachineParam");
    private final static QName _GetMachineParamResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "getMachineParamResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.mes.jax.test.config
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetMachineParamResponse }
     * 
     */
    public GetMachineParamResponse createGetMachineParamResponse() {
        return new GetMachineParamResponse();
    }

    /**
     * Create an instance of {@link GetMachineParam }
     * 
     */
    public GetMachineParam createGetMachineParam() {
        return new GetMachineParam();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetMachineParam }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "getMachineParam")
    public JAXBElement<GetMachineParam> createGetMachineParam(GetMachineParam value) {
        return new JAXBElement<GetMachineParam>(_GetMachineParam_QNAME, GetMachineParam.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetMachineParamResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "getMachineParamResponse")
    public JAXBElement<GetMachineParamResponse> createGetMachineParamResponse(GetMachineParamResponse value) {
        return new JAXBElement<GetMachineParamResponse>(_GetMachineParamResponse_QNAME, GetMachineParamResponse.class, null, value);
    }

}
