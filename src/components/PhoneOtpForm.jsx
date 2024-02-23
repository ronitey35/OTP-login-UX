import React, { useState } from "react";
import OtpInput from "./OtpInput";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    //Validation
    const regex = /[^0-9]/g;
    if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    setShowOtpInput(true);
  };

  const onOtpSubmit = () => {
    console.log("login successfull");
  };
  return (
    <div>
      {showOtpInput ? (
        <div>
          <h2>
            Enter OTP send To <span className="phonenum">{phoneNumber}</span>
          </h2>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      ) : (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Your Phone Number"
          />
          <button type="submit">Send OTP</button>
        </form>
      )}
    </div>
  );
};

export default PhoneOtpForm;
