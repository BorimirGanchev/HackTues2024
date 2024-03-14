from mpu6050 import mpu6050
import time

mpu = mpu6050(0x68)

while True:
    gyro_data = mpu.get_gyro_data()
    print('-----------------------------')
    print('Gyro X: '+str(gyro_data['x']))
    print('Gyro Y: '+str(gyro_data['y']))
    print('Gyro Z: '+str(gyro_data['z']))
    print('-----------------------------')
    accel_data = mpu.get_accel_data()
    print('Accel X:'+str(accel_data['x']))
    print('Accel Y:'+str(accel_data['y']))
    print('Accel Z:'+str(accel_data['z']))
    print('-----------------------------')
    time.sleep(1)