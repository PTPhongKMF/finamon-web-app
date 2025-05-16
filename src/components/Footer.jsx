function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="mx-8 px-4">
        <div className="grid grid-cols-[1fr_0.5fr_1fr_1.5fr] gap-4">
          <div>
            <h3 className="text-xl font-bold mb-4">Về Chúng Tôi</h3>
            <p className="text-gray-300">
              Chúng tôi cam kết mang đến những dịch vụ tốt nhất cho khách hàng của mình.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Theo Dõi</h3>
            <ul className="text-gray-300">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <ul className="text-gray-300">
              <li>Điện thoại: (84) 123-456-789</li>
              <li>Email: lienhe@example.com</li>
              <li>Địa chỉ: 7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh</li>
            </ul>
          </div>

          <div className="h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Finamon Company"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6100105370233!2d106.80730807490879!3d10.841127589311547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1741923466246!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        <div className="text-center mt-8 pt-8 border-t border-gray-700">
          <p className="text-gray-400">© 2025 Bản quyền thuộc về công ty Finamon. Bảo lưu mọi quyền.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;