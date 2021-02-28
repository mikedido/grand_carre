PYTHON = python3

test:
	$(PYTHON) -m unittest app/tests/test_find_square.py

install:
	pip install -r requirements.txt

run:
	$(PYTHON) run.py