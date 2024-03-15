from flask import Flask, request, jsonify
import pickle
from predict_model import predict_model

app = Flask(__name__)
@app.route("/model/predict", methods=["POST","GET"])
def predict():
    try:
        data = request.json
        print(data)
        return str(data)
    except Exception as e:
        print(e)
        # Return error message if prediction fails
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)  
