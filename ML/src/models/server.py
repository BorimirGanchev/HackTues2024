from flask import Flask, request, jsonify
from flask_cors import CORS
from predict_model import predict_model
import requests
app = Flask(__name__)
CORS(app)

@app.route("/model/predict", methods=["POST"])
def predict():
    try:
        # Extracting data from the JSON request
        data = request.json
        print(data)
        username = data.get('username')
        exercises =  predict_model(data)
        startTime = data.get('startTime')
        endTime = data.get('endTime')

        

        response = requests.post("http://localhost:7000/workouts/new", json=data)

        if response.status_code == 200:
            return jsonify({"success": True})
        else:
            return jsonify({"error": "Failed to send data to the server"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
