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
    var sum = 0, i = 0;
    var rankZone = [];
    for (var key in wordsZoneQuantity) {
        var wordsInZone = wordsZoneQuantity[key];
        sum = 0;
        for (; i < rank.length; i++) {
            sum += rank[i][1];
            if (sum >= wordsInZone) {
                rankZone.push(rank[i][2]);
                i++;
                break;
            }
        }
    }
    return rankZone;
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
