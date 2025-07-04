/*
 * MIT License
 *
 * Copyright (c) 2023-2024 JustAnyone
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { BooleanAttribute } from "../../../attribute/BooleanAttribute";
import { NumberAttribute } from "../../../attribute/NumberAttribute";
import {Draft} from "../Draft";

// A biome is used to decide on ground and decorations to place during map creation phase.
export class BiomeDraft extends Draft {
    isWater = new BooleanAttribute({
        owner: this,
        id: "water",
        name: "Is water",
        description: "该生物群系是否被视为水域",
        required: false,
        defaultValue: false
    })

    noiseScale = new NumberAttribute({
        owner: this,
        id: "noise scale",
        name: "Noise scale",
        description: "噪声比例，控制生物群系噪声图的缩放比例",
        isInteger: false,
        defaultValue: 1.0
    })
    noiseOffset = new NumberAttribute({
        owner: this,
        id: "noise offset",
        name: "Noise offset",
        description: "噪声偏移量，控制生物群系噪声图的位置偏移",
        isInteger: false,
        defaultValue: 0.0
    })
    noiseFactor = new NumberAttribute({
        owner: this,
        id: "noise factor",
        name: "Noise factor",
        description: "噪声因子，控制噪声对生物群系分布的影响强度",
        isInteger: false,
        defaultValue: 0.0
    })
    noiseVariance = new NumberAttribute({
        owner: this,
        id: "noise variance",
        name: "Noise variance",
        description: "噪声变化程度，控制生物群系噪声的多样性",
        isInteger: false,
        defaultValue: 1.0
    })


    heightCenter = new NumberAttribute({
        owner: this,
        id: "height center",
        name: "Height center",
        description: "高度中心值，生物群系高度分布的中心点",
        isInteger: false,
        defaultValue: 0.0
    })
    heightRadius = new NumberAttribute({
        owner: this,
        id: "height radius",
        name: "Height radius",
        description: "高度半径，生物群系高度分布的范围",
        isInteger: false,
        defaultValue: 1.0
    })
    heightOffset = new NumberAttribute({
        owner: this,
        id: "height offset",
        name: "Height offset",
        description: "高度偏移量，调整生物群系整体高度的偏移值",
        isInteger: false,
        defaultValue: 0.0
    })
    heightFactor = new NumberAttribute({
        owner: this,
        id: "height factor",
        name: "Height factor",
        description: "高度因子，控制高度对生物群系分布的影响强度",
        isInteger: false,
        defaultValue: 0.0
    })


    derivCenter = new NumberAttribute({
        owner: this,
        id: "deriv center",
        name: "Deriv center",
        description: "梯度中心值，地形坡度分布的中心点",
        isInteger: false,
        defaultValue: 0.0
    })
    derivRadius = new NumberAttribute({
        owner: this,
        id: "deriv radius",
        name: "Deriv radius",
        description: "梯度半径，地形坡度变化的范围",
        isInteger: false,
        defaultValue: 1.0
    })
    derivOffset = new NumberAttribute({
        owner: this,
        id: "deriv offset",
        name: "Deriv offset",
        description: "梯度偏移量，调整地形坡度的整体偏移值",
        isInteger: false,
        defaultValue: 0.0
    })
    derivFactor = new NumberAttribute({
        owner: this,
        id: "deriv factor",
        name: "Deriv factor",
        description: "梯度因子，控制地形坡度对生物群系分布的影响强度",
        isInteger: false,
        defaultValue: 0.0
    })


    offset = new NumberAttribute({
        owner: this,
        id: "offset",
        name: "Offset",
        description: "偏移量，控制生物群系整体分布的位置偏移",
        isInteger: false,
        defaultValue: 0.0
    })


    coverage = new NumberAttribute({
        owner: this,
        id: "coverage",
        name: "Coverage",
        description: "覆盖率，控制生物群系在世界中的分布范围",
        isInteger: false,
        defaultValue: 1.0
    })
    precedence = new NumberAttribute({
        owner: this,
        id: "precedence",
        name: "Precedence",
        description: "优先级，决定在生物群系重叠时哪个生物群系会被优先选择",
        isInteger: false,
        defaultValue: 1.0
    })

    // "ground" array of ground IDs

    tempIndex: number
}