import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  NavLink,
} from "react-router-dom";
import { ApplicationsPage, ApplicationEditPage, CreationPage } from "./pages";
import { Container } from "./ui";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Container>
          <div className="header__inner">
            <Link to={"/applications/#"}>
              <h1 className="header__title">O</h1>
            </Link>
            <nav className="nav-menu">
              <NavLink to={"/applications"} className="header__link" end>
                Все заявки
              </NavLink>
              <NavLink to={"/creation"} className="header__link" end>
                Создание заявки
              </NavLink>
            </nav>
          </div>
        </Container>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/applications" replace />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route
            path="/applications/:applicationId"
            element={<ApplicationEditPage />}
          />
          <Route path="/creation" element={<CreationPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
