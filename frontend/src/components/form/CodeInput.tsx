import { useState, useRef } from "react";
import CodeInputStyles from './CodeInputStyles.module.css';

interface CodeInputProps {
  onSubmit: (code: string) => void;
  onResend?: () => void;
  onChange?: () => void;
  error?: string; 
  resetError?: () => void;
  timeLeft: number;
  canResend: boolean;
  isSubmitting?: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ 
  onSubmit, 
  onResend, 
  error,
  resetError,
  timeLeft,
  canResend,
  isSubmitting = false,
}) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (error && resetError) resetError();

    if (index < 5 && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }

    if (index === 5 && newCode.every(d => d !== "")) {
      setTimeout(() => onSubmit(newCode.join("")), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const newCode = [...code];
      if (code[index] === "") {
        if (index > 0) {
          newCode[index - 1] = "";
          setCode(newCode);
          inputsRef.current[index - 1]?.focus();
        }
      } else {
        newCode[index] = "";
        setCode(newCode);
      }
    }
    
    if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every((digit) => digit !== "")) {
      onSubmit(code.join(""));
    }
  };

  const handleResend = () => {
    if (onResend && canResend) {
      onResend();
      setCode(["", "", "", "", "", ""]);
      if (inputsRef.current[0]) inputsRef.current[0].focus();
    }
  };

  return (
    <div className={CodeInputStyles.container}>
      {error && (
        <p className={CodeInputStyles.errorText}>
          {error}
        </p>
      )}
      
      <form onSubmit={handleSubmit} className={CodeInputStyles.formContainer}>
        <div className={CodeInputStyles.codeContainer}>
          {code.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              className={`${CodeInputStyles.codeInput} ${
                digit ? CodeInputStyles.filled : ''
              } ${error ? CodeInputStyles.errorInput : ''}`}
              onChange={(e) => handleChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              autoFocus={idx === 0}
              disabled={isSubmitting}
            />
          ))}
        </div>
        
        <div className={CodeInputStyles.timeContainer}>
          <p className={CodeInputStyles.timeText}>
            {canResend ? "Code expired" : `Code expires in: ${formatTime(timeLeft)}`}
          </p>
        </div>
        
        <button 
          type="submit" 
          disabled={code.some(d => d === "") || isSubmitting}
          className={CodeInputStyles.submitButton}
        >
          {isSubmitting ? 'Verifying...' : 'Verify'}
        </button>
      </form>
      
      <div className={CodeInputStyles.resendContainer}>
        <p>Didn't receive the code?</p>
        <button
          onClick={handleResend}
          disabled={!canResend || isSubmitting}
          className={`${CodeInputStyles.resendButton} ${
            canResend ? CodeInputStyles.resendActive : ''
          }`}
        >
          Resend Code
        </button>
      </div>
    </div>
  );
};