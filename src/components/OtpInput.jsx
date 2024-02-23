import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputrefs = useRef([]);

  useEffect(() => {
    if (inputrefs.current[0]) {
      inputrefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;
    const newOtp = [...otp];
    //allow only one inputs
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //submit trigger
    const CombinedOtp = newOtp.join("");
    if (CombinedOtp.length == 4) onOtpSubmit(CombinedOtp);

    if (value && index < length - 1 && inputrefs.current[index + 1]) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputrefs.current[index + 1].setSelectionRange(1, 1);

    if (index > 0 && !otp[index - 1]) {
      inputrefs.current[otp.indexOf("")].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputrefs.current[index - 1]
    ) {
      inputrefs.current[index - 1].focus();
    }
  };

  return (
    <div>
      {otp.map((value, index) => (
        <input
          type="text"
          key={index}
          value={value}
          ref={(input) => (inputrefs.current[index] = input)}
          onChange={(e) => handleChange(index, e)}
          onClick={() => handleClick(index)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="otpInput"
        />
      ))}
    </div>
  );
};

export default OtpInput;
