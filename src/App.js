// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

const App = () => {
  const [crsp, setCRSP] = useState(0);
  const [YOM, setYOM] = useState();
  const [Dep, setDep] = useState();
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

  function depreciation() {
    const currentYear = new Date().getFullYear();
    const age = currentYear - YOM;
    if (!crsp) {
      alert(`Please select a vehicle from the list`);
    } else if (YOM == null) {
      alert("Please Enter YOM");
    } else if (YOM >= currentYear) {
      setDep(0);
    } else if (YOM < currentYear - 7) {
      alert(`Only Cars from ${currentYear - 7} can be imported!`);
    } else {
      if (age <= 2) {
        setDep(15);
      } else if (age <= 3) {
        setDep(20);
      } else if (age <= 4) {
        setDep(30);
      } else if (age <= 5) {
        setDep(40);
      } else if (age <= 6) {
        setDep(50);
      } else if (age <= 7) {
        setDep(60);
      } else if (age <= 8) {
        setDep(70);
      }
    }
    return Dep;
  }

  const handleSubmit = () => {
    depreciation();
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting) {
      const calculateDuty = () => {
        const customsValue =
          ((crsp / 1.25) * (1 - Dep / 100)) / 1.25 / 1.2 / 1.14;
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
  }, [crsp, Dep, importDuty, IDF, RDL, isSubmitting]);

  return (
    <div className="container">
      {/* <div className="d-flex justify-content-center"></div> */}
      <div className="form-group">
        <label className="col-sm-4 col-form-label">Select Vehicle</label>
        {/* <input className="" onChange={(e) => setCRSP(e.target.value)} />
         */}
        <select
          className="form-select-sm col-sm-6"
          onChange={(e) => setCRSP(e.target.value)}
        >
          <option selected disabled>
            --Select Vehicle--
          </option>
          <option value={1755000}>Toyota Probox 1500cc 2WD</option>
          <option>Car Two</option>
          <option>Car Three</option>
        </select>
      </div>
      <div className="form-group mb-3">
        <label className="col-sm-4 col-form-label">Year of Manufacture</label>
        {/* <input onChange={(e) => setYOM(e.target.value)} /> */}
        <select
          className="form-select-sm col-sm-6"
          onChange={(e) => setYOM(e.target.value)}
        >
          <option selected disabled>
            --Select YOM--
          </option>
          <option value={new Date().getFullYear()}>2023</option>
          <option value={new Date().getFullYear() - 1}>
            {new Date().getFullYear() - 1}
          </option>
          <option value={new Date().getFullYear() - 2}>
            {new Date().getFullYear() - 2}
          </option>
          <option value={new Date().getFullYear() - 3}>
            {new Date().getFullYear() - 3}
          </option>
          <option value={new Date().getFullYear() - 4}>
            {new Date().getFullYear() - 4}
          </option>
          <option value={new Date().getFullYear() - 5}>
            {new Date().getFullYear() - 5}
          </option>
          <option value={new Date().getFullYear() - 6}>
            {new Date().getFullYear() - 6}
          </option>
          <option value={new Date().getFullYear() - 7}>
            {new Date().getFullYear() - 7}
          </option>
        </select>
      </div>
      <div className="col-text-center mb-3">
        <button
          type="submit"
          className="btn btn-outline-success mt-3"
          onClick={handleSubmit}
        >
          Compute Landing Cost
        </button>
      </div>
      <div className="form-group">
        <div>
          <label className="col-sm-6 col-form-label">Depreciation (%)</label>
          <label className="col-md-6 text-warning mr-5">{Dep}%</label>
        </div>
        <div>
          <label className="col-sm-6 col-form-label">CRSP</label>
          <label className="col-sm-6 text-warning">{crsp}</label>
        </div>

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
};

export default App;
