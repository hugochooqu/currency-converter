import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencyInput from './CurrencyInput';
import { MdOutlineSwapCalls } from "react-icons/md";

const Converter = () => {
  const [currencies, setCurrencies] = useState([]); // Stores available currencies
  const [fromCurrency, setFromCurrency] = useState('USD'); // Base currency
  const [toCurrency, setToCurrency] = useState('EUR'); // Target currency
  const [amount, setAmount] = useState(1); // Amount to be converted
  const [convertedAmount, setConvertedAmount] = useState(0); // Conversion result
  const [rates, setRates] = useState({}); // Exchange rates for the selected base currency

  // Fetch rates and currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/4a4761d9750e7f039ae35785
/latest/${fromCurrency}`
        );
        console.log(response)
        setRates(response?.data.conversion_rates);
        setCurrencies(Object.keys(response?.data.conversion_rates)); // Populate the currencies dropdown
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchCurrencies();
  }, [fromCurrency]);

  // Calculate conversion
  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="flex flex-col items-center p-6 bg-transparent border-orange-600 border rounded-2xl shadow-lg w-[90%] max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-orange-700 mb-6">Currency Converter</h1>
      
      {/* Base Currency Input */}
      <CurrencyInput
        amount={amount}
        currency={fromCurrency}
        currencies={currencies}
        onAmountChange={setAmount}
        onCurrencyChange={setFromCurrency}
      />
      
      <div className="my-4 text-orange-600 font-medium">
        <MdOutlineSwapCalls size='23px' />
      </div>
      
      {/* Target Currency Input */}
      <CurrencyInput
        amount={convertedAmount}
        currency={toCurrency}
        currencies={currencies}
        onAmountChange={() => {}} // Read-only for the result
        onCurrencyChange={setToCurrency}
      />
      
      <p className="mt-6 text-orange-700">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </p>
    </div>
  );
};

export default Converter;
