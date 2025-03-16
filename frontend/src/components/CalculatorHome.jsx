import { Slider } from "@mui/material";
import React, { useState, useMemo } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";

export const CalculatorHome = () => {
  const [loanAmount, setLoanAmount] = useState(10);
  const [loanDuration, setLoanDuration] = useState(10);
  const [interestRate, setInterestRate] = useState(7.5);

  const handleLoanAmountChange = (event, newValue) => setLoanAmount(newValue);
  const handleLoanDurationChange = (event, newValue) => setLoanDuration(newValue);
  const handleInterestRateChange = (event, newValue) => setInterestRate(newValue);

  // Optimized EMI Calculation using useMemo
  const { emi, totalInterest, totalAmount } = useMemo(() => {
    if (loanAmount === 0 || interestRate === 0 || loanDuration === 0)
      return { emi: 0, totalInterest: 0, totalAmount: 0 };

    const principal = loanAmount * 100000;
    const monthlyInterestRate = interestRate / (12 * 100);
    const numberOfPayments = loanDuration * 12;

    const emiValue =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalInterestAmount = emiValue * numberOfPayments - principal;
    const totalPayableAmount = principal + totalInterestAmount;

    return {
      emi: emiValue,
      totalInterest: totalInterestAmount,
      totalAmount: totalPayableAmount,
    };
  }, [loanAmount, loanDuration, interestRate]);

  const formatToIndianCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      bg-white shadow-lg rounded-lg p-5 w-full max-w-[400px] h-[450px] z-[100] overflow-hidden flex flex-col justify-between"
    >
      <div className="text-center">
        <h1 className="text-lg font-medium">Home Loan EMI Calculator</h1>
        <hr className="w-1/2 mx-auto h-[3px] rounded-full mt-1 bg-gradient-to-r from-indigo-500 to-purple-400" />
      </div>

      <div className="flex flex-col gap-3">
        <SliderField label="Loan Amount" value={loanAmount} min={1} max={100} step={1} onChange={handleLoanAmountChange} suffix="L" />
        <SliderField label="Tenure (Years)" value={loanDuration} min={1} max={30} step={1} onChange={handleLoanDurationChange} suffix="Years" />
        <SliderField label="Interest Rate (% P.A.)" value={interestRate} min={0.5} max={15} step={0.1} onChange={handleInterestRateChange} suffix="%" />
      </div>

      {/* Results */}
      <div className="bg-gray-50 p-3 rounded-lg shadow-md text-center">
        <h2 className="text-sm font-semibold text-blue-600">
          Monthly EMI: ₹{formatToIndianCurrency(emi)}
        </h2>
        <p className="text-xs font-medium">
          Principal: ₹{formatToIndianCurrency(loanAmount * 100000)}
        </p>
        <p className="text-xs font-medium">
          Interest: ₹{formatToIndianCurrency(totalInterest)}
        </p>
        <p className="text-xs font-medium">
          Total Payable: ₹{formatToIndianCurrency(totalAmount)}
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex flex-col items-center">
        <p className="text-center text-xs font-medium">Still Confused?</p>
        <button className="flex items-center gap-2 bg-[#1d2a3b] text-white py-1 px-3 mt-1 rounded-lg text-xs hover:bg-opacity-90">
          <PhoneIcon fontSize="small" />
          <Link to="/" className="font-semibold">
            +91-9990052554
          </Link>
        </button>
      </div>
    </div>
  );
};

const SliderField = ({ label, value, min, max, step, onChange, suffix }) => (
  <div className="text-sm">
    <div className="flex justify-between">
      <p>{label}</p>
      <p>
        {value} {suffix}
      </p>
    </div>
    <Slider value={value} onChange={onChange} min={min} max={max} step={step} sx={{ color: "#1d2a3b" }} />
  </div>
);
