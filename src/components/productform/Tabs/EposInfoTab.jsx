/** @format */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, Package, DollarSign, Warehouse, Info, Save } from 'lucide-react';

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      {...props}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Select = ({ label, options = [], error, ...props }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <select
      {...props}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
    >
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <span className="text-sm text-gray-700">{label}</span>
    <input type="checkbox" {...props} className="sr-only peer" />
    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

const EposInfoTab = () => {
  const [activeTab, setActiveTab] = useState('product');
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      webRef: '0',
      make: 'OWN BRAND',
      search: 'LOYALTY',
      search2: 'DONT USE THIS',
      details: 'LOYALTY POINT REDEMPTION',
      boxQty: '1',
      boxCost: '0.00',
      weight: '0.00',
      costPrice: '0.00',
      marginPercent: '100.00',
      suggestedRrp: '0.00',
      net: '0.00',
      guide: '0.00',
      discount: '0.00',
      store: 'ALL',
      trade: '10.00',
      mailOrder: '10.00',
      webPrice: '10.00',
      promoRrp: '0.00',
      supplier1: '00001',
      supplier2: '00001',
      partNo: 'PAULK',
      catA: 'HYB',
      catB: 'HYB',
      catC: 'HYB',
      partsGtee: '0',
      labourGtee: '0',
      multiBuyQty: '0',
      multiBuySave: '0.00',
      allowPoints: true,
    },
  });

  const tabs = [
    { key: 'product', label: 'Product Details', icon: <Package size={16} /> },
    { key: 'pricing', label: 'Pricing', icon: <DollarSign size={16} /> },
    { key: 'stock', label: 'Stock', icon: <Warehouse size={16} /> },
    { key: 'other', label: 'Other', icon: <Info size={16} /> },
  ];

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="w-full h-[4rem] px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <p className="font-bold text-2xl">New Product</p>
          <div className="flex gap-2 justify-end items-center">
            <button
              type="button"
              className="px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="eposForm"
              className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <Save size={16} />
              Save Product
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-[16rem_1fr] flex-1">
        {/* Sidebar */}
        <aside className="border-r border-gray-200 bg-gray-50">
          <nav className="p-4 space-y-2">
            <ul className="text-gray-700 font-medium space-y-2">
              {tabs.map((tab) => (
                <li
                  onClick={() => setActiveTab(tab.key)}
                  key={tab.key}
                  className={`cursor-pointer p-2 rounded-lg flex items-center gap-2
                    ${activeTab === tab.key ? 'bg-blue-100 text-blue-700 border border-blue-600' : 'hover:text-gray-800 hover:bg-gray-200'}`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Form */}
        <div className="w-full p-6 h-full overflow-auto">
          <form id="eposForm" onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
            {activeTab === 'product' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Major/Minor"
                  options={['Major', 'Minor']}
                  {...register('majorMinor', { required: 'This field is required.' })}
                  error={errors.majorMinor?.message}
                />
                <Select
                  label="Gender"
                  options={['Unisex', 'Male', 'Female']}
                  {...register('gender', { required: 'This field is required.' })}
                  error={errors.gender?.message}
                />
                <Select
                  label="Suitability"
                  options={['Any', 'Adult', 'Child']}
                  {...register('suitability')}
                  error={errors.suitability?.message}
                />
                <Input
                  label="Make"
                  {...register('make', { required: 'This field is required.' })}
                  error={errors.make?.message}
                />
                <Select
                  label="Season"
                  options={['All', 'Spring', 'Summer', 'Fall', 'Winter']}
                  {...register('season')}
                  error={errors.season?.message}
                />
                <Input label="Range" {...register('range')} error={errors.range?.message} />
                <Input label="Finish" {...register('finish')} error={errors.finish?.message} />
                <Input
                  label="Year/Style"
                  {...register('yearStyle')}
                  error={errors.yearStyle?.message}
                />
                <Input label="Size" {...register('size')} error={errors.size?.message} />
                <Input label="Weight" {...register('weight')} error={errors.weight?.message} />
                <Input label="Color" {...register('color')} error={errors.color?.message} />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setActiveTab('pricing')}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Web Ref"
                  {...register('webRef', { required: 'This field is required.' })}
                  error={errors.webRef?.message}
                />
                <Input
                  label="Cost Price"
                  type="number"
                  step="0.01"
                  {...register('costPrice', { required: 'This field is required.' })}
                  error={errors.costPrice?.message}
                />
                <Input
                  label="Margin %"
                  type="number"
                  step="0.01"
                  {...register('marginPercent', { required: 'This field is required.' })}
                  error={errors.marginPercent?.message}
                />
                <Input label="Markup" {...register('markup')} error={errors.markup?.message} />
                <Input
                  label="Markup %"
                  type="number"
                  step="0.01"
                  {...register('markupPercent')}
                  error={errors.markupPercent?.message}
                />
                <Input
                  label="Settlement Discount"
                  type="number"
                  step="0.01"
                  {...register('settlementDiscount')}
                  error={errors.settlementDiscount?.message}
                />
                <Input
                  label="Suggested RRP"
                  type="number"
                  step="0.01"
                  {...register('suggestedRrp', { required: 'This field is required.' })}
                  error={errors.suggestedRrp?.message}
                />
                <Input
                  label="Net"
                  type="number"
                  step="0.01"
                  {...register('net', { required: 'This field is required.' })}
                  error={errors.net?.message}
                />
                <Input
                  label="Guide"
                  type="number"
                  step="0.01"
                  {...register('guide', { required: 'This field is required.' })}
                  error={errors.guide?.message}
                />
                <Input
                  label="Discount"
                  type="number"
                  step="0.01"
                  {...register('discount', { required: 'This field is required.' })}
                  error={errors.discount?.message}
                />
                <Input
                  label="Store"
                  {...register('store', { required: 'This field is required.' })}
                  error={errors.store?.message}
                />
                <Input
                  label="Trade"
                  type="number"
                  step="0.01"
                  {...register('trade', { required: 'This field is required.' })}
                  error={errors.trade?.message}
                />
                <Input
                  label="Mail Order"
                  type="number"
                  step="0.01"
                  {...register('mailOrder', { required: 'This field is required.' })}
                  error={errors.mailOrder?.message}
                />
                <Input
                  label="Web Price"
                  type="number"
                  step="0.01"
                  {...register('webPrice', { required: 'This field is required.' })}
                  error={errors.webPrice?.message}
                />
                <Input
                  label="Promo Name"
                  {...register('promoName')}
                  error={errors.promoName?.message}
                />
                <Input
                  label="Promo RRP"
                  type="number"
                  step="0.01"
                  {...register('promoRrp')}
                  error={errors.promoRrp?.message}
                />
                <Input
                  label="Promo From Date"
                  type="date"
                  {...register('promoFromDate')}
                  error={errors.promoFromDate?.message}
                />
                <Input
                  label="Promo To Date"
                  type="date"
                  {...register('promoToDate')}
                  error={errors.promoToDate?.message}
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setActiveTab('stock')}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'stock' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Supplier 1"
                    {...register('supplier1', { required: 'This field is required.' })}
                    error={errors.supplier1?.message}
                  />
                  <Input
                    label="Supplier 2"
                    {...register('supplier2', { required: 'This field is required.' })}
                    error={errors.supplier2?.message}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                    <p className="mt-1 text-gray-900 px-3 py-2 border border-gray-300 rounded-lg">THE BICYCLE CHAIN</p>
                  </div>
                  <Input
                    label="Part No"
                    {...register('partNo', { required: 'This field is required.' })}
                    error={errors.partNo?.message}
                  />
                  <Input label="Part No 2" {...register('partNo2')} error={errors.partNo2?.message} />
                  <Input label="Barcode" {...register('barcode')} error={errors.barcode?.message} />
                  <Input
                    label="Nominal Code"
                    {...register('nominalCode')}
                    error={errors.nominalCode?.message}
                  />
                  <Input
                    label="Nominal Code 2"
                    {...register('nominalCode2')}
                    error={errors.nominalCode2?.message}
                  />
                  <Input
                    label="CAT A"
                    {...register('catA', { required: 'This field is required.' })}
                    error={errors.catA?.message}
                  />
                  <Input
                    label="CAT B"
                    {...register('catB', { required: 'This field is required.' })}
                    error={errors.catB?.message}
                  />
                  <Input
                    label="CAT C"
                    {...register('catC', { required: 'This field is required.' })}
                    error={errors.catC?.message}
                  />
                  <Input
                    label="Bin Location 1"
                    {...register('binLocation1')}
                    error={errors.binLocation1?.message}
                  />
                  <Input
                    label="Bin Location 2"
                    {...register('binLocation2')}
                    error={errors.binLocation2?.message}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Level</label>
                  <table className="w-full border border-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-200 p-2 font-medium">Loc</th>
                        <th className="border border-gray-200 p-2 font-medium">Branch</th>
                        <th className="border border-gray-200 p-2 font-medium">Qty</th>
                        <th className="border border-gray-200 p-2 font-medium">Min</th>
                        <th className="border border-gray-200 p-2 font-medium">Max</th>
                        <th className="border border-gray-200 p-2 font-medium">B/O</th>
                        <th className="border border-gray-200 p-2 font-medium">Sales</th>
                        <th className="border border-gray-200 p-2 font-medium">L/A</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[{ loc: '01', branch: 'LOC1', qty: 15, min: 1, max: 150, bo: 0, sales: 1, la: 2 },
                        { loc: '02', branch: 'LOC2', qty: 15, min: 1, max: 150, bo: 0, sales: 1, la: 2 },
                        { loc: '03', branch: 'LOC3', qty: 15, min: 1, max: 150, bo: 0, sales: 1, la: 2 }].map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-200 p-2">{row.loc}</td>
                          <td className="border border-gray-200 p-2">{row.branch}</td>
                          <td className="border border-gray-200 p-2">{row.qty}</td>
                          <td className="border border-gray-200 p-2">{row.min}</td>
                          <td className="border border-gray-200 p-2">{row.max}</td>
                          <td className="border border-gray-200 p-2">{row.bo}</td>
                          <td className="border border-gray-200 p-2">{row.sales}</td>
                          <td className="border border-gray-200 p-2">{row.la}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setActiveTab('other')}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'other' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="ID" {...register('id')} error={errors.id?.message} />
                <Input
                  label="Box Qty"
                  type="number"
                  {...register('boxQty', { required: 'This field is required.' })}
                  error={errors.boxQty?.message}
                />
                <Input
                  label="Box Cost"
                  type="number"
                  step="0.01"
                  {...register('boxCost', { required: 'This field is required.' })}
                  error={errors.boxCost?.message}
                />
                <Input label="Offer" {...register('offer')} error={errors.offer?.message} />
                <Select
                  label="Print Label"
                  options={['No', 'Yes']}
                  {...register('printLabel', { required: 'This field is required.' })}
                  error={errors.printLabel?.message}
                />
                <Input
                  label="Search"
                  {...register('search', { required: 'This field is required.' })}
                  error={errors.search?.message}
                />
                <Input
                  label="Search 2"
                  {...register('search2', { required: 'This field is required.' })}
                  error={errors.search2?.message}
                />
                <Input
                  label="Details"
                  {...register('details', { required: 'This field is required.' })}
                  error={errors.details?.message}
                />
                <Input
                  label="Parts Gtee"
                  type="number"
                  {...register('partsGtee', { required: 'This field is required.' })}
                  error={errors.partsGtee?.message}
                />
                <Input
                  label="Labour Gtee"
                  type="number"
                  {...register('labourGtee', { required: 'This field is required.' })}
                  error={errors.labourGtee?.message}
                />
                <Input
                  label="MultiBuy Qty"
                  type="number"
                  {...register('multiBuyQty', { required: 'This field is required.' })}
                  error={errors.multiBuyQty?.message}
                />
                <Input
                  label="MultiBuy Save"
                  type="number"
                  step="0.01"
                  {...register('multiBuySave', { required: 'This field is required.' })}
                  error={errors.multiBuySave?.message}
                />
                <Input
                  label="Key Item"
                  {...register('keyItem')}
                  error={errors.keyItem?.message}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Checkbox label="Allow Discount" {...register('allowDiscount')} />
                  <Checkbox label="Allow Points" {...register('allowPoints')} />
                  <Checkbox label="Website" {...register('website')} />
                  <Checkbox label="Web Only" {...register('webOnly')} />
                  <Checkbox label="Discontinued" {...register('discontinued')} />
                  <Checkbox label="Don't ReOrder" {...register('dontReOrder')} />
                  <Checkbox label="Clearance" {...register('clearance')} />
                  <Checkbox label="Final Clearance" {...register('finalClearance')} />
                  <Checkbox label="Exclusive" {...register('exclusive')} />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EposInfoTab;