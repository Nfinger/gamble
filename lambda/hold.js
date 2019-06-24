// import { APIGatewayProxyHandler } from 'aws-lambda';
// import * as request from 'request-promise'
// import * as cheerio from 'cheerio'
// import r from 'rethinkdb'
// import Axios from 'axios'
// import { parse, setYear } from 'date-fns'

// import { toArrayOne, connect, toArray, success } from './utils'

// const ESPN_ROOT = 'http://espn.go.com'
// const SPORTS = {
//     'NFL': {
//         'base_url': 'http://espn.go.com/nfl/teams',
//         'roster_links_selector': '.logo-nfl-medium span a[href^="/nfl/team/roster/"]',
//         'schedule_links_selector': '.logo-nfl-medium span a[href^="/nfl/team/schedule/"]',
//         'team_names_selector': '.logo-nfl-medium h5 a[href^="/nfl/team/_/name/"]',
//         'team_logo_selector': 'img.teamlogo',
//         'id_capture_regex': '/nfl/team/roster/_/name/(.*)/.*',
//         'json_file': 'nfl.json'
//     },
//     'MLB': {
//         'base_url': 'http://espn.go.com/mlb/teams',
//         'roster_links_selector': '.logo-mlb-medium span a[href^="/mlb/teams/roster?team="]',
//         'team_names_selector': '.logo-mlb-medium h5 a[href^="http://espn.go.com/mlb/team/_/name/"]',
//         'team_logo_selector': 'img.teamlogo',
//         'id_capture_regex': '/mlb/team/roster/_/name/(.*)/.*',
//         'json_file': 'mlb.json'
//     },
//     'NBA': {
//         'base_url': 'http://espn.go.com/nba/teams',
//         'roster_links_selector': '.logo-nba-medium span a[href^="/nba/teams/roster?team="]',
//         'team_names_selector': '.logo-nba-medium h5 a[href^="http://espn.go.com/nba/team/_/name/"]',
//         'team_logo_selector': 'img.teamlogo',
//         'id_capture_regex': '/nba/teams/roster\?team=(.*)',
//         'json_file': 'nba.json'
//     },
//     'NCAA_FOOTBALL': {
//         'base_url': 'http://espn.go.com/college-football/teams',
//         'roster_links_selector': '.medium-logos span a[href^="/ncf/teams/roster?teamId="]',
//         'team_names_selector': '.medium-logos h5 a[href^="http://espn.go.com/college-football/team/_/id/"]',
//         'id_capture_regex': '/ncf/teams/roster\?teamId=(.*)',
//         'json_file': 'ncaa_football.json'
//     },
//     'NCAA_BASKETBALL': {
//         'base_url': 'http://espn.go.com/mens-college-basketball/teams',
//         'roster_links_selector': '.medium-logos span a[href^="/ncb/teams/roster?teamId="]',
//         'team_names_selector': '.medium-logos h5 a[href^="http://espn.go.com/mens-college-basketball/team/_/id/"]',
//         'id_capture_regex': '/ncb/teams/roster\?teamId=(.*)',
//         'json_file': 'ncaa_basketball.json'
//     },
// }

// export const golfWorldRankings: APIGatewayProxyHandler = async (event, context) => {
//     const connection = await connect()
//     const html = await request('http://www.owgr.com/ranking?pageNo=1&pageSize=300&country=All')
//     const $ = cheerio.load(html)
//     const worldRankings = []
//     let currentRow = []

//     $('tr').find('td').each((i, row) => {
//         if (i % 11 === 0 && currentRow.length > 0) {
//             worldRankings.push({
//                 thisWeek: parseInt(currentRow[0]),
//                 lastWeek: parseInt(currentRow[1]),
//                 end2018: parseInt(currentRow[2]),
//                 country: currentRow[3],
//                 name: currentRow[4],
//                 avgPoints: currentRow[5],
//                 totalPoints: currentRow[6],
//                 eventsPlayed: currentRow[7],
//                 pointsLost: currentRow[8],
//                 pointsGained: currentRow[9],
//                 eventsPlayedActual: currentRow[10],
//             })
//             currentRow = []
//         }
//         currentRow.push($(row).text())
//     })

//     await Promise.all(worldRankings.map(async rank => {
//         const result = await r.table('golfStats')
//             .getAll(rank.name, {index: 'name'})
//             .update({
//                 ...rank
//             })
//             .run(connection)
//         let changed = 0
//         for (let key in result) {
//             changed += result[key]
//         }
//         if (changed === 0) {
//             await r.table('golfStats')
//             .insert({
//                 ...rank
//             })
//             .run(connection)
//         }

