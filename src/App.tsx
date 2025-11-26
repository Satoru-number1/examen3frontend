import  { useState, useCallback } from 'react';
import './App.css'
import { SearchFormMolecule } from './Components/Molecula/SearchFormMolecule';
import { TextAtom } from './Components/Atomico/TextAtom';
import { ReportTableOrganism } from './Components/Organismo/ReportTableOrganims';

interface IReporteCliente {
  nombreCliente: string;
  ci: string; // La cédula de identidad, que puede ser un número en string
  montoTotal: number; // Límite del crédito
  montoUsado: number; // Saldo usado
  montoActual: number; // Saldo disponible (Total - Usado)
}
function App() {
  const API_BASE_URL =
    "https://examen3backend-production.up.railway.app/api/CreditoClientes/";
  const [ciInput, setCiInput] = useState<string>('');
  const [reportData, setReportData] = useState<IReporteCliente | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los datos
  const fetchReport = useCallback(async () => {
    // Solo si el CI es un número válido (o convertible a uno)
    if (!ciInput || isNaN(Number(ciInput))) {
      setError("Por favor, ingrese un número de CI válido.");
      return;
    }

    setIsLoading(true);
    setReportData(null);
    setError(null);

    const url = `${API_BASE_URL}${ciInput}`;

    try {
      const response = await fetch(url);
      
      if (response.status === 404) {
        // Manejar el caso de cliente no encontrado (según la lógica del backend de C#)
        setError(`Error: Cliente con CI ${ciInput} no encontrado.`);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Error en la respuesta del servidor: ${response.status} ${response.statusText}`);
      }

      // El tipo de 'data' es inferido como 'IReporteCliente'
      const data: IReporteCliente = await response.json();
      
      // Verificación de la estructura básica del objeto IReporteCliente
      if (data && typeof data.montoTotal === 'number' && typeof data.ci === 'string') {
        setReportData(data);
      } else {
         // Esto maneja el caso de que la API devuelva un 200 pero con datos inesperados o null
        setError("La respuesta del servidor fue inesperada o incompleta.");
      }

    } catch (err) {
      // El error es 'unknown', lo forzamos a 'Error' para extraer el mensaje
      const errorMessage = (err instanceof Error) ? err.message : "Error desconocido al conectar con la API.";
      console.error("Error fetching data:", errorMessage);
      setError(`Fallo al conectar con la API: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [ciInput]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Reporte Consolidado de Crédito
          </h1>
          <p className="text-gray-600 mt-1">
            Consulta el estado de crédito por Cédula de Identidad (CI).
          </p>
        </header>

        {/* Molécula de Búsqueda */}
        <SearchFormMolecule
          ci={ciInput}
          setCi={setCiInput}
          onSearch={fetchReport}
          isLoading={isLoading}
        />

        {/* Contenedor de Resultados/Feedback */}
        <div className="mt-8">
          {error && (
            <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-md" role="alert">
              <TextAtom className="font-bold">Error:</TextAtom>
              <TextAtom>{error}</TextAtom>
            </div>
          )}
          
          {/* Mostramos el mensaje de carga o el resultado */}
          {isLoading && (
              <TextAtom className="text-center text-blue-600 p-8 text-lg font-medium">Buscando datos del cliente...</TextAtom>
          )}

          {/* Organismo de Reporte */}
          {!isLoading && !error && reportData && (
            <ReportTableOrganism report={reportData} />
          )}

          {!isLoading && !error && !reportData && ciInput.length > 0 && (
             <TextAtom className="text-center text-gray-500 p-8">Ingrese el CI y presione "Buscar" para obtener el reporte.</TextAtom>
          )}

        </div>
      </div>
    </div>
  )
}

export default App
