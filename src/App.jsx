import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { routerData } from "./routing/routes";

function App() {
  const location = useLocation();

  return (
    <div>
      <Routes location={location}>
        {routerData.map((route) => {
          const { path, Component } = route;
          return <Route key={path} path={path} element={<Component />} />;
        })}
      </Routes>
    </div>
  );
}

export default App;
