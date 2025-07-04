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

import {StringAttribute} from "../../attribute/StringAttribute";
import {BooleanAttribute} from "../../attribute/BooleanAttribute";
import {NumberAttribute} from "../../attribute/NumberAttribute";
import {Types} from "../../Types";
import {MetaAttribute} from "../../attribute/MetaAttribute";
import {DraftType} from "../../DraftType";
import {Plugin} from "../Plugin";
import {Frame, FrameFactory} from "../objects/Frame";
import {AttributeOwner, AttributeOwnerFactory} from "../AttributeOwner";
import {ListAttribute} from "../../attribute/ListAttribute";
import { serialize } from "@/core/utils/Utils";

export class DraftFactory implements AttributeOwnerFactory {

    fromJSON(json: any, plugin: Plugin): Draft {
        let obj = this.fromType(json["type"], plugin);
        if (obj === null) return null;
        return serialize(json, obj);
    }

    fromType(type: string, plugin: Plugin): Draft {
        const draftType = Types.getType(type);
        if (draftType === null) return null;
        const draft = draftType.getDraft();
        return new draft(draftType, plugin);
    }
}

export interface DefaultAttributes {
    privileged: StringAttribute
    id: StringAttribute
    inherit: BooleanAttribute
    override: BooleanAttribute
    minVersion: NumberAttribute
    maxVersion: NumberAttribute
    // TODO: template related
    type: DraftType
    title: StringAttribute
    text: StringAttribute
    hidden: BooleanAttribute
    author: StringAttribute
    // TODO: dev
    final: BooleanAttribute
    hideId: BooleanAttribute
    muteLua: BooleanAttribute
    strictLua: BooleanAttribute
    index: BooleanAttribute
    notImplemented: BooleanAttribute
    // TODO: soundclick related
    ordinal: NumberAttribute
    ordinalFrom: StringAttribute
    // TODO: meta
    titleId: StringAttribute
    textId: StringAttribute
    separator: BooleanAttribute
    previewFrames: ListAttribute<Frame>
    iconFrames: ListAttribute<Frame>
    showNewMarker: BooleanAttribute
    searchable: BooleanAttribute
    category: StringAttribute
    categoryFrom: StringAttribute
    // TODO: aliases
    // TODO: requirements
    // TODO: scripts
}

export class Draft extends AttributeOwner implements DefaultAttributes {

    readonly type: DraftType

    id: StringAttribute
    active: BooleanAttribute
    premium: BooleanAttribute
    once: BooleanAttribute
    mute: BooleanAttribute
    privileged: StringAttribute
    requirePrivileges: BooleanAttribute
    requireSuperPrivileges: BooleanAttribute
    inherit: BooleanAttribute
    override: BooleanAttribute
    minVersion: NumberAttribute
    maxVersion: NumberAttribute
    title: StringAttribute
    text: StringAttribute
    hidden: BooleanAttribute
    author: StringAttribute
    final: BooleanAttribute
    hideId: BooleanAttribute
    muteLua: BooleanAttribute
    strictLua: BooleanAttribute
    index: BooleanAttribute
    notImplemented: BooleanAttribute
    ordinal: NumberAttribute
    ordinalFrom: StringAttribute
    // TODO: proper meta implementation
    meta: MetaAttribute
    titleId: StringAttribute
    textId: StringAttribute
    separator: BooleanAttribute
    previewFrames: ListAttribute<Frame>
    iconFrames: ListAttribute<Frame>
    showNewMarker: BooleanAttribute
    searchable: BooleanAttribute
    category: StringAttribute
    categoryFrom: StringAttribute

