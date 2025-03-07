FROM rust:1-slim-bookworm as builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app
ENV DATA_DIR=/app/data

RUN apt-get update && \
    apt-get install -y ca-certificates libssl-dev && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p ${DATA_DIR}/attachments ${DATA_DIR}/attachments/webpages

COPY --from=builder /app/target/release/textpod-daisyui /app/
EXPOSE 3000
CMD ["/app/textpod-daisyui"]
