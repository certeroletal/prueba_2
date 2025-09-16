export type PumpSystem = {
  cliente: {
    nombre: string;
    direccion: string;
    rut: string;
    planta: string;
    contacto: {
      nombre: string;
      fono: string;
      correo: string;
    };
  };
  informe: {
    ot_jdl: string;
    oc: string;
    informe_terreno: string;
    fecha: string;
  };
  equipos: {
    tipo: string;
    marca: string;
    modelo: string;
    serie: string;
    horas_inicio?: number;
    horas_final?: number;
  }[];
  datos_placa: {
    gpm: number;
    rpm: number;
    presion_100_porciento: number;
    presion_150_porciento: number;
    max_presion: number;
  };
  motor_funcionamiento: {
    temp_agua: { valor: number; unidad: string };
    presion_aceite: { valor: number; unidad: string };
    presion_enfriamiento: { valor: number; unidad: string };
    rpm_motor: { valor: number; unidad: string };
    bateria_1: { valor: number; unidad: string };
    bateria_2: { valor: number; unidad: string };
  };
  controlador?: {
    modelo: string;
    serie: string;
    version_software: string;
  };
  estado_tiempo_real?: {
    // Fields from Modbus PDF
    presion_sistema: number;
    voltaje_bateria_1: number;
    voltaje_bateria_2: number;
    arranques_motor: number;
    presion_arranque_cut_in: number;
    presion_parada_cut_out: number;
    // Fields NOT in Modbus PDF (made optional)
    estado_operativo?: 'Encendida' | 'Apagada' | 'En Espera';
    presion_succion?: number;
    presion_descarga?: number;
    caudal?: number;
    rpm_motor_real?: number;
    nivel_combustible?: number;
    estado_fuente_alimentacion?: string;
  };
  alarmas_activas?: {
    fecha: string;
    hora: string;
    id_evento: string;
    mensaje: string;
    tipo_alarma: string;
    bomba_asociada: string;
    fecha_inicio: string;
    hora_inicio: string;
    fecha_fin?: string;
    hora_fin?: string;
    estado: 'activa' | 'resuelta';
  }[];
  todas_las_alarmas?: {
    fecha: string;
    hora: string;
    id_evento: string;
    mensaje: string;
    tipo_alarma: string;
    bomba_asociada: string;
    fecha_inicio: string;
    hora_inicio: string;
    fecha_fin?: string;
    hora_fin?: string;
    estado: 'activa' | 'resuelta';
  }[];
  ubicacion: string;
  ultima_fecha_mantenimiento: string;
  capacidad: { gpm: number; psi: number };
  tipo_bomba: string;
  fabricante: string;
  documentacion_adjunta?: { nombre: string; url: string }[];
  modbus_data?: {
    // Fields from Modbus PDF
    voltaje_b1: number;
    voltaje_b2: number;
    corriente_b1: number;
    corriente_b2: number;
    horas_funcionamiento: number;
    presion_linea: number;
    alarma_presion_aceite: number;
    alarma_temperatura_motor: number;
    nfpa_alarms: {
      motor_en_marcha: boolean;
      selector_en_auto: boolean;
      falla_de_red: boolean;
      selector_en_manual: boolean;
      selector_en_off: boolean;
      // Fields NOT in Modbus PDF (made optional)
      falla_comun_motor?: boolean;
      falla_cargador_baterias?: boolean;
      bateria_baja?: boolean;
      bomba_jockey_encendida?: boolean;
      bomba_principal_encendida?: boolean;
    };
    // Fields NOT in Modbus PDF (made optional)
    voltage_ac_nominal?: number;
    voltage_bateria_nominal?: number;
    rpm?: number;
    presion_aceite?: number;
    temperatura_motor?: number;
    estado_motor?: number;
    modo_operacion?: number;
    alarma_general?: number;
    alarma_falla_arranque?: number;
    alarma_sobrevelocidad?: number;
    alarma_bajo_nivel_combustible?: number;
    alarma_voltaje_bateria?: number;
    alarma_falla_cargador_bateria?: number;
    alarma_baja_presion_succion?: number;
    alarma_parada_emergencia?: number;
    alarma_falla_comun?: number;
  };
};

