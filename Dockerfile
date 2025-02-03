FROM ubuntu:latest

USER root

RUN apt-get update -qq && apt install -y --no-install-recommends \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN git clone -b main https://github.com/flutter/flutter.git /opt/flutter
ENV PATH="/opt/flutter/bin:${PATH}"

RUN flutter doctor

CMD ["flutter", "pub", "get"]