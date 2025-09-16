import type { PumpSystem } from '../lib/sample-data';

// Icon for the header
const HeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// DataRow component for consistent display
const DataRow = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="font-medium text-gray-600 text-base">{label}:</span>
    <span className="text-gray-900 font-bold text-base">{value} {unit}</span>
  </div>
);

interface PumpGeneralInfoCardProps {
  pump: PumpSystem;
}

export default function PumpGeneralInfoCard({ pump }: PumpGeneralInfoCardProps) {
  return (
    // Removed outer div with card styling and header
    <div className="p-6 flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      <DataRow label="Identificador" value={pump.equipos[1]?.serie || 'N/A'} /> {/* Assuming main pump is at index 1 */}
      <DataRow label="Tipo de Bomba" value={pump.tipo_bomba} />
      <DataRow label="Fabricante" value={pump.fabricante} />
      <DataRow label="Capacidad (GPM)" value={pump.capacidad.gpm} />
      <DataRow label="Capacidad (PSI)" value={pump.capacidad.psi} />
      {pump.documentacion_adjunta && pump.documentacion_adjunta.length > 0 && (
        <div className="pt-4 mt-4 border-t border-gray-200">
          <h3 className="mb-3 font-semibold text-gray-700 text-base">Documentación Adjunta</h3>
          <ul className="list-disc pl-5 space-y-1 text-base"> {/* Added text-base here */}
            {pump.documentacion_adjunta.map((doc, index) => (
              <li key={index}>
                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                  {doc.nombre}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}