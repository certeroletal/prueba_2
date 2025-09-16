import type { PumpSystem } from '../lib/sample-data';

// Icon for the header
const HeaderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);

// Icon for individual alarm items
const WarningIcon = () => (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);

// Icon for the "No Alarms" state
const CheckIcon = () => (
    <svg className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


interface ActiveAlarmsListProps {
  pump: PumpSystem;
}

export default function ActiveAlarmsList({ pump }: ActiveAlarmsListProps) {
  // This component should now use the nfpa_alarms from modbus_data
  const nfpaAlarms = pump.modbus_data?.nfpa_alarms;

  const alarmDetails: { [key: string]: { name: string; } } = {
    falla_de_red: { name: 'Falla de Red' },
    motor_en_marcha: { name: 'Motor en Marcha' },
    selector_en_off: { name: 'Selector en Off' },
    selector_en_manual: { name: 'Selector en Manual' },
    selector_en_auto: { name: 'Selector en Auto' },
    alarma_presion_aceite: { name: 'Baja Presión de Aceite' },
    alarma_temperatura_motor: { name: 'Alta Temperatura de Motor' },
  };

  const activeAlarms = nfpaAlarms ? Object.entries(nfpaAlarms)
    .filter(([key, value]) => value === true && key !== 'motor_en_marcha' && key !== 'selector_en_auto') // Filter out non-alarm statuses
    .map(([key]) => {
      return alarmDetails[key] || { name: key.replace(/_/g, ' ') };
    }) : [];
    
  // Also check for oil and temp alarms from the parent object
  if (pump.modbus_data?.alarma_presion_aceite === 1) {
      activeAlarms.push(alarmDetails['alarma_presion_aceite']);
  }
  if (pump.modbus_data?.alarma_temperatura_motor === 1) {
      activeAlarms.push(alarmDetails['alarma_temperatura_motor']);
  }


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4">
        <h2 className="text-lg font-bold text-white flex items-center">
          <HeaderIcon />
          Alarmas Activas
        </h2>
      </div>

      {/* Body */}
      <div className="p-6 flex-grow overflow-y-auto">
        {activeAlarms.length > 0 ? (
          <div className="flex flex-col gap-4">
            {activeAlarms.map((alarm, index) => (
              <div key={index} className="flex items-center p-4 bg-red-600 text-white rounded-lg shadow">
                <div className="p-2 bg-red-700 rounded-full">
                    <WarningIcon />
                </div>
                <div className="ml-4">
                  <p className="font-bold text-base">{alarm.name}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
            <CheckIcon />
            <p className="mt-4 text-base font-semibold text-gray-700">Sin Alarmas</p>
            <p className="text-base">El sistema opera normalmente.</p>
          </div>
        )}
      </div>
    </div>
  );
}