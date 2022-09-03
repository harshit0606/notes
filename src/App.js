import "./App.css";
import Home from "./components/home/home";
import Notes from "./components/notes/notes";
import Reminders from "./components/reminders/reminders";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  let theme = useSelector((state) => state.theme);
  return (
    <div className={theme ? "App" : "App dark"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Notes />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="editlabel" element={<Reminders />} />
            <Route path="archives" element={<Reminders />} />
            <Route path="trash" element={<Reminders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
