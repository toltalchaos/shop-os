// const http = require('http');

// const server = http.createServer((req, res) => {
//     // Set the response header
//     res.setHeader('Content-Type', 'application/json');

//     // Define your data
//     const data = {
//         message: 'Hello, world!',
//         timestamp: new Date().toISOString()
//     };

//     // Convert the data to JSON
//     const jsonData = JSON.stringify(data);

//     // Send the JSON response
//     res.end(jsonData);
// });

// // Start the server
// const port = 3000;
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });

/////////////////////////////////////////////////////////////////////////////


import socks from '../static/socks.json';
// @ts-ignore
export async function _load({ params }) {
    console.log ('serverside load function called')
  return socks;
}
