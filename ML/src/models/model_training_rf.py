import pickle
import pandas as pd
from data_preprocess import process_data
import numpy as np
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
import seaborn as sns
import itertools
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV



def random_forest(
    train_X,
    train_y,
    test_X,
    n_estimators=10,
    min_samples_leaf=5,
    criterion="gini",
    print_model_details=False,
    gridsearch=True,
    save_model=False,
):

    if gridsearch:
        tuned_parameters = [
            {
                "min_samples_leaf": [2, 10, 50, 100, 200],
                "n_estimators": [10, 50, 100],
                "criterion": ["gini", "entropy"],
            }
        ]
        rf = GridSearchCV(
            RandomForestClassifier(), tuned_parameters, cv=5, scoring="accuracy"
        )
    else:
        rf = RandomForestClassifier(
            n_estimators=n_estimators,
            min_samples_leaf=min_samples_leaf,
            criterion=criterion,
        )

    # Fit the model

    rf.fit(train_X, train_y.values.ravel())
    
    if gridsearch and print_model_details:
        print(rf.best_params_)

    if gridsearch:
        rf = rf.best_estimator_
    
    print(f"!!!!!!Train X: {train_X.shape}")
    print(f"!!!!!!Train y: {train_y.shape}")
    print(f"!!!!!!Test X: {test_X.shape}")
    
    # Save the model
    if save_model:
        model_path = "random_forest_model.pkl"
        with open(model_path, 'wb') as f:
            pickle.dump(rf, f)
        print(f"Model saved to {model_path}")

    pred_prob_training_y = rf.predict_proba(train_X)
    pred_prob_test_y = rf.predict_proba(test_X)
    pred_training_y = rf.predict(train_X)
    pred_test_y = rf.predict(test_X)
    frame_prob_training_y = pd.DataFrame(pred_prob_training_y, columns=rf.classes_)
    frame_prob_test_y = pd.DataFrame(pred_prob_test_y, columns=rf.classes_)

    if print_model_details:
        ordered_indices = [
            i[0]
            for i in sorted(
                enumerate(rf.feature_importances_), key=lambda x: x[1], reverse=True
            )
        ]
        print("Feature importance random forest:")
        for i in range(0, len(rf.feature_importances_)):
            print(
                train_X.columns[ordered_indices[i]],
            )
            print(
                " & ",
            )
            print(rf.feature_importances_[ordered_indices[i]])

    return (
        pred_training_y,
        pred_test_y,
        frame_prob_training_y,
        frame_prob_test_y,
    )


processed_df = process_data()

# --------------------------------------------------------------
# Create a training and test set
# --------------------------------------------------------------
df_train = processed_df.drop(columns=["participant", "category", "set"], axis=1)

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
(class_train_y, class_test_y, class_train_prob_y, class_test_prob_y) = random_forest(X_train[feature_set_4], y_train, X_test[feature_set_4], gridsearch=True, save_model=True)

