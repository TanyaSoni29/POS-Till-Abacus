/** @format */

import {
	ArrowRight,
	Contact,
	CopyCheck,
	// Notebook,
	Save,
	Truck,
	UserPen,
	X,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import FormRow from '../../ui/common/FormRow';
import { useState } from 'react';

export default function AddCustomerModal({ onclose }) {
	const [activeTab, setActiveTab] = useState('profile');
	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors },
	} = useForm();

	const tabs = [
		{ key: 'profile', label: 'Profile Details', icon: <UserPen size={16} /> },
		{ key: 'shipping', label: 'Shipping Details', icon: <Truck size={16} /> },
		{ key: 'other', label: 'Other Details', icon: <Contact size={16} /> },
	];

	const onSubmit = (data) => {
		console.log('Form submitted:', data);
	};
	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-black/25 overflow-hidden'
			onClick={onclose}
		>
			<div
				className='bg-white rounded-lg shadow-lg max-w-5xl w-full h-[53rem] flex flex-col'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='w-full h-[4rem] px-6 py-4 border-b border-b-gray-200'>
					<div className='flex items-center justify-between'>
						<p className='font-bold text-2xl'>New Customer</p>
						{/* <button
							className='p-1 hover:bg-gray-100 rounded'
							onClick={onclose}
						>
							<X
								size={16}
								className='text-grey-700'
							/>
						</button> */}
						<div className='flex gap-2 justify-end items-center'>
							<button
								type='button'
								className='px-3 py-2 bg-transparent border border-gray-200 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2'
								onClick={onclose}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
							>
								<Save size={16} />
								Save Customer
							</button>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className='grid grid-cols-[16rem_1fr] flex-1 overflow-hidden'>
					{/* Sidebar */}
					<aside className='border-r border-gray-200 bg-gray-50'>
						<nav className='p-4 space-y-2'>
							<ul className='text-gray-700 font-medium space-y-2'>
								{tabs.map((tab) => (
									<li
										onClick={() => setActiveTab(tab.key)}
										key={tab.key}
										className={`cursor-pointer p-2 rounded-lg flex items-center gap-2
											${
												activeTab === tab.key
													? 'bg-blue-100 text-blue-700 border border-blue-600'
													: ' hover:text-gray-800 hover:bg-gray-200 '
											}`}
									>
										{tab.icon}
										<span>{tab.label}</span>
									</li>
								))}
							</ul>
						</nav>
					</aside>

					{/* Form */}
					<div className='w-full p-6 h-full'>
						<div className='w-full flex flex-col items-center gap-2'>
							<form
								onSubmit={handleSubmit(onSubmit)}
								className='w-full flex flex-col gap-4 relative'
							>
								{activeTab === 'profile' && (
									<>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Surname'
												error={errors?.Surname?.message}
											>
												<input
													type='text'
													placeholder='Enter Surname...'
													{...register('Surname', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Name'
												error={errors?.name?.message}
											>
												<input
													type='text'
													placeholder='Enter name...'
													{...register('name')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Title'
												error={errors?.title?.message}
											>
												<input
													type='text'
													placeholder='Enter Title (Mr, Mrs, Miss...)'
													{...register('title', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Initials'
												error={errors?.initials?.message}
											>
												<input
													type='text'
													placeholder='Enter initials...'
													{...register('initials')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>

										<div className='flex items-center gap-2'>
											<FormRow
												label='Address'
												error={errors?.address?.message}
											>
												<input
													type='text'
													placeholder='Enter address...'
													{...register('address')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<div className='w-full mt-7.5'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address2', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<div className='w-full'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address3', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
											<div className='w-full'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address4', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='House Name'
												error={errors?.houseName?.message}
											>
												<input
													type='text'
													placeholder='Enter house name...'
													{...register('houseName', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Postcode'
												error={errors?.postcode?.message}
											>
												<input
													type='text'
													placeholder='Enter postcode...'
													{...register('postcode')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Country'
												error={errors?.country?.message}
											>
												<input
													type='text'
													placeholder='Enter country...'
													{...register('country')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Telephone'
												error={errors?.telephone?.message}
											>
												<input
													type='text'
													placeholder='Enter telephone...'
													{...register('telephone')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Work Phone'
												error={errors?.workPhone?.message}
											>
												<input
													type='text'
													placeholder='Enter workPhone...'
													{...register('workPhone')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Mobile'
												error={errors?.mobile?.message}
											>
												<input
													type='text'
													placeholder='Enter mobile...'
													{...register('mobile')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Email'
												error={errors?.email?.message}
											>
												<input
													type='text'
													placeholder='Enter email...'
													{...register('email')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='D.O.B'
												error={errors?.dob?.message}
											>
												<input
													type='text'
													placeholder='Enter dob...'
													{...register('dob')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center'>
											<div className='w-full flex gap-2 justify-between'>
												<label className='flex items-center gap-3 cursor-pointer select-none'>
													<span className='text-gray-700'>Current</span>
													<input
														type='checkbox'
														{...register('email')}
														className='sr-only peer'
													/>

													<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
												</label>

												<button
													className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
													onClick={() => setActiveTab('shipping')}
												>
													Next <ArrowRight size={16} />
												</button>
											</div>
										</div>
									</>
								)}

								{activeTab === 'shipping' && (
									<>
										<div className='absolute right-0 -top-5 flex justify-end items-center'>
											<button
												type='button'
												className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
												onClick={() => {
													const profileValues = getValues(); // Get all profile form values

													// Set the same values to the shipping fields
													setValue('shippingSurname', profileValues.Surname);
													setValue('shippingName', profileValues.name);
													setValue('shippingTitle', profileValues.title);
													setValue('shippingInitials', profileValues.initials);
													setValue('shippingAddress', profileValues.address);
													setValue(
														'shippingHouseName',
														profileValues.houseName
													);
													setValue('shippingPostcode', profileValues.postcode);
													setValue('shippingCountry', profileValues.country);
												}}
											>
												Same As Profile <CopyCheck size={16} />
											</button>
										</div>

										<div className='flex items-center gap-2'>
											<FormRow
												label='Surname'
												error={errors?.shippingSurname?.message}
											>
												<input
													type='text'
													placeholder='Enter shipping surname...'
													{...register('shippingSurname', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Name'
												error={errors?.shippingName?.message}
											>
												<input
													type='text'
													placeholder='Enter shipping name...'
													{...register('shippingName')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Title'
												error={errors?.shippingTitle?.message}
											>
												<input
													type='text'
													placeholder='Enter Shipping Title (Mr, Mrs, Miss...)'
													{...register('shippingTitle', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Initials'
												error={errors?.shippingInitials?.message}
											>
												<input
													type='text'
													placeholder='Enter Shipping Initials...'
													{...register('shippingInitials')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>

										<div className='flex items-center gap-2'>
											<FormRow
												label='Address'
												error={errors?.shippingAddress?.message}
											>
												<input
													type='text'
													placeholder='Enter Shipping Address...'
													{...register('shippingAddress')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<div className='w-full mt-7.5'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address2', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<div className='w-full'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address3', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
											<div className='w-full'>
												<FormRow>
													<input
														type='text'
														placeholder='Enter address...'
														{...register('address4', {
															required: 'This field is required.',
														})}
														className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
													/>
												</FormRow>
											</div>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='House Name'
												error={errors?.shippingHouseName?.message}
											>
												<input
													type='text'
													placeholder='Enter house name...'
													{...register('shippingHouseName', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Postcode'
												error={errors?.shippingPostcode?.message}
											>
												<input
													type='text'
													placeholder='Enter Shipping Postcode...'
													{...register('shippingPostcode')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Country'
												error={errors?.shippingCountry?.message}
											>
												<input
													type='text'
													placeholder='Enter Shipping Country...'
													{...register('shippingCountry')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<div className='w-full flex gap-2 justify-end mt-7'>
												<button
													className='px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2'
													onClick={() => setActiveTab('other')}
												>
													Next <ArrowRight size={16} />
												</button>
											</div>
										</div>
									</>
								)}

								{activeTab === 'other' && (
									<>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Notes'
												error={errors?.notes?.message}
											>
												<input
													type='text'
													placeholder='Enter notes...'
													{...register('notes', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='VAT No.'
												error={errors?.vatNo?.message}
											>
												<input
													type='text'
													placeholder='Enter vatNo...'
													{...register('vatNo')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Major Items'
												error={errors?.majorItems?.message}
											>
												<input
													type='text'
													placeholder='Enter majorItems...'
													{...register('majorItems', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Minor Items'
												error={errors?.minorItems?.message}
											>
												<input
													type='text'
													placeholder='Enter minorItems...'
													{...register('minorItems')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Credit Limit'
												error={errors?.creditLimit?.message}
											>
												<input
													type='text'
													placeholder='Enter creditLimit...'
													{...register('creditLimit', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>

											<FormRow
												label='Loyalty Card No'
												error={errors?.loyaltyCardNo?.message}
											>
												<input
													type='text'
													placeholder='Enter loyaltyCardNo...'
													{...register('loyaltyCardNo')}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Points'
												error={errors?.points?.message}
											>
												<input
													type='text'
													placeholder='Enter points...'
													{...register('points', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Contract Amount 1'
												error={errors?.contractAmount1?.message}
											>
												<input
													type='text'
													placeholder='Enter contract Amount 1...'
													{...register('contractAmount1', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex items-center gap-2'>
											<FormRow
												label='Contract Amount 2'
												error={errors?.contractAmount2?.message}
											>
												<input
													type='text'
													placeholder='Enter contract Amount 2...'
													{...register('contractAmount2', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
											<FormRow
												label='Contract Amount 3'
												error={errors?.contractAmount3?.message}
											>
												<input
													type='text'
													placeholder='Enter contract Amount 3...'
													{...register('contractAmount3', {
														required: 'This field is required.',
													})}
													className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none'
												/>
											</FormRow>
										</div>
										<div className='flex item-center gap-2'>
											<label className='flex items-center gap-3 cursor-pointer select-none'>
												<span className='text-gray-700'>Trade Customer</span>
												<input
													type='checkbox'
													{...register('tradeCustomer')}
													className='sr-only peer'
												/>

												<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
											</label>
											<label className='flex items-center gap-3 cursor-pointer select-none'>
												<span className='text-gray-700'>VAT Exempt</span>
												<input
													type='checkbox'
													{...register('vatExempt')}
													className='sr-only peer'
												/>

												<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
											</label>
											<label className='flex items-center gap-3 cursor-pointer select-none'>
												<span className='text-gray-700'>Export</span>
												<input
													type='checkbox'
													{...register('export')}
													className='sr-only peer'
												/>

												<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
											</label>
											<label className='flex items-center gap-3 cursor-pointer select-none'>
												<span className='text-gray-700'>Auto Payments</span>
												<input
													type='checkbox'
													{...register('autoPayments')}
													className='sr-only peer'
												/>

												<div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
											</label>
										</div>
									</>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
