#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys

def find_square(file_name):
    with open(file_name,'r', encoding='utf-16-le') as reader:
        first_line = reader.readline() 
        matrix = [[num for num in line if num != '\n'] for line in reader]
        
    solution = get_solution(matrix, int(first_line[1]), first_line[2], first_line[3], first_line[4])
    
    return update_matrix(matrix, get_best_solution(matrix, solution), first_line[4])
        


def get_solution(matrix, line_number, empty_caractere, obstacle_caractere, full_caractere):
    solution = []
    for i in range(line_number) :
        for j in range(len(matrix[0])) :
            if empty_caractere == matrix[i][j] :
                solution.append(get_solution_point(i, j, line_number, obstacle_caractere, matrix))
    
    return solution


def get_solution_point(i, j, line_number, obstacle_caractere, matrix):
    test_number = 1
    
    while test_number < min((line_number - i), (len(matrix[0]) - j ))  :
        for line in range(i, i+test_number) :
            for column in range(j, j + test_number) :
                if obstacle_caractere == matrix[line][column]:
                    return (i, j, test_number-1)
        test_number += 1


def update_matrix(matrix, solution, full_caractere):

    for i in range(solution[0], solution[0]+solution[2]):
        for j in range(solution[1], solution[1]+solution[2]):
            matrix[i][j] = full_caractere

    return matrix

def get_best_solution(matrix, matrix_solution):
    #get the biggest value
    bigest_carre = (0,0,0)

    for solution in matrix_solution:
        if solution is not None :
            if solution[2] == bigest_carre[2] :
                if solution[0] < bigest_carre[0]:
                    bigest_carre = solution
                elif solution[1] < bigest_carre[1]:
                    bigest_carre = solution
            elif solution[2] > bigest_carre[2] :
                bigest_carre = solution

    return bigest_carre


def display_solution(matrix):
    
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            print(matrix[i][j], end='')
        print('\n')
    

if __name__ == '__main__' :
    if len(sys.argv) < 2:
        print('Missing parameters.')
        exit()
    square = find_square(*sys.argv[1:2])

    display_solution(square)