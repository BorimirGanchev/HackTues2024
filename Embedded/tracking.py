import tkinter as tk
import random
import threading
import time

class RandomDataGenerator:
    def __init__(self, label):
        self.label = label
        self.is_running = False
        self.update_interval = 1  
        self.data = []

    def start(self):
        if not self.is_running:
            self.is_running = True
            self.thread = threading.Thread(target=self.generate_data)
            self.thread.start()

    def stop(self):
        self.is_running = False
        self.thread.join()  
        return self.data

    def generate_data(self):
        while self.is_running:
            random_number = random.randint(0, 100)
            self.label.config(text=f"Random Data: {random_number}")
            self.data.append(random_number)
            time.sleep(self.update_interval)

def start_generator():
    generator.start()

def stop_generator():
    data = generator.stop()
    data_label.config(text=f"All Tracked Data: {data}")

root = tk.Tk()
root.title("Random Data Tracker")
root.geometry("500x300") 
root.configure(bg="dark blue") 

random_data_label = tk.Label(root, text="Random Data: ", font=("Helvetica", 20), fg="light blue", bg="dark blue")
random_data_label.pack(pady=20)  

data_label = tk.Label(root, text="All Tracked Data: ", font=("Helvetica", 16), fg="light blue", bg="dark blue")
data_label.pack(pady=10)  

start_button = tk.Button(root, text="Start", command=start_generator, font=("Helvetica", 14), padx=20, pady=10, bg="light blue")
start_button.pack(pady=10)  

end_button = tk.Button(root, text="End", command=stop_generator, font=("Helvetica", 14), padx=20, pady=10, bg="light blue")
end_button.pack(pady=10)  

root.update_idletasks()  
window_width = root.winfo_width()
window_height = root.winfo_height()
position_right = int(root.winfo_screenwidth()/2 - window_width/2)
position_down = int(root.winfo_screenheight()/2 - window_height/2)
root.geometry("+{}+{}".format(position_right, position_down))

generator = RandomDataGenerator(random_data_label)

root.mainloop()
