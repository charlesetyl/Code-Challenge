import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
`;

const Option = styled.option`
  display: flex;
  align-items: center;
`;

const TokenSelect = ({ tokens, selectedToken, onChange }) => (
  <Select value={selectedToken} onChange={onChange}>
    <option value="">Select Token</option>
    {tokens.map(token => (
      <Option key={token.currency} value={token.currency}>
        <img src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`} alt={token.currency} width="20" height="20" />
        {token.currency}
      </Option>
    ))}
  </Select>
);

export default TokenSelect;