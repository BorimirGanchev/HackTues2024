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

# def predict_model():
#     random_forest_model = pickle.load(open("random_forest_model.pkl", "rb"))
    
#     # --------------------------------------------------------------
#     # Load data and preprocess data
#     # --------------------------------------------------------------
#     processed_df = process_data()
    
#     y_preds = random_forest_model.best_estimator_.predict(processed_df)
#     return y_preds

# predict_model()




df = pd.read_pickle("../../data/interim/03_data_features.pkl")

# --------------------------------------------------------------
# Create a training and test set
# --------------------------------------------------------------
df_train = df.drop(columns=["participant", "category", "set"], axis=1)

X = df_train.drop(columns=["label"], axis=1)
y = df_train["label"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
# --------------------------------------------------------------
# Split feature subsets
# --------------------------------------------------------------
basic_features = ["acc_x", "acc_y", "acc_z", "gyr_x", "gyr_y", "gyr_z"]
square_features = ["acc_r", "gyr_r"]
pca_features = ["pca_1", "pca_2", "pca_3"]
time_features = [f for f in df_train.columns if "_temp_" in f]
frequency_features = [f for f in df_train.columns if("_freq" in f) or ("_pse" in f)]
cluster_features = ["cluster"]

print("Basic features: ", len(basic_features))
print("Square features: ", len(square_features))
print("PCA features: ", len(pca_features))
print("Time features: ", len(time_features))
print("Frequency features: ", len(frequency_features))
print("Cluster features: ", len(cluster_features))


feature_set_1 = list(set(basic_features))
feature_set_2 = list(set(basic_features + square_features + pca_features))
feature_set_3 = list(set(feature_set_2 + time_features))
feature_set_4 = list(set(feature_set_3 + frequency_features + cluster_features))
# --------------------------------------------------------------
# Perform forward feature selection using simple decision tree
# --------------------------------------------------------------
learner = ClassificationAlgorithms()
(class_train_y, class_test_y, class_train_prob_y, class_test_prob_y) = learner.random_forest(X_train[feature_set_4], y_train, X_test[feature_set_4], gridsearch=True, save_model=False)

random_forest_model = pickle.load(open("random_forest_model.pkl", "rb"))

# --------------------------------------------------------------
# Load data and preprocess data
# --------------------------------------------------------------
processed_df = process_data()
processed_df.shape
processed_df = processed_df.drop(columns=["participant", "category", "set", "label"], axis=1)
processed_df.shape


# frequency_features are 66 not 88
# basic_features = ["acc_x", "acc_y", "acc_z", "gyr_x", "gyr_y", "gyr_z"]
# square_features = ["acc_r", "gyr_r"]
# pca_features = ["pca_1", "pca_2", "pca_3"]
# time_features = [f for f in processed_df.columns if "_temp_" in f]
# frequency_features = [f for f in processed_df.columns if("_freq" in f) or ("_pse" in f)]
# cluster_features = ["cluster"]

# print("Basic features: ", len(basic_features))
# print("Square features: ", len(square_features))
# print("PCA features: ", len(pca_features))
# print("Time features: ", len(time_features))
# print("Frequency features: ", len(frequency_features))
# print("Cluster features: ", len(cluster_features))

random_forest_model = pickle.load(open("random_forest_model.pkl", "rb"))
y_preds = random_forest_model.predict(processed_df)

