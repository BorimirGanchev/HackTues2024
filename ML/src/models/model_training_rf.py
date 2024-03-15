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


def model_training_rf():
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

        rf.fit(train_X, train_y)
        
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

    def evaluate_model(X_test, y_true, model):
        y_pred = model.predict(X_test)
        
        accuracy = accuracy_score(y_true, y_pred)
        cm = confusion_matrix(y_true, y_pred)
        return accuracy, cm

    # Load data and preprocess data
    processed_df = process_data()

    # --------------------------------------------------------------
    # Create a training and test set
    # --------------------------------------------------------------
    df_train = processed_df.drop(columns=["participant", "category", "set"], axis=1)

    X = df_train.drop(columns=["label"], axis=1)
    y = df_train["label"]

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)
    (class_train_y, class_test_y, class_train_prob_y, class_test_prob_y) = random_forest(X_train, y_train, X_test, gridsearch=True, save_model=False)
    
    model = pickle.load(open("random_forest_model.pkl", "rb"))
    accuracy, cm = evaluate_model(X_test, y_test, model)
