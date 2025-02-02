FROM cirrusci/flutter:stable

RUN apt-get update && apt-get install -y \
curl \
git \
unzip \
clang \
cmake \
ninja-build \
pkg-config

RUN flutter doctor

WORKDIR /workspace
COPY . /workspace

EXPOSE 3000