/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function drawChart(freq, rankZones) {
    var indexs = [];
    for (var i = 0; i < freq.length; i++) {
        indexs.push(i + 1);
    }
    var series = createSeriesData(freq, rankZones);
    createChartObject(indexs, series);
}
;

function createChartObject(indexs, series) {
    var newChart;
    newChart = (function () {
        if (newChart) {
            newChart.destroy();
        }
        return new Chartist.Line('.ct-chart', {
            labels: indexs,
            series: series
        }, {
            fullWidth: true,
            chartPadding: {
                right: 10
            },
            low: 0,
            showArea: true
        });
    })();
}
;

function createSeriesData(freq, rankZones) {
    var series = [];
    for (var i = 0; i < rankZones.length; i++) {
        var zone = rankZones[i];
        var data = new Array(freq.length);
        for (var j = zone.begin; j <= zone.end; j++) {
            data[j - 1] = freq[j - 1];
        }
        series.push({
            'name': zone.cssName,
            'data': data,
            'meta': data
        });
    }
    return series;
}
;
