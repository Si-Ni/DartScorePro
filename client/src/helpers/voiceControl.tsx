
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const filterTranscript = (transcript: string): string => {
  const numbers = Array.from({ length: 181 }, (_, index) => index.toString());
  const filteredTranscript = transcript
    .toLowerCase()
    .split(" ")
    .filter(word => numbers.includes(word))
    .join(" ");
  return filteredTranscript;
}

let score = ""
function startRecognition() {
  const commands = [
    {
      command: 'confirm',
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      callback: (confirm: string) => {
        score = filterTranscript(transcript)
        console.log(`Bestätigtes Ergebnis: ${score}`)
        resetTranscript()
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.2
    },
    {
      command: 'clear',
      callback: ({ resetTranscript }: any) => resetTranscript(),
    }
  ]
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useSpeechRecognition( {commands} );
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }
  SpeechRecognition.startListening({continuous: true, language: 'en-GB', })
  console.log(`Erkannter Input: ${filterTranscript(transcript)}`)
}

function stopRecognition() {
  SpeechRecognition.stopListening();
}


export { startRecognition, stopRecognition, score };