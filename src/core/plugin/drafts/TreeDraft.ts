/*
 * MIT License
 *
 * Copyright (c) 2023 JustAnyone
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

import {ViewportDraft} from "./ViewportDraft";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";

export class TreeDraft extends ViewportDraft {

    framesPerTree: NumberAttribute
    autoBuild: BooleanAttribute
    buildHeight: NumberAttribute
    supportsSlope: BooleanAttribute
    price: NumberAttribute


    // TODO: add support for mapColor and mapColorWinter
    //mapColor: Colour
    //mapColorWinter: Colour

    // TODO: add support for "biomes" tag
    // TODO: add support for the following:
    /*
        optBoolean("burnable")
        optBoolean("water")
        optBoolean("land")
        "add price" for addPriceDrafts
     */

    constructor(type: DraftType, plugin: Plugin) {
        super(type, plugin);

        this.framesPerTree = new NumberAttribute({
            plugin: this.plugin, id: "frames per tree",
            name: "Frames per tree", description: "单棵树有多少帧图像。",
            defaultValue: 1
        })

        this.autoBuild = new BooleanAttribute({
            plugin: this.plugin, id: "auto build",
            name: "Auto build", description: "是否在地图生成阶段自动生成树木。",
            defaultValue: false
        })

        this.buildHeight = new NumberAttribute({
            plugin: this.plugin, id: "build height",
            name: "Build height",
            description: "树木高度，以8像素为单位。当未提供帧图像时应使用此项。" +
                "否则，游戏将自行计算高度。" +
                "用于碰撞检测、绘图裁剪、直升机交互等多种用途。"
        })

        this.supportsSlope = new BooleanAttribute({
            plugin: this.plugin, id: "supports slope",
            name: "Supports slope", description: "树木是否可以放置在斜坡上。"
        })

        this.price = new NumberAttribute({
            plugin: this.plugin, id: "price",
            name: "Price",
            description: "树木的价格（单位：Theons）。",
            validation: {minValue: 0, maxValue: 10_000_000}
        })

    }
}
