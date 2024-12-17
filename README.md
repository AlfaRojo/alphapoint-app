# Crypto Tracker App - React Native

## About

This React Native application allows users to view up to 5 request real-time crypto data, including:

*   [x] Login screen with username 
*   [x] Filterable list of top 50 cryptocurrencies (CoinLore API)
*   [x] Real-time chart for selected coin (updates every 30 seconds, max 5 requests)
*   [ ] Offline functionality for previously loaded data and charts
*   [x] User-friendly UI with basic adherence to platform design standards

## Objective

Develop a functional React Native application within 24 hours.

## Screens

### 1. Login:

*   Username input field
*   Login button navigates to Crypto List screen only if username is entered
*   Username stored locally and displayed as a welcome message on the next screen

### 2. Crypto List:

*   Displays top 50 cryptocurrencies from CoinLore API

### 3. Real-time Chart:

*   Displays a line chart for the selected cryptocurrency
*   Calls CoinLore API every 30 seconds for up to 5 requests (max 2.5 minutes)
*   Updates chart with retrieved price data and stores it locally
*   Decrementing timer displays time until the next price fetch

## APIs

*   **CoinLore API:**
    *   "Tickers (All Coins)" endpoint retrieves top 50 cryptocurrencies
    *   "Ticker (Specific Coin)" endpoint retrieves real-time price data
      
## Line Chart

*   Use a library like `react-native-svg-charts`
*   X-axis displays 24-hour clock time
*   Y-axis displays price in USD

## Architecture

*   Scalable and testable architecture

## UI/UX

*   Basic UI/UX following platform best practices

## Getting Started

1.  Clone this repository.
2.  Install dependencies (`npm install`).
3.  Run `npm run start`.
   3.1.   Follow in-console commands to open web, Android or iOs

## Note

This project was develop on a Windows computer, iOs was not tested due to emulator is only available on MacOs.
