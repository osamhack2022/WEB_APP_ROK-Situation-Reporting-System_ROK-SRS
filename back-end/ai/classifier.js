import TheClassifier from 'classificator'
import translate from 'translate-google'
import pos from 'pos';


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