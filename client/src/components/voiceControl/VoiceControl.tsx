import "regenerator-runtime/runtime";
import { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function VoiceControl() {
  const [score, setScore] = useState<string>("");
  const commands = [
    {
      command: "confirm",
      callback: (confirm: any) => {
        setScore(filterTranscript(transcript));
        console.log(`Bestätigtes Ergebnis: ${score}`);
        resetTranscript();
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: "clear",
      callback: ({ resetTranscript }: any) => resetTranscript()
    }
  ];
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  const filterTranscript = (transcript: string): string => {
    const numbers = Array.from({ length: 181 }, (_, index) => index.toString());
    const filteredTranscript = transcript
      .toLowerCase()
      .split(" ")
      .filter((word) => numbers.includes(word))
      .join(" ");
    return filteredTranscript;
  };
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  const startRecognition = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-GB" });
    console.log(`Erkannter Input: ${filterTranscript(transcript)}`);
  };

  return <>{startRecognition()}</>;
}
export default VoiceControl;
