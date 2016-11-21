/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function determineWordsZone(wordsWithRank, wordsQuantity) {
    var wordsZoneQuantity = determWordsQuantInEachZone(wordsQuantity);
    return determRankInZone(wordsZoneQuantity, wordsWithRank);
}

function determRankInZone(wordsZoneQuantity, rank) {
    var sum = 0, i = 0, begin = 1;
    var rankCount = 1;
    var rankZone = [];
    for (var key in wordsZoneQuantity) {
        var wordsInZone = wordsZoneQuantity[key];
        sum = 0;
        for (; i < rank.length; i++) {
            sum += rank[i][1];
            if (sum >= wordsInZone) {
                rankZone.push(createRankZone(rankCount++, begin, rank[i][2]));
                begin = rank[i][2];
                i++;
                break;
            }
        }
    }
    if (begin > rank[rank.length - 1][2]) {
        begin = rank[rank.length - 1][2];
    }
    rankZone.push(createRankZone(rankCount, begin, rank[rank.length - 1][2]));
    return rankZone;
}

function createRankZone(cssNameNumber, begin, end) {
    return {
        'cssName': 'zone' + cssNameNumber,
        'begin': begin,
        'end': end
    };
}

function determWordsQuantInEachZone(wordsQuantity) {
    var p1 = 2, p2 = Math.pow(p1, 2), p3 = Math.pow(p1, 3), p4 = Math.pow(p1, 4);
    var sum = p1 + p2 + p3 + p4;
    var multiplier = wordsQuantity / sum;
    var wordsZoneQuantity = {
        'p1': Math.round(p1 * multiplier),
        'p2': Math.round(p2 * multiplier),
        'p3': Math.round(p3 * multiplier),
        'p4': Math.round(p4 * multiplier)
    };
    return wordsZoneQuantity;
}
