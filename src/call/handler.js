const VoiceResponse = require('twilio').twiml.VoiceResponse;

const pathToFreebird =
  'https://www.dropbox.com/s/raw/a581xc0ub8aolfo/free-bird-solo.mp3';

const pathToLetsGetItOn =
  'https://www.dropbox.com/s/raw/fl1p1efkkmmhpro/marvin-gaye-lets-get-it-on.mp3';

const pathToBakerStreet =
  'https://www.dropbox.com/s/raw/7rhdgyxb4qpdaa5/baker-street-clip.mp3';

exports.playFreebird = function playFreebird() {
  return playMp3(pathToFreebird);
};

exports.playLetsGetItOn = function playLetsGetItOn() {
  return playMp3(pathToLetsGetItOn);
};

exports.playBakerStreet = function playBakerStreet() {
  return playMp3(pathToBakerStreet);
};

/**
 *
 * @param {string} pathToMp3
 * @return {string} TwiML
 */
function playMp3(pathToMp3) {
  const twiml = new VoiceResponse();
  twiml.play({}, pathToMp3);
  return twiml.toString();
};
