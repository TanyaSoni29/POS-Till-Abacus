import { useState } from 'react';
import TabNavigation from './TabNavigation';
import EposInfoTab from './Tabs/EposInfoTab';
import MinMaxTab from './Tabs/MinMaxTab';
import DescriptionsTab from './Tabs/DescriptionsTab';
import ImagesTab from './Tabs/ImagesTab';
import ECommerceTab from './Tabs/ECommerceTab';
import SpecificationTab from './Tabs/SpecificationTab';
import GeometryTab from './Tabs/GeometryTab';
import ProductNotesTab from './Tabs/ProductNotesTab';
// import other tabs similarly...

const tabMap = {
  'EPOS INFO': EposInfoTab,
  'MIN/MAX': MinMaxTab,
  'DESCRIPTIONS': DescriptionsTab,
  'IMAGES': ImagesTab,
  'E-COMMERCE INFO': ECommerceTab,
  'SPECIFICATION': SpecificationTab,
  'GEOMETRY': GeometryTab,  
  'PRODUCT NOTES': ProductNotesTab,

  
  // Add more mappings as needed...
};

export default function ProductForm({ onclose }) {
  const [activeTab, setActiveTab] = useState('EPOS INFO');
  const ActiveComponent = tabMap[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-xl w-[95vw] max-w-7xl h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Product Maintenance</h2>
          <button onClick={onclose} className="text-gray-500 hover:text-red-600 transition">✕</button>
        </div>

        {/* Body Split: Sidebar Tabs + Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Vertical Tabs */}
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Right: Content */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {ActiveComponent ? <ActiveComponent /> : <p className="text-gray-500">No tab found.</p>}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-3 border-t">
          <button onClick={onclose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            Cancel
          </button>
          <button onClick={() => console.log('Save logic')} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

