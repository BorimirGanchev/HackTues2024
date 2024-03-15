import pickle
import pandas as pd
from data_preprocess import process_data
import numpy as np
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
import itertools
from sklearn.metrics import accuracy_score, confusion_matrix
from TrainingAlgorithms import ClassificationAlgorithms



def predict_model():

    random_forest_model = pickle.load(open("random_forest_model.pkl", "rb"))

    # --------------------------------------------------------------
    # Load data and preprocess data
    # --------------------------------------------------------------
    processed_df = process_data()
    processed_df = processed_df.drop(columns=["participant", "category", "set", "label"], axis=1)


    y_preds = random_forest_model.predict(processed_df)
    return y_preds

