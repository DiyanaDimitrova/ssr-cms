const Contentstack = require("contentstack");
const express = require("express");
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3001;
const App = require('../src/App')
const React = require('react')
const ReactDOMServer = require('react-dom/server')

app.use(express.static('./build'));
app.use(cors());
const Stack = Contentstack.Stack(
  "blt96987392ab8fa57d",
  "bltbf47eb0fe14918eb",
  "development"
);

app.get("/api/home", (req, res) => {
  const Query = Stack.ContentType("page").Entry("blt786700107042dc28");
  Query.fetch().then(
    function success(entry) {
      res.json(entry.toJSON()); // Convert the entry result object to JSON
    },
    function error(err) {
      res.status(500);
      res.send(err);
    }
  );
});

app.get("/", (req, res) => {
  const app = ReactDOMServer.renderToString(<App />)
  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${app}</div>`
      )
    )
  })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
