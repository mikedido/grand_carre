
from app import app
from flask import Flask, render_template, request, jsonify
from ..services.square import Square
import json

@app.route('/')
def main():
    return render_template('index.html')
    

@app.route('/api/square/find', methods=['GET'])
def findSquare():
    empty_caractere = 0
    obstacle_caractere = 'x'
    matrix = request.args.get('matrix')
    
    matrix = json.loads(matrix)

    square = Square(matrix, obstacle_caractere, empty_caractere)
    solutions = square.get_all_square()
    
    return jsonify(square.get_big_square(solutions))