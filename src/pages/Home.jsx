import PricingCard from "../components/CardHome/PricingCard";
import ReviewCard from "../components/CardHome/ReviewCard";

function Home() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Quản lý chi tiêu cá nhân dễ dàng
          </h2>
          <p className="text-lg md:text-xl mb-6 text-yellow-200">
            Ứng dụng giúp bạn kiểm soát tài chính, tiết kiệm và đầu tư hiệu quả.
          </p>
          <button className="bg-yellow-400 text-green-900 font-semibold px-6 py-3 rounded-full shadow hover:bg-yellow-500 transition">
            Bắt đầu ngay
          </button>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            Gói dịch vụ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PricingCard
              title="Gói Miễn Phí"
              description="Phù hợp cho người mới bắt đầu"
              price="0 VNĐ"
              isFree={true}
              features={[
                "Hỗ trợ 1 người dùng",
                "Tính năng cơ bản",
                "Hỗ trợ qua email",
              ]}
            />
            <PricingCard
              title="Gói Cơ Bản"
              description="Dành cho cá nhân muốn quản lý tài chính hiệu quả"
              price="199.000 VNĐ"
              isFree={false}
              features={[
                "Hỗ trợ 5 người dùng",
                "Tính năng cơ bản + báo cáo",
                "Hỗ trợ qua email và chat",
              ]}
            />
            <PricingCard
              title="Gói Trung Cấp"
              description="Lý tưởng cho các nhóm nhỏ"
              price="349.000 VNĐ"
              isFree={false}
              features={[
                "Hỗ trợ 10 người dùng",
                "Tính năng nâng cao",
                "Hỗ trợ qua email và điện thoại",
              ]}
            />
            <PricingCard
              title="Gói Pro"
              className="border-2 border-green-500 bg-green-50"
              description="Dành cho doanh nghiệp và tổ chức lớn"
              price="499.000 VNĐ"
              isFree={false}
              features={[
                "Hỗ trợ 25 người dùng",
                "Tính năng nâng cao",
                "Hỗ trợ 24/7",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Why Choose FINAMON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            Tại sao bạn nên chọn sử dụng ứng dụng của FINAMON?
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
                  Dễ sử dụng và trực quan
                </h4>
              </div>
              <p>
                Giao diện thân thiện giúp bạn ghi chép chi tiêu chỉ trong vài
                giây mà không cần kỹ năng đặc biệt.
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
                  Phân tích thông minh
                </h4>
              </div>
              <p>
                Hệ thống báo cáo và biểu đồ giúp bạn hiểu rõ xu hướng chi tiêu
                và đưa ra quyết định tài chính hợp lý.
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
                  Đồng bộ đa thiết bị
                </h4>
              </div>
              <p>
                Dữ liệu được lưu trữ an toàn trên đám mây và đồng bộ trên mọi
                thiết bị của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            Tính năng nổi bật
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
                  Ghi chép chi tiêu
                </h4>
              </div>
              <p>Theo dõi thu chi hàng ngày một cách chi tiết và khoa học.</p>
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
                  Lập kế hoạch tài chính
                </h4>
              </div>
              <p>Đặt mục tiêu tiết kiệm và theo dõi tiến độ dễ dàng.</p>
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
                  Báo cáo trực quan
                </h4>
              </div>
              <p>Biểu đồ sinh động giúp bạn hiểu rõ tình hình tài chính.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            Đánh giá từ người dùng
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
        </div>
      </section>

      <section class="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div class="flex flex-col gap-2 items-center">
          <h3 className="text-3xl font-bold text-center mb-12 text-green-700">
            Thông tin liên hệ
          </h3>
          <div class="flex flex-row gap-2">
            <button class="w-[140px] h-[140px] outline-none border-none bg-white rounded-[140px_5px_5px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#cc39a4] group flex items-center justify-center">
              <svg
                class="mt-6 ml-5 fill-[#cc39a4] group-hover:fill-white"
                height="30"
                width="30"
                viewBox="0,0,256,256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none">
                  <g transform="scale(8,8)">
                    <path d="M11.46875,5c-3.55078,0 -6.46875,2.91406 -6.46875,6.46875v9.0625c0,3.55078 2.91406,6.46875 6.46875,6.46875h9.0625c3.55078,0 6.46875,-2.91406 6.46875,-6.46875v-9.0625c0,-3.55078 -2.91406,-6.46875 -6.46875,-6.46875zM11.46875,7h9.0625c2.47266,0 4.46875,1.99609 4.46875,4.46875v9.0625c0,2.47266 -1.99609,4.46875 -4.46875,4.46875h-9.0625c-2.47266,0 -4.46875,-1.99609 -4.46875,-4.46875v-9.0625c0,-2.47266 1.99609,-4.46875 4.46875,-4.46875zM21.90625,9.1875c-0.50391,0 -0.90625,0.40234 -0.90625,0.90625c0,0.50391 0.40234,0.90625 0.90625,0.90625c0.50391,0 0.90625,-0.40234 0.90625,-0.90625c0,-0.50391 -0.40234,-0.90625 -0.90625,-0.90625zM16,10c-3.30078,0 -6,2.69922 -6,6c0,3.30078 2.69922,6 6,6c3.30078,0 6,-2.69922 6,-6c0,-3.30078 -2.69922,-6 -6,-6zM16,12c2.22266,0 4,1.77734 4,4c0,2.22266 -1.77734,4 -4,4c-2.22266,0 -4,-1.77734 -4,-4c0,-2.22266 1.77734,-4 4,-4z"></path>
                  </g>
                </g>
              </svg>
            </button>

            <button class="w-[140px] h-[140px] outline-none border-none bg-white rounded-[5px_140px_5px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#03A9F4] group flex items-center justify-center">
              <svg
                class="mt-6 -ml-4 fill-[#03A9F4] group-hover:fill-white"
                height="30"
                width="30"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"></path>
              </svg>
            </button>
          </div>

          <div class="flex flex-row gap-2">
            <button class="w-[140px] h-[140px] outline-none border-none bg-white rounded-[5px_5px_5px_140px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 hover:bg-black group flex items-center justify-center">
              <svg
                class="mt-[-0.375rem] ml-5 fill-black group-hover:fill-white"
                height="30"
                width="30"
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
            </button>

            <button class="w-[140px] h-[140px] outline-none border-none bg-white rounded-[5px_5px_140px_5px] shadow-lg transition-all duration-200 ease-in-out hover:scale-110 hover:bg-[#8c9eff] group flex items-center justify-center">
              <svg
                class="mt-[-0.563rem] -ml-5 fill-[#8c9eff] group-hover:fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="30"
                height="30"
              >
                <path d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
