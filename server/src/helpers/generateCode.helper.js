function generateCode(length = 7) {
  return Math.random().toString(36).substring(2, length);
}

module.exports = generateCode;
