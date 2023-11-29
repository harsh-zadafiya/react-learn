// Harsh Zadafiya 8866930 - backend/fix bug
// Rohit Banwal   8879715 - frontend
// Kishan Joshi   8816399 - graphql
// Ramandeep kaur 8885823 - frontend

import EmpList from "./components/EmpList";
import Navigation from "./Pages/navigation/Navigation";
import EmpAdd from "./Pages/empadd/EmpAdd";
import { Routes, Route } from "react-router-dom";
import EmpView from "./Pages/employee/EmpView";
import EmpUpdate from "./Pages/empUpdate/EmpUpdate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="/emp/:empId?" element={<EmpView />} />
          <Route path="/empUpdate/:empId?" element={<EmpUpdate />} />
          <Route path="/empadd/" element={<EmpAdd />} />
          <Route index element={<EmpList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
