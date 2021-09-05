import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NavMenu from "../NavMenu";
import About from "./About";
import Schedule from "./Schedule";
import NewsLetter from "./NewsLetter";
import LearningPlan from "./LearningPlan";

const Home = ({ authorized }) => {
  if (!authorized) {
    return <Redirect to="/" />;
  }
  return (
    <div>
    <div style={{marginTop:"500px"}}>
      <h1>Welcome</h1>
    </div>
      <Router>
        <NavMenu />
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/Schedule">
            <Schedule />
          </Route>

          <Route exact path="/learningplan">
            <LearningPlan />
          </Route>

          <Route exact path="/contact">
            <NewsLetter />
          </Route>

          <Route exact path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
