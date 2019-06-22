export const dateFormat = 'MM/DD/YY';

export const apiToReadable = str => str.split(' ');

const golf = [
  {
    name: 'Tiered Pool',
    subtext: 'Lowest Score',
    description:
      'Players are divided into tiers based off world rankings, contestants select one player from each tier lowest score wins',
    value: 'tier'
  },
  {
    name: 'Untiered Pool',
    subtext: 'Lowest Score',
    description: 'Contestants can select any player in the field',
    value: 'untiered'
  },
  {
    name: 'Fantasy Betting',
    subtext: 'Highest Balance',
    description:
      'Contestants are able to place bets using a fixed balance, ranked by final balance',
    value: 'golfFantasyBalance'
  }
];

const basketball = [];

const football = [
  {
    name: "Pick'em",
    subtext: 'Spread',
    description:
      'Players are divided into tiers based off world rankings, contestants select one player from each tier lowest score wins',
    value: 'pickemSpread'
  },
  {
    name: "Pick'em",
    subtext: 'Straight Up',
    description:
      'Players are divided into tiers based off world rankings, contestants select one player from each tier lowest score wins',
    value: 'pickemStraight'
  },
  {
    name: "Pick'em",
    subtext: 'Moneyline',
    description:
      'Players are divided into tiers based off world rankings, contestants select one player from each tier lowest score wins',
    value: 'pickemMoney'
  },
  {
    name: 'Fantasy Betting',
    subtext: 'Highest Balance',
    description:
      'Contestants are able to place bets using a fixed balance, ranked by final balance',
    value: 'golfFantasyBalance'
  }
];

export const scoringFormats = {
  golf,
  basketball,
  football
};

export const payouts = [
  {
    name: 'All To First',
    subtext: 'THE KING',
    description: 'All winnings go to the first place contestant',
    value: 'allToFirst'
  },
  {
    name: '70/30 Split',
    subtext: 'Second to None',
    description: 'The winnings are split between 1st(70%) and 2nd place(30%)',
    value: 'secondToNone'
  },
  {
    name: '70/30 Split, Money Back To Third',
    subtext: 'Gracious Winners',
    description:
      'The winnings are split between 1st(70%) and 2nd place(30%) and 3rd place gets their money back',
    value: 'thirdMoneyBack'
  },
  {
    name: 'Custom',
    subtext: 'Do what feels right',
    description: 'Set up some custom rules',
    value: 'custom'
  }
];

export const OrdinalSuffix = i => {
  const j = i % 10;
  const k = i % 100;
  if (j === 1 && k !== 11) {
    return `${i}st`;
  }
  if (j === 2 && k !== 12) {
    return `${i}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${i}rd`;
  }
  return `${i}th`;
};

export const toProperCase = text =>
  text.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
