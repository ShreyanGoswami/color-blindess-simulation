import { projectColorOnNormal, projectColorOnNormalForProtanopia } from './Normal';
import { all, create } from "mathjs"

const R_OFFSET = 0;
const G_OFFSET = 1;
const B_OFFSET = 2;

const config = {}
const math = create(all, config)

export const convertRGBToLMS = (imgData, h, w) => {
    const RGB2LMS = [[0.31399022, 0.63951294, 0.04649755], [0.15537241, 0.75789446, 0.08670142], [0.01775239, 0.10944209, 0.87256922]]
    const workingCopy = Array.from(imgData)

    // Converts RGB to LMS
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const locationInArray = getIndex(j, i, w)
            const r = removeGamma(workingCopy[locationInArray + R_OFFSET])
            const g = removeGamma(workingCopy[locationInArray + G_OFFSET])
            const b = removeGamma(workingCopy[locationInArray + B_OFFSET])
            const l = RGB2LMS[0][0] * r + RGB2LMS[0][1] * g + RGB2LMS[0][2] * b
            const m = RGB2LMS[1][0] * r + RGB2LMS[1][1] * g + RGB2LMS[1][2] * b
            const s = RGB2LMS[2][0] * r + RGB2LMS[2][1] * g + RGB2LMS[2][2] * b
            workingCopy[locationInArray + R_OFFSET] = l
            workingCopy[locationInArray + G_OFFSET] = m
            workingCopy[locationInArray + B_OFFSET] = s
        }
    }
    return workingCopy
}

/**
 * converts a pixel value in linear RGB to LMS
 * @param {array} pixel 
 */
export const convertSingleRGBToLMS = (pixel) => {
    if (pixel.indexOf(NaN) === -1) {
        const RGB2LMS = [[0.31399022, 0.63951294, 0.04649755], [0.15537241, 0.75789446, 0.08670142], [0.01775239, 0.10944209, 0.87256922]]
        const workingCopy = Array.from(pixel)
        const l = RGB2LMS[0][0] * pixel[0] + RGB2LMS[0][1] * pixel[1] + RGB2LMS[0][2] * pixel[2];
        const m = RGB2LMS[1][0] * pixel[0] + RGB2LMS[1][1] * pixel[1] + RGB2LMS[1][2] * pixel[2];
        const s = RGB2LMS[2][0] * pixel[0] + RGB2LMS[2][1] * pixel[1] + RGB2LMS[2][2] * pixel[2];
        workingCopy[R_OFFSET] = l;
        workingCopy[G_OFFSET] = m;
        workingCopy[B_OFFSET] = s;
        return workingCopy
    }
    return [0,0,0];
}

export const convertLMSToRGB = (imgData, h, w) => {
    const LMS2RGB = [[5.47221206, -4.6419601, 0.16963708], [-1.1252419, 2.29317094, -0.1678952], [0.02980165, -0.19318073, 1.16364789]]
    const workingCopy = Array.from(imgData)
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const locationInArray = getIndex(j, i, w)
            const l = workingCopy[locationInArray + R_OFFSET]
            const m = workingCopy[locationInArray + G_OFFSET]
            const s = workingCopy[locationInArray + B_OFFSET]
            workingCopy[locationInArray + R_OFFSET] = multiplyRowCol(LMS2RGB[0], [l, m, s])
            workingCopy[locationInArray + G_OFFSET] = multiplyRowCol(LMS2RGB[1], [l, m, s])
            workingCopy[locationInArray + B_OFFSET] = multiplyRowCol(LMS2RGB[2], [l, m, s])
        }
    }
    return workingCopy

}

export const convertToRGB = (imgData, h, w) => {
    const workingCopy = Array.from(imgData);
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const locationInArray = getIndex(j, i, w)
            workingCopy[locationInArray + R_OFFSET] = clamp(addGamma(workingCopy[locationInArray + R_OFFSET]));
            workingCopy[locationInArray + G_OFFSET] = clamp(addGamma(workingCopy[locationInArray + G_OFFSET]));
            workingCopy[locationInArray + B_OFFSET] = clamp(addGamma(workingCopy[locationInArray + B_OFFSET]));
        }
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

export const simulateColorBlindness = (imgData, h, w, normal) => {
    // Ensure both image and normal are in LMS space
    const workingCopy = Array.from(imgData)
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const locationInArray = getIndex(j, i, w)
            const l = workingCopy[locationInArray + R_OFFSET]
            const m = workingCopy[locationInArray + G_OFFSET]
            const s = workingCopy[locationInArray + B_OFFSET]
            const res = projectColorOnNormal(normal, [l, m, s]);
            workingCopy[locationInArray + R_OFFSET] = res[0];
            workingCopy[locationInArray + G_OFFSET] = res[1];
            workingCopy[locationInArray + B_OFFSET] = res[2];

        }
    }
    return workingCopy
}

export const simulateProtanopia = (imgData, h, w, plane1, plane2, neutralWhite) => {
    const workingCopy = Array.from(imgData)
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            const locationInArray = getIndex(j, i, w)
            const l = workingCopy[locationInArray + R_OFFSET];
            const m = workingCopy[locationInArray + G_OFFSET];
            const s = workingCopy[locationInArray + B_OFFSET];
            const color = [l,m,s];
            const res = projectColorOnNormalForProtanopia(plane1, plane2, neutralWhite, color);
            workingCopy[locationInArray + R_OFFSET] = res[0]
            workingCopy[locationInArray + G_OFFSET] = res[1]
            workingCopy[locationInArray + B_OFFSET] = res[2]
        }
    }
    return workingCopy
}

const getIndex = (x, y, w) => {
    return (x + y * w) * 4
}