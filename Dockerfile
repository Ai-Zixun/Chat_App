FROM python:3.7.4-alpine

WORKDIR /usr/src/app

RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev \
    && pip install psycopg2 \
    && pip install flask \ 
    && pip install flask-socketIO

COPY . .

EXPOSE 80 443 5000 8080 

CMD [ "python3", "./server.py" ]