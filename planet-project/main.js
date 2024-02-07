const { parse } = require('csv-parse')
const fs = require('fs')

const results = []
const parser = parse({
    comment: '#',
    columns: true
})

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parser)
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            results.push(data)
        }
    })
    .on('error', (err) =>{
        console.error(err)
    })
    .on('end', () => {
        console.log("end")
        console.log(results.map(planet => {
            return planet['kepler_name']
        }))
        console.log(`${results.length} habitable planets found`)
    })