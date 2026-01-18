# FreeTune React Native Implementation Guide

This document outlines the architecture, tech stack, and implementation plan for the **FreeTune** frontend in **React Native**, mirroring the features of the original Flutter application.

## 1. Technology Stack Mapping

We are migrating from **Flutter (GetX + Isar)** to **React Native (Zustand + WatermelonDB)**.

| Feature | Flutter (Old) | React Native (New) | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Flutter (Dart) | React Native 0.76+ (TypeScript) | UI Framework |
| **State Management** | GetX | **Zustand** | Global App State (Player, User) |
| **Server State** | GetX / Dio | **TanStack Query (React Query)** | API Caching & Async State |
| **Navigation** | GetX Routes | **React Navigation v7** (Native Stack + Tabs) | Screen transitions |
| **Styling** | Flutter Widgets | **NativeWind v4** (Tailwind CSS) | Styling system |
| **Audio** | just_audio | **react-native-track-player** | Background Audio Service |
| **Local Database** | Isar (NoSQL) | **WatermelonDB** (SQLite based) | Offline Songs & Sync |
| **Key/Value Storage** | Shared Preferences | **react-native-mmkv** | Auth Tokens, Settings |
| **Networking** | Dio | **Axios** | HTTP Client |
| **Icons** | built-in | **react-native-vector-icons** | UI Icons |

---

## 2. Proposed Project Structure (`src/`)

We will use a **Feature-based** folder structure to keep related code together, similar to the Clean Architecture approach but idiomatic to React.

```text
src/
├── app/                  # App Entry & Providers
│   ├── App.tsx           # Context Providers (QueryClient, SafeArea)
│   ├── navigation/       # Root Navigator, Tab Navigator
│   └── theme/            # Global Styles/Theme Config
├── features/             # Feature Modules (Screens + Logic)
│   ├── auth/             # Login, Register
│   ├── player/           # MiniPlayer, FullScreenPlayer
│   ├── home/             # Home Feed
│   ├── search/           # Search Logic & UI
│   └── library/          # Offline/Downloaded Songs
├── components/           # Shared UI Components (Buttons, Inputs)
│   ├── atoms/
│   └── molecules/
├── services/             # Core Services
│   ├── api/              # Axios Setup & Endpoints
│   ├── audio/            # TrackPlayer Service & Setup
│   ├── database/         # WatermelonDB Schema & Models
│   └── playback/         # Queue Management Logic
├── store/                # Global Zustand Stores
│   ├── usePlayerStore.ts # UI State for Player (collapsed/expanded)
│   └── useAuthStore.ts   # User Session State
├── hooks/                # Shared Custom Hooks
└── utils/                # Helpers, Constants, Types
```

---

## 3. Key Implementation Strategies

### **A. Audio Playback Engine**
*   **Library**: `react-native-track-player`
*   **Architecture**:
    *   **`service.ts`**: The Background Headless Task. Handles remote events (Play, Pause, Next, Seek) from the Notification Center / Lock Screen.
    *   **`usePlayerSetup` Hook**: Initializes the player on app launch.
    *   **Playback Queue**: Managed internally by TrackPlayer. We sync the current track info to our React components using `useActiveTrack()`.

### **B. Offline Mode / Database**
*   **Library**: `WatermelonDB` (High Performance)
*   **Schema**:
    *   **`songs`**: `id`, `title`, `artist`, `remote_url`, `local_path`, `thumbnail`, `duration`.
*   **Logic**:
    1.  User clicks "Download".
    2.  `RNFetchBlob` / `ExpoFileSystem` downloads file to `DocumentDir`.
    3.  Create record in WatermelonDB with `local_path`.
    4.  **Playback**: When playing, check DB. If `local_path` exists, pass `file://${path}` to TrackPlayer. Else, pass `https://${url}`.

### **C. Networking & Caching**
*   **Library**: `TanStack Query` + `Axios`
*   **Approach**:
    *   **Search**: Use `useQuery(['search', query], fetchFn)` with `enabled: !!query`.
    *   **Mutations**: Use `useMutation` for Like/Unlike, linking to optimistic updates for instant UI feedback.

### **D. Authentication**
*   **Storage**: `MMKV` for ultra-fast synchronous storage of JWT tokens.
*   **Interceptor**: Axios interceptor to read token from MMKV and inject `Authorization` header.
*   **Flow**:
    *   App Launch -> Check MMKV for Token -> If valid, set Auth State -> Render Home.
    *   If 401 -> Redirect to Login.

---

## 4. Next Steps (Development Plan)

1.  **Foundation Setup**:
    *   Configure `NativeWind` and `Tailwind`.
    *   Setup `React Navigation` (Tabs + Stack).
    *   Initialize `WatermelonDB`.

2.  **Core Audio**:
    *   Implement `TrackPlayer` setup and background service.
    *   Create a simple "MiniPlayer" UI component.

3.  **Features**:
    *   **Home/Search**: Integrate API to list songs. Play on tap.
    *   **Offline**: Implement Download logic and Local DB sync.

4.  **Polish**:
    *   Animations (`react-native-reanimated`) for Player maximize/minimize transitions.
