import React, { useState, useEffect } from "react";
import "./AddIssue.css";
import { Form, InputGroup } from 'react-bootstrap'
import issueService from '../../services/issues'

function AddIssue() {
  
  const [issues, setIssues] = useState([]);    
  const [newissue, setNewIssue] = useState('')
  const [desc, setDesc] = useState('');
  const [dev, setDev] = useState('');
  const [prior, setPrior] = useState('Low');

  useEffect(() => {
    issueService
      .getAll()
      .then(initialIssues => {
        setIssues(initialIssues)
      })
  }, [])
    console.log(issues[0])

  const issueadd = (event) => {
    event.preventDefault()
    const newIssue = {
        date: new Date().toISOString(),
        desc: desc,
        dev: dev,
        prior: prior,
        id: issues.length + 1,
    }
  issueService
    .create(newIssue)
    .then(returnedIssue => {
      setIssues(issues.concat(returnedIssue))
      setNewIssue('')
    })
    window.location.reload(false);
   }
	


  return(
      <div className="add-issue">
      <form>
      <Form>
              <Form.Label>Issue Description</Form.Label>
              <Form.Control as="textarea" rows={3} 
                id="description"
                onKeyUp={() => setDesc(document.getElementById("description").value)}
                />
      </Form>
      <label>
      <div>
      Assign to
      </div>
      <div className = "select-2"> 
            <InputGroup className="mb-3">
              <Form.Control aria-label="Text input with dropdown button"
                id="des2"
                onKeyUp={() => setDev(document.getElementById("des2").value)}
                />

            </InputGroup>
      Priority Level
      </div>
      <select name="forDev"
       id="desc3"
       onChange={() => setPrior(document.getElementById("desc3").value)}
      >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Very High">Very High</option>
      </select>
      </label>
      <button type="submit" onClick={issueadd}>Add</button>
      </form>
      </div>
  );
}
export default AddIssue;
