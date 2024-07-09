import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import QRCode from 'qrcode.react';

const Sidebar = ({ showSidebar, toggleSidebar, setSelectedOption, selectedOption }) => {
  return (
    <div className={`fixed right-0 top-0 h-full bg-blue5 text-white shadow-lg z-50 transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Connect a wallet</h2>
        <button onClick={toggleSidebar} className="text-2xl transform rotate-180">
          <FiChevronLeft />
        </button>
      </div>
      <div className="p-4">
        <button
          onClick={() => setSelectedOption('WalletConnect')}
          className="block w-full text-left p-2 mb-2 bg-blue3 hover:bg-blue2 rounded"
        >
          WalletConnect
        </button>
        <button
          onClick={() => setSelectedOption('Coinbase Wallet')}
          className="block w-full text-left p-2 mb-2 bg-blue3 hover:bg-blue2 rounded"
        >
          CoinbaseWallet
        </button>
      </div>
      {selectedOption && (
    <div className="flex flex-col justify-center items-center">
        <p>Use your phone to scan the QR code below</p>
        <QRCode value={selectedOption} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;