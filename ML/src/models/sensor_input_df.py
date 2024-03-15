import pandas as pd

def sensor_data_to_df(sensor_data):


    df = pd.DataFrame({
        'timestamp_ms': sensor_data['ms'],
        'acc_x': sensor_data['accel']['x'],
        'acc_y': sensor_data['accel']['y'],
        'acc_z': sensor_data['accel']['z'],
        'gyr_x': sensor_data['gyro']['x'],
        'gyr_y': sensor_data['gyro']['y'],
        'gyr_z': sensor_data['gyro']['z']
    })
    return df

