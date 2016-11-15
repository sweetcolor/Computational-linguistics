/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * create chart by rank-frequency distribution
 */
function createChart() {
    var text = document.getElementById('input-text').value;
    var words = extractWordsFromText(text);
    var normalizedWords = normalizeWords(words);
    var freq = createFrequencyDict(normalizedWords);
    drawChart(freq);
}

function drawChart(freq) {
    var indexs = [];
    for (var i = 0; i < freq.length; i++) {
        indexs.push(i + 1);
    }
    var ctx = document.getElementById("chart");
    var c = new Chart(ctx, {
        type: 'line',
        data: {
            labels: indexs,
            datasets: [
                {
                    label: "My First dataset",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: "rgba(75,192,192,1)",
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(75,192,192,1)",
                    pointHoverBorderColor: "rgba(220,220,220,1)",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    spanGaps: false,
                    data: freq
                }
            ]
        }
    });
}

function createFrequencyDict(words) {
    var wordsCount = countingEachWords(words);
    var wordsCountGroup = makeWordsCountGroup(wordsCount).sort(compareNumbers);
    return wordsCountGroup;
}

function makeWordsCountGroup(wordsCount) {
    var wordsCountGroup = {};
    var wordsCountGroupArray = [];
    for (var word in wordsCount) {
        if (!wordsCountGroup.hasOwnProperty(wordsCount[word])) {
            wordsCountGroup[wordsCount[word]] = true;
            wordsCountGroupArray.push(Number(wordsCount[word]));
        }
    }
    return wordsCountGroupArray;
}

function compareNumbers(a, b) {
    return b - a;
}

function countingEachWords(words) {
    var wordsCount = {};
    for (var i = 0; i < words.length; i++) {
        var lowCaseWord = words[i].toLowerCase();
        if (wordsCount.hasOwnProperty(lowCaseWord)) {
            wordsCount[lowCaseWord] += 1;
        } else {
            wordsCount[lowCaseWord] = 1;
        }
    }
    return wordsCount;
}

