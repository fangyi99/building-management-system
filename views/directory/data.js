// with streaming plugin
const ctx1 = document.getElementById("lift-reading").getContext("2d");
const lift = new Chart(ctx1, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
                label: "air quality",
                data: [],
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 1,
            },
            {
                label: "CO2",
                data: [],
                backgroundColor: "transparent",
                borderColor: "orange",
                borderWidth: 1,
            },
            {
                label: "light",
                data: [],
                backgroundColor: "transparent",
                borderColor: "indigo",
                borderWidth: 1,
            },
            {
                label: "temperature",
                data: [],
                backgroundColor: "transparent",
                borderColor: "green",
                borderWidth: 1,
            },
        ],
    },
    options: {
        elements: {
            line: {
                tension: 0,
            },
        },
        scales: {
            x: {
                type: "realtime",
                realtime: {
                    duration: 20000, //20sec
                    delay: 2000,
                    onRefresh: (chart) => {
                        chart.data.datasets.forEach((dataset) => {
                            dataset.data.push({
                                x: Date.now(),
                                y: Math.random() * 10,
                            });
                        });
                    },
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                },
            },
        },
    },
});

const ctx2 = document
    .getElementById("innov-makerspace-reading")
    .getContext("2d");
const innovMakerspace = new Chart(ctx2, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
                label: "air quality",
                data: [],
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 1,
            },
            {
                label: "CO2",
                data: [],
                backgroundColor: "transparent",
                borderColor: "orange",
                borderWidth: 1,
            },
            {
                label: "light",
                data: [],
                backgroundColor: "transparent",
                borderColor: "indigo",
                borderWidth: 1,
            },
            {
                label: "temperature",
                data: [],
                backgroundColor: "transparent",
                borderColor: "green",
                borderWidth: 1,
            },
        ],
    },
    options: {
        elements: {
            line: {
                tension: 0,
            },
        },
        scales: {
            x: {
                type: "realtime",
                realtime: {
                    duration: 20000, //20sec
                    delay: 2000,
                    onRefresh: (chart) => {
                        chart.data.datasets.forEach((dataset) => {
                            dataset.data.push({
                                x: Date.now(),
                                y: Math.random() * 10,
                            });
                        });
                    },
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                },
            },
        },
    },
});

const ctx3 = document.getElementById("innov-lab-reading").getContext("2d");
const innovLab = new Chart(ctx3, {
    type: "line",
    data: {
        labels: [],
        datasets: [{
                label: "air quality",
                data: [],
                backgroundColor: "transparent",
                borderColor: "red",
                borderWidth: 1,
            },
            {
                label: "CO2",
                data: [],
                backgroundColor: "transparent",
                borderColor: "orange",
                borderWidth: 1,
            },
            {
                label: "light",
                data: [],
                backgroundColor: "transparent",
                borderColor: "indigo",
                borderWidth: 1,
            },
            {
                label: "temperature",
                data: [],
                backgroundColor: "transparent",
                borderColor: "green",
                borderWidth: 1,
            },
        ],
    },
    options: {
        elements: {
            line: {
                tension: 0,
            },
        },
        scales: {
            x: {
                type: "realtime",
                realtime: {
                    duration: 20000, //20sec
                    delay: 2000,
                    onRefresh: (chart) => {
                        chart.data.datasets.forEach((dataset) => {
                            dataset.data.push({
                                x: Date.now(),
                                y: Math.random() * 10,
                            });
                        });
                    },
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    boxWidth: 6,
                },
            },
        },
    },
});