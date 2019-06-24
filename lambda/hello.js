import { connect, success } from '../utils';

// eslint-disable-next-line import/prefer-default-export
export async function handler() {
  const connection = connect();

  const query = /* GraphQL */ `
    query {
      allLeagues {
        id
      }
    }
  `;

  const data = await connection.request(query);

  return success(data);
}
