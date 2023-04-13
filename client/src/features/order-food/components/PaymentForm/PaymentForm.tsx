import { Divider } from 'src/components';

export default function PaymentForm() {
  return (
    <div className="mb-9">
      <h5 className="mb-2 text-xl font-medium">Payment Details</h5>
      <p className="mb-9 text-gray-600">Please select a payment option</p>
      <div className="mb-5 flex items-center gap-5">
        <input type="radio" id="cash" name="payment-option" />
        <label htmlFor="cash">Cash on delivery</label>
      </div>
      <div className="mb-6 flex items-center gap-5 text-gray-500 ">
        <input disabled type="radio" id="e-sewa" name="payment-option" />
        <label htmlFor="e-sewa" className="">
          E-sewa
        </label>
      </div>
      <Divider />
    </div>
  );
}
