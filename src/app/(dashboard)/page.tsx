'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import type { PumpSystem } from '@/lib/sample-data';
import ControllerInfoCard from '@/components/ControllerInfoCard';
import RealtimeStatusCard from '@/components/RealtimeStatusCard';
import ActiveAlarmsList from '@/components/ActiveAlarmsList';
import AllAlarmsTable from '@/components/AllAlarmsTable';
import CollapsibleCard from '@/components/CollapsibleCard'; // Import CollapsibleCard

// Icon for "Ver Detalles de la Bomba"
const InfoIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

// Icon for "Cerrar Sesión"
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 013-3V7a3 3 0 013 3v1"></path>
  </svg>
);

export default function Home() {
  const { logout } = useAuth();
  const [pumpSystems, setPumpSystems] = useState<PumpSystem[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<PumpSystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const selectedSystemRef = useRef(selectedSystem);
  useEffect(() => {
    selectedSystemRef.current = selectedSystem;
  }, [selectedSystem]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/pump_systems');
      if (response.ok) {
        const data = await response.json();
        setPumpSystems(data);
        
        const currentSelectedSystem = selectedSystemRef.current;

        if (data.length === 1) {
          setSelectedSystem(data[0]);
        } else if (data.length > 1 && currentSelectedSystem) {
          const updatedSelected = data.find((s: PumpSystem) => s.cliente.planta === currentSelectedSystem.cliente.planta);
          setSelectedSystem(updatedSelected || data[0]);
        } else if (data.length > 0 && !currentSelectedSystem) {
          setSelectedSystem(data[0]);
        } else if (data.length === 0) {
          setSelectedSystem(null);
        }
      } else {
        console.error('Error al obtener los datos de la API');
        setPumpSystems([]);
        setSelectedSystem(null);
      }
    } catch (error) {
      console.error('Error de red o de servidor:', error);
      setPumpSystems([]);
      setSelectedSystem(null);
      } finally {
        setIsLoading(false);
      }
    }, [setPumpSystems, setSelectedSystem]);

  useEffect(() => {
    fetchData(); // Initial fetch
    const intervalId = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [fetchData]);

  const handleViewDetails = (system: PumpSystem) => {
    const slug = system.cliente.planta
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .replace(/\s+/g, '-')
      .toLowerCase();
    router.push(`/pump-details/${slug}`);
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Monitoreo</h1>
        
        {pumpSystems.length > 1 && selectedSystem && (
          <select
            value={selectedSystem.cliente.planta}
            onChange={(e) => {
              const selected = pumpSystems.find(p => p.cliente.planta === e.target.value);
              if (selected) {
                setSelectedSystem(selected);
              }
            }}
            className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {pumpSystems.map(pump => (
              <option key={pump.cliente.planta} value={pump.cliente.planta}>
                {pump.cliente.planta}
              </option>
            ))}
          </select>
        )}

        <div className="flex space-x-2"> {/* Container for buttons */}
          {selectedSystem && (
            <button
              onClick={() => handleViewDetails(selectedSystem)}
              className="p-2 rounded-full bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              title="Ver Detalles de la Bomba"
            >
              <InfoIcon />
            </button>
          )}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-red-600 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            title="Cerrar Sesión"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>

      {pumpSystems.length === 0 ? (
        <div className="text-center bg-white p-6 sm:p-12 rounded-lg shadow-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">No hay Salas de Bombas Configuradas</h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base">Para empezar, necesitas añadir la configuración de una nueva sala de bombas.</p>
          <Link href="/setup">
            <span className="mt-6 inline-block px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 cursor-pointer transition-all duration-300">
              Ir a Configuración
            </span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {selectedSystem && (
            <>
              <div className="lg:col-span-1">
                <RealtimeStatusCard key={selectedSystem.cliente.planta} pump={selectedSystem} />
              </div>
              <div className="lg:col-span-1">
                <ActiveAlarmsList pump={selectedSystem} />
              </div>
              <div className="lg:col-span-2">
                <CollapsibleCard title="Información del Controlador">
                  <ControllerInfoCard pump={selectedSystem} />
                </CollapsibleCard>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}