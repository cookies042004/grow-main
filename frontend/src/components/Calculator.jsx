import { Slider } from "@mui/material";
import React, { useState, useEffect } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

import PhoneIcon from "@mui/icons-material/Phone";
import { Dvr } from "@mui/icons-material";

export const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState(10); // Default loan amount in lakhs
  const [loanDuration, setLoanDuration] = useState(10); // Default tenure in years
  const [interestRate, setInterestRate] = useState(7.5); // Default interest rate

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleLoanDurationChange = (event, newValue) => {
    setLoanDuration(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  // Calculate EMI, Interest Amount, and Total Amount Payable
  useEffect(() => {
    const principal = loanAmount * 100000; // Convert lakhs to actual amount
    const monthlyInterestRate = interestRate / (12 * 100); // Monthly interest rate in decimal
    const numberOfPayments = loanDuration * 12; // Total number of monthly payments

    // EMI calculation
    const emiValue =
      (principal *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalInterestAmount = emiValue * numberOfPayments - principal;
    const totalPayableAmount = principal + totalInterestAmount;

    setEmi(emiValue);
    setTotalInterest(totalInterestAmount);
    setTotalAmount(totalPayableAmount);
  }, [loanAmount, loanDuration, interestRate]);

  // Formatter for Indian currency format
  const formatToIndianCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="max-w-[1280px] mx-auto my-5 bg-white rounded-lg shadow-lg shadow-gray- p-8 lg:p-10 border z-[99999999]">
      <div className="grid grid-cols-1">
        {/* Header Section */}
        <div className="col-span-2 mb-6">
          <h1 className="text-center text-lg font-medium">
            Home Loan EMI Calculator
          </h1>
          <hr
            className="w-[45%] h-[3px] opacity-100 rounded-full mx-auto border-0 mt-1"
            style={{
              background: "linear-gradient(to right, #4e54c8, #8f94fb)",
              boxShadow: "0px 4px 10px rgba(78, 84, 200, 0.3)",
            }}
          />
        </div>

        {/* Sliders and Results in Rows */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sliders Section */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Loan Amount Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xs">Loan Amount</p>
                <p className="text-gray-600 text-xs">
                  ₹ <strong>{loanAmount}</strong> L
                </p>
              </div>
              <Slider
                size="small"
                sx={{ color: "#1d2a3b" }}
                value={loanAmount}
                onChange={handleLoanAmountChange}
                min={1}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `₹ ${value} Lac`}
                marks={[
                  { value: 1, label: "1 L" },
                  { value: 100, label: "1 Cr" },
                ]}
              />
            </div>

            {/* Tenure Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xs">Tenure (Years)</p>
                <p className="text-gray-600 text-xs">{loanDuration} Years</p>
              </div>
              <Slider
                size="small"
                sx={{ color: "#1d2a3b" }}
                value={loanDuration}
                onChange={handleLoanDurationChange}
                min={1}
                max={30}
                step={1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value} Years`}
                marks={[
                  { value: 1, label: "1" },
                  { value: 30, label: "30" },
                ]}
              />
            </div>

            {/* Interest Rate Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <p className="text-xs">Interest Rate (% P.A.)</p>
                <p className="text-gray-600 text-xs">{interestRate}%</p>
              </div>
              <Slider
                size="small"
                sx={{ color: "#1d2a3b" }}
                value={interestRate}
                onChange={handleInterestRateChange}
                min={0.5}
                max={15}
                step={0.1}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => `${value}%`}
                marks={[
                  { value: 0.5, label: "0.5%" },
                  { value: 15, label: "15%" },
                ]}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="flex flex-col items-end flex-1 gap-5 bg-gray-50 p-5 rounded-lg shadow-sm">
            <div>
              <h2 className="text-sm font-semibold">Monthly Home Loan EMI</h2>
              <p className="text-lg text-end text-blue-600 font-semibold">
                ₹{formatToIndianCurrency(emi)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500">
                Principal Amount
              </h3>
              <p className="text-sm text-end font-semibold">
                ₹{formatToIndianCurrency(loanAmount * 100000)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500">
                Interest Amount
              </h3>
              <p className="text-sm text-end font-semibold">
                ₹{formatToIndianCurrency(totalInterest)}
              </p>
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-500">
                Total Amount Payable
              </h3>
              <p className="text-sm text-end font-semibold">
                ₹{formatToIndianCurrency(totalAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="bg-blue-950 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded">
          <PhoneIcon />
          <Link to="/"> +91-9990052554</Link>
        </button> */}

<div className="w-full flex justify-center px-4">
  <div className="flex flex-col sm:flex-row justify-between items-center border border-gray-200 py-4 px-6 mt-6 w-full max-w-2xl rounded-lg shadow-md bg-white">
    {/* Left Content */}
    <div className="text-center sm:text-left">
      <h2 className="font-bold text-lg text-gray-700">Still Confused?</h2>
      <p className="font-semibold text-sm text-gray-600">
        Give us a call on the given number.
      </p>
    </div>

    {/* Right Content (Phone Button) */}
    <button className="flex items-center gap-2 bg-[#1d2a3b] text-white py-2 px-4 mt-3 sm:mt-0 rounded-lg w-full sm:w-auto justify-center sm:justify-start hover:bg-opacity-90 transition">
      <PhoneIcon />
      <Link to="/" className="font-semibold">+91-9990052554</Link>
    </button>
  </div>
</div>

    </div>
  );
};
