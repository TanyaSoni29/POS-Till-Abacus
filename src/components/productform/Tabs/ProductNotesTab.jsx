import React from 'react';

const ProductNotesTab = () => {
  const noteFields = Array.from({ length: 6 });

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-5 gap-4 font-semibold border-b pb-2 mb-4">
        <div className="col-span-2">NOTES</div>
        <div className="text-center">PRINT PO</div>
        <div className="text-center">PRINT INVOICE</div>
      </div>

      {noteFields.map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-4 items-center mb-2"
        >
          <label className="font-medium">Notes {index + 1}:</label>
          <input
            type="text"
            className="col-span-1 border rounded px-2 py-1"
          />
          <div className="text-center">
            <input type="checkbox" />
          </div>
          <div className="text-center">
            <input type="checkbox" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductNotesTab;
