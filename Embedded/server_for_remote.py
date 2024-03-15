from flask import Flask
import threading
from gui import Threader  # Assuming this is your custom module
from gyro import Sensor  # Assuming this is your custom module

class FlaskServer:
    def __init__(self, sensor_threader: Threader, port=5000):
        self.app = Flask(__name__)
        self.sensor = sensor_threader
        self.port = port
        # Ensure methods=['GET'] for both routes for consistency
        self.app.add_url_rule('/start', view_func=self.start, methods=['GET'])
        self.app.add_url_rule('/end', view_func=self.end, methods=['GET'])

    def end(self):
        # Assuming log_sensor_data() returns a string message with the log data
        log_data = self.sensor.log_sensor_data(self.sensor.sensor.return_data())
        print(log_data)
        return 'log_data'

    def start(self):
        self.sensor.start_sensor_listener()
        return "Sensor listening started."

    def run(self):
        # Debug and use_reloader disabled for thread safety
        self.app.run(threaded=True, debug=False, use_reloader=False, port=self.port)

    def start_in_thread(self):
        server_thread = threading.Thread(target=self.run)
        server_thread.start()
        print(f"Server is running on a separate thread on port {self.port}...")

if __name__ == "__main__":
    sensor = Sensor()  # Assuming this initializes your sensor
    threader = Threader(sensor)  # Assuming this manages sensor threads
    server = FlaskServer(threader)
    server.start_in_thread()
