import { ButtonAtom } from "../Atomico/ButtomAtom";
import { InputAtom } from "../Atomico/InputAtom";

interface SearchFormMoleculeProps {
  ci: string;
  setCi: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  isLoading: boolean;
}

export const SearchFormMolecule: React.FC<SearchFormMoleculeProps> = ({
  ci,
  setCi,
  onSearch,
  isLoading,
}) => {
  const isSearchDisabled = ci.trim().length === 0;

  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white rounded-xl shadow-lg">
      <div className="flex-grow">
        <InputAtom
          value={ci}
          onChange={(e) => setCi(e.target.value)}
          placeholder="Ingrese CI del cliente (ej: 12345)"
          type="number"
          disabled={isLoading}
        />
      </div>
      <div className="sm:w-36">
        <ButtonAtom
          onClick={onSearch}
          disabled={isSearchDisabled}
          loading={isLoading}
        >
          Buscar
        </ButtonAtom>
      </div>
    </div>
  );
};
