interface ButtonAtomProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
}

export const ButtonAtom: React.FC<ButtonAtomProps> = ({
  onClick,
  children,
  disabled = false,
  loading = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`w-full py-3 px-4 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-[1.01]
      ${
        disabled || loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
      }`}
  >
    {loading ? (
      <span className="flex items-center justify-center">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-white"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Cargando...
      </span>
    ) : (
      children
    )}
  </button>
);
