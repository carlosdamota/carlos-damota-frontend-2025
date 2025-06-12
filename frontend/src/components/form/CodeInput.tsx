import { useState, useRef } from "react";
import styles from './CodeInput.module.css'; // opcional para estilizar

interface CodeInputProps {
  onSubmit: (code: string) => void;
  onChange?: () => void; // opcional
}

export const CodeInput: React.FC<CodeInputProps> = ({ onSubmit, onChange }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/, ""); // solo dígitos
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    onChange?.()

  
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every((digit) => digit !== "")) {
      onSubmit(code.join(""));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className={styles.container}>
      {code.map((digit, idx) => (
        <input
          key={idx}
          ref={(el) => (inputsRef.current[idx] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          className={styles.input}
          autoFocus={idx === 0}
        />
      ))}
    </div>
      <button type="submit" disabled={code.some(d => d === "")}>
  Verify
</button>
</form>
  );
};
