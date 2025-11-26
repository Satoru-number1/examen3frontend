interface InputAtomProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: "text" | "number";
  disabled?: boolean;
}

export const InputAtom: React.FC<InputAtomProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
  />
);
