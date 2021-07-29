import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// import axios from 'axios'

// const promise = axios.get('http://localhost:3001/notes')
// promise.then(response => {
//   const data = response.data
//   console.log(data)
// })
// axios
//   .get("http://localhost:3001/notes")
//   .then(response => {
//     const notes = response.data
//     console.log(notes);
//   })

// const promise2 = axios.get('http://localhost:3001/foobar')
// console.log(promise2)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