    constructor(type: DraftType, plugin: Plugin) {
        super(plugin);
        this.type = type


        this.id = new StringAttribute({
            plugin: this.plugin, id: "id",
            name: "ID", description: "每个对象都必须有一个唯一的ID来标识它。" +
                "因此，您应该添加一些关于插件的特定信息，以确保没有其他人会使用这个ID。" +
                "避免在之后更改ID，因为它用于识别已保存城市中的建筑物。" +
                "如果您需要更改它，请使用\"aliases\"属性代替。",
            required: true
        })

        this.active = new BooleanAttribute({
            plugin: this.plugin,
            id: "active",
            name: "Active", description: "草案是否处于活动状态并应由游戏加载。",
            required: false, defaultValue: true
        })
        this.premium = new BooleanAttribute({
            plugin: this.plugin, id : "premium",
            name : "Premium", description : "插件是否为高级版。如果被视为高级版，它将在游戏的非高级版本中不会激活。",
            required : false, defaultValue : false
        })
        this.once = new BooleanAttribute({
            plugin: this.plugin, id : "once",
            name : "Once", description : "是否仅加载一次指定ID的草案。它不会加载任何ID已经加载过的额外草案。",
            required : false, defaultValue : false
        })
        this.inherit = new BooleanAttribute({
            plugin: this.plugin, id : "inherit",
            name : "Inherit", description : "是否继承已通过指定ID定义的草案。",
            required : false, defaultValue : false
        })
        this.override = new BooleanAttribute({
            plugin: this.plugin, id : "override",
            name : "Override", description : "是否覆盖已通过指定ID定义的草案。",
            required : false, defaultValue : false
        })
        this.privileged = new StringAttribute({
            plugin: this.plugin, id: "privileged",
            name: "Privileged key", description: "草案的特权密钥。允许使用特殊功能，这些功能" +
                "仅限于受信任的插件创建者使用。"
        })
        this.requirePrivileges = new BooleanAttribute({
            plugin: this.plugin, id: "require privileges",
            name: "Require privileges",
            description: "草案是否需要月收入、框架放置等特殊功能。",
            required: false, defaultValue: false
        })
        this.requireSuperPrivileges = new BooleanAttribute({
            plugin: this.plugin, id: "require super privileges",
            name: "Require super privileges",
            description: "草案是否需要仅限于DSA的功能。",
            required: false, defaultValue: false,
            disabled: true
        })
        this.mute = new BooleanAttribute({
            plugin: this.plugin, id : "mute",
            name : "Mute", description : "是否抑制加载草案时发生的任何错误。",
            required : false, defaultValue : false
        })

        this.minVersion = new NumberAttribute({
            plugin: this.plugin, id: "min version",
            name: "Minimal version", description: "运行此草案所需的最低游戏版本。",
            defaultValue: 0,
            validation: {minValue: 0, maxValue: 99999}
        })
        this.maxVersion = new NumberAttribute({
            plugin: this.plugin, id: "max version",
            name: "Max version", description: "运行此草案所需的最高游戏版本。",
            defaultValue: 0,
            validation: {minValue: 0, maxValue: 99999}
        })

        this.title = new StringAttribute({
            plugin: this.plugin, id: "title",
            name : "Title", description : "草案标题，通常是建筑物的标题。"
        })
        this.titleId = new StringAttribute({
            plugin: this.plugin, id: "title id",
            name : "Title ID", description : "标题字符串的ID。可用于引用特定的翻译键。"
        })
        this.text = new StringAttribute({
            plugin: this.plugin, id: "text",
            name: "Text", description: "草案文本，通常是建筑物的描述或通知中的文本。"
        })
        this.textId = new StringAttribute({
            plugin: this.plugin, id: "text id",
            name: "Text ID", description: "文本字符串的ID。可用于引用特定的翻译键。"
        })
        this.hidden = new BooleanAttribute({
            plugin: this.plugin, id : "hidden",
            name : "Hidden", description : "草案是否会在工具栏中隐藏。",
            required : false, defaultValue : false
        })
        this.author = new StringAttribute({
            plugin: this.plugin, id: "author",
            name: "Author", description : "此插件草案的作者。",
            required : true
        })


        this.final = new BooleanAttribute({
            plugin: this.plugin, id : "final",
            name : "Final", description : "草案是否可以被覆盖。",
            required : false, defaultValue : false
        })
        this.hideId = new BooleanAttribute({
            plugin: this.plugin, id : "hide id",
            name : "Hide ID", description : "用户是否可以看到草案的ID。",
            required : false, defaultValue : false
        })
        this.muteLua = new BooleanAttribute({
            plugin: this.plugin, id : "mute lua",
            name : "Mute Lua", description : "是否静默Lua错误。",
            required : false
        })
        // TODO: improve description
        this.strictLua = new BooleanAttribute({
            plugin: this.plugin, id : "strict lua",
            name : "Strict Lua", description : "???",
            required : false
        })
        this.index = new BooleanAttribute({
            plugin: this.plugin, id : "index",
            name : "Index", description : "是否允许草案被Lua方法索引。",
            required : false, defaultValue : false
        })

        this.ordinal = new NumberAttribute({
            plugin: this.plugin, id: "ordinal",
            name: "Ordinal", description: "草案在类别中的位置。较低的序数值将使草案 " +
                "排列更靠前。允许使用负值。"
        })
        // TODO: improve description
        this.ordinalFrom = new StringAttribute({
            plugin: this.plugin, id: "ordinal",
            name: "Ordinal from", description: "获取序数值的草案ID。必须与序数属性一起使用。"
        })


        // TODO: proper meta implementation
        this.meta = new MetaAttribute({
            plugin: this.plugin, id: "meta",
            name: "Meta", description: "草案元数据。用于定义特殊的草案数据。" +
                "默认情况下，PCA包含一些关于自身的信息。",
            // @ts-ignore
            required: false, defaultValue: {"pca": {"version": __APP_VERSION__}}
        })

        this.separator = new BooleanAttribute({
            plugin: this.plugin, id: "separator",
            name: "Separator", description: "是否在类别中将此草案与其他草案分开。",
            defaultValue: false
        })

        this.previewFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "preview frames",
            name: "Preview frames", description: "在工具栏中可见的草案预览帧。",
            factory: new FrameFactory()
        })
        this.iconFrames = new ListAttribute<Frame>({
            plugin: this.plugin, id: "icon frames",
            name: "Icon frames", description: "草案的图标帧。在建筑信息面板中可见。",
            factory: new FrameFactory()
        })

        this.showNewMarker = new BooleanAttribute({
            plugin: this.plugin, id: "show new marker",
            name: "Show new marker", description: "草案是否在工具栏中显示新标记。",
            defaultValue: true
        })
        this.searchable = new BooleanAttribute({
            plugin: this.plugin, id: "searchable",
            name: "Searchable", description: "草案是否可被搜索。",
            defaultValue: true
        })


        this.category = new StringAttribute({
            plugin: this.plugin, id: "category",
            name: "Category", description: "此草案所属类别的草案ID。"
        })
        this.categoryFrom = new StringAttribute({
            plugin: this.plugin, id: "category from",
            name: "Category from", description: "获取类别并同样用于此草案的草案ID。"
        })


        this.notImplemented = new BooleanAttribute({
            plugin: this.plugin, id: "not implemented",
            name: "Not implemented", description: "此草案是否必须被继承才能被视为已实现。",
            defaultValue: false
        })




        let authorName = localStorage.getItem("authorName");
        if (authorName == null) {
            authorName = "pca.svetikas.lt";
        } else {
            this.author.value = authorName;
        }

        let date = new Date()
        let timestamp = date.getTime()
        let fmt = {
            year: Intl.DateTimeFormat('en', {year: "numeric"}).format(timestamp),
            month: Intl.DateTimeFormat('en', {month: "2-digit"}).format(timestamp),
            day: Intl.DateTimeFormat('en', {day: "2-digit"}).format(timestamp),
            hour: Intl.DateTimeFormat('en', {hour: "2-digit", hour12: false}).format(timestamp),
            minute: Intl.DateTimeFormat('en', {minute: "2-digit"}).format(timestamp),
            second: Intl.DateTimeFormat('en', {second: "2-digit"}).format(timestamp),
        }

        this.id.value = `$`;
        this.id.value += `${authorName.replace(" ", "_").toLowerCase()}`;
        this.id.value += `.${type.tag}`;
        this.id.value += `.${fmt.year}-${fmt.month}-${fmt.day}-${fmt.hour}:${fmt.minute}:${fmt.second}`;
        this.id.value += `.${date.getMilliseconds()}`;
    }

    /**
     * Returns the JSON representation of the draft.
     */
    public toJSON() {
        let data = super.toJSON();
        if (this.type.base)
            data["type"] = this.type.tag
        //data["meta"] = this.meta;
        return data
    }

    getOptionalAttributeDescription(): string {
        return "这些是您可以添加到插件草案中的可选属性。" +
            "它们不是必需的，但很有用，例如为您的建筑添加标题、描述或价格。";
    }
}