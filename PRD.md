# Zombie Survival - Product Requirements Document

## 1. Overview

Zombie Survival is a web-based multiplayer top-down shooter where players cooperate to survive increasingly difficult waves of zombies.

## 2. Project Goals

- Create an engaging multiplayer zombie survival experience accessible through web browsers
- Implement real-time gameplay with minimal latency
- Develop a simple game architecture that supports multiple concurrent game sessions

## 3. Target Audience

- Casual and mid-core gamers
- Players who enjoy cooperative gameplay experiences
- Fans of zombie survival and shooter games
- People looking for quick gaming sessions during breaks

## 4. Technical Stack

### Backend

- Node.js runtime environment
- Express.js server framework
- TypeScript for type-safe code
- WebSocket protocol for real-time communication
- In-memory non-persistent data storage for active game sessions

### Frontend

- Nextjs for ui and game ui as the main frontend framework
- TypeScript for type-safe code
- HTML5 Canvas for game rendering
- WebSocket client for real-time communication with server

## 5. Feature Requirements

### 5.1 Core Gameplay Features

#### Player Mechanics

- Top-down movement using WASD or arrow keys
- Mouse-aimed shooting mechanics
- Simple health system
- Limited weapon selection

#### Combat System

- Basic weapon types (pistol, shotgun, rifle)
- Simple ammo management
- Different attack patterns for each weapon

#### Zombie Enemies

- Standard zombie enemies with basic AI
- Progressive difficulty scaling with each wave
- Occasional mini-boss zombies at milestone waves

#### Map and Environment

- Static map with obstacles
- Resource spawns (ammo, health kits)

### 5.2 Multiplayer Features

- Simple room-based system where players can create/join rooms
- Support for 1-8 players per room
- Player can share room codes with friends to join
- Basic team coordination features
- Simple text chat

## 6. User Flows

### 6.1 Game Session Flow

1. Player visits game website
2. Player creates a new room or joins existing room with code
3. Game begins when host player starts the session
4. Players survive waves of zombies until defeated
5. End-game summary shows basic stats for the session
6. Option to play again or return to menu

## 7. Technical Requirements

### 7.1 Performance Targets

- Support for 8 concurrent players per game session
- Maximum latency of 100ms for critical game actions
- 60 FPS gameplay on mid-tier devices
- Responsive design for different screen sizes (desktop focus)

### 7.2 Scalability Requirements

- Server architecture that supports multiple concurrent game sessions
- In-memory session management for active games
- Efficient state synchronization to minimize bandwidth

### 7.3 Browser Compatibility

- Support for Chrome

## 8. Development Roadmap

### Phase 1: Core Mechanics

- Basic player movement and combat
- Simple zombie AI and spawning
- Single-player prototype with wave system
- Basic UI elements

### Phase 2: Multiplayer Implementation

- WebSocket server implementation
- Real-time player synchronization
- Room creation and joining system
- Basic multiplayer gameplay

### Phase 3: Polish and Launch (2 weeks)

- Performance optimization
- UI/UX refinement
- Bug fixing and balance adjustments
- Deployment and monitoring setup

## 9. Success Metrics

- Session length: Average 15+ minutes per game session
- Room utilization: Average of 3+ players per room
- Gameplay balance: Average survival time increases with more players

## 10. Future Considerations

- Additional maps
- More enemy types
- Additional weapons
- Simple progression system
- Mobile support

---

_This document is subject to revision as development progresses._
