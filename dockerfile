FROM cirrusci/flutter:stable

RUN apt-get update && apt-get install -y \
curl \
git \
unzip \
&& flutter doctor

WORKDIR /workspace
COPY . /workspace

RUN flutter pub get

EXPOSE 3000