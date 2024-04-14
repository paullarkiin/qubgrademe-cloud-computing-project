FROM --platform=linux/amd64 dart:stable



COPY . /dart-server

WORKDIR /dart-server

RUN mkdir build

RUN dart compile exe ./bin/server.dart -o ./build/dartserve

CMD ["./build/dartserve"]