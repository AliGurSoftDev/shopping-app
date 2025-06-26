# Environment Setup Guide

## Prerequisites
- **.NET SDK 9.0** (manual ZIP install or EXE installer)
- **Node.js** (v18 or newer)
- **npm** (comes with Node.js)
- **PostgreSQL** (for database)

## .NET SDK Installation (ZIP Method)
1. Download the .NET 9 SDK ZIP from the official site.
2. Extract to a folder (e.g., `C:\dotnet9`).
3. Add the folder to your `PATH` environment variable (move it above any other dotnet entries).
4. Restart your computer or sign out/in.
5. Verify with `dotnet --version` (should show `9.0.301`).

## Node.js & Client Setup
1. Install Node.js from https://nodejs.org/ if not already installed.
2. In a terminal, run `node --version` to verify (should be v18+).
3. Navigate to the `client` folder:
   ```powershell
   cd client
   npm install
   npm run dev
   ```

## PostgreSQL & Entity Framework Core
1. Install PostgreSQL and set up your user/database.
2. In the `server` project, install the EF Core PostgreSQL provider:
   ```powershell
   dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
   dotnet tool install --global dotnet-ef
   ```
3. Update `appsettings.json` with your PostgreSQL connection string.
4. Run migrations:
   ```powershell
   dotnet ef database update
   ```

## Batch File for Client
Create a `start-client.bat` in the project root:
```bat
@echo off
cd /d "%~dp0client"
npm run dev
```

---

*Refer to this guide for setting up the environment on a new machine.*

This is a mock-up shopping application.

This project mainly uses C#, .NET Core 9.0, HTML, JavaScript, React (Vite), TailwindCSS, PostgreSql
