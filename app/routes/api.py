from app import app
import json
import sys
from flask import Flask
from ..services.find_square import find_square

@app.route('/<string:filename>')
def main(filename):
    return json.dumps(find_square('app/map_gen_files/'+filename))
    