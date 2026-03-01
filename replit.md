# Mystic Match-3 RPG

A fantasy Match-3 RPG battle game built with React, TypeScript, Express, and TailwindCSS.

## Project Structure
- `/1`: Main project directory
- `/1/client`: React frontend
- `/1/server`: Express backend
- `/1/dist`: Production build (generated)

## Features
- 50-level scrollable map with progression tracking.
- Turn-based battle mechanics with gem matching.
- Premium visual effects:
  - Flying energy particles from matches to UI bars.
  - Screen shake and falling animations.
  - Dynamic UI updates for HP, Shield, and Skills.

## Development
To start the development server:
\`\`\`bash
npm run dev --prefix 1
\`\`\`
The application will be available at http://localhost:5000.

## State Management
Persistent game state is stored in `localStorage` under the key `mystic_game_state`.
