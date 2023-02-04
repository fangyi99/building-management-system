#consists of temperature, pressure & humidity built-in sensors

import bme680
import time
import paho.mqtt.client as mqtt
import json
from config import *

client = mqtt.Client()

def init():
    # client.username_pw_set(ACCESS_TOKEN)
    client.username_pw_set(DS_TOKEN)
    # client.connect(MQTT_HOST, MQTT_PORT, 60)
    client.connect(DS_HOST, MQTT_PORT, 60)

def send_data(temp, pres, humi):
    data = {"Temperature": temp, "Pressure": pres, "Humidity": humi}
    data = json.dumps(data)
    client.publish(MQTT_TOPIC, data, 1)

def main():
    print("""read-all.py - Displays temperature, pressure, humidity, and gas.
Press Ctrl+C to exit!
""")
    # bme680 temperature sensor at i2c address at 0x76
    try:
        sensor = bme680.BME680(bme680.I2C_ADDR_PRIMARY)
    except (RuntimeError, IOError):
        sensor = bme680.BME680(bme680.I2C_ADDR_SECONDARY)

    # These calibration data can safely be commented
    # out, if desired.

    print('Calibration data:')
    for name in dir(sensor.calibration_data):

        if not name.startswith('_'):
            value = getattr(sensor.calibration_data, name)

            if isinstance(value, int):
                print('{}: {}'.format(name, value))

    # These oversampling settings can be tweaked to
    # change the balance between accuracy and noise in
    # the data.

    sensor.set_humidity_oversample(bme680.OS_2X)
    sensor.set_pressure_oversample(bme680.OS_4X)
    sensor.set_temperature_oversample(bme680.OS_8X)
    sensor.set_filter(bme680.FILTER_SIZE_3)
    # Do not read gas data
    # sensor.set_gas_status(bme680.ENABLE_GAS_MEAS)

    print('\n\nInitial reading:')
    for name in dir(sensor.data):
        value = getattr(sensor.data, name)

        if not name.startswith('_'):
            print('{}: {}'.format(name, value))

    # All for gas resistance reading
    # sensor.set_gas_heater_temperature(320)
    # sensor.set_gas_heater_duration(150)
    # sensor.select_gas_heater_profile(0)

    # Up to 10 heater profiles can be configured, each
    # with their own temperature and duration.
    # sensor.set_gas_heater_profile(200, 150, nb_profile=1)
    # sensor.select_gas_heater_profile(1)

    print('\n\nPolling:')
    init()
    try:
        while True:
            if sensor.get_sensor_data():
                output = '{0:.2f} C,{1:.2f} hPa,{2:.2f} %RH'.format(
                    sensor.data.temperature,
                    sensor.data.pressure,
                    sensor.data.humidity)
                send_data(sensor.data.temperature, sensor.data.pressure, sensor.data.humidity)

                if sensor.data.heat_stable:
                    print('{0},{1} Ohms'.format(
                        output,
                        sensor.data.gas_resistance))

                else:
                    print(output)

            time.sleep(5)

    except KeyboardInterrupt:
        pass
    except Exception as e:
        print("Other error occurred :(")
        print(e)
    finally:
        client.loop_stop()
        client.disconnect()

if __name__ == '__main__':
    main()