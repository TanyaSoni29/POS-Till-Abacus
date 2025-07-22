import React from 'react';

const imagesData = [
  {
    label: 'Main Image',
    code: '5261307',
    src: '/path/to/image1.png', // Replace with actual image path
  },
  {
    label: 'Image 1',
    code: '5273521-1',
    src: '/path/to/image2.png',
  },
  {
    label: 'Image 2',
    code: '5273268',
    src: '/path/to/image3.png',
  },
  {
    label: 'Image 3',
    code: '90422-6502',
    src: '/path/to/image4.png',
  },
];

const ImagesTab = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {imagesData.map((image, index) => (
        <div key={index} className="border rounded-xl shadow-md bg-white p-4">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-gray-700">{image.label}:</label>
            <input
              type="text"
              value={image.code}
              readOnly
              className="text-sm border rounded-md px-2 py-1 w-40 bg-gray-100"
            />
            <button className="ml-2 px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300">...</button>
          </div>
          <div className="w-full h-48 flex justify-center items-center bg-gray-50 rounded-md overflow-hidden">
            <img
              src={image.src}
              alt={image.label}
              className="max-h-full object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImagesTab;
