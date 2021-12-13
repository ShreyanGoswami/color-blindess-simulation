import { all, create } from "mathjs"

const config = {}
const math = create(all, config)

export const calculateNormal = (invariant) => {
    return math.cross([1, 1, 1], invariant)
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