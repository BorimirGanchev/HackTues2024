import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from DataTransformation import LowPassFilter, PrincipalComponentAnalysis
from TemporalAbstraction import NumericalAbstraction
from FrequencyAbstraction import FourierTransformation
from sklearn.cluster import KMeans


# --------------------------------------------------------------
# Load data
# --------------------------------------------------------------

df = pd.read_pickle("../../data/interim/02_data_outliers_removed.pkl")

predictor_columns = list(df.columns[:6])

plt.style.use("fivethirtyeight")
plt.rcParams['figure.figsize'] = (20, 5)
plt.rcParams['figure.dpi'] = 100
plt.rcParams['lines.linewidth'] = 2
# --------------------------------------------------------------
# Dealing with missing values (imputation)
# --------------------------------------------------------------
for col in predictor_columns:
    df[col] = df[col].interpolate()
df.info()
# --------------------------------------------------------------
# Calculating set duration
# --------------------------------------------------------------
duration =df[df['set'] == 1].index[-1] - df[df['set'] == 1].index[0]
duration.seconds

for s in df['set'].unique():
    start = df[df['set'] == s].index[0]
    end = df[df['set'] == s].index[-1]
    
    duration = end - start
    df.loc[(df['set'] == s), 'duration'] = duration.seconds

duration_df = df.groupby(['category'])['duration'].mean()
duration_df.iloc[0] / 5
duration_df.iloc[1] / 10

# --------------------------------------------------------------
# Butterworth lowpass filter
# --------------------------------------------------------------

df_lowpass = df.copy()
LowPass = LowPassFilter()

fs = 1000 / 200
cutoff = 1.3
df_lowpass = LowPass.low_pass_filter(df_lowpass, "acc_y", fs, cutoff, order=5) 

for col in predictor_columns:
    df_lowpass = LowPass.low_pass_filter(df_lowpass, col, fs, cutoff, order=5)
    df_lowpass[col] = df_lowpass[col + "_lowpass"]
    del df_lowpass[col + "_lowpass"]
# --------------------------------------------------------------
# Principal component analysis PCA
# --------------------------------------------------------------
df_pca = df_lowpass.copy()
PCA = PrincipalComponentAnalysis()

pc_values = PCA.determine_pc_explained_variance(df_pca, predictor_columns)

df_pca = PCA.apply_pca(df_pca, predictor_columns, 3)

# --------------------------------------------------------------
# Sum of squares attributes
# --------------------------------------------------------------
df_squared = df_pca.copy()
acc_r = df_squared['acc_x'] ** 2 + df_squared['acc_y'] ** 2 + df_squared['acc_z'] ** 2
gyr_r = df_squared['gyr_x'] ** 2 + df_squared['gyr_y'] ** 2 + df_squared['gyr_z'] ** 2

df_squared['acc_r'] = np.sqrt(acc_r)
df_squared['gyr_r'] = np.sqrt(gyr_r)
# --------------------------------------------------------------
# Temporal abstraction
# --------------------------------------------------------------
df_temporal = df_squared.copy()
NumABS = NumericalAbstraction()

predictor_columns = predictor_columns + ['acc_r', 'gyr_r']

# Window size 5
ws = int(1000 / 200)

for col in predictor_columns:
    df_temporal = NumABS.abstract_numerical(df_temporal, [col], ws, "mean")
    df_temporal = NumABS.abstract_numerical(df_temporal, [col], ws, "std")

df_temporal_list = []
for s in df_temporal['set'].unique():
    subset  = df_temporal[df_temporal['set'] == s].copy()
    for col in predictor_columns:
        subset = NumABS.abstract_numerical(subset, [col], ws, "mean")
        subset = NumABS.abstract_numerical(subset, [col], ws, "std")
    
    df_temporal_list.append(subset)
df_temporal = pd.concat(df_temporal_list)
# --------------------------------------------------------------
# Frequency features
# --------------------------------------------------------------
df_freq = df_temporal.copy().reset_index()
FreqABS = FourierTransformation()
# Sampling frequency 
fs = int(1000 / 200)

window_size = int(2800/ 200)

df_freq_list = []
for s in df_freq['set'].unique():
    print("Applying FFT on set: ", s)
    subset  = df_freq[df_freq['set'] == s].reset_index(drop=True).copy()
    subset = FreqABS.abstract_frequency(subset, predictor_columns, window_size, fs)
    df_freq_list.append(subset)
    
df_freq = pd.concat(df_freq_list).set_index("epoch (ms)", drop=True)

# --------------------------------------------------------------
# Dealing with overlapping windows
# --------------------------------------------------------------
df_freq = df_freq.dropna()
df_freq = df_freq.iloc[::2]
# --------------------------------------------------------------
# Clustering
# --------------------------------------------------------------
df_cluster = df_freq.copy()

cluster_columns = ["acc_x", "acc_y", "acc_z"]
k_values = range(2, 10)
inertias = []

# Find the best value for K
for k in k_values:
    subset = df_cluster[cluster_columns]
    kmeans = KMeans(n_clusters=k, n_init=20, random_state=0)
    cluster_labels = kmeans.fit_predict(subset)
    inertias.append(kmeans.inertia_)
    
# Plot the elbow for inertias
plt.figure(figsize=(10, 10))
plt.plot(k_values, inertias)
plt.xlabel("K")
plt.ylabel("SUM of squared distances")
plt.title("Elbow method")
plt.show()

# Apply the best K
k = 5
subset = df_cluster[cluster_columns]
kmeans = KMeans(n_clusters=k, n_init=20, random_state=0)
df_cluster['cluster'] = kmeans.fit_predict(subset)

# --------------------------------------------------------------
# Export dataset
# --------------------------------------------------------------
df_cluster.to_pickle("../../data/interim/03_data_features.pkl")