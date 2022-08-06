require('dotenv').config()
const express = require("express");

const app = express();

const Issue = require('./models/issue')

const PORT = process.env.PORT || 3001

const cors = require('cors')

const mongoose = require('mongoose')

const requestLogger = (request, response, next) => {
      console.log('Method:', request.method)
      console.log('Path:  ', request.path)
      console.log('Body:  ', request.body)
      console.log('---')
      next()
}

app.use(express.json())
app.use(requestLogger)  
app.use(cors())
app.use(express.static('client/build'))

app.get("/", (req, res) => {
      res.json({ message: "Hello from server!" });
});

const generateId = () => {
      const maxId = issues.length > 0
        ? Math.max(...issues.map(n => n.id))
        : 0
      return maxId + 1
}

app.post('/api/issues', (request, response) => {
        const body = request.body
	const issue = new Issue({
	  "date": new Date(),
          "desc": body.desc,
          "dev": body.dev,
          "prior": body.prior,
	})
      issue.save().then(savedIssue => {
          response.json(savedIssue)
        })
})


app.get('/api/issues', (request, response) => {
    Issue.find({}).then(issues => {
      response.json(issues)
    })
})

app.get('/api/issues/:id', (request, response) => {
  Issue.findById(request.params.id).then(issue => {
          response.json(issue)
        })
})



const unknownEndpoint = (request, response) => {
      response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
});

