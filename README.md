# CourseBookingApp

A fullstack web application built with **Angular (frontend)** and **.NET
(backend)** for managing courses, user profiles, bookings, and more. The
application features **JWT authentication**, **role-based access**,
**theme toggling**, and **Cloudinary integration**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User registration, login, and profile management\
- Role-based access control (Admin/User)\
- Course creation, viewing, booking, and wishlist\
- Cloudinary integration for images\
- Responsive UI with Angular Material\
- Dark/Light theme toggle\
- Smooth animations\
- SQL Server + EF Core backend

---

## Tech Stack

**Frontend:** Angular 16, TypeScript, SCSS, Angular Material\
**Backend:** .NET 8 Web API, C#, EF Core\
**Database:** SQL Server\
**Cloud:** Cloudinary\
**Auth:** JWT

---

## Project Structure

    CourseBookingApp/
    ├─ coursebookingapp.client/        # Angular frontend
    │  ├─ src/
    │  │  ├─ app/
    │  │  │  ├─ core/                  # Services
    │  │  │  ├─ features/              # Feature modules
    │  │  │  ├─ shared/                # Reusable components
    │  │  │  ├─ app.component.html
    │  │  │  └─ app.component.scss
    │  ├─ package.json
    │
    ├─ coursebookingapp.api/           # .NET backend
    │  ├─ Controllers/
    │  ├─ Data/
    │  ├─ Models/
    │  ├─ Services/
    │  └─ appsettings.json
    │
    ├─ README.md
    └─ .gitignore

---

## Installation

### Prerequisites

- Node.js \>= 18\
- Angular CLI \>= 16\
- .NET SDK \>= 8\
- SQL Server\
- Cloudinary account

### Steps

#### 1. Clone repo

```bash
git clone https://github.com/yourusername/CourseBookingApp.git
```

#### 2. Install frontend

```bash
cd CourseBookingApp/coursebookingapp.client
npm install
```

#### 3. Restore backend

```bash
cd ../coursebookingapp.api
dotnet restore
```

#### 4. Run backend

```bash
dotnet run
```

#### 5. Run frontend

```bash
cd ../coursebookingapp.client
ng serve --open
```

---

## Configuration

### Update _appsettings.json_

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CourseBookingDB;Trusted_Connection=True;"
  },
  "CloudinarySettings": {
    "CloudName": "your-cloud-name",
    "ApiKey": "your-api-key",
    "ApiSecret": "your-api-secret"
  }
}
```

---

## Environment Variables

Create a `.env` in Angular root:

    NG_APP_API_URL=http://localhost:5000/api
    NG_APP_CLOUDINARY_PRESET=your-preset

---

## Scripts

### Angular

    npm start
    npm run build

### .NET

    dotnet run
    dotnet ef database update

---

## Contributing

Pull requests are welcome!

---

## License

MIT
