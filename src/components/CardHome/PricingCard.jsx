function PricingCard({ title, description, price, isFree, features }) {
  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 w-full">
      <div className="p-1 bg-green-100"></div>
      <div className="flex flex-col flex-grow p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>

        <ul className="text-sm text-gray-600 mb-6 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="mb-2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                className="w-4 h-4 mr-2 text-green-600"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <button className="w-full bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 focus:outline-none focus:shadow-outline-green active:bg-green-800">
          Chọn gói
        </button>
      </div>
    </div>
  );
}

export default PricingCard;
