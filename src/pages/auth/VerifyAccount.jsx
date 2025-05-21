import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyAccount() {
  const location = useLocation();
  const navigate = useNavigate();

  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
    
    // Clear error when typing
    if (error) setError('');
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
      
      // Clear error when pasting
      if (error) setError('');
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
    
    // Validate code length
    if (verificationCode.length !== 6) {
      setError("Mã không hợp lệ!");
      return;
    }

    setLoading(true);
    try {
      await verifyEmail(email, verificationCode);
      // If verification successful, show success message
      setVerified(true);
      toast.success(messages.success.accountVerified);
    } catch (err) {
      console.error('Verification error:', err);
      setError(messages.error.accountVerification.invalidCode);
    } finally {
      setLoading(false);
    }
  };

  return ( 
<>
</>
   );
}

export default VerifyAccount;