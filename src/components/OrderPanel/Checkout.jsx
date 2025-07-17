/** @format */

import { Check, CheckCheck, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refreshPaymentTypes } from '../../slices/tillPaymentTypesSlice';
import { refreshTillProductShortcuts } from '../../slices/productSlice';
import { createSale } from '../../services/operations/salesApi';
import ExpressCheckout from './Checkout/ExpressCheckout';
import AdvanceCheckout from './Checkout/AdvanceCheckout';
import CheckoutTabs from './Checkout/CheckoutTabs';

const calButtons = [
	'1',
	'2',
	'3',
	'£5',
	'4',
	'5',
	'6',
	'£10',
	'7',
	'8',
	'9',
	'£20',
	'.',
	'0',
	'<',
	'£50',
];

// const paymentTypesInput = [
// 	'CASH',
// 	'CHEQUE',
// 	'MASTERCARD',
// 	'VISA',
// 	'VOUCHER',
// 	'CREDIT',
// 	'SWITCH',
// 	'CONNECT',
// 	'PAYPAL',
// 	'SAGEPAY',
// 	'OWN CARD',
// 	'OTHER',
// 	'DEPOSIT',
// 	'GIANT C & C',
// 	'CYCLE SCHEME',
// 	'LOYALTY POINTS',
// ];

