import { BrowserRouter, Switch, Route } from "react-router-dom";

import NextMatch from "./pages/NextMatch";
import PlayerDetails from "./pages/PlayerDetails";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <main>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={NextMatch} />
            <Route path="/player/:playerId" exact component={PlayerDetails} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
