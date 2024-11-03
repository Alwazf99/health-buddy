import Tts from 'react-native-tts';

export const initializeTtsListeners = async () => {
  Tts.getInitStatus().then(
    () => {
      console.log('ALL OK TTS');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('NO ENGINE TTS');
        Tts.requestInstallEngine();
      }
    },
  );

  // Tts.setDefaultRate(0.1, true);
  Tts.setIgnoreSilentSwitch('ignore');
  //Tts.setDefaultPitch(0.7);

  Tts.addEventListener('tts-start', event => {
    console.log('TTS Started: ', event);
  });

  Tts.addEventListener('tts-progress', event => {
    //console.log('TTS in Progress: ', event);
  });

  Tts.addEventListener('tts-finish', event => {
    console.log('TTS Finished: ', event);
  });

  Tts.addEventListener('tts-cancel', event => {
    console.log('TTS Cancelled: ', event);
  });
};

export const playTTS = async (message: string) => {
  Tts.getInitStatus().then(
    () => {
      console.log('ALL OK TTS');
    },
    err => {
      if (err.code === 'no_engine') {
        console.log('NO ENGINE TTS');
        Tts.requestInstallEngine();
      }
    },
  );

  Tts.speak(message);
};
