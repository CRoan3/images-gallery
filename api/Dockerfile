FROM python:3.11

WORKDIR /app

EXPOSE 5050

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv 
RUN pip install requests
RUN pip install flask
RUN pip install flask_cors
RUN pip install python-dotenv
run pip install pymongo

COPY . ./

CMD ["python", "./main.py"]