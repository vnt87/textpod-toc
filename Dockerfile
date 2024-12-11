FROM rust:slim-bullseye as builder

WORKDIR /usr/src/textpod
COPY . .

RUN cargo build --release

FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y netcat \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/src/textpod/target/release/textpod /usr/local/bin/textpod

WORKDIR /app
VOLUME /app

HEALTHCHECK --interval=60s --retries=3 --timeout=1s \
    CMD nc -z -w 1 localhost 3000 || exit 1

EXPOSE 3000

ENTRYPOINT ["textpod"]
CMD ["-p", "3000", "-l", "0.0.0.0"]
