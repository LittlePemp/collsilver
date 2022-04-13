FROM python:3.7-slim
RUN mkdir /app
COPY requirements.txt /app
RUN apt update && \
	apt upgrade -y && \
	python3 -m pip install --upgrade pip && \
	pip install -r app/requirements.txt --no-cache-dir
COPY collsilver/ /app
WORKDIR /app
CMD ["gunicorn", "collsilver.wsgi:application", "--bind", "0:8000"]