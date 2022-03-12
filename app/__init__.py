from flask import Flask

app = Flask(__name__)

from . import routes

# Run the application (server).
if __name__ == 'main':
    app.run()