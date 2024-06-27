import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./components/spinner";
import Home from "./containers/home";

function App() {
  return (
    <>
      <Router basename="/app">
      <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                  <Home />
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
