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

import {StringAttribute} from "../../attribute/StringAttribute";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {generateId} from "../../utils/Utils";
import {AttributeOwner} from "../AttributeOwner";
import {Plugin} from "../Plugin";

export class Manifest extends AttributeOwner {

    id: StringAttribute
    version: NumberAttribute
    title: StringAttribute
    text: StringAttribute
    author: StringAttribute

    constructor(plugin: Plugin) {
        super(plugin);

        this.id = new StringAttribute({
            plugin: this.plugin, id: "id",
            name: "Manifest ID",
            description: "插件清单的ID。这应该是您整个插件的唯一标识符。",
            required: true, defaultValue: () => {return "$manifest-" + generateId()},
            customValidator: () => {
                if (this.id.value.trim().length < 5) {
                    this.id.addError("您的插件ID必须至少有5个字符长。")
                }
            }
        })

        this.version = new NumberAttribute({
            plugin: this.plugin, id: "version",
            name: "Version",
            description: "插件的版本。" +
                "第一个版本应保持为1，每次更新时递增。",
            required: true,
            defaultValue: 1,
            validation: {minValue: 1, maxValue: 999999},
            customValidator: () => {
                if (this.version.value < 1) {
                    this.version.addError(
                        "清单版本无效。它必须是一个正数且至少为1。"
                    )
                }
            }
        })

        this.title = new StringAttribute({
            plugin: this.plugin, id : "title",
            name: "Name", description: "插件的名称或标题。",
            required: true,
            customValidator: () => {
                if (this.title.value.trim().length < 5) {
                    this.title.addError("您的插件标题必须至少有5个字符长。")
                }
            }
        })

        this.text = new StringAttribute({
            plugin: this.plugin, id : "text",
            name: "Description", description: "插件的描述。",
            required: true,
            customValidator: () => {
                if (this.text.value.trim().length < 10) {
                    this.text.addError("您的插件描述必须至少有10个字符长。")
                }
            }
        })

        this.author = new StringAttribute({
            plugin: this.plugin, id: "author",
            name: "Author", description: "插件的作者。",
            required: true,
            customValidator: () => {
                if (this.author.value.trim().length < 5) {
                    this.author.addError("您的插件作者字段必须至少有5个字符长。")
                }
            }
        })

        let authorName = localStorage.getItem("authorName");
        if (authorName !== null) {
            this.author.value = authorName;
        }
    }
}
