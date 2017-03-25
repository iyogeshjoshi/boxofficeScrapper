#!/bin/node

var osmosis = require('osmosis')
var fs = require('fs')
var stringify = require('csv-stringify')
var file = './movies_list.csv'
var options = {
  header: true,
  delimiter: ',',
  quoted: true,
  escape: true,
  columns: {
    Title: 'Title',
    Screens: 'screens',
    'First Day': 'firstDay',
    'Opening Note': 'openingNote',
    'First Weekend': 'firstWeekend',
    'Total Net Gross': 'totalNetGross',
    'Ratings': 'ratings',
    'First week': 'firstWeek',
    'Budget': 'budget',
    'India Gross': 'indiaGross',
    'Overseas Gross': 'overseasGross',
    'Worldwide Gross': 'worldwideGross',
    'All Time Rank': 'allTimeRank',
    'Footfalls': 'footfalls',
    'Adjusted Net Gross': 'adjustedNetGross',
    'Overseas First Weekend': 'overseasFirstWeekend',
    'Worldwide First Weekend': 'worldwideFirstWeekend',
    'Overseas First Week': 'overseasFirstWeek',
    'Worldwide First Week': 'worldwideFirstWeek',
    'Release Date': 'Release Date',
    'Runtime': 'Runtime',
    'Genre': 'Genre'
  }
}
var movies = []

osmosis
  .get('http://www.boxofficeindia.com/')
  .find('#dropmenu li > a')
  .follow('@href')
  .find('.innercontentb#yeartopim4 .grayrow.boi-listing-rows table tr td:nth-child(2) a')
  .follow('@href')
  .set({
    Title: '.movieboxsright div.blue_tlte > a',
    releaseDetails: '.movieboxsright .movieboxssec:nth-child(2)',
    screens: '.movieboxsright .movieboxssec:nth-child(4) .movieim6:nth-child(1) tr:nth-child(1) > td:nth-child(3)',
    firstDay: '.movieboxsright .movieboxssec:nth-child(4) .movieim6:nth-child(1) tr:nth-child(2) > td:nth-child(3)',
    openingNote: '.movieboxsright .movieboxssec:nth-child(4) .movieim6:nth-child(2) tr:nth-child(1) > td:nth-child(3)',
    firstWeekend: '.movieboxsright .movieboxssec:nth-child(4) .movieim6:nth-child(2) tr:nth-child(2) > td:nth-child(3)',
    totalNetGross: '.movieboxsright > .movieboxssec:nth-child(4) > div:nth-child(2)',
    ratings: '.movieboxsright > .movieboxssec:nth-child(6) > div > div td:nth-child(3)',
    firstWeek: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(1) td:nth-child(3)',
    budget: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(2) td:nth-child(3)',
    indiaGross: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(3) td:nth-child(3)',
    overseasGross: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(4) td:nth-child(3)',
    worldwideGross: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(5) td:nth-child(3)',
    allTimeRank: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(2) tr:nth-child(1) td:nth-child(4)',
    footfalls: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(2) td:nth-child(4)',
    adjustedNetGross: '.movieboxsright > .movieboxssec:nth-child(7) td:nth-child(1) tr:nth-child(3) td:nth-child(4)',
    overseasFirstWeekend: '.movieboxsleftouter > .movieboxssec:nth-child(1) table:nth-child(2) tr:nth-child(2) td:nth-child(1)',
    worldWideFirstWeekend: '.movieboxsleftouter > .movieboxssec:nth-child(1) table:nth-child(2) tr:nth-child(2) td:nth-child(2)',
    overseasFirstWeek: '.movieboxsleftouter > .movieboxssec:nth-child(1) table:nth-child(2) tr:nth-child(2) td:nth-child(3)',
    worldwideFirstWeek: '.movieboxsleftouter > .movieboxssec:nth-child(1) table:nth-child(2) tr:nth-child(2) td:nth-child(4)'
  })
  .data(function (movie) {
    var releaseDetails = movie.releaseDetails.replace(/\n/g, '').split('|')
    delete movie.releaseDetails
    releaseDetails.forEach(function(value){
      var detail = value.split(':')
      movie[detail[0].trim()] = detail[1].trim()
    })
    //console.log(movie)
   movies.push(Object.values(movie))
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log)
  .done(function(){
    stringify(movies, options, function (err, output) {
      if (err) throw err
      fs.writeFile(file, output, { flag: 'a+', encoding: 'utf8' }, function (e) {
        if (e) throw e
        console.log('writing to file done :)')
      })
    })
  })
