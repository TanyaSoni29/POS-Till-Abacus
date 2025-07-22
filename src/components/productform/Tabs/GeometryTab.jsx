import React, { useState } from 'react';
import SyncFusionRichTextEditor from '../../sync/SyncFusionRichTextEditor';



const GeometryTab = () => {
  const [specifications, setSpecifications] = useState('');

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-2xl space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Item Geometry
        </label>
        <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <SyncFusionRichTextEditor value={specifications} onChange={setSpecifications} />
        </div>
      </div>
    </div>
  );
};

export default GeometryTab