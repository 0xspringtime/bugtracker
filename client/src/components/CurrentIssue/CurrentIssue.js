import React, { useState, useEffect } from "react";
import "./CurrentIssue.css";
import issueService from '../../services/issues'

function CurrentIssue() {

  const [issues, setIssues] = useState([]);
  const [isLoading, setLoading] = useState(true);  


  useEffect(() => {
    issueService
      .getAll()
      .then(initialIssues => {
        setIssues(initialIssues);
       setLoading(false); 
      }
      )
  }, [])
 if (isLoading) {
               console.log('Loading...');
               return <div>Loading Database...</div>
                }
     else{ 
              console.log(issues[0]);
              console.log(issues[0].dev);
              console.log(issues.length)
              var indents = [];
              for (var i =0; i < issues.length; i++){
                indents.push(
                            <div class="bold">#{i+1}:</div>,
                            <div>Date: {issues[i].date}</div>,
                            <div>Issue: {issues[i].desc}</div>,
                            <div>Dev: {issues[i].dev}</div>,
                            <div>Priority: {issues[i].prior}</div>,
                            <hr size="9" width="99%" ></hr> 
                );
              }
              return <div className="current-issues">
                     {indents}
                    </div>
}
}
export default CurrentIssue;
