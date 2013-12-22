// Schedule logic
var moment = require('moment');

module.exports = function(req, res){
    res.render('index', {
        openLoc: [
            {
                name: "Gallo1",
                location: "here",
                closeDate: Number(moment().format("X"))
            },
            {
                name: "Gallo2",
                location: "here",
                closeDate: Number(moment().format("X"))
            },
            {
                name: "Gallo3",
                location: "here",
                closeDate: Number(moment().format("X"))
            },
            {
                name: "Gallo4",
                location: "here",
                closeDate: Number(moment().format("X"))
            }
        ],
        closedLoc: [
            {
                name: "Gallo5",
                location: "here",
                closeDate: Number(moment().format("X"))
            },
            {
                name: "Gallo6",
                location: "here",
                closeDate: Number(moment().format("X"))
            }
            
        ]
    });
};