export const pumpSystemsData: PumpSystem[] = [
  {
    cliente: {
      nombre: "OXIQUIM S.A.",
      direccion: "CAMINO COSTERO 271, QUINTERO-CHILE",
      rut: "80.326.500-3",
      planta: "TERMINAL MARÍTIMO QUINTERO (P-802B)",
      contacto: {
        nombre: "GUSTAVO LABRA",
        fono: "+56322458737",
        correo: "gustavo.labra@oxiquim.com",
      },
    },
    informe: {
      ot_jdl: "855-847",
      oc: "CONTRATO",
      informe_terreno: "2307-0331",
      fecha: "2023-11-13",
    },
    equipos: [
      { tipo: "MOTOR", marca: "CLARKE", modelo: "JX6H-UFAD88", serie: "RG6135L028341", horas_inicio: 96.5, horas_final: 96.9 },
      { tipo: "BOMBA PRINCIPAL", marca: "PATTERSON", modelo: "16X12X21 SSC", serie: "FP-C000124163-02" },
      { tipo: "TABLERO PRINCIPAL", marca: "TORNATECH", modelo: "GPD-24-220", serie: "WZ10855159" },
      { tipo: "TABLERO JOCKEY", marca: "FIRETROL", modelo: "FTA550FA6007", serie: "1013745-01-RE" },
    ],
    datos_placa: {
      gpm: 5000,
      rpm: 1750,
      presion_100_porciento: 135,
      presion_150_porciento: 111,
      max_presion: 148,
    },
    motor_funcionamiento: {
      temp_agua: { valor: 87.2, unidad: "°C" },
      presion_aceite: { valor: 50, unidad: "PSI" },
      presion_enfriamiento: { valor: 35, unidad: "PSI" },
      rpm_motor: { valor: 1765, unidad: "RPM" },
      bateria_1: { valor: 24.7, unidad: "VOLT" },
      bateria_2: { valor: 23.9, unidad: "VOLT" },
    },
    controlador: {
      modelo: "Controlador XYZ",
      serie: "SN-12345",
      version_software: "1.0.0",
    },
    estado_tiempo_real: {
      presion_sistema: 120,
      voltaje_bateria_1: 24.5,
      voltaje_bateria_2: 24.1,
      arranques_motor: 150,
      presion_arranque_cut_in: 110,
      presion_parada_cut_out: 130,
      estado_operativo: 'Encendida',
      presion_succion: 10,
      presion_descarga: 120,
      caudal: 500,
      rpm_motor_real: 1750,
      nivel_combustible: 80,
      estado_fuente_alimentacion: 'Normal',
    },
    alarmas_activas: [
      { fecha: "2023-01-01", hora: "10:30", id_evento: "ALARM-001", mensaje: "Baja presión de agua", tipo_alarma: "Presión", bomba_asociada: "Bomba Principal", fecha_inicio: "2023-01-01", hora_inicio: "10:30", estado: "activa" },
    ],
    todas_las_alarmas: [
      { fecha: "2023-01-01", hora: "10:00", id_evento: "EVT-001", mensaje: "Inicio de operación", tipo_alarma: "Operación", bomba_asociada: "Bomba Principal", fecha_inicio: "2023-01-01", hora_inicio: "10:00", estado: "resuelta" },
      { fecha: "2023-01-01", hora: "10:30", id_evento: "ALARM-001", mensaje: "Baja presión de agua", tipo_alarma: "Presión", bomba_asociada: "Bomba Principal", fecha_inicio: "2023-01-01", hora_inicio: "10:30", estado: "activa" },
      { fecha: "2023-01-02", hora: "08:00", id_evento: "WARN-002", mensaje: "Mantenimiento pendiente", tipo_alarma: "Mantenimiento", bomba_asociada: "Bomba Jockey", fecha_inicio: "2023-01-02", hora_inicio: "08:00", estado: "activa" },
    ],
    ubicacion: "Sala de Bombas 1, Edificio Principal",
    ultima_fecha_mantenimiento: "2024-07-15",
    capacidad: { gpm: 5000, psi: 150 },
    tipo_bomba: "Eléctrica",
    fabricante: "Patterson",
    documentacion_adjunta: [
      { nombre: "Manual de Operación", url: "/docs/manual_operacion.pdf" },
      { nombre: "Esquema Eléctrico", url: "/docs/esquema_electrico.pdf" },
    ],
    modbus_data: {
      voltaje_b1: 24.7,
      voltaje_b2: 23.9,
      corriente_b1: 1.2,
      corriente_b2: 1.1,
      rpm: 1765,
      presion_aceite: 50,
      temperatura_motor: 87.2,
      horas_funcionamiento: 96.9,
      presion_linea: 120,
      estado_motor: 1,
      modo_operacion: 1,
      alarma_general: 0,
      alarma_presion_aceite: 0,
      alarma_temperatura_motor: 0,
      alarma_falla_arranque: 0,
      alarma_sobrevelocidad: 0,
      alarma_bajo_nivel_combustible: 0,
      alarma_voltaje_bateria: 0,
      alarma_falla_cargador_bateria: 0,
      alarma_baja_presion_succion: 0,
      alarma_parada_emergencia: 0,
      alarma_falla_comun: 0,
      nfpa_alarms: {
        motor_en_marcha: true,
        selector_en_auto: true,
        falla_comun_motor: false,
        falla_cargador_baterias: false,
        bateria_baja: false,
        falla_de_red: false,
        bomba_jockey_encendida: false,
        bomba_principal_encendida: true,
        selector_en_manual: false,
        selector_en_off: false,
      }
    },
  },
];