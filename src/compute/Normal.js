import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

export const calculateNormal = (invariant) => {
    return math.cross([1, 1, 1], invariant)
}

export const calculatePlane = (neutralWhite, invariant) => {
    return math.cross(invariant, neutralWhite);
}

export const projectColorOnNormal = (normal, color) => {
    const norm = math.norm(normal)
    if (norm === 0) {
        return [0,0,0];
    }
    if (normal !== undefined && color !== undefined && color.indexOf(NaN) === -1) {
        // ensure both normal and color are in the same color space
        const res = math.dotMultiply((math.dot(color, normal) / math.pow(norm, 2)), normal)
        for (let i=0;i<color.length;i++) {
            color[i] -= res[i];
        }
        return color;
    }
    return [0,0,0];
}

export const projectColorOnNormalForProtanopia = (plane1, plane2, neutralWhite, color) => {
    const normal = getNormalForProtanopia(plane1, plane2, neutralWhite, color)
    color[0] = -(normal[1] * color[1] + normal[2] * color[2]) / normal[0];
    return color;
}

const getNormalForProtanopia = (plane1, plane2, neutralWhite, color) => {
    if (color[1] !== 0 && color[2]/color[1] < neutralWhite[2]/neutralWhite[1]) return plane2;
    return plane1;
}