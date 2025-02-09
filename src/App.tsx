import "./App.css";
import { Routes, Route, BrowserRouter, Link, Navigate } from "react-router-dom";
import { ApplicationsPage, ApplicationEditPage, CreationPage } from "./Pages";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <nav className="nav-menu">
          <Link to={"/applications"}>Все заявки</Link>
          <Link to={"/creation"}>Создание заявки</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route
            path="/applications:/applicatioinId"
            element={<ApplicationEditPage />}
          />
          <Route path="/creation" element={<CreationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
