import { NextResponse } from 'next/server';
import { pumpSystemsData as initialPumpSystemsData, PumpSystem } from '@/lib/sample-data';
import * as Modbus from 'jsmodbus';
import net from 'net';

export const dynamic = 'force-dynamic';

const MODBUS_ADDR = {
    AC_VOLTAGE_RATING: 160,      // 40161
    BATTERY_VOLTAGE_RATING: 161, // 40162
    NFPA_ALARMS_1: 1000,
    NFPA_ALARMS_2: 1001,
    BATTERY_1_VOLTAGE: 2000,
    BATTERY_2_VOLTAGE: 2001,
    BATTERY_1_CURRENT: 2003,
    BATTERY_2_CURRENT: 2004,
    SYSTEM_PRESSURE: 2006,
    ENGINE_STARTS: 2015,
    ENGINE_RUN_HOURS: 2016,
    CUT_IN_PRESSURE: 3028,
    CUT_OUT_PRESSURE: 3029,
};

const ALARM_1_BITS = {
    AC_FAILURE: 1 << 0,
    LOW_OIL_PRESSURE: 1 << 1,
    HIGH_ENGINE_TEMP: 1 << 2,
};

const ALARM_2_BITS = {
    SELECTOR_IN_OFF: 1 << 12,
    ENGINE_RUN: 1 << 13,
    SELECTOR_IN_MANUAL: 1 << 14,
    SELECTOR_IN_AUTO: 1 << 15,
};

export async function GET(): Promise<Response> {
  const socket = new net.Socket();
  const client = new Modbus.client.TCP(socket, 1);
  const options = {
    'host': process.env.MODBUS_HOST || '127.0.0.1',
    'port': parseInt(process.env.MODBUS_PORT || '5020', 10),
    'autoReconnect': false,
    'timeout': 2000,
  };

  return new Promise<Response>((resolve) => {
    socket.on('connect', async () => {
      try {
        const [
            alarms,
            voltages,
            currents,
            pressure,
            engine,
            cutInOut,
            nominalVoltages
        ] = await Promise.all([
            client.readHoldingRegisters(MODBUS_ADDR.NFPA_ALARMS_1, 2),
            client.readHoldingRegisters(MODBUS_ADDR.BATTERY_1_VOLTAGE, 2),
            client.readHoldingRegisters(MODBUS_ADDR.BATTERY_1_CURRENT, 2),
            client.readHoldingRegisters(MODBUS_ADDR.SYSTEM_PRESSURE, 1),
            client.readHoldingRegisters(MODBUS_ADDR.ENGINE_STARTS, 2),
            client.readHoldingRegisters(MODBUS_ADDR.CUT_IN_PRESSURE, 2),
            client.readHoldingRegisters(MODBUS_ADDR.AC_VOLTAGE_RATING, 2),
        ]);

        const alarm1 = alarms.response.body.values[0];
        const alarm2 = alarms.response.body.values[1];

        const updatedPumpSystem: PumpSystem = {
          ...initialPumpSystemsData[0], // Base data like client, report, etc.
          
          estado_tiempo_real: {
            voltaje_bateria_1: voltages.response.body.values[0] / 10,
            voltaje_bateria_2: voltages.response.body.values[1] / 10,
            presion_sistema: pressure.response.body.values[0] / 10,
            arranques_motor: engine.response.body.values[0],
            presion_arranque_cut_in: cutInOut.response.body.values[0] / 10,
            presion_parada_cut_out: cutInOut.response.body.values[1] / 10,
          },

          modbus_data: {
            voltaje_b1: voltages.response.body.values[0] / 10,
            voltaje_b2: voltages.response.body.values[1] / 10,
            corriente_b1: currents.response.body.values[0] / 10,
            corriente_b2: currents.response.body.values[1] / 10,
            presion_linea: pressure.response.body.values[0] / 10,
            horas_funcionamiento: engine.response.body.values[1],
            alarma_presion_aceite: (alarm1 & ALARM_1_BITS.LOW_OIL_PRESSURE) !== 0 ? 1 : 0,
            alarma_temperatura_motor: (alarm1 & ALARM_1_BITS.HIGH_ENGINE_TEMP) !== 0 ? 1 : 0,
            voltage_ac_nominal: nominalVoltages.response.body.values[0],
            voltage_bateria_nominal: nominalVoltages.response.body.values[1],
            nfpa_alarms: {
              falla_de_red: (alarm1 & ALARM_1_BITS.AC_FAILURE) !== 0,
              motor_en_marcha: (alarm2 & ALARM_2_BITS.ENGINE_RUN) !== 0,
              selector_en_off: (alarm2 & ALARM_2_BITS.SELECTOR_IN_OFF) !== 0,
              selector_en_manual: (alarm2 & ALARM_2_BITS.SELECTOR_IN_MANUAL) !== 0,
              selector_en_auto: (alarm2 & ALARM_2_BITS.SELECTOR_IN_AUTO) !== 0,
            },
          },
        };

        resolve(NextResponse.json([updatedPumpSystem]));
      } catch (error) {
        console.error('Modbus read error:', error);
        const err = error as Error;
        resolve(NextResponse.json({ message: 'Error reading from Modbus server', error: err.message }, { status: 500 }));
      } finally {
        socket.end();
      }
    });

    socket.on('error', (err) => {
      console.error('Socket error, returning fallback data:', err);
      resolve(NextResponse.json(initialPumpSystemsData));
    });

    socket.connect(options);
  });
}