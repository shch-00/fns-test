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
      <header className="header">
        <Container>
          <div className="header__inner">
            <Link to={"/fns-test/applications/#"}>
              <h1 className="header__title">O</h1>
            </Link>
            <nav className="nav-menu">
              <NavLink
                to={"/fns-test/applications"}
                className="header__link"
                end
              >
                Все заявки
              </NavLink>
              <NavLink to={"/fns-test/creation"} className="header__link" end>
                Создание заявки
              </NavLink>
            </nav>
          </div>
        </Container>
      </header>
      <main className="content">
        <Routes>
          <Route
            path="/fns-test"
            element={<Navigate to="/fns-test/applications" replace />}
          />
          <Route path="/fns-test/applications" element={<ApplicationsPage />} />
          <Route
            path="/fns-test/applications/:applicationId"
            element={<ApplicationEditPage />}
          />
          <Route path="/fns-test/creation" element={<CreationPage />} />
        </Routes>
      </main>
    </QueryClientProvider>
  );
}

export default App;
