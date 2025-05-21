function ReviewCard({ name, date, title, rating, text }) {
  return (
    <div className="flex flex-col gap-2 max-w-md w-full bg-white p-5 rounded-xl shadow-md hover:scale-105 hover:duration-150 duration-150">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row justify-between w-full">
          <p className="text-xs text-gray-600">{name}</p>
          <p className="text-xs text-gray-600">{date}</p>
        </div>
      </div>
      <div className="flex flex-row justify-between w-full">
        <h3 className="text-xl font-bold text-green-600">{title}</h3>
        <div className="text-xs">
          <div className="flex flex-row">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ${
                  index < rating ? "text-yellow-400" : "text-yellow-200"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.916 1.603-.916 1.902 0l1.286 3.953a1.5 1.5 0 001.421 1.033h4.171c.949 0 1.341 1.154.577 1.715l-3.38 2.458a1.5 1.5 0 00-.54 1.659l1.286 3.953c.3.916-.757 1.67-1.539 1.145l-3.38-2.458a1.5 1.5 0 00-1.76 0l-3.38 2.458c-.782.525-1.838-.229-1.539-1.145l1.286-3.953a1.5 1.5 0 00-.54-1.659l-3.38-2.458c-.764-.561-.372-1.715.577-1.715h4.171a1.5 1.5 0 001.421-1.033l1.286-3.953z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600">{text}</div>
    </div>
  );
}
export default ReviewCard;
