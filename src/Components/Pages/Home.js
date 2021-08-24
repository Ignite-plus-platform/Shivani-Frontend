
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
      <Router>
        <NavMenu />
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/Schedule">
              <Schedule />
          </Route>

          <Route path="learningplan">
                <LearningPlan/>
          </Route>

          <Route path="/contact">
            <NewsLetter />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default Home;
