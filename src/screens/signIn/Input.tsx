import "./Input.css";

interface InputProps {
  name: string;
  label: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  autoFocus?: boolean;
  handleShowPassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  handleChange,
  autoFocus,
  label,
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
      />
    </>
  );
};

export default Input;
