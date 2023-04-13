import { Divider } from 'src/components';

export default function PersonalDetailsForm() {
  return (
    <div className="mb-9 w-full">
      <h5 className="mb-2 text-xl font-medium">Personal Details</h5>
      <p className="mb-9 text-gray-600">
        Fill all the fields with correct information
      </p>

      <div className="mb-5 flex flex-wrap items-center gap-5">
        <label htmlFor="name" className="w-[150px]">
          Name:
        </label>
        <input
          type="text"
          id="name"
          placeholder="Enter your full name"
          className="w-full max-w-[300px] rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <div className="mb-5 flex flex-wrap items-center gap-5">
        <label htmlFor="phone-number" className="w-full max-w-[150px]">
          Phone Number:
        </label>
        <input
          type="text"
          placeholder="(+977)"
          id="phone-number"
          className="w-full max-w-[300px] rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-5">
        <label htmlFor="address" className="w-[150px]">
          Delivery Address:
        </label>
        <input
          type="text"
          placeholder="eg: Kapan, Baluwakhani"
          id="address"
          className="w-full max-w-[300px] rounded-md border border-gray-300 px-5 py-2"
        />
      </div>
      <Divider />
    </div>
  );
}
