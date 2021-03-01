from app import app
import json
import sys
from flask import Flask
from ..services.find_square import find_square, get_matrix

@app.route('/<string:filename>')
def main(filename):
    matrix, first_line = get_matrix('app/map_gen_files/'+filename)
    return json.dumps(find_square(matrix, first_line))
    