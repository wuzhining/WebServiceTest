
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

    private final static QName _AddScadaTprodduraResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "addScadaTprodduraResponse");
    private final static QName _AddScadaTproddura_QNAME = new QName("http://impl.service.jax.mes.org/", "addScadaTproddura");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.mes.jax.test.config
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link AddScadaTprodduraResponse }
     * 
     */
    public AddScadaTprodduraResponse createAddScadaTprodduraResponse() {
        return new AddScadaTprodduraResponse();
    }

    /**
     * Create an instance of {@link AddScadaTproddura }
     * 
     */
    public AddScadaTproddura createAddScadaTproddura() {
        return new AddScadaTproddura();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddScadaTprodduraResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "addScadaTprodduraResponse")
    public JAXBElement<AddScadaTprodduraResponse> createAddScadaTprodduraResponse(AddScadaTprodduraResponse value) {
        return new JAXBElement<AddScadaTprodduraResponse>(_AddScadaTprodduraResponse_QNAME, AddScadaTprodduraResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link AddScadaTproddura }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "addScadaTproddura")
    public JAXBElement<AddScadaTproddura> createAddScadaTproddura(AddScadaTproddura value) {
        return new JAXBElement<AddScadaTproddura>(_AddScadaTproddura_QNAME, AddScadaTproddura.class, null, value);
    }

}
