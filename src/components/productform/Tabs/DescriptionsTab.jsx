import React, { useState } from 'react';
import SyncFusionRichTextEditor from '../../sync/SyncFusionRichTextEditor';

const DescriptionsTab = () => {
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-8">
      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
        <input
          type="text"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          placeholder="Enter short description..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>

      {/* Long Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Long Description</label>
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <SyncFusionRichTextEditor value={longDesc} onChange={setLongDesc} />
        </div>
      </div>
    </div>
  );
};

export default DescriptionsTab;
