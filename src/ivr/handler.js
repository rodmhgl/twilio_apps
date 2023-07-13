const VoiceResponse = require('twilio').twiml.VoiceResponse;

const Greeting =
  'Thanks for calling Deep Thoughts. ' +
  'For Thanksgiving advice, press 1, ' +
  'For thoughts on mankind, press 2. ' +
  'To hear these options again, press any other key.';
const ThanksgivingAdviceURL =
  'https://www.dropbox.com/s/raw/iukrvju4o50xquq/Deep%20Thoughts%20Thanksgiving%20Advice%20-%20SNL-YoutubeConvert.cc.mp3';
const MankindURL =
  'https://www.dropbox.com/s/raw/i2qty1zb71oqq09/Deep%20Thoughts%EF%BC%9A%20Mankind%20-%20Saturday%20Night%20Live.mp3';

exports.welcome = function welcome() {
  const voiceResponse = new VoiceResponse();

  const gather = voiceResponse.gather({
    action: '/ivr/menu',
    numDigits: '1',
    method: 'POST',
    loop: 3,
  });

  gather.say(Greeting, {
    loop: 3,
    voice: 'Polly.Salli',
    language: 'en-US',
  });

  return voiceResponse.toString();
};

// TODO: Improve data structure and dynamically generate menu
exports.menu = function menu(digit) {
  const optionActions = {
    1: ThanksgivingAdviceURL,
    2: MankindURL,
  };

  return optionActions[digit]
    ? playDeepThought(optionActions[digit])
    : redirectWelcome();
};

/**
 *
 * @param {*} pathToMp3
 * @return {String}
 */
function playDeepThought(pathToMp3) {
  const twiml = new VoiceResponse();
  twiml.play({}, pathToMp3);
  twiml.hangup();

  return twiml.toString();
}

/**
 *
 * @return {String}
 */
function redirectWelcome() {
  const twiml = new VoiceResponse();

  twiml.say('Redirecting to welcome menu.');

  twiml.redirect('/ivr/welcome');

  return twiml.toString();
}
