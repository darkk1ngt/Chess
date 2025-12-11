# ♟️ Chess Application Suite

A comprehensive React-based chess platform featuring AI gameplay, game analysis, and opening practice.

---

## 📋 Project Overview

This project consists of three main modules:

| Module | Description |
|--------|-------------|
| **Chess Game** | Play against an AI at adjustable ELO ratings (800-2600+) |
| **Analysis Tool** | Import and analyze games with move classifications |
| **Openings Database** | Learn and practice chess openings |

---

## 🛠️ Tech Stack

### Core Dependencies

| Package | Purpose |
|---------|---------|
| `react` | UI framework |
| `chess.js` | Chess logic, move validation, PGN parsing |
| `react-chessboard` | Interactive chessboard component |
| `stockfish` | Chess engine (WASM) for AI and analysis |
| `zustand` | Lightweight state management |
| `@tanstack/react-query` | API data fetching and caching |
| `dexie` | IndexedDB wrapper for local storage |

### Installation

```bash
npm install react chess.js react-chessboard stockfish zustand @tanstack/react-query dexie
```

---

## 📁 Project Structure

```
Chess/
├── src/
│   ├── components/           # Shared UI components
│   │   ├── ChessBoard/
│   │   ├── MoveList/
│   │   ├── EvaluationBar/
│   │   └── MoveClassification/
│   │
│   ├── features/
│   │   ├── game/             # Chess Game Module
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── GamePage.jsx
│   │   │
│   │   ├── analysis/         # Analysis Tool Module
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── AnalysisPage.jsx
│   │   │
│   │   └── openings/         # Openings Database Module
│   │       ├── components/
│   │       ├── hooks/
│   │       └── OpeningsPage.jsx
│   │
│   ├── workers/
│   │   └── stockfish.worker.js
│   │
│   ├── services/
│   │   ├── chesscomApi.js
│   │   ├── lichessApi.js
│   │   └── openingExplorer.js
│   │
│   ├── store/
│   │   ├── gameStore.js
│   │   ├── analysisStore.js
│   │   └── openingsStore.js
│   │
│   └── utils/
│       ├── moveClassification.js
│       └── eloSimulation.js
│
├── public/
│   └── stockfish/            # Stockfish WASM files
│
└── README.md
```

---

## 🎮 Module 1: Chess Game (vs AI)

### Features
- Play as White or Black
- Adjustable AI strength (ELO 800 - 2600+)
- Move hints and legal move highlighting
- Game clock support
- Save and resume games

### ELO Simulation via Stockfish

| Target ELO | Skill Level | Search Depth | Move Time |
|------------|-------------|--------------|-----------|
| 800-1000   | 0-3         | 1-3          | 50ms      |
| 1000-1400  | 4-8         | 4-8          | 100ms     |
| 1400-1800  | 9-14        | 10-15        | 200ms     |
| 1800-2200  | 15-18       | 16-20        | 500ms     |
| 2200+      | 19-20       | 20+          | 1000ms+   |

### Stockfish UCI Commands
```javascript
// Set skill level (0-20)
stockfish.postMessage('setoption name Skill Level value 10');

// Set position
stockfish.postMessage('position fen <FEN_STRING>');

// Calculate best move with limits
stockfish.postMessage('go depth 15 movetime 500');
```

---

## 🔍 Module 2: Analysis Tool

### Features
- Import games from:
  - Lichess (by username or game ID)
  - Chess.com (by username)
  - PGN files (upload or paste)
- Move-by-move evaluation
- Move classification with visual indicators
- Best move suggestions
- Opening detection
- Export annotated PGN

### Move Classification System

Based on **centipawn loss** (difference between best move and played move):

| Classification | Symbol | CP Loss | Color |
|----------------|--------|---------|-------|
| Brilliant | !! | Special* | Cyan |
| Best | ✓ | 0 | Green |
| Excellent | ✓ | 0-10 | Light Green |
| Good | ✓ | 10-25 | Green |
| Okay/Book | - | 25-50 | Gray |
| Inaccuracy | ?! | 50-100 | Yellow |
| Mistake | ? | 100-200 | Orange |
| Blunder | ?? | 200+ | Red |
| Theory | 📖 | N/A | Blue |

*\*Brilliant: Sacrifices leading to forced advantage, or only winning move in critical positions*

### Classification Logic
```javascript
function classifyMove(prevEval, currEval, bestMoveEval, isTheory) {
  if (isTheory) return { type: 'theory', symbol: '📖' };
  
  const cpLoss = Math.abs(bestMoveEval - currEval);
  
  if (cpLoss === 0) return { type: 'best', symbol: '✓' };
  if (cpLoss <= 10) return { type: 'excellent', symbol: '✓' };
  if (cpLoss <= 25) return { type: 'good', symbol: '✓' };
  if (cpLoss <= 50) return { type: 'okay', symbol: '-' };
  if (cpLoss <= 100) return { type: 'inaccuracy', symbol: '?!' };
  if (cpLoss <= 200) return { type: 'mistake', symbol: '?' };
  return { type: 'blunder', symbol: '??' };
}
```

### API Endpoints

