// installing node-fetch to have fetch in node 
const fetch = require('node-fetch')
// dependicy injection


// comparing promise 
const getPeoplePromise = fetch => {
    return fetch('https://swapi.co/api/people')
    .then( response => response.json())
    .then( data => {
        return {
            count: data.count,
            results: data.results
        }
    })
} 
// comparing async 
const getPeople = async (fetch) => {
    const getRequest = await fetch('https://swapi.co/api/people')
    const data = await getRequest.json();
    console.log(data) 
        return {
            count: data.count,
            results: data.results
        }
} 

// getPeople(fetch) 

module.exports = {
    getPeople,
    getPeoplePromise
}