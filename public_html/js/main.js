/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 * create chart by rank-frequency distribution
 */
function createChart () {
    var text = document.getElementById('input-text').value;
    var words = extractWordsFromText(text);
    var normalizedWords = normalizeWords(words);
    var freq = createFrequencyDict(normalizedWords);
    drawChart(freq);
}

function createFrequencyDict (words) {
    var wordsCount = countingEachWords(words);
    var wordsWithRank = sortProperties(wordsCount);
    renderTable(wordsWithRank);
    var wordsCountGroup = makeWordsCountGroup(wordsCount).sort(compareNumbers);
    return wordsCountGroup;
}

function makeWordsCountGroup (wordsCount) {
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

function compareNumbers (a, b) {
    return b - a;
}

function countingEachWords (words) {
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
