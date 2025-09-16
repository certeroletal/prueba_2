import type { PumpSystem } from '../lib/sample-data';

// --- Icons ---
const TachometerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const EngineIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-8h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
  </svg>
);

const BatteryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 20V10a2 2 0 00-2-2H6a2 2 0 00-2 2v10h10z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 10V4a2 2 0 012-2h4a2 2 0 012 2v6" />
  </svg>
);

interface RealtimeStatusCardProps {
  pump: PumpSystem;
}

export default function RealtimeStatusCard({ pump }: RealtimeStatusCardProps) {
  if (!pump.estado_tiempo_real || !pump.modbus_data) {
    return null;
  }

  const {
    presion_sistema,
    voltaje_bateria_1,
    voltaje_bateria_2,
  } = pump.estado_tiempo_real;

  const {
    corriente_b1,
    corriente_b2,
    alarma_presion_aceite,
    alarma_temperatura_motor,
  } = pump.modbus_data;

  const { selector_en_auto, selector_en_off, selector_en_manual } = pump.modbus_data.nfpa_alarms;

  const getSelectorStatus = () => {
    if (selector_en_off) {
      return { status: 'Off', color: 'text-red-500' };
    }
    if (selector_en_manual) {
      return { status: 'Manual', color: 'text-yellow-500' };
    }
    if (selector_en_auto) {
      return { status: 'Automatico', color: 'text-green-500' };
    }
    return { status: 'Desconocido', color: 'text-gray-500' };
  };

  const selectorStatus = getSelectorStatus();

  const DataRow = ({ label, value, unit = '' }: { label: string; value: string | number; unit?: string }) => (
    <div className="flex justify-between items-baseline">
      <span className="font-medium text-gray-600 text-base">{label}:</span>
      <span className="text-gray-900 font-bold text-base">{value} {unit}</span>
    </div>
  );

  // Modified StatusIndicator to color the text
  const StatusIndicator = ({ label, hasAlarm }: { label: string; hasAlarm: boolean }) => (
    <div className="flex justify-between items-center">
      <span className="font-medium text-gray-600 text-base">{label}:</span>
      <span className={`ml-2 font-bold text-base ${hasAlarm ? 'text-red-500' : 'text-green-500'}`}>
        {hasAlarm ? 'Alarma' : 'Normal'}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Estado en Tiempo Real
        </h2>
      </div>

      {/* Data Grid (now flex column) */}
      <div className="p-6 flex flex-col gap-6">
        {/* Selector Status */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-md flex items-center">
            <TachometerIcon />
            Estado del Selector
          </h3>
          {/* Changed to DataRow-like structure and smaller font */} 
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-gray-600 text-base">Estado:</span>
            <span className={`text-base font-bold ${selectorStatus.color}`}>{selectorStatus.status}</span>
          </div>
        </div>

        {/* Pressure Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-md flex items-center">
            <TachometerIcon />
            Presión del Sistema
          </h3>
          {/* Changed to DataRow-like structure and smaller font */} 
          <div className="flex justify-between items-baseline">
            <span className="font-medium text-gray-600 text-base">Presión:</span>
            <span className="text-base font-bold text-gray-900">{presion_sistema} <span className="text-base font-medium">PSI</span></span>
          </div>
        </div>

        {/* Engine Status Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-md flex items-center">
            <EngineIcon />
            Estado del Motor
          </h3>
          <StatusIndicator label="Presión de Aceite" hasAlarm={alarma_presion_aceite !== 0} />
          <StatusIndicator label="Temperatura" hasAlarm={alarma_temperatura_motor !== 0} />
        </div>

        {/* Battery 1 Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-md flex items-center">
            <BatteryIcon />
            Batería 1
          </h3>
          <DataRow label="Voltaje" value={voltaje_bateria_1} unit="V" />
          <DataRow label="Amperaje" value={corriente_b1} unit="A" />
        </div>

        {/* Battery 2 Section */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-700 text-md flex items-center">
            <BatteryIcon />
            Batería 2
          </h3>
          <DataRow label="Voltaje" value={voltaje_bateria_2} unit="V" />
          <DataRow label="Amperaje" value={corriente_b2} unit="A" />
        </div>
      </div>
    </div>
  );
}