#### Chess.com
```javascript
// Get player's games
GET https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}

// Response includes PGN and game metadata
```

#### Lichess
```javascript
// Get player's games
GET https://lichess.org/api/games/user/{username}?max=100&pgnInJson=true
Headers: { 'Accept': 'application/x-ndjson' }

// Get single game
GET https://lichess.org/game/export/{gameId}
```

---

## 📚 Module 3: Openings Database

### Features
- Browse openings by ECO code (A00-E99)
- View move statistics (win/draw/loss rates)
- Practice mode (guess the next move)
- Track opening repertoire
- Spaced repetition for learning

### ECO Code Categories
```
A00-A99: Flank Openings (English, Réti, Bird)
B00-B99: Semi-Open Games (Sicilian, French, Caro-Kann)
C00-C99: Open Games (Italian, Spanish, King's Gambit)
D00-D99: Closed Games (Queen's Gambit)
E00-E99: Indian Defenses (Nimzo-Indian, King's Indian)
```

### Lichess Opening Explorer API
```javascript
// Get opening statistics for position
GET https://explorer.lichess.ovh/lichess?fen={FEN}

// Response
{
  "moves": [
    { "san": "e5", "white": 1000, "draws": 500, "black": 800 },
    { "san": "c5", "white": 900, "draws": 400, "black": 750 }
  ],
  "opening": { "eco": "B20", "name": "Sicilian Defense" }
}
```

---

## ⚙️ Technical Considerations

### Web Worker for Stockfish (Critical)

Stockfish runs in a Web Worker to prevent UI blocking:

```javascript
// workers/stockfish.worker.js
importScripts('/stockfish/stockfish.js');

const engine = new Stockfish();

self.onmessage = (e) => {
  engine.postMessage(e.data);
};

engine.onmessage = (e) => {
  self.postMessage(e.data);
};
```

### Required Server Headers

Stockfish WASM with SharedArrayBuffer requires these headers:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**For Vite development**, add to `vite.config.js`:
```javascript
export default {
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
};
```

### State Management (Zustand)

```javascript
// store/gameStore.js
import { create } from 'zustand';

const useGameStore = create((set) => ({
  fen: 'start',
  history: [],
  turn: 'w',
  aiLevel: 10,
  
  makeMove: (move) => set((state) => ({
    history: [...state.history, move],
    turn: state.turn === 'w' ? 'b' : 'w',
  })),
  
  setAiLevel: (level) => set({ aiLevel: level }),
}));
```

### Data Persistence (IndexedDB via Dexie)

```javascript
// db/database.js
import Dexie from 'dexie';

export const db = new Dexie('ChessApp');

db.version(1).stores({
  games: '++id, date, result, pgn',
  analysis: '++id, gameId, moves',
  openings: 'eco, name, moves',
});
```

---

## 🚀 Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Initialize React project with Vite
- [ ] Set up project structure
- [ ] Install core dependencies
- [ ] Create basic playable chessboard
- [ ] Implement legal move validation

### Phase 2: Engine Integration (Week 2-3)
- [ ] Set up Stockfish Web Worker
- [ ] Implement position evaluation
- [ ] Add "Play vs Computer" functionality
- [ ] Create ELO simulation system

### Phase 3: Analysis Tool (Week 3-5)
- [ ] Build PGN import (file + paste)
- [ ] Integrate Lichess API
- [ ] Integrate Chess.com API
- [ ] Implement move-by-move analysis
- [ ] Add move classification
- [ ] Create evaluation bar UI

### Phase 4: Openings Database (Week 5-6)
- [ ] Integrate Opening Explorer API
- [ ] Build opening tree navigator
- [ ] Create practice/quiz mode
- [ ] Add ECO code browser

### Phase 5: Polish (Week 6+)
- [ ] Add themes and customization
- [ ] Implement game saving/loading
- [ ] Add keyboard shortcuts
- [ ] Performance optimization
- [ ] Mobile responsiveness

---

## 🔗 API References

- [Chess.com Public API](https://www.chess.com/news/view/published-data-api)
- [Lichess API Documentation](https://lichess.org/api)
- [Lichess Opening Explorer](https://lichess.org/api#tag/Opening-Explorer)
- [chess.js Documentation](https://github.com/jhlywa/chess.js)
- [react-chessboard](https://github.com/Clariity/react-chessboard)
- [Stockfish WASM](https://github.com/nicfenette/nicfenette-stockfish.js)

---

## 📝 Notes

### Brilliant Move Detection
"Brilliant" moves are complex to detect accurately. Common heuristics:
1. Move involves a sacrifice (piece value loss)
2. Move is the only winning move in a critical position
3. Evaluation swing from losing/equal to winning after sacrifice
4. Requires deep analysis (15+ depth minimum)

### Rate Limiting
- **Chess.com**: Avoid parallel requests; implement request queuing
- **Lichess**: More generous limits; still implement caching

### Performance Tips
- Cache engine evaluations to avoid re-analysis
- Use React Query for API response caching
- Lazy load opening database by ECO category
- Use `useMemo` and `useCallback` for expensive computations

---

## 📄 License

MIT License - Feel free to use and modify for your own projects.
