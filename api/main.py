import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from mongo_client import mongo_client

gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert UNSPLASH_KEY there"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")  # only GET method will be allowed
def new_image():
    word = request.args.get("query")
    headers = {
        "Accept-Version": "v1",
        "Authorization": "Client-ID "
        + UNSPLASH_KEY,  # string concatenation, the space after Client-ID is important
    }
    params = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=params)

    data = (
        response.json()
    )  # server sends JSON object in the response to the client as string (stringified JSON)
    return data


@app.route("/images", methods=["GET", "POST"])  # only GET and POST will be allowed
def images():
    if request.method == "GET":
        # read images from the database
        images = images_collection.find(
            {}
        )  # empty filter arg will return all images in the gallery instead of a specific key:value pair. _id is necessary in every document, but it will get generated automatically by Pymongo
        return jsonify(
            [img for img in images]
        )  # list gets passed as argument to jsonify function. function will return JSON object that can be safely returned back to client
    if request.method == "POST":
        # save image in the database
        image = request.get_json()
        image["_id"] = image.get("id")
        result = images_collection.insert_one(image)
        inserted_id = result.inserted_id
        return {"inserted_id": inserted_id}


@app.route("/images/<image_id>", methods=["DELETE"])
def image(image_id):
    if request.method == "DELETE":
        # delete image from the database
        result = images_collection.delete_one({"_id": image_id})
        if not result:
            return {"error": "Image wasn't deleted. Please try again."}, 500
        if result and not result.deleted_count:
            return {"error": "Image not found"}, 404
        return {"deleted_id": image_id}


if __name__ == "__main__":
    app.run(
        host="0.0.0.0", port=5050
    )  # Flask will be running on our computer and will be available via any of the IP addresses assigned to this computer, including localhost IP
