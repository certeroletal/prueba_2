import type { PumpSystem } from '../lib/sample-data';

// Definimos las propiedades que el componente espera recibir
interface PumpClientInfoProps {
  pump: PumpSystem;
}

// DataRow component for consistent display
const DataRow = ({ label, value }: { label: string; value: string | number }) => (
  <div className="flex justify-between items-baseline p-3 bg-gray-50 rounded-lg shadow-sm">
    <span className="font-medium text-gray-600 text-base">{label}:</span>
    <span className="text-gray-900 font-bold text-base">{value}</span>
  </div>
);

// Component to display client and plant information
export default function PumpClientInfo({ pump }: PumpClientInfoProps) {
  return (
    // Removed outer div with card styling and header
    <div className="flex flex-col gap-4 flex-grow"> {/* This was the 'Body' div */}
      {/* Client Info Section */}
      <div className="flex flex-col gap-3">
        <DataRow label="Cliente" value={pump.cliente.nombre} />
        <DataRow label="Planta" value={pump.cliente.planta} />
        <DataRow label="Dirección" value={pump.cliente.direccion} />
        <DataRow label="Ubicación Bomba" value={pump.ubicacion} />
        <DataRow label="Último Mant." value={pump.ultima_fecha_mantenimiento} />
      </div>

      {/* Contact Info Section */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <h3 className="mb-3 font-semibold text-gray-700 text-base">Contacto</h3>
        <div className="flex flex-col gap-3">
          <DataRow label="Nombre" value={pump.cliente.contacto.nombre} />
          <DataRow label="Correo" value={pump.cliente.contacto.correo} />
          <DataRow label="Fono" value={pump.cliente.contacto.fono} />
          </div>
        </div>
      </div>
  );
}