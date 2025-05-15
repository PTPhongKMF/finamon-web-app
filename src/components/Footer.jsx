function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Về Chúng Tôi</h3>
            <p className="text-gray-300">
              Chúng tôi cam kết mang đến những dịch vụ tốt nhất cho khách hàng của mình.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liên Hệ</h3>
            <ul className="text-gray-300">
              <li>Điện thoại: (84) 123-456-789</li>
              <li>Email: lienhe@example.com</li>
              <li>Địa chỉ: Hà Nội, Việt Nam</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Theo Dõi</h3>
            <ul className="text-gray-300">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
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