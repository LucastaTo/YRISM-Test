import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./components/spinner";

// Pages
const ListEmployees = lazy(() => import("./pages/apps/list"));
const CreateEmployee = lazy(() => import("./pages/apps/create"));
const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <>
      <Router basename="/apps">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/list"
            element={
              <Suspense fallback={<Spinner />}>
                <ListEmployees />
              </Suspense>
            }
          />
          <Route
            path="/create"
            element={
              <Suspense fallback={<Spinner />}>
                <CreateEmployee />
              </Suspense>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<Spinner />}>
                <CreateEmployee />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<Spinner />}>
                <Navigate to="/list" replace />
              </Suspense>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
