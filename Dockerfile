FROM ubuntu:22.04

USER root
WORKDIR /app

RUN apt-get update -qq && apt-get install -y --no-install-recommends \
    curl \
    git \
    unzip \
    xz-utils \
    zip \
    libglu1-mesa \
    ca-certificates \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

RUN git clone -b stable https://github.com/flutter/flutter.git /opt/flutter
ENV PATH="/opt/flutter/bin:${PATH}"

RUN flutter precache
RUN flutter doctor

CMD ["tail", "-f", "/dev/null"]
