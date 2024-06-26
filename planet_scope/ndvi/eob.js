//VERSION=3
//PlanetScope NDVI EO Browser

function setup() {
    return {
        input: [
            {
                bands: ["red", "nir", "dataMask", "clear"],
            },
        ],
        output: [
            { id: "default", bands: 4 },
            { id: "index", bands: 1, sampleType: "FLOAT32" },
            { id: "eobrowserStats", bands: 2, sampleType: "FLOAT32" },
            { id: "dataMask", bands: 1 },
        ],
    };
}

function evaluatePixel(sample) {
    let ndvi = index(sample.nir, sample.red);
    const clear = sample.dataMask && sample.clear;

    let ndvi_colored = colorBlend(
        ndvi,
        [0.0, 0.5, 1.0],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0.1, 0.31, 0],
        ]
    );

    return {
        default: [...ndvi_colored, clear],
        index: [ndvi],
        eobrowserStats: [ndvi, +!clear],
        dataMask: [sample.dataMask],
    };
}
