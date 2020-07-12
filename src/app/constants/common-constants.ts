export const CHART_OPTIONS = {
    responsive: true,
    elements: {
        line: {
            tension: 0
        }
    },
    scales: {
        yAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'Votes'
            }
        }],
        xAxes: [{
            scaleLabel: {
                display: true,
                labelString: 'ID'
            }
        }]
    }
};

export const DAYS_DIFF_TIME = 86400000;
export const HOURS_DIFF_TIME = 3600000;
export const MINUTES_DIFF_TIME = 60000;
export const MIN_DIFF_VALUE = 60000;

