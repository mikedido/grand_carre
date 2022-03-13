PYTHON = python3

test:
	$(PYTHON) -m unittest app/tests/test_square.py

install:
	pip install -r requirements.txt

run:
	$(PYTHON) run.py