FROM rust:1-slim-bookworm AS builder
WORKDIR /app
COPY . .
RUN apt-get update && \
    apt-get install -y libssl-dev pkg-config && \
    cargo build --release && \
    ls -la /app/target/release/

FROM debian:bookworm-slim
WORKDIR /app
ENV DATA_DIR=/app/data

RUN apt-get update && \
    apt-get install -y ca-certificates libssl-dev && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p ${DATA_DIR}/attachments ${DATA_DIR}/attachments/webpages

COPY --from=builder /app/target/release/textpod /app/textpod
RUN chmod +x /app/textpod
EXPOSE 3000
CMD ["/app/textpod"]
