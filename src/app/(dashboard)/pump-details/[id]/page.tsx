"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import type { PumpSystem } from '@/lib/sample-data';
import PumpClientInfo from '@/components/PumpClientInfo';
import PumpEquipmentInfo from '@/components/PumpEquipmentInfo';
import PumpPlateData from '@/components/PumpPlateData';
import PumpMotorData from '@/components/PumpMotorData';
import PumpGeneralInfoCard from '@/components/PumpGeneralInfoCard';
import CollapsibleCard from '@/components/CollapsibleCard'; // Import CollapsibleCard

// Icon for "Volver"
const BackIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
);

export default function PumpDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pumpSystem, setPumpSystem] = useState<PumpSystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Removed useEffect for authentication check, as it's handled by the layout

  // Fetch pump details based on the ID
  useEffect(() => {
    if (id) {
      const fetchPumpDetails = async () => {
        try {
          const response = await fetch(`/api/pump_systems/${id}`);
          if (response.ok) {
            const data = await response.json();
            setPumpSystem(data);
          } else {
            const errorData = await response.json();
            setError(errorData.message || 'Error al cargar los detalles de la bomba.');
          }
        } catch (err) {
          setError('Error de red o de servidor al cargar los detalles.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPumpDetails();
    }
  }, [id]); // Removed router from dependencies as it's not used in this effect

  const handleBack = () => {
    router.back(); // Go back to the previous page (dashboard)
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <p className="text-lg text-gray-600">Cargando detalles de la bomba...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <p className="text-lg text-red-600">Error: {error}</p>
      </main>
    );
  }

  if (!pumpSystem) {
    return (
      <main className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        <p className="text-lg text-gray-600">Bomba no encontrada.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-3 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">PyroTrack Pump Details: {pumpSystem.cliente.planta}</h1>
          <button
            onClick={handleBack}
            className="p-2 rounded-full bg-gray-600 text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            title="Volver al Dashboard"
          >
            <BackIcon />
          </button>
        </div>
        <div className="flex flex-col gap-4 sm:gap-6">
          <CollapsibleCard title="Información del Cliente">
            <PumpClientInfo pump={pumpSystem} />
          </CollapsibleCard>
          <CollapsibleCard title="Información General de la Bomba">
            <PumpGeneralInfoCard pump={pumpSystem} />
          </CollapsibleCard>
          <CollapsibleCard title="Datos de Placa">
            <PumpPlateData pump={pumpSystem} />
          </CollapsibleCard>
          <CollapsibleCard title="Motor en Funcionamiento">
            <PumpMotorData pump={pumpSystem} />
          </CollapsibleCard>
          <CollapsibleCard title="Equipos">
            <PumpEquipmentInfo pump={pumpSystem} />
          </CollapsibleCard>
        </div>
      </div>
    </main>
  );
}