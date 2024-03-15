import pickle
import pandas as pd
import numpy as np
from data_preprocess import process_data
import matplotlib.pyplot as plt
from sensor_input_df import sensor_data_to_df
from features.DataTransformation import LowPassFilter
from scipy.signal import argrelextrema


df = pd.read_csv("df_with_sets.csv")

def detect_peaks(dataset, cutoff=0.4, order=10, column="acc_r"):
    data = LowPass.low_pass_filter(dataset, col=column, sampling_frequency=fs, cutoff_frequency=cutoff, order=order)
    indexes = argrelextrema(data[column+"_lowpass"].values, np.greater)
    peaks = data.iloc[indexes]
    print(f"Peaks: {peaks}")
    
    # Plot peaks
    fig, ax = plt.subplots()
    plt.plot(dataset[f"{column}_lowpass"])
    plt.plot(peaks[f"{column}_lowpass"], "o", color="red")
    ax.set_ylabel(f"{column}_lowpass")
    exercise = dataset["label"].iloc[0].title()
    category = dataset["category"].iloc[0].title()
    plt.title(f"Peaks detected for {exercise} - {category}: {len(peaks)}Reps")
    plt.show()
    
    return len(peaks)


    
# --------------------------------------------------------------
# Configure LowPassFilter
# --------------------------------------------------------------
fs = int(1000/200)
LowPass = LowPassFilter()
df["reps"] = 5

df = df[df['label'] != 'rest']

acc_r = df['acc_x'] ** 2 + df['acc_y'] ** 2 + df['acc_z'] ** 2
gyr_r = df['gyr_x'] ** 2 + df['gyr_y'] ** 2 + df['gyr_z'] ** 2
df['acc_r'] = np.sqrt(acc_r)
df['gyr_r'] = np.sqrt(gyr_r)

# --------------------------------------------------------------
# Split data
# --------------------------------------------------------------
bench_df = df[df["label"] == "bench"]
squats_df = df[df["label"] == "squat"]
dead_df = df[df["label"] == "dead"]
row_df = df[df["label"] == "row"]
ohp_df = df[df["label"] == "ohp"]

rep_df = df.groupby(["label", "set"])["reps"].max().reset_index()
rep_df["reps_predicted"] = 0


for s in rep_df["set"].unique():
    subset = df[df["set"] == s]
    print(subset)
    column = 'acc_r'
    cutoff = 0.4
    order = 10
    
    # Check if subset is empty
    if subset.empty:
        continue
    
    if subset["label"].iloc[0] == "bench":
        cutoff = 0.423
        column = "acc_r"
    
    if subset["label"].iloc[0] == "squat":
        cutoff = 0.395
    
    if subset["label"].iloc[0] == "row":
        cutoff = 0.7
        column = "gyr_r"
        reps = detect_peaks(subset, cutoff=cutoff, column=column)
        rep_df.loc[rep_df["set"] == s, "reps_predicted"] = reps
    
    if subset["label"].iloc[0] == "ohp":
        cutoff = 0.43
        column = "acc_y"
        reps = detect_peaks(subset, cutoff=cutoff, column=column)
        rep_df.loc[rep_df["set"] == s, "reps_predicted"] = reps
    
    if subset["label"].iloc[0] == "dead":
        cutoff = 0.4
        column = "acc_y"
        reps = detect_peaks(subset, cutoff=cutoff, column=column)
        rep_df.loc[rep_df["set"] == s, "reps_predicted"] = reps
