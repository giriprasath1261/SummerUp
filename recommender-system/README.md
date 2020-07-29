For the recommender system alone, do the following steps:

0. Get the Instacart dataset and put the files into the data directory.
1. Set up a virtual environment (using python3 preferably).
	python3 -m venv <venv-name>
	source venv/bin/activate
2. Then run "pip3 -r requirements.txt" to install all necessary modules.
3. Then run "python3 recommender_system.py" to run the recommender system. It works independently from any of the other components of the project and outputs recommendations.json and recommendations.csv files.