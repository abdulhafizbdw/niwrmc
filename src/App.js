import { React, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Navigate } from "react-router-dom";

import PrivateRoute from "./routers/PrivateRoute.js";
import Login from "./pages/login/index.js";
import Files from "./pages/files/index.js";
import NewFile from "./pages/files/newFile.js";
import ViewFile from "./pages/files/viewFile.js";
import Projects from "./pages/projects/index.js";
import NewProject from "./pages/projects/newProject.js";
import ViewProject from "./pages/projects/viewProject.js";
import UserManagement from "./pages/user-management/index.js";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/index.js";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#55A51C",
              colorTextHeading: "#5E5873",
              colorText: "#6E6B7B",
            },
            components: {
              Collapse: {
                headerBg: "#ffffff",
              },
            },
          }}
        >
          <Suspense fallback="loading">
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PrivateRoute />}>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route exact path="files" element={<Files />} />
                  <Route exact path="new-file" element={<NewFile />} />
                  <Route exact path="view-file" element={<ViewFile />} />
                  <Route exact path="projects" element={<Projects />} />
                  <Route exact path="new-project" element={<NewProject />} />
                  <Route exact path="view-project" element={<ViewProject />} />
                  <Route exact path="users" element={<UserManagement />} />
                </Route>
              </Routes>
            </Router>
          </Suspense>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
