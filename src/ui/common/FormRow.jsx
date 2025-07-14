/** @format */

export default function FormRow({ label, children, error }) {
	return (
		<div className='w-full flex flex-col gap-2'>
			{label && <label>{label}</label>}
			{children}
			{error && <span>{error}</span>}
		</div>
	);
}