export default function Checkout({
	onclose,
	selectedCustomer,
	onPaymentComplete,
	setIsComplete,
}) {
	const dispatch = useDispatch();
	const { activeOrderId, orders } = useSelector((state) => state.order);
	const { paymentTypes } = useSelector((state) => state.paymentType);
	const [activeTab, setActiveTab] = useState('express');
	const [expressInputValue, setExpressInputValue] = useState('0.00');
	const [selectedPaymentType, setSelectedPaymentType] = useState(null);
	const [tenderedAmounts, setTenderedAmounts] = useState({});
	const [isProcessing, setIsProcessing] = useState(false);
	const activeOrder = orders.find((order) => order.id === activeOrderId);
	const tabs = [
		{ key: 'express', label: 'Express Checkout', icon: <Check size={20} /> },
		{
			key: 'advance',
			label: 'Advance Checkout',
			icon: <CheckCheck size={20} />,
		},
	];

	const handleButtonClick = (btn) => {
		if (btn.startsWith('£')) {
			console.log(btn.replace('£', ''));
			const numericValue = btn.replace('£', '');
			setExpressInputValue(parseFloat(numericValue).toFixed(2));
		} else if (btn === '<') {
			setExpressInputValue((prev) => {
				const newVal = prev.slice(0, -1);
				return newVal === '' ? '0.00' : newVal;
			});
		} else if (!isNaN(btn)) {
			setExpressInputValue((prev) => {
				let newVal = prev === '0.00' || prev === '0' ? btn : prev + btn;
				// Prevent multiple decimals
				if (btn === '.' && prev.includes('.')) return prev;
				return newVal;
			});
		}
	};

	const handleAdvanceButtonClick = (btn) => {
		if (!selectedPaymentType) return;

		setTenderedAmounts((prev) => {
			let currentValue = prev[selectedPaymentType]?.toString() || '0.00';

			// Handle £ buttons
			if (btn.startsWith('£')) {
				const numericValue = btn.replace('£', '');
				return {
					...prev,
					[selectedPaymentType]: numericValue,
				};
			}

			// Handle backspace
			if (btn === '<') {
				let newVal = currentValue.slice(0, -1);
				if (newVal === '' || newVal === '.') newVal = '0.00';
				return {
					...prev,
					[selectedPaymentType]: newVal,
				};
			}

			// Handle decimal point
			if (btn === '.') {
				if (currentValue.includes('.')) return prev;
				currentValue += '.';
				return {
					...prev,
					[selectedPaymentType]: currentValue,
				};
			}

			// Handle digits
			if (!isNaN(btn)) {
				let newVal =
					currentValue === '0' || currentValue === '0.00'
						? btn
						: currentValue + btn;
				return {
					...prev,
					[selectedPaymentType]: newVal,
				};
			}

			return prev;
		});
	};

	const handleClickEnter = async () => {
		if (!tenderedAmounts || Object.keys(tenderedAmounts).length === 0) return;

		setIsProcessing(true);

		try {
			// 1. Extract payment types used with non-zero values
			const selectedPaymentTypes = Object.entries(tenderedAmounts)
				.filter(([, amount]) => parseFloat(amount) > 0)
				.map(([typeName]) => {
					const matchedType = paymentTypes.find((pt) => pt.name === typeName);

					return {
						paymentType: matchedType?.type ?? 0,
						transactionRef: '',
						type: matchedType?.name ?? typeName,
						amount: parseFloat(amountDue),
						createdAt: new Date().toISOString(),
						updatedAt: new Date().toISOString(),
						saleTransactionId: 0, // Replace if needed
					};
				});

			// 2. Prepare cart items
			const cartItems = activeOrder.items.map((item) => ({
				partNumber: item.product.partNumber,
				quantity: item.quantity,
				unitPrice: item.product.price || item.product.promoPrice || 0,
				discount: item.product.discount || 0,
				vat: 0, // Add logic if you use VAT
				costPrice: item.product.costPrice || 0,
				isPromo: item.product.isPromo || false,
				stockNumber: item.product.stockNumber || '00',
			}));

			// 3. Final Payload
			const payload = {
				customerAccount: selectedCustomer.accNo,
				items: cartItems,
				paymentTypes: selectedPaymentTypes,
				paymentDueDate: new Date().toISOString(),
				tillId: 'A',
				location: '01',
				salesCode: '01',
				discountCode: '',
				notes: '',
				invoiceNumber: '',
				orderNo: '',
			};

			// 🔁 Send to backend (replace with your API call)
			let response = await createSale(payload);

			if (response.status === 'success') {
				setIsProcessing(false);
				setIsComplete(true);
				setTenderedAmounts({});
				setSelectedPaymentType(null);
				dispatch(refreshTillProductShortcuts('A'));
				// Auto close after success
				setTimeout(() => {
					onPaymentComplete();
					setIsComplete(false);
				}, 2000);
			} else {
				console.log('Payment Error:', response);
				setIsProcessing(false);
			}
			// ✅ Reset state
		} catch (error) {
			console.error('Sale failed:', error);
			setIsProcessing(false);
		}
	};

	const toggleActiveTab = (tab) => {
		setActiveTab(tab);
	};

	const subtotal = useMemo(() => {
		return activeOrder?.items.reduce((sum, item) => {
			const price =
				item.changedPrice ?? item.originalPrice ?? item.product.price ?? 0;
			return sum + price * item.quantity;
		}, 0);
	}, [activeOrder?.items]);

	const discountTotal = useMemo(() => {
		return activeOrder.items.reduce((acc, item) => {
			const original =
				(item.originalPrice ?? item.product.price ?? 0) * item.quantity;
			const changed =
				(item.changedPrice ?? item.originalPrice ?? item.product.price ?? 0) *
				item.quantity;
			return acc + (original - changed);
		}, 0);
	}, [activeOrder.items]);

	const tax = useMemo(() => subtotal * 0.2, [subtotal]);
	const amountDue = useMemo(() => subtotal + tax, [subtotal, tax]);
	const calChange = Math.max(
		0,
		parseFloat(expressInputValue || '0') - amountDue
	)?.toFixed(2);

	const advanceCalChange = (
		Object.values(tenderedAmounts)
			.map((val) => Number(val))
			.reduce((acc, curr) => acc + curr, 0) - amountDue
	).toFixed(2);

	useEffect(() => {
		setExpressInputValue(amountDue.toFixed(2));
	}, [amountDue]);

	useEffect(() => {
		dispatch(refreshPaymentTypes());
	}, [dispatch]);

	return (
		<div
			className='fixed inset-0 flex justify-center items-center bg-black/25 overflow-hidden'
			onClick={onclose}
		>
			<div
				className='bg-white rounded-lg shadow-lg max-w-5xl h-[54rem] w-full flex flex-col gap-2'
				onClick={(e) => e.stopPropagation()}
			>
				{/* Header */}
				<div className='w-full h-[4rem] px-6 py-4 border-b border-b-gray-200 flex justify-between items-center'>
					<span>Header</span>
					<button
						className='bg-transparent hover:bg-gray-100 cursor-pointer p-2 rounded-lg'
						onClick={onclose}
					>
						<X size={16} />
					</button>
				</div>

				{/* Checkout Tabs */}
				<CheckoutTabs
					toggleActiveTab={toggleActiveTab}
					activeTab={activeTab}
					tabs={tabs}
				/>

				{/* Tab Content */}
				<div className='px-6 pb-4 pt-0'>
					{activeTab === 'express' && (
						<ExpressCheckout
							toggleActiveTab={toggleActiveTab}
							amountDue={amountDue}
							tax={tax}
							discountTotal={discountTotal}
							calChange={calChange}
							expressInputValue={expressInputValue}
							handleButtonClick={handleButtonClick}
							calButtons={calButtons}
						/>
					)}
					{activeTab === 'advance' && (
						<AdvanceCheckout
							setSelectedPaymentType={setSelectedPaymentType}
							tenderedAmounts={tenderedAmounts}
							selectedPaymentType={selectedPaymentType}
							amountDue={amountDue}
							advanceCalChange={advanceCalChange}
							calButtons={calButtons}
							handleAdvanceButtonClick={handleAdvanceButtonClick}
							handleClickEnter={handleClickEnter}
							isProcessing={isProcessing}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
