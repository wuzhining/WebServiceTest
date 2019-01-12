
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

    private final static QName _StopServiceResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "StopServiceResponse");
    private final static QName _StartServiceResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "StartServiceResponse");
    private final static QName _SetTimeServiceResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "SetTimeServiceResponse");
    private final static QName _SetIP_QNAME = new QName("http://impl.service.jax.mes.org/", "SetIP");
    private final static QName _StopService_QNAME = new QName("http://impl.service.jax.mes.org/", "StopService");
    private final static QName _SetTaktService_QNAME = new QName("http://impl.service.jax.mes.org/", "SetTaktService");
    private final static QName _SetTaktServiceResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "SetTaktServiceResponse");
    private final static QName _GetMachineParam_QNAME = new QName("http://impl.service.jax.mes.org/", "getMachineParam");
    private final static QName _GetMachineParamResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "getMachineParamResponse");
    private final static QName _SetID_QNAME = new QName("http://impl.service.jax.mes.org/", "SetID");
    private final static QName _SetIDResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "SetIDResponse");
    private final static QName _SetIPResponse_QNAME = new QName("http://impl.service.jax.mes.org/", "SetIPResponse");
    private final static QName _SetTimeService_QNAME = new QName("http://impl.service.jax.mes.org/", "SetTimeService");
    private final static QName _StartService_QNAME = new QName("http://impl.service.jax.mes.org/", "StartService");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: org.mes.jax.test.config
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link StopServiceResponse }
     * 
     */
    public StopServiceResponse createStopServiceResponse() {
        return new StopServiceResponse();
    }

    /**
     * Create an instance of {@link StartServiceResponse }
     * 
     */
    public StartServiceResponse createStartServiceResponse() {
        return new StartServiceResponse();
    }

    /**
     * Create an instance of {@link SetIP }
     * 
     */
    public SetIP createSetIP() {
        return new SetIP();
    }

    /**
     * Create an instance of {@link StopService }
     * 
     */
    public StopService createStopService() {
        return new StopService();
    }

    /**
     * Create an instance of {@link SetTaktService }
     * 
     */
    public SetTaktService createSetTaktService() {
        return new SetTaktService();
    }

    /**
     * Create an instance of {@link SetTaktServiceResponse }
     * 
     */
    public SetTaktServiceResponse createSetTaktServiceResponse() {
        return new SetTaktServiceResponse();
    }

    /**
     * Create an instance of {@link SetTimeServiceResponse }
     * 
     */
    public SetTimeServiceResponse createSetTimeServiceResponse() {
        return new SetTimeServiceResponse();
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
     * Create an instance of {@link StartService }
     * 
     */
    public StartService createStartService() {
        return new StartService();
    }

    /**
     * Create an instance of {@link SetID }
     * 
     */
    public SetID createSetID() {
        return new SetID();
    }

    /**
     * Create an instance of {@link SetIDResponse }
     * 
     */
    public SetIDResponse createSetIDResponse() {
        return new SetIDResponse();
    }

    /**
     * Create an instance of {@link SetIPResponse }
     * 
     */
    public SetIPResponse createSetIPResponse() {
        return new SetIPResponse();
    }

    /**
     * Create an instance of {@link SetTimeService }
     * 
     */
    public SetTimeService createSetTimeService() {
        return new SetTimeService();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StopServiceResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "StopServiceResponse")
    public JAXBElement<StopServiceResponse> createStopServiceResponse(StopServiceResponse value) {
        return new JAXBElement<StopServiceResponse>(_StopServiceResponse_QNAME, StopServiceResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StartServiceResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "StartServiceResponse")
    public JAXBElement<StartServiceResponse> createStartServiceResponse(StartServiceResponse value) {
        return new JAXBElement<StartServiceResponse>(_StartServiceResponse_QNAME, StartServiceResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetTimeServiceResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetTimeServiceResponse")
    public JAXBElement<SetTimeServiceResponse> createSetTimeServiceResponse(SetTimeServiceResponse value) {
        return new JAXBElement<SetTimeServiceResponse>(_SetTimeServiceResponse_QNAME, SetTimeServiceResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetIP }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetIP")
    public JAXBElement<SetIP> createSetIP(SetIP value) {
        return new JAXBElement<SetIP>(_SetIP_QNAME, SetIP.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StopService }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "StopService")
    public JAXBElement<StopService> createStopService(StopService value) {
        return new JAXBElement<StopService>(_StopService_QNAME, StopService.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetTaktService }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetTaktService")
    public JAXBElement<SetTaktService> createSetTaktService(SetTaktService value) {
        return new JAXBElement<SetTaktService>(_SetTaktService_QNAME, SetTaktService.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetTaktServiceResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetTaktServiceResponse")
    public JAXBElement<SetTaktServiceResponse> createSetTaktServiceResponse(SetTaktServiceResponse value) {
        return new JAXBElement<SetTaktServiceResponse>(_SetTaktServiceResponse_QNAME, SetTaktServiceResponse.class, null, value);
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

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetID }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetID")
    public JAXBElement<SetID> createSetID(SetID value) {
        return new JAXBElement<SetID>(_SetID_QNAME, SetID.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetIDResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetIDResponse")
    public JAXBElement<SetIDResponse> createSetIDResponse(SetIDResponse value) {
        return new JAXBElement<SetIDResponse>(_SetIDResponse_QNAME, SetIDResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetIPResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetIPResponse")
    public JAXBElement<SetIPResponse> createSetIPResponse(SetIPResponse value) {
        return new JAXBElement<SetIPResponse>(_SetIPResponse_QNAME, SetIPResponse.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link SetTimeService }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "SetTimeService")
    public JAXBElement<SetTimeService> createSetTimeService(SetTimeService value) {
        return new JAXBElement<SetTimeService>(_SetTimeService_QNAME, SetTimeService.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link StartService }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://impl.service.jax.mes.org/", name = "StartService")
    public JAXBElement<StartService> createStartService(StartService value) {
        return new JAXBElement<StartService>(_StartService_QNAME, StartService.class, null, value);
    }

}
