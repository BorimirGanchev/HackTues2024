import tkinter as tk
import threading
from gyro import Api, Sensor

# Assuming Api and Sensor are defined as before, with necessary adjustments
url = ''  # Your API URL, if needed
api = Api(url)
sensor = Sensor()
class Threader:
    def __init__(self, sensor:Sensor):
        self.sensor = sensor
        self.sensor_thread = None
    
    def start_sensor_listener(self):
        self.sensor_thread = threading.Thread(target=self.sensor.set_up_listener)
        self.sensor_thread.start()

    def stop_sensor_listener_and_log_data(self):

            self.sensor.turn_off()  # Signal to stop the loop within set_up_listener
            if self.sensor_thread:
                self.sensor.turn_off()
                self.sensor_thread.join()  # Wait for the thread to properly finish
            with open('./testdata.txt','w') as f:
                f.write(str(self.sensor.return_data()))

    def log_sensor_data(self, data):
        # Implement logging or processing of data here
        print(data)  # Example: simple print, replace with logging or updating the UI as needed

# # Usage
# threader = Threader(sensor)

# root = tk.Tk()
# root.title("Sensor Data Tracker")
# root.geometry("500x300")

# start_button = tk.Button(root, text="Start", command=threader.start_sensor_listener, font=("Helvetica", 14), padx=20, pady=10)
# start_button.pack(pady=10)

# end_button = tk.Button(root, text="End", command=threader.stop_sensor_listener_and_log_data, font=("Helvetica", 14), padx=20, pady=10)
# end_button.pack(pady=10)

# root.mainloop()
