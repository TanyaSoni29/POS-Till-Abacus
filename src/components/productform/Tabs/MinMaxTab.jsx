import React from 'react';

const branches = [
  { id: 1, name: 'ROURKE CYCLES' },
  { id: 2, name: 'ROURKE CYCLES' },
  { id: 3, name: 'ROURKE CYCLES' },
  { id: 4, name: 'ROURKE CYCLES' },
  { id: 5, name: 'ROURKE CYCLES' },
  { id: 6, name: 'ROURKE CYCLES' },
  { id: 7, name: 'GOODS IN' },
  { id: 8, name: 'SUPPLIER LOC' },
  { id: 9, name: 'SUPPLIER LOC' },
  { id: 10, name: 'SUPPLIER LOC' },
  { id: 11, name: 'SUPPLIER LOC' },
  { id: 12, name: '' },
  { id: 13, name: '' },
  { id: 14, name: '' },
  { id: 15, name: '' },
  { id: 16, name: '' },
  { id: 17, name: '' },
  { id: 18, name: '' },
  { id: 19, name: 'INTERNET LOC' },
  { id: 20, name: '' },
  { id: 21, name: '' },
  { id: 22, name: '' },
  { id: 23, name: '' },
  { id: 24, name: '' },
  { id: 25, name: '' },
  { id: 26, name: '' },
  { id: 27, name: '' },
  { id: 28, name: '' },
  { id: 29, name: '' },
  { id: 30, name: 'BOSS LOC' }
];

const MinMaxTab = () => {
  // Split into two columns
  const firstHalf = branches.slice(0, 15);
  const secondHalf = branches.slice(15);

  const renderTable = (data) => (
    <table className="w-full table-auto border-separate border-spacing-y-2">
      <thead>
        <tr className="text-left text-sm font-semibold text-gray-600">
          <th>Branch</th>
          <th>Name</th>
          <th>Min</th>
          <th>Max</th>
          <th>Replenish</th>
        </tr>
      </thead>
      <tbody>
        {data.map((branch) => (
          <tr key={branch.id} className="text-sm text-gray-800">
            <td>{branch.id.toString().padStart(2, '0')}</td>
            <td className="font-medium">{branch.name}</td>
            <td>
              <input
                type="number"
                min={0}
                defaultValue={0}
                className="w-14 border rounded px-2 py-1 text-sm"
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                defaultValue={0}
                className="w-14 border rounded px-2 py-1 text-sm"
              />
            </td>
            <td>
              <input type="checkbox" className="w-4 h-4" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Min Max Replenish Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>{renderTable(firstHalf)}</div>
        <div>{renderTable(secondHalf)}</div>
      </div>
    </div>
  );
};

export default MinMaxTab;
