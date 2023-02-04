from binascii import Error
import RPi.GPIO as GPIO
import time
import os
import paho.mqtt.client as mqtt
import json
import logging
import redis
from logging.config import fileConfig
from config import *

# Set up for pir sensors
pir_pin = 21 
GPIO.setmode(GPIO.BCM)
GPIO.setup(pir_pin, GPIO.IN)

# Set up for MQTT
CURRENT_PATH = os.path.dirname(__file__)
client = mqtt.Client()
# fileConfig(os.path.join(CURRENT_PATH,'conf','log.ini'))
# logger = logging.getLogger("SendReadings")

def init():
    # client.username_pw_set(ACCESS_TOKEN)
    client.username_pw_set(DS_TOKEN)
    # client.connect(MQTT_HOST, MQTT_PORT, 60)
    client.connect(DS_HOST, MQTT_PORT, 60)


def send_data(reading):
    data = {"PIR sensor": reading}
    data = json.dumps(data)
    client.publish(MQTT_TOPIC, data, 1)
    client.loop_start()

def main():
    try:
        init()
        while True:
            # print("PIR sensor: " + str(GPIO.input(pir_pin)))
            # logger.info("Sending PIR sensor readings...")
            print("Sending PIR sensor readings...")
            send_data(GPIO.input(pir_pin))
            time.sleep(5)
    except KeyboardInterrupt:
        # logger.info("The data transfer has been paused.")
        print("The data transfer has been paused.")
        pass
    except Exception as e:
        print("Other error occurred :(")
        print(e)
    finally:
        client.loop_stop()
        client.disconnect()

if __name__ == '__main__':
    main()
