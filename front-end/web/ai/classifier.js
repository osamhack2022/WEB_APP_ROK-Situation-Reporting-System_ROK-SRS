import {TheClassifier} from "classificator";
import {Translator} from "nodepapago";
import {posTagger} from "wink-pos-tagger";

var classifier = new TheClassifier()
var tagger = posTagger();

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
// classifier.addDocuments(positive, 'positive')
// classifier.addDocuments(negative, 'negative')

// classifier.train()

for (let i = 0; i < positive.length; i++) {
    classifier.learn(positive[i], 'positive')
}
for (let i = 0; i < negative.length; i++) {
    classifier.learn(negative[i], 'negative')
}

export async function Getseverityscore(text) {
    let ko_to_en_translated = ""
    let translator = new Translator.Translator({
        parameter: {
            source: 'ko',
            target: 'en',
            text: text
        }
    })
    try {
        ko_to_en_translated = await translator.translate()
    } catch {
        return 2
    }
    var words = tagger.tagSentence(ko_to_en_translated);
    let parsedtext = ''
    for (let i in words) {
        var taggedWord = words[i].value;
        var tag = words[i].pos;
        if (tag.includes('N') || tag.includes('V') || tag.includes('A'))
            parsedtext = parsedtext + taggedWord + " "
    }
    let classifieddata = classifier.categorize(parsedtext)
    let score = classifieddata['likelihoods'][0]['proba']
    if (score >= 0.95) {
        return 5
    } else if (score >= 0.85) {
        return 4
    } else if (score >= 0.65) {
        return 3
    } else if (score >= 0.4) {
        return 2
    } else {
        return 1
    }
}
//let { val } = await getScore('위병소 앞 총기를 든 거수자들이 나타났습니다. 자살하고싶어')
