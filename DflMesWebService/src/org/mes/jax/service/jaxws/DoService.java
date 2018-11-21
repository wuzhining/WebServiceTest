
package org.mes.jax.service.jaxws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlRootElement(name = "doService", namespace = "http://service.jax.mes.org/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "doService", namespace = "http://service.jax.mes.org/")
public class DoService {

    @XmlElement(name = "arg0", namespace = "")
    private Object arg0;

    /**
     * 
     * @return
     *     returns Object
     */
    public Object getArg0() {
        return this.arg0;
    }

    /**
     * 
     * @param arg0
     *     the value for the arg0 property
     */
    public void setArg0(Object arg0) {
        this.arg0 = arg0;
    }

}
