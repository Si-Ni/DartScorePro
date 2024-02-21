const filterTranscript = (transcript: string): string => {
  const allowedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", 
                         "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "25"];
  const filteredTranscript = transcript
    .toLowerCase()
    .split(" ")
    .filter((word) => allowedNumbers.includes(word))
    .join(" ");
  return filteredTranscript;
};

export { filterTranscript };
