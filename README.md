# Le grand carré

`python run.py`

`curl localhost:5000/exemple.txt`

`python app\services\find_square.py  app\map_gen_files\exemple.txt`

### Build the image`

`docker build -t my-image-name .`

### Lunch the docker

`docker run -d -p 1337:80 my-image-name

### Map genretor

`python3 app/services/map_generator.py n o x y> app/map_gen_files/filename`

– N => Le nombre de lignes du plateau ;
– O => Le caractère "vide" ;
– x => Le caractère "obstacle" ;
– Y => Le caractère "plein".

### Get the solution

`python3 app/services/find_square.py app/map_gen_files/filename`

or 

`curl -X GET localhost:5000/filename`