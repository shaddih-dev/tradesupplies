import { Box3, BoxGeometry, EllipseCurve, ExtrudeGeometry, Line3, MathUtils, Shape, ShapeGeometry, Vector2, Vector3 } from "three"
import { SCALE_3D } from "../constants"
import { intersect } from "mathjs"
import _ from "lodash"
import { Matrix4 } from "three"

export const getStandardPanel = (
    panelWidth, 
    panelHeight, 
    panelRadius, 
    thickness,
    position = new Vector3(0, 0, 0),
    corner = {
        tl: true,
        tr: false,
        bl: true,
        br: true
    }
) => {
    if(panelRadius == 0) {
        const geo = new BoxGeometry(panelWidth * SCALE_3D, panelHeight * SCALE_3D, thickness)
        geo.translate(0, 0, thickness / 2)
        geo.translate(position.x, position.y, position.z)
        return geo
    } else {
        const radius = panelRadius * SCALE_3D
        const width3d = panelWidth * SCALE_3D
        const height3d = panelHeight * SCALE_3D

        const pointTTL = new Vector3(- width3d / 2 + radius, height3d / 2, 0)
        const pointTBL = new Vector3(- width3d / 2, height3d / 2 - radius, 0)

        const pointTTR = new Vector3(width3d / 2 - radius, height3d / 2, 0)
        const pointTBR = new Vector3(width3d / 2, height3d / 2 - radius, 0)

        const pointBTL = new Vector3(- width3d / 2, - height3d / 2 + radius, 0)
        const pointBBL = new Vector3(- width3d / 2 + radius, - height3d / 2, 0)

        const pointBTR = new Vector3(width3d / 2, - height3d / 2 + radius, 0)
        const pointBBR = new Vector3(width3d / 2 - radius, - height3d / 2, 0)

        const curveTL = new EllipseCurve(
            pointTTL.x,  pointTBL.y,             // ax, aY
            radius, radius,                      // xRadius, yRadius
            Math.PI / 2,  Math.PI,               // aStartAngle, aEndAngle
            false,                               // aClockwise
            0                                    // aRotation
        );

        const pointTLs = !corner.tl ? [new Vector3(- width3d / 2, height3d / 2, 0)] : curveTL.getPoints(50)

        const curveBL = new EllipseCurve(
            pointBBL.x,  pointBTL.y,             // ax, aY
            radius, radius,                      // xRadius, yRadius
            Math.PI,  Math.PI * 3 / 2,           // aStartAngle, aEndAngle
            false,                               // aClockwise
            0                                    // aRotation
        );

        const pointBLs = !corner.bl ? [new Vector3(- width3d / 2, - height3d / 2, 0)] :  curveBL.getPoints(50)

        const curveBR = new EllipseCurve(
            pointBBR.x,  pointBTR.y,             // ax, aY
            radius, radius,                      // xRadius, yRadius
            Math.PI * 3 / 2,  2 * Math.PI,           // aStartAngle, aEndAngle
            false,                               // aClockwise
            0                                    // aRotation
        );

        const pointBRs = !corner.br ? [new Vector3(width3d / 2, - height3d / 2, 0)] :  curveBR.getPoints(50)

        const curveTR = new EllipseCurve(
            pointTTR.x,  pointTBR.y,             // ax, aY
            radius, radius,                      // xRadius, yRadius
            0,  Math.PI / 2,                     // aStartAngle, aEndAngle
            false,                               // aClockwise
            0                                    // aRotation
        );

        const pointTRs = !corner.tr ? [new Vector3(width3d / 2, height3d / 2, 0)] :  curveTR.getPoints(50)

        const points = [pointTTL, ...pointTLs, pointTBL, pointBTL, ...pointBLs,  pointBBL, pointBBR, ...pointBRs, pointBTR, pointTBR, ...pointTRs, pointTTR]

        const shape = new Shape();
        shape.setFromPoints([...points, points[0]])

        const extrudeSettings = {
            steps: 1,
            depth: thickness,
            bevelEnabled: true,
            bevelThickness: 0,
            bevelSize: 0,
            bevelOffset: 0,
            bevelSegments: 0
          };
        const geometry = new ExtrudeGeometry( shape, extrudeSettings );
        geometry.translate(position.x, position.y, position.z)
        return geometry
    }
}

