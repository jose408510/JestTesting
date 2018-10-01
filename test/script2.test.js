const fetch = require('node-fetch')
const swapi = require('./script2')

it('calls swapi to get people' , (done) => {
    expect.assertions(1)// when doing asyn always use assertions
    swapi.getPeople(fetch).then(data => {
        expect(data.count).toEqual(87);
        done(); // this is saying dont pass the test untill it has reached to the bottom and it is done 
    })
})
// other way of doing it with a return
// it('calls swapi to get people' , () => {
//     expect.assertions(1)
//    return  swapi.getPeople(fetch).then(data => {
//         expect(data.count).toEqual(87);
//     })
// })

it('calls swapi to get people with a promise' , () => {
    expect.assertions(2)
    return swapi.getPeoplePromise(fetch).then(data => {
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5)
    })
})
// mock functions are called spys in jest .. 
it('getPeople returns count and results' , () => {
    const mockFetch = jest.fn()
    .mockReturnValue(Promise.resolve({
        json: () => Promise.resolve({
            count: 87,
            results: [0,1,2,3,4,5]
        })
    }))
    expect.assertions(4)
    return swapi.getPeoplePromise(mockFetch).then(data => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(mockFetch).toBeCalledWith('https://swapi.co/api/people');
        expect(data.count).toEqual(87);
        expect(data.results.length).toBeGreaterThan(5)
    })
})