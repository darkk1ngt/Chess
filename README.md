# ♟️ Chess Suite

A feature-rich chess platform built with React — play against AI, analyze your games, and master openings.

![Chess](https://img.shields.io/badge/Chess-000000?style=for-the-badge&logo=lichess&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Features

### 🎮 Play vs Computer
Challenge an AI opponent at any skill level from beginner (800 ELO) to grandmaster strength (2600+ ELO).

- Adjustable difficulty with realistic ELO ratings
- Play as White or Black
- Move hints available
- Powered by Stockfish engine

### 🔍 Game Analysis
Import your games and get detailed analysis with move-by-move evaluation.

- **Import from:** Lichess, Chess.com, or PGN files
- **Move ratings:** Brilliant, Best, Excellent, Good, Okay, Inaccuracy, Mistake, Blunder
- **Visual evaluation bar** showing position advantage
- **Best move suggestions** for learning
- **Opening detection** with ECO codes

### 📚 Openings Database
Learn and practice chess openings with an interactive trainer.

- Browse openings by ECO code (A00-E99)
- View win/draw/loss statistics
- Practice mode to test your knowledge
- Track your opening repertoire

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/chess-suite.git

# Navigate to project
cd chess-suite

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage

1. **Play a Game** — Select difficulty and color, then start playing
2. **Analyze a Game** — Paste a Lichess/Chess.com link or upload a PGN file
3. **Study Openings** — Browse the database or enter practice mode

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework |
| chess.js | Game logic & validation |
| react-chessboard | Board UI component |
| Stockfish WASM | Chess engine |
| Zustand | State management |

---

## 📸 Screenshots

*Coming soon*

---

## 🗂️ Project Structure

```
Chess/
├── Chess Game/          # Play vs AI module
├── Chess Analysis Tool/ # Game analysis module
├── Chess Openings Database/  # Opening trainer module
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 Roadmap

- [x] Project planning & architecture
- [ ] Basic chessboard with legal moves
- [ ] Stockfish integration
- [ ] Play vs Computer mode
- [ ] Game import (Lichess/Chess.com)
- [ ] Move analysis & classification
- [ ] Opening explorer
- [ ] Practice mode
- [ ] Mobile responsiveness
- [ ] Dark/Light themes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [chess.js](https://github.com/jhlywa/chess.js) — Chess logic library
- [react-chessboard](https://github.com/Clariity/react-chessboard) — React board component
- [Stockfish](https://stockfishchess.org/) — Open source chess engine
- [Lichess](https://lichess.org/) — Opening explorer API

---

<p align="center">
  Made with ❤️ for chess enthusiasts
</p>
