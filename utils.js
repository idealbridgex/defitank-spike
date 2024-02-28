
const VecTorMath = {
    add: (vec1, vec2) => {
        return { x: vec1.x + vec2.x, y: vec1.y + vec2.y };
    },
    sub: (vec1, vec2) => {
        return { x: vec1.x - vec2.x, y: vec1.y - vec2.y };
    },
    mul: (vec1, num) => {
        return { x: vec1.x * num, y: vec1.y * num };
    },
    normalizeVector2D: (vec) => {
        let length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
        return { x: vec.x / length, y: vec.y / length };
    },
    getLength: (vec) => {
        return Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    },
    axisAngleChange: (vec, axisVec) => {
        let cosAngle = axisVec.x / VecTorMath.getLength(axisVec);
        let sinAngle = axisVec.y / VecTorMath.getLength(axisVec);
        return {
            x: vec.y * cosAngle - vec.x * sinAngle,
            y: vec.x * cosAngle + vec.y * sinAngle
        }
    }
}

module.exports = { VecTorMath }