export const getDomTopSignPanel = (
    panelWidth, 
    panelHeight, 
    panelRadius, 
    thickness,
    position = new Vector3(0, 0, 0),
    corner = {
        tl: true,
        tr: false,
        bl: true,
        br: true
    }
) => {
    const radius = panelRadius * SCALE_3D
    const width3d = panelWidth * SCALE_3D
    const height3d = panelHeight * SCALE_3D

    const pointBTL = new Vector3(- width3d / 2, - height3d / 2 + radius, 0)
    const pointBBL = new Vector3(- width3d / 2 + radius, - height3d / 2, 0)

    const pointBTR = new Vector3(width3d / 2, - height3d / 2 + radius, 0)
    const pointBBR = new Vector3(width3d / 2 - radius, - height3d / 2, 0)

    const pointTL = new Vector3(- width3d / 2, height3d / 2, 0)
    const pointTR = new Vector3(width3d / 2, height3d / 2, 0)

    const curveBL = new EllipseCurve(
        pointBBL.x,  pointBTL.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI,  Math.PI * 3 / 2,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointBLs = (!corner.bl || radius == 0) ? [new Vector3(- width3d / 2, - height3d / 2, 0)] :  curveBL.getPoints(50)

    const curveBR = new EllipseCurve(
        pointBBR.x,  pointBTR.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI * 3 / 2,  2 * Math.PI,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointBRs = (!corner.br || radius == 0) ? [new Vector3(width3d / 2, - height3d / 2, 0)] :  curveBR.getPoints(50)

    const curveDom = new EllipseCurve(
        0,  pointTL.y,                       // ax, aY
        width3d / 2, width3d / 2,                      // xRadius, yRadius
        0,  Math.PI,                         // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const domPoints = curveDom.getPoints(100)

    const points = [
        pointTL, 
        pointBTL, 
        ...pointBLs,  
        pointBBL, 
        pointBBR, 
        ...pointBRs, 
        pointBTR, 
        pointTR,
        ...domPoints
    ]

    const shape = new Shape();
    shape.setFromPoints([...points, points[0]])

    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
        };
    const geometry = new ExtrudeGeometry( shape, extrudeSettings );
    geometry.translate(position.x, position.y, position.z)
    return geometry
}

export const getCathedralSignPanel = (
    panelWidth, 
    panelHeight, 
    panelRadius, 
    thickness,
    position = new Vector3(0, 0, 0),
    corner = {
        tl: true,
        tr: false,
        bl: true,
        br: true
    }
) => {
    const radius = panelRadius * SCALE_3D
    const width3d = panelWidth * SCALE_3D
    const height3d = panelHeight * SCALE_3D

    const pointTTL = new Vector3(- width3d / 2 + radius, height3d / 2, 0)
    const pointTBL = new Vector3(- width3d / 2, height3d / 2 - radius, 0)

    const pointTTR = new Vector3(width3d / 2 - radius, height3d / 2, 0)
    const pointTBR = new Vector3(width3d / 2, height3d / 2 - radius, 0)

    const pointBTL = new Vector3(- width3d / 2, - height3d / 2 + radius, 0)
    const pointBBL = new Vector3(- width3d / 2 + radius, - height3d / 2, 0)

    const pointBTR = new Vector3(width3d / 2, - height3d / 2 + radius, 0)
    const pointBBR = new Vector3(width3d / 2 - radius, - height3d / 2, 0)

    const pointCenterTL = new Vector3(- width3d / 2 + width3d / 4, height3d / 2, 0)
    const pointCenterTR = new Vector3(width3d / 2 - width3d / 4, height3d / 2, 0)

    const curveTL = new EllipseCurve(
        pointTTL.x,  pointTBL.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI / 2,  Math.PI,               // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointTLs = (!corner.tl || radius == 0) ? [new Vector3(- width3d / 2, height3d / 2, 0)] : curveTL.getPoints(50)

    const curveBL = new EllipseCurve(
        pointBBL.x,  pointBTL.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI,  Math.PI * 3 / 2,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointBLs = (!corner.bl || radius == 0) ? [new Vector3(- width3d / 2, - height3d / 2, 0)] :  curveBL.getPoints(50)

    const curveBR = new EllipseCurve(
        pointBBR.x,  pointBTR.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI * 3 / 2,  2 * Math.PI,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointBRs = (!corner.br || radius == 0) ? [new Vector3(width3d / 2, - height3d / 2, 0)] :  curveBR.getPoints(50)

    const curveTR = new EllipseCurve(
        pointTTR.x,  pointTBR.y,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        0,  Math.PI / 2,                     // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const pointTRs = (!corner.tr || radius == 0) ? [new Vector3(width3d / 2, height3d / 2, 0)] :  curveTR.getPoints(50)

    const curveDom = new EllipseCurve(
        0,  pointCenterTL.y,                 // ax, aY
        width3d / 4, width3d / 8,            // xRadius, yRadius
        0,  Math.PI,                         // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const domPoints = curveDom.getPoints(100)

    const points = [
        pointTTL, 
        ...pointTLs, 
        pointTBL, 
        pointBTL, 
        ...pointBLs,  
        pointBBL, 
        pointBBR, 
        ...pointBRs, 
        pointBTR, 
        pointTBR, 
        ...pointTRs, 
        pointTTR,
        pointCenterTR,
        ...domPoints,
        pointCenterTL
    ]

    const shape = new Shape();
    shape.setFromPoints([...points, points[0]])

    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    };
    const geometry = new ExtrudeGeometry( shape, extrudeSettings );
    geometry.translate(position.x, position.y, position.z)
    return geometry
}

export const getCircleSignPolygon = (
    panelWidth
) => {
    const width3d = panelWidth * SCALE_3D
    const curveDom = new EllipseCurve(
        0,  0,                               // ax, aY
        width3d / 2, width3d / 2,            // xRadius, yRadius
        0,  2 * Math.PI,                     // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const points = curveDom.getPoints(100)

    const allPoints = [...points, points[0]].map(el => new Vector3(el.x, el.y, 0));
    const box = new Box3();
    box.setFromPoints(allPoints);
    const size = box.getSize(new Vector3());

    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelWidth/size.y* SCALE_3D, 1
    )

    allPoints.forEach((point) => {
        point.applyMatrix4(scaleMatrix);
    })

    return allPoints;
}

export const getCircleSignPanel = (
    panelWidth, 
    thickness,
    position = new Vector3(0, 0, 0)
) => {
    const width3d = panelWidth * SCALE_3D
    const curveDom = new EllipseCurve(
        0,  0,                               // ax, aY
        width3d / 2, width3d / 2,            // xRadius, yRadius
        0,  2 * Math.PI,                     // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );

    const points = curveDom.getPoints(100)

    const shape = new Shape();
    shape.setFromPoints([...points, points[0]])

    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    };
    const geometry = new ExtrudeGeometry( shape, extrudeSettings );
    geometry.translate(position.x, position.y, position.z);
    geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new Vector3());
    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelWidth/size.y* SCALE_3D, 1
    )
    geometry.applyMatrix4(scaleMatrix);
    geometry.computeBoundingBox();
    geometry.center()

    return geometry
}

export const getTrianglePolygon = (
    panelWidth,
    panelHeight
) => {
    const width3d = (panelHeight / Math.tan(Math.PI / 3) * 2) * SCALE_3D
    const height3d = panelHeight * SCALE_3D
    const radius = 20 * SCALE_3D

    const curveTop = new EllipseCurve(
        0,  height3d / 2 - radius / Math.sin(Math.PI / 6),             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI / 2 - Math.PI / 3,  Math.PI / 2 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const curveLeft = new EllipseCurve(
        -width3d / 2 + radius * Math.tan(Math.PI / 3),  - height3d / 2 + radius,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI + Math.PI / 6 - Math.PI / 3,  Math.PI + Math.PI / 6 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const curveRight = new EllipseCurve(
        width3d / 2 - radius * Math.tan(Math.PI / 3),  - height3d / 2 + radius,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        2 * Math.PI - Math.PI / 6 - Math.PI / 3,  2 * Math.PI - Math.PI / 6 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const points = [
        ...curveTop.getPoints(50),
        ...curveLeft.getPoints(50),
        ...curveRight.getPoints(50),
    ]

    const allPoints = [...points, points[0]].map(el => new Vector3(el.x, el.y, 0));
    const box = new Box3();
    box.setFromPoints(allPoints);
    const size = box.getSize(new Vector3());

    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelHeight/size.y* SCALE_3D, 1
    )

    allPoints.forEach((point) => {
        point.applyMatrix4(scaleMatrix);
    })

    return allPoints;
}

export const getTriangleSignPanel = (
    panelWidth, 
    panelHeight,
    thickness,
    position = new Vector3(0, 0, 0)
) => {
    const width3d = (panelHeight / Math.tan(Math.PI / 3) * 2) * SCALE_3D
    const height3d = panelHeight * SCALE_3D
    const radius = 20 * (panelHeight / 400) * SCALE_3D

    const curveTop = new EllipseCurve(
        0,  height3d / 2 - radius / Math.sin(Math.PI / 6),             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI / 2 - Math.PI / 3,  Math.PI / 2 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const curveLeft = new EllipseCurve(
        -width3d / 2 + radius * Math.tan(Math.PI / 3),  - height3d / 2 + radius,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        Math.PI + Math.PI / 6 - Math.PI / 3,  Math.PI + Math.PI / 6 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const curveRight = new EllipseCurve(
        width3d / 2 - radius * Math.tan(Math.PI / 3),  - height3d / 2 + radius,             // ax, aY
        radius, radius,                      // xRadius, yRadius
        2 * Math.PI - Math.PI / 6 - Math.PI / 3,  2 * Math.PI - Math.PI / 6 + Math.PI / 3,           // aStartAngle, aEndAngle
        false,                               // aClockwise
        0                                    // aRotation
    );
    const points = [
        ...curveTop.getPoints(50),
        ...curveLeft.getPoints(50),
        ...curveRight.getPoints(50),
    ]

    const shape = new Shape();
    shape.setFromPoints([...points, points[0]])

    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    };
    const geometry = new ExtrudeGeometry( shape, extrudeSettings );
    geometry.translate(position.x, position.y, position.z);

    geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new Vector3());
    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelHeight/size.y* SCALE_3D, 1
    )
    geometry.applyMatrix4(scaleMatrix);
    geometry.computeBoundingBox();
    geometry.center()
    return geometry
}

export const getOctagonPolygon = (
    panelWidth,
    panelHeight
) => {
    const width3d = panelWidth * SCALE_3D
    const height3d = panelHeight * SCALE_3D

    const octaHeight3d = height3d / 2 * Math.sin(Math.PI / 4)
    const octaWidth3d = octaHeight3d

    const points = [
        new Vector3(0, height3d / 2, 0),
        new Vector3(-octaWidth3d, octaHeight3d, 0),
        new Vector3(-width3d / 2, 0, 0),
        new Vector3(-octaWidth3d, - octaHeight3d, 0),
        new Vector3(0, - height3d / 2, 0),
        new Vector3(octaWidth3d, - octaHeight3d, 0),
        new Vector3(width3d / 2, 0, 0),
        new Vector3(octaWidth3d, octaHeight3d, 0),
    ]

    const allPoints = [...points, points[0]].map(el => new Vector3(el.x, el.y, 0));
    const box = new Box3();
    box.setFromPoints(allPoints);
    const size = box.getSize(new Vector3());

    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelHeight/size.y* SCALE_3D, 1
    )

    allPoints.forEach((point) => {
        point.applyMatrix4(scaleMatrix);
    })

    return allPoints
}

export const getOctagonSignPanel = (
    panelWidth, 
    panelHeight,
    thickness,
    position = new Vector3(0, 0, 0)
) => {
    const width3d = panelWidth * SCALE_3D
    const height3d = panelHeight * SCALE_3D

    const octaHeight3d = height3d / 2 * Math.sin(Math.PI / 4)
    const octaWidth3d = octaHeight3d

    const points = [
        new Vector3(0, height3d / 2, 0),
        new Vector3(-octaWidth3d, octaHeight3d, 0),
        new Vector3(-width3d / 2, 0, 0),
        new Vector3(-octaWidth3d, - octaHeight3d, 0),
        new Vector3(0, - height3d / 2, 0),
        new Vector3(octaWidth3d, - octaHeight3d, 0),
        new Vector3(width3d / 2, 0, 0),
        new Vector3(octaWidth3d, octaHeight3d, 0),
    ]

    const shape = new Shape();
    shape.setFromPoints([...points, points[0]])

    const extrudeSettings = {
        steps: 1,
        depth: thickness,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    };
    const geometry = new ExtrudeGeometry( shape, extrudeSettings );
    const matrix = new Matrix4()
    .makeTranslation(position.x, position.y, position.z)
    .premultiply(
        new Matrix4().makeRotationZ(Math.PI/8)
    )
    geometry.applyMatrix4(matrix);

    geometry.computeBoundingBox();
    const size = geometry.boundingBox.getSize(new Vector3());
    const scaleMatrix = new Matrix4().makeScale(
        panelWidth/size.x* SCALE_3D, panelHeight/size.y* SCALE_3D, 1
    )
    geometry.applyMatrix4(scaleMatrix);
    geometry.computeBoundingBox();
    geometry.center()
    return geometry
}

export const getIntersectOfLineInOffsetWidthPolygon = (width, offset, polygon) => {
    const width3d = width * SCALE_3D
    const intersects = []

    const m1 = new Vector3(- width3d, offset, 0)
    const m2 = new Vector3(width3d, offset, 0)
    const mainLine = new Line3(m1, m2)

    for(let i = 0; i < polygon.length; i++) {
        const p1 = polygon[i]
        const p2 = polygon[(i + 1) % polygon.length]
        if(p1.distanceTo(p2) == 0) {
            continue
        }

        const line = new Line3(p1, p2)
        let intersection = intersect(
            [m1.x, m1.y, m1.z],
            [m2.x, m2.y, m2.z],
            [p1.x, p1.y, p1.z],
            [p2.x, p2.y, p2.z]
        )
        if (!intersection) {
            continue
        }

        let [x, y, z] = intersection
        let intersection3 = new Vector3(x, y, z)

        let clampedIntersection3A = mainLine.closestPointToPoint(intersection3, true, new Vector3())
        let clampedIntersection3B = line.closestPointToPoint(intersection3, true, new Vector3())
        if (
            intersection3.distanceToSquared(clampedIntersection3A) > 0.0001 ||
            intersection3.distanceToSquared(clampedIntersection3B) > 0.0001
        ) {
            continue
        } else {
            clampedIntersection3A = new Vector3(_.round(clampedIntersection3A.x, 2), _.round(clampedIntersection3A.y, 2), _.round(clampedIntersection3A.z, 2))
            intersects.push(clampedIntersection3A)
        }
    }

    return _.uniqBy(intersects, function (e) { return `${_.round(e.x, 5)}-${_.round(e.y, 5)}-${_.round(e.z, 5)}` })
}