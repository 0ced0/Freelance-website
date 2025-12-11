from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import date

app = Flask(__name__)
CORS(app)

jobs = [
    {
        "id": 1,
        "title": "Graphic Designer",
        "description": "Create visual assets and marketing materials",
        "location": "Manila",
        "date_posted": "2025-02-12",
        "category": "creative"
    },
    {
        "id": 2,
        "title": "Frontend Developer",
        "description": "Build UI components using React",
        "location": "Cebu City",
        "date_posted": "2025-02-10",
        "category": "education"
    },
    {
        "id": 3,
        "title": "nick",
        "description": "Build UI components using React",
        "location": "Cebu City",
        "date_posted": "2025-02-10",
        "category": "education"
    },
]


def next_id():
    return max((job["id"] for job in jobs), default=0) + 1

@app.route("/jobs", methods=["GET"])
def get_jobs():
    return jsonify(jobs), 200

@app.route("/jobs", methods=["POST"])
def create_job():
    data = request.get_json() or {}
    required = ["title", "description", "location", "category"]
    if not all(k in data for k in required):
        return jsonify({"error": "missing fields"}), 400

    new_job = {
        "id": next_id(),
        "title": data["title"],
        "description": data["description"],
        "location": data["location"],
        "date_posted": data.get("date_posted", date.today().isoformat()),
        "category": data["category"]
    }
    jobs.append(new_job)
    return jsonify(new_job), 201

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)