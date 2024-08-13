# My Project

This project is a React-based web application with TypeScript, Tailwind CSS, and MobX for state management. It includes a responsive Navbar and Tabs component using Tailwind CSS and Headless UI. The project supports multiple languages with i18next.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [Navbar](#navbar)
  - [Tabs](#tabs)
- [Internationalization](#internationalization)
- [Contributing](#contributing)
- [License](#license)

## Features

- Responsive Navbar with profile menu
- Tabs component using Tailwind CSS and Headless UI
- Internationalization support with i18next
- State management using MobX
- TypeScript for type safety
- Language selection with country flags
- Dynamic theme switching (dark and light modes)
- Custom radio buttons with conditional styling
- Integration with Live Score API (https://live-score-api.com/football-api) for football data
- Comprehensive database schema for managing football statistics

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

## Usage

To start the development server, run:

```bash
npm start
```

Open http://localhost:3000 to view it in the browser.


## API Integration

The application integrates with the Live Score API (https://live-score-api.com/football-api, https://dashboard.api-football.com/) to fetch real-time football data. The following endpoints are commonly used:
- Leagues: Fetches information about various football leagues.
- Teams: Fetches information about teams within a league.
- Matches: Fetches information about upcoming, ongoing, and past matches.
- Player Statistics: Fetches detailed statistics for individual players.

To use the API, ensure you have an API key and configure it in your environment variables or project settings.

## 문제해결
- 컴포넌트 개발 시 여러 타입의 props를 받아야하는 경우 제네릭 컴포넌트를 사용하여 해결
