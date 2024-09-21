// eslint-disable-next-line react/prop-types
const InputField = ({ type, value, onChange, placeholder }) => (
  <div className="relative">
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-6 py-3 text-white bg-blue-900 bg-opacity-30 border border-blue-400 border-opacity-50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-blue-200 pr-10"
      placeholder={placeholder}
      required
    />
    <svg
      className="w-5 h-5 text-blue-300 absolute right-3 top-3"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {type === "email" ? (
        <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      ) : (
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      )}
    </svg>
  </div>
);

export default InputField;
