import React from 'react';

const ECommerceTab = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-8 bg-white  space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">E-Commerce Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website Title</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ebay Title</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm" />
          </div>

          
        </div>

        {/* WooCommerce ID */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">WooCommerce ID</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Google Shopping Title</label>
            <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {["Category 1", "Category 2", "Category 3", "Category 4"].map((cat, i) => (
          <div key={i}>
            <label className="block text-sm font-medium text-gray-700">{cat}</label>
            <select className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm bg-white">
              <option value="">Select {cat}</option>
            </select>
          </div>
        ))}
      </div>

      {/* Delivery Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lead Time</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm bg-white">
            <option>Next Day</option>
            <option>2 Days</option>
            <option>3-5 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Click & Collect</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm bg-white">
            <option>In Store And Home Delivery</option>
            <option>Home Delivery Only</option>
            <option>Store Pickup Only</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Rate Option</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm bg-white">
            <option>Standard</option>
            <option>Express</option>
          </select>
        </div>
      </div>

      {/* eBay Sync Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">eBay Sync Stock</label>
          <select className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm bg-white">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-green-600">Yes:</span> Syncs stock with current product level.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">eBay Stock Level</label>
          <input type="number" className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm" />
          <p className="text-xs text-gray-500 mt-1">
            <span className="text-red-600">No:</span> Set default stock level here if sync is off.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECommerceTab;
