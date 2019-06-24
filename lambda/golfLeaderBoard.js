import axios from 'axios';
import * as cheerio from 'cheerio';
import { connect, success } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function handler() {
  const connection = connect();

  const html = await axios.get('http://www.espn.com/golf/leaderboard');
  const $ = cheerio.load(html);
  const leaderboard = {};
  const title = $('.headline__h1').text();

  const query = /* GraphQL */ `
    query getEvent($name: String) {
      allEvents(filter: { name_eq: $name }) {
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

  const mutation = /* GraphQL */ `
    mutation updateEvent($id: ID!, $leaderboard: Json) {
      updateEvent(id: $id, leaderboard: $leaderboard) {
        id
      }
    }
  `;

  const data = await connection.mutate(mutation, {
    id: allEvents[0].id,
    leaderboard
  });

  return success('Golf Leaderboard Scraped', data);
}
