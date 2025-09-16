'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { PumpSystem } from '@/lib/sample-data';
import AllAlarmsTable from '@/components/AllAlarmsTable';

export default function HistoricalAlarmsPage() {
  const [pumpSystems, setPumpSystems] = useState<PumpSystem[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<PumpSystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-lg text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Historial de Alarmas</h1>
      {selectedSystem ? (
        <AllAlarmsTable pump={selectedSystem} />
      ) : (
        <p>No hay sistema seleccionado.</p>
      )}
    </div>
  );
}