function extractWordsFromText(text) {
    var splitted_text = text.split(/\s/);
    var words_array = [];
    for (var i = 0; i < splitted_text.length; i++) {
        var splittedWord = splitted_text[i]
                .replace(/[.,\/#!$%«»–\^&\*;:{}=?\-_`~()0-9]/g, ' ').split(' ');
        for (var j = 0; j < splittedWord.length; j++) {
            if (splittedWord[j]) {
                words_array.push(splittedWord[j]);
            }
        }
    }
    return words_array;
}

function normalizeWords(words_array) {
    var ends = [
        'иями', 'ьев', 'хим', 'ами', 'ими', 'ыми', 'ьми', 'ями', 'ией',
        'аей', 'еей', 'ьей', 'аем', 'еем', 'ием', 'оем', 'уем', 'яем', 'ьем',
        'ьим', 'иям', 'иях', 'его', 'ого', 'ему', 'ому', 'аом', 'иом', 'оом',
        'ев', 'ов', 'ае', 'ее', 'ие', 'ое', 'ые', 'ье', 'аи', 'еи', 'ии', 'йи',
        'ои', 'ьи', 'ай', 'ей', 'ий', 'ой', 'ый', 'ам', 'ем', 'им', 'ом', 'ым',
        'ям', 'ах', 'их', 'ых', 'ях', 'аю', 'ею', 'ию', 'ою', 'ую', 'юю', 'яю',
        'ью', 'ая', 'ея', 'ия', 'оя', 'ся', 'уя', 'яя', 'ья', 'яй', 'а', 'е',
        'и', 'о', 'у', 'ы', 'ю', 'й', 'я', 'ь'
    ];
    var stopWords = arrayToObject([
        'довольно', 'заведомо', 'например', 'несмотря', 'означает', 'означают',
        'отражена', 'отражено', 'отражены', 'показана', 'показано', 'показаны',
        'согласно', 'вкратце', 'вопреки', 'гораздо', 'касаясь', 'наконец',
        'начиная', 'немного', 'означая', 'описана', 'описано', 'описаны',
        'отнести', 'отражен', 'подобно', 'показан', 'поэтому', 'следует',
        'слишком', 'состоит', 'удается', 'будучи', 'бывает', 'бывают', 'весьма',
        'взамен', 'влечет', 'вместо', 'вообще', 'вплоть', 'вполне', 'всегда',
        'вскоре', 'говоря', 'должен', 'значит', 'именно', 'иногда', 'исходя',
        'крайне', 'кстати', 'найдет', 'наряду', 'насчет', 'нельзя', 'нибудь',
        'однако', 'описан', 'откуда', 'отнюдь', 'отсюда', 'оттого', 'отчего',
        'помимо', 'понять', 'почему', 'прежде', 'притом', 'причем', 'просто',
        'свести', 'сейчас', 'следуя', 'словно', 'смогут', 'сможет', 'смотря',
        'совсем', 'станет', 'станут', 'теперь', 'только', 'будет', 'будто',
        'будут', 'важно', 'ввиду', 'везде', 'взять', 'вновь', 'вовсе', 'войти',
        'возле', 'вроде', 'всего', 'вслед', 'всюду', 'давая', 'дадут', 'далее',
        'делая', 'здесь', 'иметь', 'иначе', 'иного', 'итого', 'когда', 'кроме',
        'между', 'минуя', 'могут', 'может', 'можно', 'носит', 'носят', 'около',
        'опять', 'особо', 'очень', 'почти', 'проще', 'пусть', 'путем', 'ранее',
        'решая', 'скоро', 'снова', 'собой', 'сразу', 'среди', 'стать', 'также',
        'тогда', 'через', 'чьего', 'этого', 'будь', 'быть', 'ведь', 'весь',
        'вряд', 'всех', 'даже', 'дать', 'едва', 'если', 'есть', 'зато', 'зная',
        'идет', 'идти', 'иная', 'иную', 'иные', 'иных', 'итак', 'кого', 'куда',
        'либо', 'лишь', 'мимо', 'него', 'пока', 'ради', 'сюда', 'тоже', 'тому',
        'ходе', 'хотя', 'хуже', 'чаще', 'чего', 'чьим', 'чьих', 'этим', 'этих',
        'этом', 'этот', 'без', 'вне', 'вот', 'всю', 'вся', 'где', 'для', 'его',
        'ему', 'еще', 'зря', 'ибо', 'или', 'илл', 'ими', 'как', 'кем', 'кое',
        'кто', 'мне', 'мог', 'над', 'нас', 'нее', 'ней', 'нет', 'них', 'оба',
        'она', 'они', 'оно', 'под', 'при', 'про', 'сих', 'так', 'там', 'тем',
        'тех', 'той', 'тот', 'тут', 'т.д', 'т.е', 'т.к', 'т.о', 'т.п', 'уже',
        'чей', 'чем', 'что', 'чье', 'чья', 'чью', 'эта', 'эти', 'это', 'эту',
        'бы', 'во', 'да', 'до', 'др', 'ее', 'ей', 'ею', 'же', 'за', 'из', 'им',
        'их', 'ли', 'на', 'не', 'ни', 'но', 'об', 'он', 'от', 'по', 'см', 'со',
        'те', 'то', 'а', 'в', 'и', 'к', 'о', 'с', 'у'
    ]);
    var normalized_words = [];
    for (var i = 0; i < words_array.length; i++) {
        var word = words_array[i];
        if (stopWords.hasOwnProperty(word) || word.length <= 3) {
            normalized_words.push(word);
        } else {
            var basic_word = word;
            for (var j = 0; j < ends.length; j++) {
                var regex = new RegExp(ends[i] + '$', 'i');
                if (word.match(regex) || word.length - ends[j].length > 3) {
                    basic_word = word.slice(0, word.length - ends[j].length - 1);
                }
            }
            normalized_words.push(basic_word);
        }
    }
    return normalized_words;
}

function arrayToObject(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    return obj;
}
