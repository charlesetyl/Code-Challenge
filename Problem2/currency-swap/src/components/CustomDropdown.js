import React, { useState } from 'react';

const CustomDropdown = ({ options, selectedOption, onChange, getLogoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const uniqueOptions = Array.from(new Set(options.map(option => option.currency))).map(currency => {
    return options.find(option => option.currency === currency);
  });

  const handleOptionClick = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div
        className="bg-blue3 border border-purple text-white rounded-lg p-2 cursor-pointer w-60"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <div className="flex items-center">
            <img
              src={getLogoUrl(selectedOption)}
              alt={selectedOption}
              className="inline-block w-6 h-6 mr-2"
              onError={(e) => { e.target.onerror = null; e.target.src = 'default-logo.svg'; }}
            />
            {selectedOption}
          </div>
        ) : (
          'Select Token'
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 bg-white w-full shadow-lg max-h-60 overflow-y-auto">
          {uniqueOptions.map(option => (
            <li
              key={option.currency}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(option.currency)}
            >
              <img
                src={getLogoUrl(option.currency)}
                alt={option.currency}
                className="inline-block w-6 h-6 mr-2"
                onError={(e) => { e.target.onerror = null; e.target.src = 'default-logo.svg'; }}
              />
              {option.currency}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;