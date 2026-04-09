import { useState, useCallback } from 'react';
import { CHARACTERS } from '../data/characters';
import { shuffle } from '../utils/shuffle';

function makePlayers(count) {
  return Array.from({ length: count }, (_, i) => ({
    name: `Player ${i + 1}`,
    sequence: [],
    results: [], // 'win' | 'lose' | undefined per round index
  }));
}

export function useIronman() {
  const [playerCount, setPlayerCountState] = useState(2);
  const [players, setPlayers] = useState(() => makePlayers(2));
  const [generated, setGenerated] = useState(false);
  const [round, setRound] = useState(0);

  const setPlayerCount = useCallback((n) => {
    setPlayerCountState(n);
    setPlayers(makePlayers(n));
    setGenerated(false);
    setRound(0);
  }, []);

  const generate = useCallback(() => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, sequence: shuffle(CHARACTERS), results: [] }))
    );
    setGenerated(true);
    setRound(0);
  }, []);

  const reset = useCallback(() => {
    setPlayers((prev) =>
      prev.map((p) => ({ ...p, sequence: [], results: [] }))
    );
    setGenerated(false);
    setRound(0);
  }, []);

  const declareWinner = useCallback(
    (winnerIdx) => {
      setPlayers((prev) =>
        prev.map((p, pi) => {
          const results = [...p.results];
          results[round] = pi === winnerIdx ? 'win' : 'lose';
          return { ...p, results };
        })
      );
      setRound((r) => r + 1);
    },
    [round]
  );

  const undoRound = useCallback(() => {
    if (round <= 0) return;
    const prevRound = round - 1;
    setPlayers((prev) =>
      prev.map((p) => {
        const results = [...p.results];
        delete results[prevRound];
        return { ...p, results };
      })
    );
    setRound(prevRound);
  }, [round]);

  const renamePlayer = useCallback((pi, name) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === pi ? { ...p, name } : p))
    );
  }, []);

  const totalRounds = CHARACTERS.length;
  const isDone = generated && round >= totalRounds;

  const overallLeader = isDone
    ? (() => {
        const wins = players.map((p) => p.results.filter((r) => r === 'win').length);
        const max = Math.max(...wins);
        return { name: players[wins.indexOf(max)].name, wins: max };
      })()
    : null;

  return {
    playerCount,
    setPlayerCount,
    players,
    generated,
    round,
    totalRounds,
    isDone,
    overallLeader,
    generate,
    reset,
    declareWinner,
    undoRound,
    renamePlayer,
  };
}
