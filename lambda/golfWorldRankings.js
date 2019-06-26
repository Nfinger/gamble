import axios from 'axios';
import * as cheerio from 'cheerio';
import { connect, success } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function handler() {
  const connection = connect();
  const { data: html } = await axios.get(
    'http://www.owgr.com/ranking?pageNo=1&pageSize=300&country=All'
  );
  const $ = cheerio.load(html);
  const worldRankings = [];
  let currentRow = [];

  const query = /* GraphQL */ `
    query {
      allGolfStatses {
        id
        name
      }
    }
  `;
  const { allGolfStatses } = await connection.query(query);

  $('tr')
    .find('td')
    .each((i, row) => {
      if (i % 11 === 0 && currentRow.length > 0) {
        worldRankings.push({
          thisWeek: parseInt(currentRow[0], 2),
          lastWeek: parseInt(currentRow[1], 2),
          end2018: parseInt(currentRow[2], 2),
          country: currentRow[3],
          name: currentRow[4],
          avgPoints: currentRow[5],
          totalPoints: currentRow[6],
          eventsPlayed: currentRow[7],
          pointsLost: currentRow[8],
          pointsGained: currentRow[9],
          eventsPlayedActual: currentRow[10]
        });
        currentRow = [];
      }
      currentRow.push($(row).text());
    });

  await Promise.all(
    worldRankings.map(async rank => {
      const idx = allGolfStatses.findIndex(({ name }) => name === rank.name);
      const mutation = /* GraphQL */ `(
				$id: ID!
				$name: String
				$thisWeek: Int
				$lastWeek: Int
				$country: String
				$avgPoints: String
				$totalPoints: String
				$eventsPlayed: String
				$pointsLost: String
				$pointsGained: String
				$eventsPlayedActual: String
			) {
				updateOrCreateGolfStats(
					id: $id
					name: $name
					thisWeek: $thisWeek
					lastWeek: $lastWeek
					country: $country
					avgPoints: $avgPoints
					totalPoints: $totalPoints
					eventsPlayed: $eventsPlayed
					pointsLost: $pointsLost
					pointsGained: $pointsGained
					eventsPlayedActual: $eventsPlayedActual
				) {
					id
				}
			}
			`;
      const data = await connection.mutate(mutation, {
        id: (allGolfStatses[idx] && allGolfStatses[idx].id) || null,
        ...rank
      });
      console.log(data);
    })
  );

  return success('Golf World Rankings scraped', {});
}
