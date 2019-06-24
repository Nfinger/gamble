import axios from 'axios';
import * as cheerio from 'cheerio';
import { parse, setYear } from 'date-fns';
import { connect, success } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function handler() {
  const connection = connect();
  const { data: html } = await axios.get('http://www.espn.com/golf/schedule');

  const $ = cheerio.load(html);
  const golfKey = 'hgatfhht75823gqv5hdqfy68';
  const {
    data: { tournaments }
  } = await axios.get(
    `https://api.sportradar.us/golf-t2/schedule/pga/2019/tournaments/schedule.json?api_key=${golfKey}`
  );

  const query = /* GraphQL */ `
    query {
      allEvents {
        id
        name
      }
    }
  `;
  const { allEvents: events } = await connection.query(query);

  let thisWeek = {};

  // This Week
  let date = $('.tablehead:nth-child(1) nobr').text();
  const name = $('.tablehead:nth-child(1) td:nth-child(2) > a')
    .text()
    .toLowerCase();

  let dateSplit = date.split(' - ');
  let start = setYear(parse(dateSplit[0]), 2019);
  let end = setYear(parse(dateSplit[1]), 2019);
  let sportsRadar =
    tournaments.find(tournament => tournament.name.toLowerCase() === name) ||
    {};
  if (sportsRadar.id) {
    try {
      const {
        data: { field }
      } = await axios.get(
        `https://api.sportradar.us/golf-t2/summary/pga/2019/tournaments/${
          sportsRadar.id
        }/summary.json?api_key=${golfKey}`
      );
      const idx = events.map(({ name: n }) => n).indexOf(name);
      thisWeek = {
        start,
        end,
        name,
        sportsRadarId: (sportsRadar && sportsRadar.id) || '',
        sport: 'golf',
        field,
        leaderboard: {}
      };

      let mutation;
      if (idx === -1) {
        mutation = /* GraphQL */ `(
          $name: String
          $participants: [Json!]
          $sportsRadarId: String
          $contestsIds: [ID!]
          $leaderboard: Json
          $sport: String
          $start: DateTime
          $end: DateTime
        ) {
          createEvent(
            name: $name
            participants: $participants
            sportsRadarId: $sportsRadarId
            contestsIds: $contestsIds
            leaderboard: $leaderboard
            sport: $sport
            start: $start
            end: $end
          ) {
            id
          }
        }`;
      } else {
        mutation = /* GraphQL */ `(
            $id: ID!
            $name: String
            $participants: [Json!]
            $sportsRadarId: String
            $sport: String
            $start: DateTime
            $end: DateTime
          ) {
            updateEvent(
              id: $id
              name: $name
              participants: $participants
              sportsRadarId: $sportsRadarId
              sport: $sport
              start: $start
              end: $end
            ) {
              id
            }
          }
        `;
      }

      const vars = {
        id: (events[idx] && events[idx].id) || null,
        name: thisWeek.name,
        participants: thisWeek.field,
        sportsRadarId: thisWeek.sportsRadarId,
        contests: [],
        leaderboard: {},
        sport: thisWeek.sport,
        start: thisWeek.start,
        end: thisWeek.end
      };

      const result = await connection.mutate(mutation, vars);
      console.log(result);
      // await connection.request(mutation, );
    } catch (error) {
      console.log(error);
    }
  }

  // Upcoming
  let currentRow = [];
  $('.tablehead:nth-child(3)')
    .find('tr:not(.colhead):not(.stathead)')
    .each((_, rower) => {
      $(rower)
        .find('td')
        .each((i, row) => {
          const text = $(row).text();
          if (i % 5 === 0 && currentRow.length) {
            date = currentRow[0].replace('Tickets', '');
            dateSplit = date.split(' - ');
            start = setYear(parse(dateSplit[0]), 2019);
            end = setYear(parse(dateSplit[1]), 2019);
            const n = currentRow[1].toLowerCase();
            sportsRadar =
              tournaments.find(
                ({ name: tournamentName }) => tournamentName.toLowerCase() === n
              ) || {};
            const idx = events
              .map(({ name: tournamentName }) => tournamentName)
              .indexOf(n);
            const obj = {
              start,
              end,
              name: n,
              field: {},
              sportsRadarId: (sportsRadar && sportsRadar.id) || '',
              sport: 'golf',
              leaderboard: {}
            };

            let mutation;
            if (idx === -1) {
              mutation = /* GraphQL */ `(
                $name: String
                $participants: [Json!]
                $sportsRadarId: String
                $contestsIds: [ID!]
                $leaderboard: Json
                $sport: String
                $start: DateTime
                $end: DateTime
              ) {
                createEvent(
                  name: $name
                  participants: $participants
                  sportsRadarId: $sportsRadarId
                  contestsIds: $contestsIds
                  leaderboard: $leaderboard
                  sport: $sport
                  start: $start
                  end: $end
                ) {
                  id
                }
              }`;
            } else {
              mutation = /* GraphQL */ `(
                  $id: ID!
                  $name: String
                  $participants: [Json!]
                  $sportsRadarId: String
                  $sport: String
                  $start: DateTime
                  $end: DateTime
                ) {
                  updateEvent(
                    id: $id
                    name: $name
                    participants: $participants
                    sportsRadarId: $sportsRadarId
                    sport: $sport
                    start: $start
                    end: $end
                  ) {
                    id
                  }
                }
              `;
            }
            const vars = {
              id: (events[idx] && events[idx].id) || null,
              name: obj.name,
              participants: obj.field,
              sportsRadarId: obj.sportsRadarId,
              contests: [],
              leaderboard: {},
              sport: obj.sport,
              start: obj.start,
              end: obj.end
            };

            connection.mutate(mutation, vars).then(console.log);
            currentRow = [];
          }
          currentRow.push(text);
        });
    });
  return success({});
}
