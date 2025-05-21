import { getProducersWinners } from "../services/producersService.js";

function generateWinnersIntervals(producerWinners) {
  return Object.entries(producerWinners).flatMap(([producer, years]) => {
    const sortedYears = years.map(Number).sort((a, b) => a - b);

    if (sortedYears.length < 2) return [];

    return sortedYears.slice(1).map((year, idx) => ({
      producer,
      interval: year - sortedYears[idx],
      previousWin: sortedYears[idx],
      followingWin: year,
    }));
  });
}

export async function getWinnersIntervals(req, res) {
  try {
    const winners = await getProducersWinners();

    const producerWins = winners.reduce((acc, winner) => {
      if (!acc[winner.producer]) acc[winner.producer] = [];
      acc[winner.producer].push(winner.year);
      return acc;
    }, {});

    const winnersIntervals = generateWinnersIntervals(producerWins);

    const minInterval = Math.min(...winnersIntervals.map((i) => i.interval));
    const maxInterval = Math.max(...winnersIntervals.map((i) => i.interval));

    res.json({
      min: winnersIntervals.filter((i) => i.interval === minInterval),
      max: winnersIntervals.filter((i) => i.interval === maxInterval),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error calculating intervals." });
  }
}
