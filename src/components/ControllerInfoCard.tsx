import type { PumpSystem } from '../lib/sample-data';

// Generic icon for data rows
const InfoIcon = () => (
    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);


interface ControllerInfoCardProps {
  pump: PumpSystem;
}

export default function ControllerInfoCard({ pump }: ControllerInfoCardProps) {
  
  const controller = pump.equipos.find(e => e.tipo === 'TABLERO PRINCIPAL');
  
  const dataPoints = [
    { label: 'Package Name', value: controller?.marca || 'N/A' },
    { label: 'Modelo', value: controller?.modelo || 'N/A' },
    { label: 'Número de Serie', value: controller?.serie || 'N/A' },
    { label: 'Voltage Nominal AC', value: pump.modbus_data?.voltage_ac_nominal, unit: 'V' },
    { label: 'Voltage Nominal Batería', value: pump.modbus_data?.voltage_bateria_nominal, unit: 'V' },
    { label: 'Presión de Arranque (Cut-In)', value: pump.estado_tiempo_real?.presion_arranque_cut_in, unit: 'PSI' },
    { label: 'Presión de Parada (Cut-Out)', value: pump.estado_tiempo_real?.presion_parada_cut_out, unit: 'PSI' },
  ];

  return (
    // Removed outer div with card styling and header
    <div className="p-6 flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      {dataPoints.map((item, index) => (
        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg shadow-sm">
           <div className="p-2 bg-indigo-100 rounded-full">
              <InfoIcon />
          </div>
          <div className="ml-4 flex-grow flex justify-between items-baseline">
            <p className="text-base font-medium text-gray-600">{item.label}:</p>
            <p className="text-base font-bold text-gray-900">
              {item.value !== undefined ? `${item.value} ${item.unit || ''}`.trim() : 'N/A'}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}