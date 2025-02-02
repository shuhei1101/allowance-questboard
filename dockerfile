FROM cirrusci/flutter:3.7.0

RUN apt-get update && apt-get install -y \
curl \
git \
unzip \
clang \
cmake \
ninja-build \
pkg-config \
libgtk-3-dev

WORKDIR /workspace
COPY . /workspace

EXPOSE 3000