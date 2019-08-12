// We cannot use "return" inside getPuzzle because:
// 1. Return data will be returned well before the HTTP request is finished
// 2. When you use return inside the eventlisteners callback, the data is "stuck" inside of that function and not returned when calling getPuzzle

// You RETURN resolve/reject when the promise is "fullfilled" and then you say exactly what the terms are for resolving/rejecting
// const getPuzzle = (wordCount) => { 
//     return fetch(`http://puzzle.mead.io/puzzle?wordCount=${wordCount}`).then((response) => {
//         if (response.status === 200) {
//             return response.json()
//         } else {
//             throw new Error("An error has occured.")
//         }
//     }).then((data) => {
//         return data.puzzle
//     })
// }

const getPuzzle = async (wordCount) => { 
    const response = await fetch(`//puzzle.mead.io/puzzle?wordCount=${wordCount}`)
    if (response.status === 200) {
        const data = await response.json()
        return data.puzzle
    } else {
        throw new Error("Unable to get puzzle.")
    }    
}

const getCountry = async (countryCode) => {
    const response = await fetch("//restcountries.eu/rest/v2/all")
    if (response.status === 200) {
        let data = await response.json()
        return data.find((country) => country.alpha2Code === countryCode)
    } else {
        throw new Error("Can't find your country.")
    }
}

const getLocation = async () => {
    const response = await fetch("//ipinfo.io/json?token=4407f22c26be55")
    if (response.status === 200) {
        return response.json()
    } else {
        throw new Error("Unable to get location.")
    }
}

// const getCurrentCountry = async () => {
//     const location = await getLocation()
//     const country = await getCountry(location.country)
//     return country
// }