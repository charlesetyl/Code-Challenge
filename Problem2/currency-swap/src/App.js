import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FiChevronLeft } from 'react-icons/fi';
import Sidebar from './components/Sidebar.js';

const App = () => {
  const [tokens, setTokens] = useState([]);
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');
  const [sellToken, setSellToken] = useState(null);
  const [buyToken, setBuyToken] = useState(null);
  const [sellTokenPrice, setSellTokenPrice] = useState(0);
  const [buyTokenPrice, setBuyTokenPrice] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    axios.get('https://interview.switcheo.com/prices.json')
      .then(response => {
        setTokens(response.data);
      })
      .catch(error => {
        console.error('Error fetching token prices:', error);
      });
  }, []);

  const handleSellTokenChange = (e) => {
    const selectedToken = tokens.find(token => token.currency === e.target.value);
    if (selectedToken) {
      setSellToken(selectedToken);
      setSellTokenPrice(selectedToken.price);
      setShowError(false);
      if (buyToken) {
        calculateBuyAmount(sellAmount, selectedToken.price, buyToken.price);
      }
    } else {
      setSellToken(null);
      setSellTokenPrice(0);
    }
  };

  const handleBuyTokenChange = (e) => {
    const selectedToken = tokens.find(token => token.currency === e.target.value);
    if (selectedToken) {
      setBuyToken(selectedToken);
      setBuyTokenPrice(selectedToken.price);
      setShowError(false);
      if (sellToken) {
        calculateBuyAmount(sellAmount, sellToken.price, selectedToken.price);
      }
    } else {
      setBuyToken(null);
      setBuyTokenPrice(0);
    }
  };

  const handleSellAmountChange = (e) => {
    const amount = e.target.value;
    setSellAmount(amount);
    setShowError(false);
    if (sellToken && buyToken) {
      calculateBuyAmount(amount, sellToken.price, buyToken.price);
    }
  };

  const calculateBuyAmount = (sellAmount, sellPrice, buyPrice) => {
    const amount = (sellAmount * sellPrice) / buyPrice;
    setBuyAmount(amount.toFixed(2));
  };

  const formatCurrency = (amount, price) => {
    return `$${(amount * price).toFixed(2)}`;
  };

  const handleSwap = () => {
    if (sellToken && buyToken) {
      const tempSellToken = sellToken;
      const tempBuyToken = buyToken;
      const tempSellAmount = sellAmount;
      const tempBuyAmount = buyAmount;

      setSellToken(tempBuyToken);
      setBuyToken(tempSellToken);
      setSellTokenPrice(tempBuyToken.price);
      setBuyTokenPrice(tempSellToken.price);
      setSellAmount(tempBuyAmount);
      setBuyAmount(tempSellAmount);
    } else {
      setShowError(true);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar); // Toggle the sidebar state
    setSelectedOption(''); // Reset selected option when toggling sidebar
  };

  return (
    <div className="min-h-screen bg-blue6 text-white">
      <nav className="bg-offwhite text-blue6 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-blue6 text-xl font-bold">Currency Swap App</h1>
        </div>
      </nav>

      <div className="flex items-center justify-center p-5">
        <div className="flex-1 max-w-md">
          <form className="w-full bg-offwhite p-5 rounded-lg shadow-lg">
            <div className="mb-5">
              <div className="flex text-blue3 font-bold justify-between items-center mb-3">
                <h5>Sell</h5>
                <div className="relative">
                  <select
                    className="bg-blue3 border border-purple text-white rounded-lg p-2"
                    value={sellToken ? sellToken.currency : ''}
                    onChange={handleSellTokenChange}
                  >
                    <option value="">Select Token</option>
                    {tokens.map(token => (
                      <option key={token.currency} value={token.currency}>{token.currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="number"
                className="bg-blue2 border border-blue2 text-white placeholder-white rounded-lg w-full p-2"
                placeholder="0.00"
                value={sellAmount}
                onChange={handleSellAmountChange}
              />
              {sellToken && (
                <div className="mt-2" style={{ color: 'gray' }}>
                  {formatCurrency(sellAmount, sellTokenPrice)}
                </div>
              )}
            </div>

            <div className="flex justify-center my-3">
              <button type="button" className="text-gray-500" onClick={handleSwap}>
                <i className="fas fa-exchange-alt"></i>
              </button>
            </div>

            <div className="mb-5">
              <div className="flex text-blue3 font-bold justify-between items-center mb-3">
                <h5>Buy</h5>
                <div className="relative">
                  <select
                    className="bg-blue3 border border-blue3 text-white rounded-lg p-2"
                    value={buyToken ? buyToken.currency : ''}
                    onChange={handleBuyTokenChange}
                  >
                    <option value="">Select Token</option>
                    {tokens.map(token => (
                      <option key={token.currency} value={token.currency}>{token.currency}</option>
                    ))}
                  </select>
                </div>
              </div>
              <input
                type="number"
                className="bg-blue2 border border-blue2 text-white placeholder-white rounded-lg w-full p-2"
                placeholder="0.00"
                value={buyAmount}
                readOnly
              />
              {buyToken && (
                <div className="mt-2" style={{ color: 'gray' }}>
                  {formatCurrency(buyAmount, buyTokenPrice)}
                </div>
              )}
            </div>
          </form>

          <div className="flex justify-center mt-4">
            <button onClick={toggleSidebar} className="bg-blue4 py-2 px-4 rounded-lg">Connect Wallet</button>
          </div>
        </div>
      </div>

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          setSelectedOption={setSelectedOption}
          selectedOption={selectedOption}
        />
      )}
    </div>
  );
};

export default App;
