const {welcome, menu} = require('../../src/ivr/handler');
const {
  playFreebird,
  playBakerStreet,
  playLetsGetItOn,
} = require('../../src/call/handler');
const ThanksgivingValidation = 'Thanksgiving%20Advice%20-%20SNL';
const MankindValidation = 'Mankind%20-%20Saturday%20Night%20Live.mp3';

describe('IvrHandler#Welcome', () => {
  it('should serve TwiML with gather', () => {
    const twiml = welcome();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Gather')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML options
    expect(twiml).toContain('action=\"/ivr/menu\"');
    expect(twiml).toContain('numDigits=\"1\"');
    expect(twiml).toContain('loop=\"3\"');

    // TwiML content
    expect(twiml).toContain('Thanks for calling Deep Thoughts.');
  });
});

describe('IvrHandler#Menu', () => {
  it('should redirect to welcomes with digits other than 1 or 2', () => {
    const twiml = menu();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Say')).toBe(2);
    expect(count('Say')).toBe(2);

    // TwiML content
    expect(twiml).toContain('welcome');
  });

  it('should serve TwiML, play Thanksgiving Advice, and hangup', () => {
    const twiml = menu('1');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Play')).toBe(2);
    expect(count('Hangup')).toBe(1);

    // TwiML content
    expect(twiml).toContain(ThanksgivingValidation);
  });

  it('should serve TwiML, play Mankind, and hangup', () => {
    const twiml = menu('2');
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Play')).toBe(2);
    expect(count('Hangup')).toBe(1);

    // TwiML content
    expect(twiml).toContain(MankindValidation);
  });
});

// Validate playFreebird function
describe('CallHandler#playFreebird', () => {
  it('should serve TwiML and play Freebird', () => {
    const twiml = playFreebird();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Play')).toBe(2);

    // TwiML content
    expect(twiml).toContain('free-bird-solo.mp3');
  });
});

// Validate playBakerStreet function
describe('CallHandler#playBakerStreet', () => {
  it('should serve TwiML and play Baker Street', () => {
    const twiml = playBakerStreet();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Play')).toBe(2);

    // TwiML content
    expect(twiml).toContain('baker-street-clip.mp3');
  });
});

// Validate playLetsGetItOn function
describe('CallHandler#playLetsGetItOn', () => {
  it('should serve TwiML and play Lets Get It On', () => {
    const twiml = playLetsGetItOn();
    const count = countWord(twiml);

    // TwiML verbs
    expect(count('Play')).toBe(2);

    // TwiML content
    expect(twiml).toContain('marvin-gaye-lets-get-it-on.mp3');
  });
});

/**
 * Counts how many times a word is repeated
 * @param {String} paragraph
 * @return {String[]}
 */
function countWord(paragraph) {
  return (word) => {
    const regex = new RegExp(`\<${word}[ | \/?\>]|\<\/${word}?\>`);
    return paragraph.split(regex).length - 1;
  };
}
