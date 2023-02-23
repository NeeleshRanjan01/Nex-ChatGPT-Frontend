import React, { useState } from "react";
import axios from "axios";

function SendOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    // const response = await axios.post("/api/sendotp", { email: email });
    setIsOtpSent(true);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    // const response = await axios.post("/api/verifyotp", { email: email, otp: otp });
    setIsOtpVerified(true);
  };

  return (
    <div>
      {!isOtpSent && (
        <form onSubmit={handleSendOtp}>
          <label htmlFor="email">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Send OTP</button>
        </form>
      )}

      {isOtpSent && !isOtpVerified && (
        <form onSubmit={handleVerifyOtp}>
          <label htmlFor="otp">OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button type="submit">Verify OTP</button>
        </form>
      )}

      {isOtpVerified && <div>OTP verified successfully!</div>}
    </div>
  );
}

export default SendOtp