package com.wzn.domain;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ScadaCustomWorkstation {

  private String opFlagIn;
  private String deviceSnIn;
  private String workSnIn;
  private String empNoIn;
  private String proSnIn;
  private String boxSnIn;
  private String conSnIn;
  private String moNumIn;
  private String resultFlagOut;
  private String flowCodeOut;
  private String nextStopOut;
  private String reslutMessageOut;
  private String moNumOut;
  private String woNumOut;


  public String getOpFlagIn() {
    return opFlagIn;
  }

  public void setOpFlagIn(String opFlagIn) {
    this.opFlagIn = opFlagIn;
  }


  public String getDeviceSnIn() {
    return deviceSnIn;
  }

  public void setDeviceSnIn(String deviceSnIn) {
    this.deviceSnIn = deviceSnIn;
  }


  public String getWorkSnIn() {
    return workSnIn;
  }

  public void setWorkSnIn(String workSnIn) {
    this.workSnIn = workSnIn;
  }


  public String getEmpNoIn() {
    return empNoIn;
  }

  public void setEmpNoIn(String empNoIn) {
    this.empNoIn = empNoIn;
  }


  public String getProSnIn() {
    return proSnIn;
  }

  public void setProSnIn(String proSnIn) {
    this.proSnIn = proSnIn;
  }


  public String getBoxSnIn() {
    return boxSnIn;
  }

  public void setBoxSnIn(String boxSnIn) {
    this.boxSnIn = boxSnIn;
  }


  public String getConSnIn() {
    return conSnIn;
  }

  public void setConSnIn(String conSnIn) {
    this.conSnIn = conSnIn;
  }


  public String getMoNumIn() {
    return moNumIn;
  }

  public void setMoNumIn(String moNumIn) {
    this.moNumIn = moNumIn;
  }


  public String getResultFlagOut() {
    return resultFlagOut;
  }

  public void setResultFlagOut(String resultFlagOut) {
    this.resultFlagOut = resultFlagOut;
  }


  public String getFlowCodeOut() {
    return flowCodeOut;
  }

  public void setFlowCodeOut(String flowCodeOut) {
    this.flowCodeOut = flowCodeOut;
  }


  public String getNextStopOut() {
    return nextStopOut;
  }

  public void setNextStopOut(String nextStopOut) {
    this.nextStopOut = nextStopOut;
  }


  public String getReslutMessageOut() {
    return reslutMessageOut;
  }

  public void setReslutMessageOut(String reslutMessageOut) {
    this.reslutMessageOut = reslutMessageOut;
  }


  public String getMoNumOut() {
    return moNumOut;
  }

  public void setMoNumOut(String moNumOut) {
    this.moNumOut = moNumOut;
  }


  public String getWoNumOut() {
    return woNumOut;
  }

  public void setWoNumOut(String woNumOut) {
    this.woNumOut = woNumOut;
  }

}
