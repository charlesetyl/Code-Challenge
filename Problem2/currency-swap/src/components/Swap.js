import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import TokenSelect from './TokenSelect';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #282c34;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #ff007a;
  border: none;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  width: 100%;
`;

const Swap = () => {
  const [tokens, setTokens] = useState([]);
  const [sellToken, setSellToken] = useState('');
  const [buyToken, setBuyToken] = useState('');
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  useEffect(() => {
    axios.get('https://interview.switcheo.com/prices.json')
      .then(response => {
        setTokens(response.data);
      })
      .catch(error => {
        console.error('Error fetching token prices:', error);
      });
  }, []);

  const handleSellAmountChange = (e) => {
    const amount = e.target.value;
    setSellAmount(amount);
    const selectedSellToken = tokens.find(token => token.currency === sellToken);
    const selectedBuyToken = tokens.find(token => token.currency === buyToken);
    if (selectedSellToken && selectedBuyToken) {
      setBuyAmount((amount * selectedSellToken.price / selectedBuyToken.price).toFixed(2));
    }
  };

  const handleTokenChange = (e, setToken) => {
    setToken(e.target.value);
    if (sellAmount) {
      const selectedSellToken = tokens.find(token => token.currency === sellToken);
      const selectedBuyToken = tokens.find(token => token.currency === buyToken);
      if (selectedSellToken && selectedBuyToken) {
        setBuyAmount((sellAmount * selectedSellToken.price / selectedBuyToken.price).toFixed(2));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Swapping tokens:', { sellToken, buyToken, sellAmount, buyAmount });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Swap</h2>
        <TokenSelect tokens={tokens} selectedToken={sellToken} onChange={(e) => handleTokenChange(e, setSellToken)} />
        <Input
          type="number"
          value={sellAmount}
          onChange={handleSellAmountChange}
          placeholder="Amount to Sell"
        />
        <TokenSelect tokens={tokens} selectedToken={buyToken} onChange={(e) => handleTokenChange(e, setBuyToken)} />
        <Input
          type="text"
          value={buyAmount}
          readOnly
          placeholder="Amount to Buy"
        />
        <Button type="submit">Swap</Button>
      </Form>
    </Container>
  );
};

export default Swap;