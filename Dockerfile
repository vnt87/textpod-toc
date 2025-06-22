FROM rust:1-slim-bookworm AS builder
WORKDIR /app
COPY . .
RUN apt-get update && \
    apt-get install -y libssl-dev pkg-config musl-tools && \
    rustup target add x86_64-unknown-linux-musl && \
    cargo build --release --target x86_64-unknown-linux-musl && \
    ls -la /app/target/x86_64-unknown-linux-musl/release/

FROM debian:bookworm-slim
WORKDIR /app
ENV DATA_DIR=/app/data

RUN apt-get update && \
    apt-get install -y ca-certificates libssl-dev && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p ${DATA_DIR}/attachments ${DATA_DIR}/attachments/webpages

COPY --from=builder /app/target/x86_64-unknown-linux-musl/release/textpod /app/textpod
RUN chmod +x /app/textpod
RUN apt-get update && apt-get install -y libc6 libgcc1 && rm -rf /var/lib/apt/lists/*
RUN ls -la /app/
EXPOSE 3000
CMD ["/app/textpod"]
