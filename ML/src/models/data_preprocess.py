import pandas as pd
import numpy as np
import math
import scipy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from features.DataTransformation import LowPassFilter, PrincipalComponentAnalysis
from features.TemporalAbstraction import NumericalAbstraction
from features.FrequencyAbstraction import FourierTransformation
from sklearn.cluster import KMeans


def remove_ouliers(df):  
    outlier_columns = list(df.columns[:6])
    
    def mark_outliers_chauvenet(dataset, col, C=2):
        """Finds outliers in the specified column of datatable and adds a binary column with
        the same name extended with '_outlier' that expresses the result per data point.
        
        Taken from: https://github.com/mhoogen/ML4QS/blob/master/Python3Code/Chapter3/OutlierDetection.py

        Args:
            dataset (pd.DataFrame): The dataset
            col (string): The column you want apply outlier detection to
            C (int, optional): Degree of certainty for the identification of outliers given the assumption 
                            of a normal distribution, typicaly between 1 - 10. Defaults to 2.

        Returns:
            pd.DataFrame: The original dataframe with an extra boolean column 
            indicating whether the value is an outlier or not.
        """

        dataset = dataset.copy()
        # Compute the mean and standard deviation.
        mean = dataset[col].mean()
        std = dataset[col].std()
        N = len(dataset.index)
        criterion = 1.0 / (C * N)

        # Consider the deviation for the data points.
        deviation = abs(dataset[col] - mean) / std

        # Express the upper and lower bounds.
        low = -deviation / math.sqrt(C)
        high = deviation / math.sqrt(C)
        prob = []
        mask = []

        # Pass all rows in the dataset.
        for i in range(0, len(dataset.index)):
            # Determine the probability of observing the point
            prob.append(
                1.0 - 0.5 * (scipy.special.erf(high[i]) - scipy.special.erf(low[i]))
            )
            # And mark as an outlier when the probability is below our criterion.
            mask.append(prob[i] < criterion)
        dataset[col + "_outlier"] = mask
        return dataset 
    
    
    # Create a loop for each column
    outlier_removed_df = df.copy()
    for col in outlier_columns:
        for label in df["label"].unique():
            dataset = mark_outliers_chauvenet(df[df["label"] == label], col=col)
            dataset.loc[dataset[col + "_outlier"], col] = np.nan

            outlier_removed_df.loc[(outlier_removed_df["label"] == label), col] = dataset[col]
            n_outliers = len(dataset) - len(dataset[col].dropna())
            print(f"Removed {n_outliers} outliers for {label} - {col}")
    return outlier_removed_df

def build_features(df):
    predictor_columns = list(df.columns[:6])
    
    def interpolation(df):
        # --------------------------------------------------------------
        # Dealing with missing values (imputation)
        # --------------------------------------------------------------
        for col in predictor_columns:
            df[col] = df[col].interpolate()
        
    # --------------------------------------------------------------
    # Butterworth lowpass filter
    # --------------------------------------------------------------
    def butterworth_lowpass_filter(df):

        df_lowpass = df.copy()
        LowPass = LowPassFilter()

        fs = 1000 / 200
        cutoff = 1.3
        df_lowpass = LowPass.low_pass_filter(df_lowpass, "acc_y", fs, cutoff, order=5) 

        for col in predictor_columns:
            df_lowpass = LowPass.low_pass_filter(df_lowpass, col, fs, cutoff, order=5)
            df_lowpass[col] = df_lowpass[col + "_lowpass"]
        del df_lowpass[col + "_lowpass"]

        return df_lowpass
    
    def apply_pca(df):
        # --------------------------------------------------------------
        # Principal component analysis PCA
        # --------------------------------------------------------------
        df_pca = df.copy()
        PCA = PrincipalComponentAnalysis()

        pc_values = PCA.determine_pc_explained_variance(df_pca, predictor_columns)

        df_pca = PCA.apply_pca(df_pca, predictor_columns, 3)
        
        return df_pca
    
    def sum_squares(df):
        # --------------------------------------------------------------
        # Sum of squares attributes
        # --------------------------------------------------------------
        df_squared = df_pca.copy()
        acc_r = df_squared['acc_x'] ** 2 + df_squared['acc_y'] ** 2 + df_squared['acc_z'] ** 2
        gyr_r = df_squared['gyr_x'] ** 2 + df_squared['gyr_y'] ** 2 + df_squared['gyr_z'] ** 2

        df_squared['acc_r'] = np.sqrt(acc_r)
        df_squared['gyr_r'] = np.sqrt(gyr_r)
        
        return df_squared
        
        
    interpolation(df)
    df_lowpass = butterworth_lowpass_filter(df)
    df_pca = apply_pca(df_lowpass)
    df_squared = sum_squares(df_pca)

df = pd.read_pickle("../../data/interim/01_data_processed.pkl") # Load data
outlier_removed_df = remove_ouliers(df) # Remove outliers