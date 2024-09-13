import { React, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Navigate } from "react-router-dom";

import PrivateRoute from "./routers/PrivateRoute.js";
import Login from "./pages/login";
import Folders from "./pages/folders/index.js";
import NewFolder from "./pages/folders/newFolder.js";
import UserManagement from "./pages/user-management/index.js";

function App() {
  return (
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
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/" element={<Navigate to="/users" replace />} />
              <Route exact path="folders" element={<Folders />} />
              <Route exact path="new-folder" element={<NewFolder />} />
              <Route exact path="users" element={<UserManagement />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
