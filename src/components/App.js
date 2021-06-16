import React from "react";
import { Route, Switch } from "react-router-dom";
import { cx, css } from "emotion";
import PageHeader from "./PageHeader";
import PretrainDataList from "./PretrainDataList";
import IntentDetails from "./IntentDetails";
import NewIntentDataForm from "./NewIntentDataForm";
import ErrorComponent from "./ErrorComponent";

const rootDiv = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <div className={cx(rootDiv)}>
      <PageHeader />
      <Switch>
        <Route exact path="/" render={(props) => <PretrainDataList {...props} />} />
        <Route path="/intent/:id" render={(props) => <IntentDetails {...props} />} />
        <Route path="/new_intent" render={(props) => <NewIntentDataForm {...props} />} />
        <Route component={ErrorComponent} />
      </Switch>
    </div>
  );
}

export default App;
