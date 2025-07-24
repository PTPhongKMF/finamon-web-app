import PricingCard from "../components/CardHome/PricingCard";
import ReviewCard from "../components/CardHome/ReviewCard";
import { m } from "../i18n/paraglide/messages";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-[url(/images/home_hero.jfif)] bg-center text-white py-16">
        <div className="container mx-auto p-4 text-center bg-gradient-to-r from-green-500/80 to-green-700/80 rounded-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {m["home.hero.title"]()}<br/>
          </h2>
          <p className="text-lg md:text-xl mb-6 text-yellow-200">
            {m["home.hero.subtitle"]()}
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/app"
              className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition"
            >
              {m["home.hero.cta.getStarted"]()}
            </Link>
            <Link
              to="/download"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
            >
              {m["home.hero.cta.download"]()}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose FINAMON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            {m["home.whyChoose.title"]()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.whyChoose.reasons.easyToUse.title"]()}
                </h4>
              </div>
              <p>
                {m["home.whyChoose.reasons.easyToUse.description"]()}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.whyChoose.reasons.smartAnalysis.title"]()}
                </h4>
              </div>
              <p>
                {m["home.whyChoose.reasons.smartAnalysis.description"]()}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 0115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.whyChoose.reasons.crossDevice.title"]()}
                </h4>
              </div>
              <p>
                {m["home.whyChoose.reasons.crossDevice.description"]()}
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/pricings"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              {m["home.whyChoose.viewPricing"]()}
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            {m["home.features.title"]()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.features.items.expenseTracking.title"]()}
                </h4>
              </div>
              <p>{m["home.features.items.expenseTracking.description"]()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.features.items.financialPlanning.title"]()}
                </h4>
              </div>
              <p>{m["home.features.items.financialPlanning.description"]()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-1 transition transform duration-300">
              <div className="flex items-center mb-2">
                <svg
                  className="w-6 h-6 text-green-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <h4 className="text-xl font-semibold text-green-600">
                  {m["home.features.items.visualReports.title"]()}
                </h4>
              </div>
              <p>{m["home.features.items.visualReports.description"]()}</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/features"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              {m["home.features.viewMore"]()}
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            {m["home.reviews.title"]()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ReviewCard
              name="Nguyễn Văn Toàn"
              date="01/06/2025"
              title="trang web rất đẹp"
              rating={5}
              text="website này giúp tôi quản lý chi tiêu dễ dàng hơn bao giờ hết. Giao diện thân thiện và báo cáo rất trực quan!"
            />
            <ReviewCard
              name="Lê Thanh Hương"
              date="01/06/2025"
              title="Trải nghiệm tuyệt vời!"
              rating={4}
              text="Cải thiện đáng kể trong việc theo dõi chi tiêu hàng ngày. Tôi rất hài lòng với ứng dụng này!"
            />
            <ReviewCard
              name="Phạm Tố Nga"
              date="01/06/2025"
              title="Rất hữu ích!"
              rating={5}
              text="Trang web này giúp tôi theo dõi chi tiêu hàng ngày một cách dễ dàng. Tôi đã tiết kiệm được rất nhiều nhờ nó!"
            />
            <ReviewCard
              name="Nguyễn Dực Dũng"
              date="01/06/2025"
              title="Trải nghiệm khá tốt"
              rating={4}
              text="Giao diện thân thiện và dễ sử dụng. Tuy nhiên, tôi mong muốn có thêm nhiều tính năng hơn nữa."
            />
            <ReviewCard
              name="Trần Thị Bích Thơ"
              date="15/05/2025"
              title="Tính năng lập kế hoạch tài chính"
              rating={5}
              text="Tôi đã tiết kiệm được rất nhiều nhờ tính năng lập kế hoạch tài chính. Rất đáng để thử!"
            />
            <ReviewCard
              name="Hồ Thị Xuyên"
              date="10/04/2025"
              title="Báo cáo rõ ràng"
              rating={4}
              text="Biểu đồ báo cáo rất rõ ràng, giúp tôi hiểu ngay tình hình tài chính của mình."
            />
          </div>
          <div className="text-center mt-12">
            <Link
              to="/blogs"
              className="inline-block bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition"
            >
              {m["home.reviews.viewNews"]()}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
