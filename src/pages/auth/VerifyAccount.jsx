import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { kyAspDotnet } from "../../api/ky";

function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');
  const [verified, setVerified] = useState(false);

  const userEmail = location.state?.email || "";

  // Create refs for the individual digit inputs
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const doVerify = useMutation({
    onMutate: () => {
      if (verificationCode.length !== 6) throw new Error("Mã không hợp lệ!")
    },
    mutationFn: async () => {
      return await kyAspDotnet.post("api/auth/verify-email", {
        json: {
          email: userEmail,
          verificationCode: verificationCode
        }
      }).json();
    },
    onSuccess: () => {
      setVerified(true);
    }
  });

  useEffect(() => {
    if (!userEmail)
      navigate('/login');
  }, [userEmail, navigate]);

  useEffect(() => {
    if (inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, []);

  function handleDigitChange(index, e) {
    const value = e.target.value;

    // Only allow single numeric value
    const digit = value.replace(/\D/g, '').slice(-1);

    // Update the verification code
    const newVerificationCode = verificationCode.split('');
    newVerificationCode[index] = digit;
    setVerificationCode(newVerificationCode.join(''));

    // If a digit was entered and there's a next input, focus it
    if (digit && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle paste event for any input
  function handlePaste(e) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');

    // Extract only digits from pasted data
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);

    if (digits.length > 0) {
      // Create a new verification code with the pasted digits
      const newCode = digits.padEnd(6, '').slice(0, 6);
      setVerificationCode(newCode);

      // Focus the appropriate input box based on the number of digits pasted
      const focusIndex = Math.min(digits.length, 5);
      if (focusIndex < 6) {
        inputRefs[focusIndex].current.focus();
      }
    }
  };

  // Handle backspace key to navigate to previous input
  function handleKeyDown(index, e) {
    if (e.key === 'Backspace' && index > 0 && !verificationCode[index]) {
      inputRefs[index - 1].current.focus();
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    doVerify.mutate();
  };

  return verified ? (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[url(/images/verify_bg.jpg)] bg-cover">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#2A303C] p-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Xác Nhận Thành Công!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Tài khoản của bạn đã được xác nhận. Bây giờ bạn có thể đăng nhập hoặc về trang chủ.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium 
                       rounded-lg text-white bg-green-500 hover:bg-green-600 cursor-pointer
                       transition-colors duration-200"
            >
              Đăng nhập
            </button>
          </Link>
          <Link to="/">
            <button
              className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-700 text-sm font-medium 
                       rounded-lg text-gray-700 dark:text-white bg-white dark:bg-transparent dark:hover:bg-gray-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-600 cursor-pointer hover:bg-yellow-300
                       transition-colors duration-200"
            >
              Trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[url(/images/verify_bg.jpg)] bg-cover">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-[#2A303C] p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Xác Nhận Tài Khoản
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Chúng tôi đã gửi mã xác nhận đến Email của bạn.
            <br />Hãy nhập mã xác nhận xuống ô sau.
          </p>
        </div>

        {doVerify.isError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">Lỗi: {doVerify.error?.message}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verification-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Mã xác nhận
            </label>

            <div className="flex justify-between gap-2">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={verificationCode[index] || ''}
                  onChange={(e) => handleDigitChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 border border-gray-300 dark:border-gray-600 rounded-md 
                           text-gray-900 dark:text-white bg-white dark:bg-[#1B2028] 
                           text-center text-xl font-mono
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={doVerify.isPending || verificationCode.length !== 6}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium 
                     rounded-lg text-white bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-600 disabled:cursor-not-allowed"
            >
              {doVerify.isPending ? 'Đang xác nhận...' : 'Xác nhận'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyAccount;