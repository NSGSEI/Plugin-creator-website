
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

import {Attribute} from "../../attribute/Attribute";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {StringAttribute} from "../../attribute/StringAttribute";
import {IListable} from "../../attribute/interfaces/Interfaces";
import {Plugin} from "../Plugin";
import {AttributeOwner, AttributeOwnerFactory, AttributeOwnerFactoryWithOptions} from "../AttributeOwner";
import {FileAttribute} from "../../attribute/FileAttribute";
import { serialize } from "@/core/utils/Utils";

export class FrameFactory implements AttributeOwnerFactory, AttributeOwnerFactoryWithOptions {
    fromJSON(obj: any, plugin: Plugin): AttributeOwner {
        let frameObj: Frame
        switch (obj) {
            case null:
                frameObj = new EmptyFrame(plugin)
                return frameObj
            default:
                frameObj = new BmpFrame(plugin)
                break
        }
        return serialize(obj, frameObj)
    }

    getOptions() {
        return {
            "添加自定义帧": ((plugin: Plugin) => new BmpFrame(plugin)),
            "添加空帧": ((plugin: Plugin) => new EmptyFrame(plugin))
        }
    }

}

export abstract class Frame extends AttributeOwner implements IListable {
    abstract getDescription(): string
    abstract getTitle(index: number): string
}


const example_silent_frames = {
    "silent frames": -1, // 静默帧
    "x": 0, // X坐标
    "y": 0  // Y坐标
}

const example_ref = {
    "ref": 0, // 引用
    "move x": 0, // X移动
    "move y": 0, // Y移动
    "count": 1, // 数量
    "silent ": false // 静默
}

class TextureFrame extends Frame {
    example = {
        "offset x": 0,
        "offset y": 0,
        "x": 0,
        "y": 0,
        "w": 0,
        "h": 0,

        //共享
        "target w": 0, // 宽度,
        "target h": 0, //高度
        "count": 1,
        "skip width factor": 1,
        "skip height factor": 0,
        "copies": 0,
        "n": 1, // (副本数 + 1)
    }

    getDescription(): string {
        return "纹理帧用于使用已定义的纹理创建帧。";
    }

    getTitle(index: number): string {
        return `帧 ${index} (纹理)`;
    }
}


class StealFrame extends Frame {
    example = {
        "steal": "$my_plugin_id",
        "type": "frames/preview frames",
        "frame": 0,
        "count": 1,
        "move x": 0,
        "move y": 0,
        "handle x": 0,
        "handle y": 0,
        "share": false
    }



    steal = new StringAttribute({
        plugin: this.plugin, id: "steal",
        name: "窃取", description: "要从中窃取帧的草稿ID。",
        required: true
    })

    type // TODO: add either some selector attribute type or something to allow selecting one of 2 options


    frame: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "frame",
        name: "帧", description: "要窃取的帧的索引。"
    })
    count: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "count",
        name: "数量", description: "要窃取的帧数量"
    })
    moveX: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "move x",
        name: "X移动", description: "X方向上的移动距离"
    })
    moveY: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "move y",
        name: "Y移动", description: "Y方向上的移动距离"
    })
    handleX: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "handle x",
        name: "X手柄", description: "X方向上的手柄位置"
    })
    handleY: NumberAttribute = new NumberAttribute({
        plugin: this.plugin, id: "handle y",
        name: "Y手柄", description: "Y方向上的手柄位置"
    })
    shared = new BooleanAttribute({
        plugin: this.plugin, id: "share",
        name: "共享", description: "是否共享帧",
        defaultValue: false
    })

    getDescription(): string {
        return "窃取帧用于从其他草稿中复用帧。";
    }

    getTitle(index: number): string {
        return `帧 ${index} (窃取)`;
    }
}

export class EmptyFrame extends Frame {

    toJSON(): {} {
        return null
    }

    getDescription(): string {
        return "空帧用于创建不可见或虚拟帧，可用于各种目的。"
    }
    getTitle(index: number): string {
        return `帧 ${index} (空)`
    }
}

export class BmpFrame extends Frame {

    bmp: FileAttribute
    placeX: NumberAttribute
    placeY: NumberAttribute
    x: NumberAttribute
    y: NumberAttribute
    w: NumberAttribute
    h: NumberAttribute
    targetW: NumberAttribute
    targetH: NumberAttribute
    count: NumberAttribute
    skipWidthFactor: NumberAttribute
    skipHeightFactor: NumberAttribute
    copies: NumberAttribute
    n: NumberAttribute

    constructor(plugin: Plugin) {
        super(plugin);

        this.bmp = new FileAttribute({
            plugin: this.plugin, id: "bmp",
            name: "图像文件", description: "您的草稿的纹理文件，通常是建筑纹理。",
            required: true
        })

        this.placeX = new NumberAttribute({
            plugin: this.plugin, id: "place x",
            name: "放置X坐标", description: "在纹理空间中放置帧的X坐标。" +
                "仅适用于特权草稿。",
            defaultValue: 0
        })
        this.placeY = new NumberAttribute({
            plugin: this.plugin, id: "place y",
            name: "放置Y坐标", description: "在纹理空间中放置帧的Y坐标。" +
                "仅适用于特权草稿。",
            defaultValue: 0
        })

        this.x = new NumberAttribute({
            plugin: this.plugin, id: "x",
            name: "X坐标", description: "帧的X坐标",
            defaultValue: 0
        })
        this.y = new NumberAttribute({
            plugin: this.plugin, id: "y",
            name: "Y坐标", description: "帧的Y坐标",
            defaultValue: 0
        })
        this.w = new NumberAttribute({
            plugin: this.plugin, id: "w",
            name: "宽度", description: "帧的宽度"
        })
        this.h = new NumberAttribute({
            plugin: this.plugin, id: "h",
            name: "高度", description: "帧的高度"
        })

        this.targetW = new NumberAttribute({
            plugin: this.plugin, id: "target w",
            name: "目标宽度", description: "将帧缩放到指定宽度。"
        })
        this.targetH = new NumberAttribute({
            plugin: this.plugin, id: "target h",
            name: "目标高度", description: "将帧缩放到指定高度。"
        })
        this.count = new NumberAttribute({
            plugin: this.plugin, id: "count",
            name: "数量", description: "帧的数量"
        })
        this.skipWidthFactor = new NumberAttribute({
            plugin: this.plugin, id: "skip width factor",
            name: "宽度跳过因子", description: "宽度方向上的跳过因子",
            defaultValue: 1
        })
        this.skipHeightFactor = new NumberAttribute({
            plugin: this.plugin, id: "skip height factor",
            name: "高度跳过因子", description: "高度方向上的跳过因子"
        })
        this.copies = new NumberAttribute({
            plugin: this.plugin, id: "copies",
            name: "副本数", description: "创建的帧副本数量"
        })
        this.n = new NumberAttribute({
            plugin: this.plugin, id: "n",
            name: "n值", description: "帧的n值参数"
        })
    }

    getTitle(index: number): string {
        return `帧 ${index} (${this.bmp.value ?? '未设置'})`
    }

    getDescription(): string {
        return "自定义帧用于从文件添加您自己的纹理。"
    }
}
