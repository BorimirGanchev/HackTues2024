from flask import Flask, request, jsonify
import pickle
from predict_model import predict_model

app = Flask(__name__)
model = pickle.load(open("../src/models/random_fores_model.pkl", "rb"))
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        print(data)
        return jsonify({"prediction": "hihi"})
    except Exception as e:
        # Return error message if prediction fails
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  
