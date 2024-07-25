import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./components/home";
import "./App.css";
import AppMain from "./components/app/app-main";
import Swap from "./components/app/swap/Swap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<AppMain />} />
          <Route path={"/swap"} element={<Swap />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
