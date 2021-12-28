import { projectColorOnNormalForProtanopia } from './Normal';
import { all, create } from "mathjs"

const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;
const SAMPLING_SIZE = 3000;

const config = {}
const math = create(all, config)

export const convertRGBToLMS = (imgData, isGraphDataRequired = true) => {
    const RGB2LMS = [[0.31399022, 0.63951294, 0.04649755], [0.15537241, 0.75789446, 0.08670142], [0.01775239, 0.10944209, 0.87256922]]
    const workingCopy = Array.from(imgData)

    const L = []
    const M = []
    const S = []

    // Converts RGB to LMS
    const l = workingCopy.length;
    let i = 0;
    while (i < l) {
        const locationInArray = i;
        const r = removeGamma(workingCopy[locationInArray + R_OFFSET]);
        const g = removeGamma(workingCopy[locationInArray + G_OFFSET]);
        const b = removeGamma(workingCopy[locationInArray + B_OFFSET]);
        const l = RGB2LMS[0][0] * r + RGB2LMS[0][1] * g + RGB2LMS[0][2] * b;
        const m = RGB2LMS[1][0] * r + RGB2LMS[1][1] * g + RGB2LMS[1][2] * b;
        const s = RGB2LMS[2][0] * r + RGB2LMS[2][1] * g + RGB2LMS[2][2] * b;
        workingCopy[locationInArray + R_OFFSET] = l;
        workingCopy[locationInArray + G_OFFSET] = m;
        workingCopy[locationInArray + B_OFFSET] = s;
        if (isGraphDataRequired === true && i % SAMPLING_SIZE === 0) {
            L.push(l);
            M.push(m);
            S.push(s);
        }
        i += 4;
    }
    if (isGraphDataRequired === true)
        return [workingCopy, L, M, S];
    return workingCopy;
}

export const convertLMSToRGB = (imgData, h, w) => {
    const LMS2RGB = [[5.47221206, -4.6419601, 0.16963708], [-1.1252419, 2.29317094, -0.1678952], [0.02980165, -0.19318073, 1.16364789]]
    const workingCopy = Array.from(imgData);
    let i = 0;
    const l = imgData.length;
    while (i < l) {
        const l = workingCopy[i + R_OFFSET]
        const m = workingCopy[i + G_OFFSET]
        const s = workingCopy[i + B_OFFSET]
        workingCopy[i + R_OFFSET] = multiplyRowCol(LMS2RGB[0], [l, m, s])
        workingCopy[i + G_OFFSET] = multiplyRowCol(LMS2RGB[1], [l, m, s])
        workingCopy[i + B_OFFSET] = multiplyRowCol(LMS2RGB[2], [l, m, s])
        i += 4;
    }
    return workingCopy

}

export const convertToRGB = (imgData, h, w) => {
    const workingCopy = Array.from(imgData);
    let i = 0;
    const l = imgData.length;
    while (i < l) {
        workingCopy[i + R_OFFSET] = clamp(addGamma(workingCopy[i + R_OFFSET]));
        workingCopy[i + G_OFFSET] = clamp(addGamma(workingCopy[i + G_OFFSET]));
        workingCopy[i + B_OFFSET] = clamp(addGamma(workingCopy[i + B_OFFSET]));
        i += 4;
    }
    return workingCopy;
}

const clamp = (v) => {
    if (v > 255) return 255;
    return v;
}

const multiplyRowCol = (row, col) => {
    return math.dot(row, col);
}

export const removeGamma = (c) => {
    // will convert to a value between 0 and 1
    if (c <= 0.04045 * 255) {
        return c / (255 * 12.92);
    }
    return math.pow((((c / 255) + 0.055) / 1.055), 2.4)
}

const addGamma = (c) => {
    // will convert to a value between 0 and 255
    if (c <= 0.0031308) {
        return 255 * (12.92 * c)
    }
    return 255 * (1.055 * math.pow(c, 0.4167) - 0.055)
}

export const simulateProtanopia = (imgData, h, w, plane1, plane2, neutralWhite, isGraphDataRequired=true) => {
    const workingCopy = Array.from(imgData)

    const L = [];
    const M = [];
    const S = [];
    const l = workingCopy.length;
    let i = 0;
    while (i < l) {
        const l = workingCopy[i + R_OFFSET];
        const m = workingCopy[i + G_OFFSET];
        const s = workingCopy[i + B_OFFSET];
        const res = projectColorOnNormalForProtanopia(plane1, plane2, neutralWhite, [l, m, s]);
        workingCopy[i + R_OFFSET] = res[0]
        workingCopy[i + G_OFFSET] = res[1]
        workingCopy[i + B_OFFSET] = res[2]
        if (isGraphDataRequired === true && i % SAMPLING_SIZE === 0) {
            L.push(res[0]);
            M.push(res[1]);
            S.push(res[2]);
        }
        i += 4;
    }
    if (isGraphDataRequired === true)
        return [workingCopy, L, M, S];
    return workingCopy;
}