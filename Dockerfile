FROM rust:alpine AS builder

# Install build dependencies
RUN apk add --no-cache musl-dev

WORKDIR /usr/src/textpod
COPY . .

# Build for musl target
RUN rustup target add x86_64-unknown-linux-musl && \
    cargo build --release --target x86_64-unknown-linux-musl && \
    strip /usr/src/textpod/target/x86_64-unknown-linux-musl/release/textpod

FROM alpine:3.19

# Install only netcat-openbsd for healthcheck
RUN apk add --no-cache netcat-openbsd

COPY --from=builder /usr/src/textpod/target/x86_64-unknown-linux-musl/release/textpod /usr/local/bin/textpod

WORKDIR /app
VOLUME /app

HEALTHCHECK --interval=60s --retries=3 --timeout=1s \
    CMD nc -z -w 1 localhost 3000 || exit 1

EXPOSE 3000

ENTRYPOINT ["textpod"]
CMD ["-p", "3000", "-l", "0.0.0.0"]
