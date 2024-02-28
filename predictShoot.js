const { VecTorMath } = require("./utils");

class RigidBody2D {
    constructor(position, direction, speed) {
        this.position = position;
        const directionVector = VecTorMath.normalizeVector2D(direction)
        this.velocity = VecTorMath.mul(directionVector, speed);
        this.speed = speed;
    }
    move(time) {
        this.position = VecTorMath.add(this.position, VecTorMath.mul(this.velocity, time))
    }
}

class Ballet extends RigidBody2D {
    static speed = 10;
}

class SuperTank extends RigidBody2D {
    getDistanceWithEnermy(enermyTank) {
        let distanceVector = VecTorMath.sub(enermyTank.position, this.position);
        return distanceVector;
    }

    fire(direction, speed) {
        let ballet = new Ballet(this.position, direction, speed);
        return ballet;
    }

    predictBalletCollideTime(enermyTank) {
        let distanceVector = this.getDistanceWithEnermy(enermyTank);
        let convertedEnermyVelocity = VecTorMath.axisAngleChange(enermyTank.velocity, distanceVector);
        console.log("convertedEnermyVelocity", convertedEnermyVelocity)

        let convertedBalletVelocityX = convertedEnermyVelocity.x;
        let convertedBalletVelocityY = Math.sqrt(Ballet.speed * Ballet.speed - convertedBalletVelocityX * convertedBalletVelocityX);
        let predictTime = VecTorMath.getLength(distanceVector) / (convertedBalletVelocityY - convertedEnermyVelocity.y)
        return predictTime;
    }
}

const predictBalletCollideTime = (initDatas) => {
    const myTank = new SuperTank(initDatas.myTank.position, initDatas.myTank.direction, initDatas.myTank.speed);
    const enermyTank = new SuperTank(initDatas.enermyTank.position, initDatas.enermyTank.direction, initDatas.enermyTank.speed);
    const predictTime = myTank.predictBalletCollideTime(enermyTank);
    console.log("predictTime", predictTime)

    // back test
    enermyTank.move(predictTime);
    let distanceWithCollision = VecTorMath.sub(enermyTank.position, myTank.position);
    let timeForBalletToCollition = VecTorMath.getLength(distanceWithCollision) / Ballet.speed;
    console.log("timeForBalletToCollition", timeForBalletToCollition)
}

var initDatas = {
    myTank: {
        position: { x: 0, y: 0 },
        speed: 7,
        direction: { x: 1, y: 1 }
    },
    enermyTank: {
        position: { x: 0, y: 10 },
        direction: { x: 0, y: 10 },
        speed: 7
    }
}
predictBalletCollideTime(initDatas)

var initDatas = {
    myTank: {
        position: { x: 0, y: 0 },
        speed: 7,
        direction: { x: 1, y: 1 }
    },
    enermyTank: {
        position: { x: 5, y: 2000 },
        direction: { x: 5, y: 30 },
        speed: 7
    }
}
predictBalletCollideTime(initDatas)

