interface TextAtomProps {
  children: React.ReactNode;
  className?: string;
}

export const TextAtom: React.FC<TextAtomProps> = ({ children, className = "" }) => (
  <p className={`text-gray-700 ${className}`}>{children}</p>
);
