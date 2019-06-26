const getSum = (total, num) => total + Math.round(num);

const topPerformers = (leaderBoard, contest) => {
  const { entries } = contest;
  entries.sort((a, b) => {
    const aScore = a.picks
      .map(player => parseInt(leaderBoard[player].tot, 2))
      .reduce(getSum, 0);
    const bScore = b.picks
      .map(player => parseInt(leaderBoard[player].tot, 2))
      .reduce(getSum, 0);
    return aScore - bScore;
  });
  // return entries.map(({ createdBy }) => createdBy)
  return entries;
};

export default {
  topPerformers,
  getSum
};
