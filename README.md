[![textpod build status on GNU/Linux](https://github.com/freetonik/textpod/workflows/GNU%2FLinux/badge.svg)](https://github.com/freetonik/textpod/actions?query=workflow%3AGNU%2FLinux)
[![textpod build status on macOS](https://github.com/freetonik/textpod/workflows/macOS/badge.svg)](https://github.com/freetonik/textpod/actions?query=workflow%3AmacOS)
[![textpod build status on Windows](https://github.com/freetonik/textpod/workflows/Windows/badge.svg)](https://github.com/freetonik/textpod/actions?query=workflow%3AWindows)

# Textpod

A local-first web-based note-taking application built with Rust and modern web technologies.

## Features

- Markdown support with real-time preview
- Full-text search
- File attachments with automatic local copies
- Dark mode and multiple themes powered by DaisyUI
- 30+ beautiful built-in themes including:
  - Light & Dark
  - Cupcake
  - Cyberpunk
  - Synthwave
  - Retro
  - Forest
  - And many more!
- Local-first: all data stored on your machine
- Fast and lightweight
- Responsive design

## Installation

1. Make sure you have Rust installed. If not, install it from [rustup.rs](https://rustup.rs/)
2. Clone this repository:
   ```bash
   git clone https://github.com/vnt87/textpod.git
   cd textpod
   ```
3. Build and run:
   ```bash
   cargo build
   cargo run
   ```
4. Open your browser and navigate to `http://localhost:3000`

## Usage

Run `textpod` in any directory. It will create a `notes.md` file if it doesn't exist. It will create `attachments` directory for file and image attachments.
Webpages are saved in `attachments/webpages`. You can specify the port with `-p` flag, e.g. `textpod -p 8080` and/or the address with `-l` flag, e.g. `textpod -l 0.0.0.0`.

## Contributing

Feel free to open issues and pull requests. I want to keep the code very simple and accessible to beginners. The goal is not to create another feature-rich note-taking app, but to keep it simple and fast.
A "one big text file" idea is very powerful and I just want to make it slightly enhanced.