//     }))

//     return success('Golf World Rankings scraped', {})
// }

// export const golfSchedule: APIGatewayProxyHandler = async (event, context) => {
//     const connection = await connect()
//     const html = await request('http://www.espn.com/golf/schedule')
//     const $ = cheerio.load(html)
//     const golfKey = 'hgatfhht75823gqv5hdqfy68'
//     const { data: { tournaments } } = await Axios.get(`https://api.sportradar.us/golf-t2/schedule/pga/2019/tournaments/schedule.json?api_key=${golfKey}`)
//     setTimeout(async _ => {
//         const events = await r.table('sportingEvents')
//             .getAll('golf', {index: 'sport'})
//             .run(connection)
//             .then(toArray)
//             .map(e => e.name)

//         const schedule = []

//         // This Week
//         const date = $('.tablehead:nth-child(1) nobr').text()
//         const name = $('.tablehead:nth-child(1) td:nth-child(2) > a').text().toLowerCase()

//         const dateSplit = date.split(' - ')
//         const start = setYear(parse(dateSplit[0]), 2019)
//         const end = setYear(parse(dateSplit[1]), 2019)
//         const sportsRadar = tournaments.find(tournament => tournament.name.toLowerCase() === name) || {}
//         try {

//             const { data: { field } } = await Axios.get(`https://api.sportradar.us/golf-t2/summary/pga/2019/tournaments/${sportsRadar.id}/summary.json?api_key=${golfKey}`)
//             schedule.push({
//                 start,
//                 end,
//                 name,
//                 sportsRadarId: sportsRadar && sportsRadar.id || '',
//                 sport: 'golf',
//                 field,
//                 leaderboard: {}
//             })

//         } catch (error) {
//             console.log(error)
//         }

//         // Upcoming
//         let currentRow = []
//         $('.tablehead:nth-child(3)').find('tr:not(.colhead):not(.stathead)').each((i, row) => {
//             $(row).find('td').each((i, row) => {
//                 let text = $(row).text()
//                 if (i % 5 === 0 && currentRow.length) {
//                     const date = currentRow[0].replace('Tickets', '')
//                     const dateSplit = date.split(' - ')
//                     const start = setYear(parse(dateSplit[0]), 2019)
//                     const end = setYear(parse(dateSplit[1]), 2019)
//                     const n = currentRow[1].toLowerCase()
//                     const sportsRadar = tournaments.find(({ name }) => name.toLowerCase() === n) || {}
//                     if (!schedule.filter(({ name }) => name === n).length) {
//                         const idx = events.indexOf(n)
//                         const obj = {
//                             start,
//                             end,
//                             name: n,
//                             sportsRadarId: sportsRadar && sportsRadar.id || '',
//                             sport: 'golf',
//                             leaderboard: {}
//                         }
//                         if (idx > -1) {
//                             schedule.push(obj)
//                         } else {
//                             const event = events[idx]
//                             schedule.push({
//                                 ...event,
//                                 ...obj
//                             })
//                         }
//                     }
//                     currentRow = []
//                 }
//                 currentRow.push(text)
//             })
//         })

//         await Promise.all(schedule.map(async event => {
//             const result = await r.table('sportingEvents')
//                 .getAll(event.name, {index: 'name'})
//                 .update(event)
//                 .run(connection)
//             let changed = 0
//             for (let key in result) {
//                 changed += result[key]
//             }
//             if (changed === 0) {
//                 await r.table('sportingEvents')
//                     .insert(event)
//                     .run(connection)
//             }
//         }))
//     }, 1500)
//     return success('Golf Scraped', {})
// }

// export const golfTournamentSummary = async (event, context) => {
//     const golfKey = 'hgatfhht75823gqv5hdqfy68'
//     // const { data } = await Axios.get(`https://api.sportradar.us/golf-t2/summary/pga/2019/tournaments/${id}/summary.json?api_key=${golfKey}`)

//     return success('Tournament Summary retrieved', {})
// }

// export const golfLeaderBoard: APIGatewayProxyHandler = async (event, context) => {

// }

// export const nba: APIGatewayProxyHandler = async (event, context) => {
//     const all_rosters = {}
//     const all_nfl_schedules = {}
//     const schedule_counter = 0
//     const counter = 0

//     const {
//         base_url,
//         roster_links_selector,
//         team_names_selector,
//         team_logo_selector,
//         id_capture_regex
//     } = SPORTS.NBA

//     const html = await request(base_url)
//     const $ = cheerio.load(html)

//   return success("message", event);
// }
