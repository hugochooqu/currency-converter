import React from "react";
import { currencyNames } from "../../utils";

const CurrencyInput = ({
  amount,
  currency,
  currencies,
  onAmountChange,
  onCurrencyChange,
}) => {

    
  return (
    <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        className=" w-[100%] px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select
      className="w-[100%]   rounded-xl text-lg p-2 "
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
      >
        {currencies?.map((cur) => (
        
            <option  key={cur} value={cur}>
                {cur} - {currencyNames[cur] || 'Unknown Currency'}
            </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
