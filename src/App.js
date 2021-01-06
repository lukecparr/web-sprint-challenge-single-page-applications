import React from "react";
import { Route } from "react-router-dom";
import Home from "./Home";
import PizzaForm from "./PizzaForm";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Lambda Eats</h1>
      <p>Code and eat, eat and code.</p>

      <Route exact path='/' component={Home} />
      <Route path='/pizza' component={PizzaForm} />

    </div>
  );
};
export default App;
