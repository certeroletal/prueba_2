import type { PumpSystem } from '../lib/sample-data';

// Icon for the header
const HeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M12 15h.01" />
  </svg>
);

// DataRow component for consistent display
const DataRow = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="font-medium text-gray-600 text-base">{label}:</span>
    <span className="text-gray-900 font-bold text-base">{value} {unit}</span>
  </div>
);

interface PumpPlateDataProps {
  pump: PumpSystem;
}

export default function PumpPlateData({ pump }: PumpPlateDataProps) {
  return (
    // Removed outer div with card styling and header
    <div className="p-6 flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      <DataRow label="GPM" value={pump.datos_placa.gpm} />
      <DataRow label="RPM" value={pump.datos_placa.rpm} />
      <DataRow label="Presión 100%" value={pump.datos_placa.presion_100_porciento} unit="PSI" />
      <DataRow label="Presión 150%" value={pump.datos_placa.presion_150_porciento} unit="PSI" />
      <DataRow label="Presión Máx." value={pump.datos_placa.max_presion} unit="PSI" />
    </div>
  );
}