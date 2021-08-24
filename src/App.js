import "./App.css";
import Login from "./Components/Pages/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <GoogleAuthentication /> */}
      <Router>
        <Switch>
          <Route path="/" component={Login} />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
