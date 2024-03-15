from mpu6050 import mpu6050
import time
import requests
import threading
class Api:
    def __init__(self,url: str) -> None:
        self.url = url
    def send_data(self,data):
        requests.post(self.url,json=data,headers={
            "Content-Type": "application/json"
        })



class Sensor:
    def __init__(self) -> None:
        self.should_run = True
        self.gyro_x, self.gyro_y,self.gyro_z = [], [], []
        self.accel_x, self.accel_y, self.accel_z = [], [], []
        self.timestamp_ms = []


    def turn_off(self):
        self.should_run = False
    def set_up_listener(self):
        mpu = mpu6050(0x68)

        # Lists to store data


        try: 
            while self.should_run:
                # Collect gyroscopic data

                timestamp_ms_now = int(round(time.time() * 1000))
                self.timestamp_ms.append(timestamp_ms_now) 
                gyro_data = mpu.get_gyro_data()
                self.gyro_x.append(gyro_data['x'])
                self.gyro_y.append(gyro_data['y'])
                self.gyro_z.append(gyro_data['z'])
                
                # Collect accelerometer data
                accel_data = mpu.get_accel_data()
                self.accel_x.append(accel_data['x'])
                self.accel_y.append(accel_data['y'])
                self.accel_z.append(accel_data['z'])
                
                # Sleep for a second to limit data collection rate
                time.sleep(0.2)
            #     print({
            # "gyro": {
            #     "x": self.gyro_x,
            #     "y": self.gyro_y,
            #     "z": self.gyro_z
            # },
            # "accel": {
            #     "x": self.accel_x,
            #     "y": self.accel_y,
            #     "z": self.accel_z
            # }})
        except KeyboardInterrupt:
            pass

    def return_data(self):
        sensor_data = {
            "gyro": {
                "x": self.gyro_x,
                "y": self.gyro_y,
                "z": self.gyro_z
            },
            "accel": {
                "x": self.accel_x,
                "y": self.accel_y,
                "z": self.accel_z
            },
            "timestamp_ms": {
                "ms": self.timestamp_ms
            }
        }
        return sensor_data

