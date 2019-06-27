import axios from 'axios';
import * as cheerio from 'cheerio';
import { connect, success } from '../utils';
import golfRules from '../rules/golfRules';

// eslint-disable-next-line import/prefer-default-export
export async function handler() {
  const connection = connect();

  const { data: html } = await axios.get(
    'http://www.espn.com/golf/leaderboard'
  );
  const $ = cheerio.load(html);
  const leaderboard = {};
  const title = $('.headline__h1').text();

  const query = /* GraphQL */ `
    query getEvent($name: String) {
      allEvents(filter: { name: $name }) {
        id
      }
    }
  `;
  const { allEvents } = await connection.query(query, {
    name: title.toLowerCase()
  });
  let arr = [];
  const len = $('.Table2__header-row').find('.Table2__th').length;

  $('.Table2__tr:not(.cutline)')
    .find('.Table2__td')
    .each((i, row) => {
      let text = $(row).text();
      if (i % len === 0 && arr.length > 0) {
        if (len === 10) {
          leaderboard[arr[1]] = {
            rank: arr[0],
            player: arr[1],
            toPar: arr[2],
            today: arr[3],
            thru: arr[4],
            rd1: arr[5],
            rd2: arr[6],
            rd3: arr[7],
            rd4: arr[8],
            tot: arr[9]
          };
        } else {
          leaderboard[arr[2]] = {
            rank: arr[0],
            change: arr[1],
            player: arr[2],
            toPar: arr[2],
            today: arr[3],
            thru: arr[4],
            rd1: arr[5],
            rd2: arr[6],
            rd3: arr[7],
            rd4: arr[8],
            tot: arr[9]
          };
        }
        arr = [];
      }
      if (!text) {
        text = $(row)
          .find('a')
          .text();
      }
      if (!text) {
        return;
      }
      arr.push(text);
    });

  const getAllContestsByIdQuery = /* GraphQL */ `
    query getAllContestsByEventID($id: ID!) {
      allContests(filter: { events_some: { id: $id } }) {
        id
        entries {
          id
          createdAt
          owner {
            id
            email
          }
          rank
          picks
        }
      }
    }
  `;

  const { allContests } = await connection.query(getAllContestsByIdQuery, {
    id: allEvents[0].id
  });

  const updateEntry = /* GraphQL */ `
    ($id: ID!, $rank: Int) {
      updateEntry(id: $id, rank: $rank) {
        id
      }
    }
  `;

  await Promise.all(
    allContests.map(async contest => {
      const entries = golfRules.topPerformers(leaderboard, contest);
      await Promise.all(
        entries.map(async (entry, idx) => {
          await connection.mutate(updateEntry, {
            id: entry.id,
            rank: idx + 1
          });
        })
      );
    })
  );

  const mutation = /* GraphQL */ `
    ($id: ID!, $leaderboard: Json) {
      updateEvent(id: $id, leaderboard: $leaderboard) {
        id
      }
    }
  `;

  return connection
    .mutate(mutation, {
      id: allEvents[0].id,
      leaderboard
    })
    .then(ret => success('JSON.stringify(ret)', ret));
}
