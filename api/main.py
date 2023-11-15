from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello_world():
   return "<p>Hello, World!</p>"

if __name__ == "__main__":        # This makes it to where this app will only run if it is ran directly
   app.run(host="0.0.0.0", port=5050) 
   # Flask will be running on our computer and will be available via any of the IP addresses assigned to this computer, including localhost IP
   # with Keyword (named) arguments, order of the arguments in the function call does not matter