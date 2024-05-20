import pickle
import pandas as pd
import numpy as np
from data_preprocess import process_data
import matplotlib.pyplot as plt
from sensor_input_df import sensor_data_to_df
from features.DataTransformation import LowPassFilter
from scipy.signal import argrelextrema

def add_sets_to_df(df):
    df["set"] = 0
    # Check if the set is the same as the previous row and if not, increment the set number
    df["set"] = (df["label"] != df["label"].shift(1)).cumsum()
    return df
def add_label_column_df(df, y_preds):
    df["label"] = y_preds
    return df
def count_repetitions(df):
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
    df["reps"] = 0
    
    df = df[df['label'] != 'rest']
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
        column = 'acc_r'
        cutoff = 0.4
        order = 10

        if subset["label"].iloc[0] == "bench":
            cutoff = 0.423
            column = "acc_r"

        if subset["label"].iloc[0] == "squat":
            cutoff = 0.395

        if subset["label"].iloc[0] == "row":
            cutoff = 0.7
            column = "gyr_r"

        if subset["label"].iloc[0] == "ohp":
            cutoff = 0.43
            column = "acc_y"
        
        if subset["label"].iloc[0] == "dead":
            cutoff = 0.4
            column = "acc_y"
            
        reps = detect_peaks(subset, cutoff=cutoff, column=column)
        rep_df.loc[rep_df["set"] == s, "reps_predicted"] = reps
    return rep_df
def predict_model(sensor_data):
    random_forest_model = pickle.load(open("random_forest_model.pkl", "rb"))
    # --------------------------------------------------------------
    # Load data and preprocess data
    # --------------------------------------------------------------
    sensor_df = sensor_data_to_df(sensor_data)    
    processed_df = process_data(sensor_df)
    y_preds = random_forest_model.predict(processed_df)
    labeled_df = add_label_column_df(processed_df, y_preds)
    df_with_sets = add_sets_to_df(labeled_df)
    df_with_sets.to_csv("df_with_sets.csv")
    rep_df = count_repetitions(df_with_sets)
    return rep_df

# Read sensor data from json file
sensor_data = pd.read_json("./readed_test_data.json")


predict_model(sensor_data)