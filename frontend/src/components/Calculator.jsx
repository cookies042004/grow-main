import { Slider } from "@mui/material";
import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";

export const Calculator = () => {
  const [loanAmount, setLoanAmount] = useState(10); 
  const [loanDuration, setLoanDuration] = useState(10);
  const [interestRate, setInterestRate] = useState(7.5);

  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const principal = loanAmount * 100000; 
    const monthlyInterestRate = interestRate / (12 * 100);
    const numberOfPayments = loanDuration * 12;

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

  const formatToIndianCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount);
  };

  // Data for Pie Chart
  const data = [
    { name: "Principal", value: loanAmount * 100000, color: "#4e54c8" },
    { name: "Interest", value: totalInterest, color: "#FF6B6B" },
  ];

  return (
    <div className="max-w-[1200px] mx-auto my-8 bg-white rounded-xl shadow-lg p-8 border relative overflow-hidden">
      <div className="text-center">
        <h1 className="text-lg font-semibold text-gray-800">🏠 Home Loan EMI Calculator</h1>
        <hr className="w-1/3 mx-auto mt-2 border-2 border-indigo-500 rounded-full" />
      </div>

      {/* Sliders */}
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="flex flex-col gap-5 flex-1">
          <SliderComponent 
            title="Loan Amount" value={loanAmount} unit="Lac" 
            min={1} max={100} step={1} setValue={setLoanAmount} 
          />
          <SliderComponent 
            title="Tenure (Years)" value={loanDuration} unit="Years" 
            min={1} max={30} step={1} setValue={setLoanDuration} 
          />
          <SliderComponent 
            title="Interest Rate" value={interestRate} unit="%" 
            min={0.5} max={15} step={0.1} setValue={setInterestRate} 
          />
        </div>

        {/* Results & Pie Chart */}
        <div className="flex-1 flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold">Monthly EMI</h2>
          <p className="text-2xl text-blue-600 font-bold">₹{formatToIndianCurrency(emi)}</p>

          <div className="flex justify-around w-full mt-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Principal</h3>
              <p className="text-lg font-semibold">₹{formatToIndianCurrency(loanAmount * 100000)}</p>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Interest</h3>
              <p className="text-lg font-semibold">₹{formatToIndianCurrency(totalInterest)}</p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="w-40 h-40 mt-5">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-6 flex flex-col lg:flex-row items-center justify-between border-t border-gray-200 pt-4">
        <div>
          <h2 className="font-semibold text-lg text-gray-700">Still Confused?</h2>
          <p className="text-sm text-gray-600">Call us for a free consultation</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg">
          <PhoneIcon />
          <Link to="/"> +91-9990052554</Link>
        </button>
      </div>
    </div>
  );
};

// Slider Component
const SliderComponent = ({ title, value, unit, min, max, step, setValue }) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <p className="text-sm">{title}</p>
      <p className="text-gray-600 text-sm">
        <strong>{value}</strong> {unit}
      </p>
    </div>
    <Slider
      size="small"
      sx={{ color: "#4e54c8" }}
      value={value}
      onChange={(e, newValue) => setValue(newValue)}
      min={min}
      max={max}
      step={step}
      valueLabelDisplay="auto"
      valueLabelFormat={(value) => `${value} ${unit}`}
      marks={[{ value: min, label: `${min} ${unit}` }, { value: max, label: `${max} ${unit}` }]}
    />
  </div>
);
