import type { PumpSystem } from '../lib/sample-data';

// Icon for the header
const HeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2m-8 0h2m8 0h2M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

// DataRow component for consistent display
const DataRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-baseline">
    <span className="font-medium text-gray-600 text-base">{label}:</span>
    <span className="text-gray-900 font-bold text-base">{value}</span>
  </div>
);

interface PumpEquipmentInfoProps {
  pump: PumpSystem;
}

export default function PumpEquipmentInfo({ pump }: PumpEquipmentInfoProps) {
  return (
    // Removed outer div with card styling and header
    <div className="p-6 flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      {pump.equipos.map((equipo, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm flex flex-col gap-2">
          <h3 className="font-bold text-base text-indigo-700">{equipo.tipo}</h3>
          <DataRow label="Marca" value={equipo.marca} />
          <DataRow label="Modelo" value={equipo.modelo} />
          <DataRow label="Serie" value={equipo.serie} />
          {equipo.horas_inicio !== undefined && <DataRow label="Horas Inicio" value={equipo.horas_inicio} />} 
          {equipo.horas_final !== undefined && <DataRow label="Horas Final" value={equipo.horas_final} />} 
        </div>
      ))}
    </div>
  );
}