import React, { useState, useEffect } from "react";

function InvoiceCompute() {
  const [crsp, setCRSP] = useState();
  const [YOM, setYOM] = useState();
  const [LandingCost, setLandingCost] = useState(0);
  const [customsValue, setCustomsValue] = useState(0);
  const [duty, setDuty] = useState(0);
  const [exciseDuty, setExciseDuty] = useState(0);
  const [exciseValue, setExciseValue] = useState(0);
  const [vat, setVat] = useState(0);
  const [vatValue, setVatValue] = useState(0);
  const [rdlLevy, setRdlLevy] = useState(0);
  const [idfLevy, setIdfLevy] = useState(0);
  const [totalDuty, setTotalDuty] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const IDF = 0.035,
    RDL = 0.02;
  const importDuty = 0.25;

  useEffect(() => {
    if (isSubmitting) {
      const calculateDuty = () => {
        const customsValue = parseInt(crsp);
        const duty = importDuty * customsValue;
        const exciseDuty = Math.round((customsValue + duty) * 0.2);
        const vatValue = Math.round(customsValue + duty + exciseDuty);
        const vat = Math.round(0.14 * vatValue);
        const exciseValue = Math.round(duty + customsValue);
        const idfLevy = Math.round(customsValue * IDF);
        const rdlLevy = Math.round(customsValue * RDL);
        const totalDuty = Math.round(
          duty + exciseDuty + vat + idfLevy + rdlLevy
        );
        const landingCost = Math.round(totalDuty + customsValue);
        setCustomsValue(customsValue);
        setDuty(duty);
        setExciseValue(exciseValue);
        setExciseDuty(exciseDuty);
        setVatValue(vatValue);
        setVat(vat);
        setIdfLevy(idfLevy);
        setRdlLevy(rdlLevy);
        setTotalDuty(totalDuty);
        setLandingCost(landingCost);
      };
      calculateDuty();
      setIsSubmitting(false);
    }
  }, [crsp, importDuty, IDF, RDL, isSubmitting]);

  const validateInvoiceValue = () => {
    if (!crsp) {
      alert("Please Enter the Invoice Value");
      console.log("Please Enter the Invoice Value");
      console.log(crsp);
    } else {
      setIsSubmitting(true);
    }
  };

  //Functions section
  const handleSubmit = () => {
    validateInvoiceValue();
  };

  return (
    <div className="container">
      <div className="col-form-group">
        <label className="col-sm-3">Enter Invoice Value</label>
        <input className="col-md-6" onChange={(e) => setCRSP(e.target.value)} />
      </div>

      <div className="col-text-center mb-3">
        <button
          type="submit"
          className="btn btn-outline-dark mt-3"
          onClick={handleSubmit}
        >
          Compute Landing Cost
        </button>
      </div>
      <div className="form-group">
        <div>
          <label className="col-sm-6 col-form-label">Customs Value</label>
          <label className="col-md-6 text-warning">
            {Math.round(customsValue).toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">
            Projected Import Duty
          </label>
          <label className="col-md-6 text-warning">
            {Math.round(duty).toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">Excise Value</label>
          <label className="col-md-6 text-warning">
            {exciseValue?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">
            Projected Excise Duty
          </label>
          <label className="col-md-6 text-warning">
            {exciseDuty?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">VAT Value</label>
          <label className="col-md-6 text-warning">
            {vatValue?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">VAT 14%</label>
          <label className="col-md-6 text-warning">
            {vat?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-md-6 col-sm-6 col-form-label">
            Infrastructure Development Fund levy
          </label>
          <label className="col-md-6 text-warning">
            {idfLevy?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">
            Railway Development Fund levy
          </label>
          <label className="col-md-6 text-warning">
            {rdlLevy?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">
            Total Projected Duty
          </label>
          <label className="col-md-6 text-warning">
            {totalDuty?.toLocaleString("en-US")}
          </label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">Total Import Cost</label>
          <label className="col-md-6 text-warning">
            {LandingCost?.toLocaleString("en-US")}
          </label>
        </div>
      </div>
    </div>
  );
}

export default InvoiceCompute;
