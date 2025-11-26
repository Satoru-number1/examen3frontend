import { TextAtom } from "../Atomico/TextAtom";

interface IReporteCliente {
  nombreCliente: string;
  ci: string; // La cédula de identidad, que puede ser un número en string
  montoTotal: number; // Límite del crédito
  montoUsado: number; // Saldo usado
  montoActual: number; // Saldo disponible (Total - Usado)
}

interface ReportTableOrganismProps {
  report: IReporteCliente;
}

export const ReportTableOrganism: React.FC<ReportTableOrganismProps> = ({
  report,
}) => {
  // Ya que ReportTableOrganism solo se renderiza si 'report' no es null, no necesitamos la verificación 'if (!report)'.

  // Estructura de datos consolidada
  const data = [
    {
      label: "Nombre del Cliente",
      value: report.nombreCliente,
      format: "text" as const,
    },
    { label: "CI (Identificador)", value: report.ci, format: "text" as const },
    {
      label: "Monto Total (Límite)",
      value: report.montoTotal,
      format: "currency" as const,
    },
    {
      label: "Monto Usado",
      value: report.montoUsado,
      format: "currency" as const,
    },
    {
      label: "Monto Disponible (Actual)",
      value: report.montoActual,
      format: "currency" as const,
      highlight: true,
    },
  ];

  const formatValue = (value: string | number, format: "text" | "currency") => {
    if (format === "currency") {
      // Formato para moneda: Bs 1.000,00
      // Usamos 'es-BO' para formato local de Bolivia.
      const numValue = typeof value === "string" ? parseFloat(value) : value;
      return new Intl.NumberFormat("es-BO", {
        style: "currency",
        currency: "BOB", // Bolivianos
        minimumFractionDigits: 2,
      }).format(numValue);
    }
    return value;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Reporte Consolidado del Cliente
      </h2>
      <dl className="space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded-lg ${
              item.highlight
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-gray-50"
            }`}
          >
            <TextAtom className="font-medium text-gray-600">
              {item.label}
            </TextAtom>
            <TextAtom
              className={`font-semibold ${
                item.highlight ? "text-blue-700 text-lg" : "text-gray-800"
              }`}
            >
              {formatValue(item.value, item.format)}
            </TextAtom>
          </div>
        ))}
      </dl>
    </div>
  );
};
