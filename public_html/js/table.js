function renderTable(wordsWithRank) {
    var tbody = document.getElementById('tbody-rank');
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    wordsWithRank.forEach(function (wordArr) {
        var tr = document.createElement('tr');
        for (var i = 0; i < wordArr.length; i++) {
            var td = document.createElement('td');
            td.innerHTML = wordArr[i];
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    });
}


function getWordsWithRank(wordsCount) {
    var sortable = [];
    for (var key in wordsCount)
        if (wordsCount.hasOwnProperty(key))
            sortable.push([key, wordsCount[key]]);

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    var rank = 1;
    return sortable.map(function (word, i, arr) {
        if (i === 0) {
            word.push(rank);
            return word;
        } else if (word[1] === arr[i - 1][1]) {
            word.push(arr[i - 1][2]);
            return word;
        } else {
            rank++;
            word.push(rank);
            return word;
        }
    });
}
