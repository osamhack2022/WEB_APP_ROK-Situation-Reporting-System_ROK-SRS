import TheClassifier from 'classificator'
import translate from 'translate-google'
import pos from 'pos';
let positive = [
    'Questions',
    'Suggestions',
    'will there be',
    'dining together',
    'food',
    'Go to work',
    'clean',
    'break the ice',
    `I love tacos.`,
    `Dude, that burrito was epic!`,
    `Holy cow, these nachos are so good and tasty.`,
    `I am drooling over the awesome bean and cheese quesadillas.`
]
var negative = [
  `Suicide`,
  `urgent matter`,
  'emergency situation',
  `dead`,
  'wire',
  `secret`,
  `classified`,
  `attacked`,
  `firearm`,
  `unknown man has appeared`,
  `in front of the guardhouse`,
  `there are suspicious personnel`,
  `in possession of a firearm`,
  `A suspicious person has been found`,
  `a landmine is in front of you`,
  `My unit has been severly hurt`,
  `hail weather snow advisory`,
  `dangerous situation`,
  '5 minute waiting group',
  'North Korean provocation',
  'Missle Launch',
  'ammunition distribution',
  'unusual occurrence',
  `Gross, worst taco ever.`,
  `The buritos gave me horrible diarrhea.`,
  `I'm going to puke if I eat another bad nacho.`,
  `I'd rather die than eat those nasty enchiladas.`,
  'special has happened in the dormitory'
]

async function pos_tokenizer(text) {
    const engtext = await translate(text, {to: 'en'});
    var words = new pos.Lexer().lex(engtext);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    let builtword = ''
    for (let i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        if (tag.includes('N') || tag.includes('V') || tag.includes('A'))
        builtword = builtword + word + " "
    }
    console.log(builtword)
    return builtword
} 