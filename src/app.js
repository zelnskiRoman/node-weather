const path = require('path')
const express = require('express')
const geoCode = require('./utils/geocode')

const app = express()
const pathDir = path.join(__dirname, '../public')

app.use(express.static(pathDir))

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 404,
            descr: 'Cannot find your location'
        })
    }


    geoCode.geoCode(req.query.adress, (error, first, second, location) => {
        if (error)
            return res.send({
                error: 'Unable to find your location.'
            })
        geoCode.weather(undefined, first, second, location, (error, resp, location) => {
            if (error)
                res.send({
                    error: 'Unable to find forecast.'
                })
            res.send({
                resp,
                location
            })
        })
    })
})


app.get('*', (req, res) => {
    res.send('No page FOUND! 404')
})

app.listen(3000, () => {
    console.log('Server start!')
})