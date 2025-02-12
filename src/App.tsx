import "./App.css";
import {
  Routes,
  Route,
  // BrowserRouter,
  Link,
  Navigate,
  NavLink,
} from "react-router-dom";
import { ApplicationsPage, ApplicationEditPage, CreationPage } from "./Pages";
import { Container } from "./ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <BrowserRouter> */}
      <header className="header">
        <Container>
          <div className="header__inner">
            <Link to={"/applications/#"} className="header__main-link">
            </Link>
            <nav className="nav-menu">
              <NavLink
                to={"/applications"}
                className="header__link"
                end
              >
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
          <Route
            path="/"
            element={<Navigate to="/applications" replace />}
          />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route
            path="/applications/:applicationId"
            element={<ApplicationEditPage />}
          />
          <Route path="/creation" element={<CreationPage />} />
        </Routes>
      </main>
      {/* </BrowserRouter> */}
    </QueryClientProvider>
  );
}

export default App;
