import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Billing from "./pages/Billing";
import Profile from "./pages/Profile";
import Users from "./pages/Users";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/billing" component={Billing} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/users" component={Users} />
          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
