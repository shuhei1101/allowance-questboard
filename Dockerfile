FROM python:3.12-slim

WORKDIR /app
COPY . .
RUN rm -rf build dist *.egg-info aqapi/*.egg-info
RUN pip install --no-cache-dir -r requirements.txt

CMD uvicorn aqapi.main:app --bind 0.0.0.0:$PORT --workers 2 --threads 4
