import React, { useState, useRef } from 'react';

interface OTPInputProps {
  length?: number;
  setOtp?: (otp: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, setOtp }) => {
  const [otp, setOtpState] = useState<string[]>(Array(length).fill(''));
  const [errors] = useState<boolean[]>(Array(length).fill(false));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value;

    if (!value) {
      setOtpState((prev) => {
        const newOtp = [...prev];
        newOtp[idx] = '';
        setOtp?.(newOtp);
        return newOtp;
      });
      return;
    }

    const chars = value.slice(0, length - idx).split('');
    setOtpState((prev) => {
      const newOtp = [...prev];
      chars.forEach((char, i) => {
        if (idx + i < length) newOtp[idx + i] = char;
      });
      setOtp?.(newOtp);
      return newOtp;
    });

    const nextIndex =
      idx + chars.length < length ? idx + chars.length : length - 1;
    inputsRef.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="dir-ltr mx-auto flex w-full max-w-xs gap-2">
      {Array(length)
        .fill(0)
        .map((_, idx) => (
          <div key={idx} className="w-full">
            <input
              type="text"
              maxLength={length}
              value={otp[idx]}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              className={`text-black-700 outline-primary w-full max-w-15 min-w-8 rounded-lg border py-5 text-center ${errors[idx] ? 'border-red-500' : 'border-black-400'}`}
            />
          </div>
        ))}
    </div>
  );
};

export default OTPInput;
