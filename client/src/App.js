import React, { useState, useEffect } from "react";
import AddIssue from './components/AddIssue/AddIssue'
import CurrentIssue from './components/CurrentIssue/CurrentIssue'
import './App.css';

function App() {
  const [addIssue, setAddIssue] = useState(true);
    
    function toggleScreen() {
    setAddIssue(!addIssue)

    var text = document.getElementById("toggle");
        if (addIssue==false) text.innerHTML = "View Issues";
        else text.innerHTML = "Add Issues";
        console.log(text);
    }

  return (
      <div className="App">
          <h1>Bug Tracker</h1>
          <div className="card-container">
             {addIssue ? <AddIssue/ > : <CurrentIssue />}
          </div>
       <div className="view-selection">
            <button id="toggle" class="view-button" onClick={() => toggleScreen()}>View Issues< /button>
       </div>
      </div> 
  );
}
export default App;
