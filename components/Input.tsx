import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  // no custom props
}

const Input: React.FC<InputProps> = (props) => {
  return <input {...props} className='border px-3 py-1 rounded w-80' />;
};
export default Input;
