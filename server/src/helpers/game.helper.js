const findPlayerIndexBySocketId = (socketId, players) => {
  const index = players.findIndex((player) => player.socketId === socketId);
  return index;
};

module.exports = findPlayerIndexBySocketId;
