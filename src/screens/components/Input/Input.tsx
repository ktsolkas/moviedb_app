import "./Input.css";

interface InputProps {
  name: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoFocus?: boolean;
  placeholder?: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  handleChange,
  autoFocus,
  label,
  placeholder,
  value
}) => {
  return (
    <>
      <label htmlFor={name}>{label} </label>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        required
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
      />
    </>
  );
};

export default Input;
