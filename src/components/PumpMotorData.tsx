import type { PumpSystem } from '../lib/sample-data';

// Icon for the header
const HeaderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// DataRow component for consistent display
const DataRow = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
  <div className="flex justify-between items-baseline">
    <span className="font-medium text-gray-600 text-base">{label}:</span>
    <span className="text-gray-900 font-bold text-base">{value} {unit}</span>
  </div>
);

interface PumpMotorDataProps {
  pump: PumpSystem;
}

export default function PumpMotorData({ pump }: PumpMotorDataProps) {
  return (
    // Removed outer div with card styling and header
    <div className="p-6 flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      <DataRow label="Temp. Agua" value={pump.motor_funcionamiento.temp_agua.valor} unit={pump.motor_funcionamiento.temp_agua.unidad} />
      <DataRow label="Presión Aceite" value={pump.motor_funcionamiento.presion_aceite.valor} unit={pump.motor_funcionamiento.presion_aceite.unidad} />
      <DataRow label="Presión Enfriamiento" value={pump.motor_funcionamiento.presion_enfriamiento.valor} unit={pump.motor_funcionamiento.presion_enfriamiento.unidad} />
      <DataRow label="RPM Motor" value={pump.motor_funcionamiento.rpm_motor.valor} unit={pump.motor_funcionamiento.rpm_motor.unidad} />
      <DataRow label="Batería 1" value={pump.motor_funcionamiento.bateria_1.valor} unit={pump.motor_funcionamiento.bateria_1.unidad} />
      <DataRow label="Batería 2" value={pump.motor_funcionamiento.bateria_2.valor} unit={pump.motor_funcionamiento.bateria_2.unidad} />
    </div>
  );
}