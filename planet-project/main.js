const { parse } = require('csv-parse')
const fs = require('fs')

const results = []
const parser = parse({
    comment: '#',
    columns: true
})

fs.createReadStream('kepler_data.csv')
    .pipe(parser)
    .on('data', (data) => {
        results.push(data)
    })
    .on('error', (err) =>{
        console.error(err)
    })
    .on('end', () => {
        console.log("end")
        console.log(results)
    })