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

import {BuildingDraft} from "./plugin/drafts/BuildingDraft";
import {Categories} from "./Categories";
import {DraftType} from "./DraftType";
import {TreeDraft} from "./plugin/drafts/TreeDraft";
import {CategoryDraft} from "./plugin/drafts/CategoryDraft";
import {UpgradeDraft} from "./plugin/drafts/UpgradeDraft";
import { AnimationDraft } from "./plugin/drafts/AnimationDraft";

export class Types {
    // RCI
    static readonly RESIDENTIAL = new DraftType({
        tag: "residential",
        category: Categories.RESIDENTIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "住宅"
    })
    static readonly COMMERCIAL = new DraftType({
        tag: "commercial",
        category: Categories.COMMERCIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "商业"
    })
    static readonly INDUSTRIAL = new DraftType({
        tag: "industrial",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "工业"
    })
    static readonly FARM = new DraftType({
        tag: "farm",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "农场"
    })
    static readonly HARBOR_IND = new DraftType({
        tag: "harbor ind",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "港口工业"
    })
    static readonly HARBOR_PIER = new DraftType({
        tag: "harbor pier",
        category: Categories.INDUSTRIAL,
        rci: true,
        draftType: BuildingDraft,
        displayName: "港口码头"
    })

    // Buildings
    static readonly PARK = new DraftType({
        tag: "park",
        category: Categories.PARK,
        rci: false,
        draftType: BuildingDraft,
        displayName: "公园"
    })
    static readonly SPORT = new DraftType({
        tag: "sport",
        category: Categories.SPORT,
        rci: false,
        draftType: BuildingDraft,
        displayName: "体育"
    })
    static readonly PUBLIC = new DraftType({
        tag: "public",
        category: Categories.MANAGEMENT,
        rci: false,
        draftType: BuildingDraft,
        displayName: "公共"
    })
    static readonly RELIGION = new DraftType({
        tag: "religion",
        category: Categories.RELIGION,
        rci: false,
        draftType: BuildingDraft,
        displayName: "宗教"
    })
    static readonly AWARD = new DraftType({
        tag: "award",
        category: Categories.AWARD,
        rci: false,
        draftType: BuildingDraft,
        displayName: "奖励"
    })
    static readonly ENERGY = new DraftType({
        tag: "energy",
        category: Categories.ENERGY,
        rci: false,
        draftType: BuildingDraft,
        displayName: "能源"
    })
    static readonly WATER = new DraftType({
        tag: "water",
        category: Categories.WATER,
        rci: false,
        draftType: BuildingDraft,
        displayName: "水务"
    })
    static readonly MEDIC = new DraftType({
        tag: "medic",
        category: Categories.MEDIC,
        rci: false,
        draftType: BuildingDraft,
        displayName: "医疗"
    })
    static readonly POLICE = new DraftType({
        tag: "police",
        category: Categories.POLICE,
        rci: false,
        draftType: BuildingDraft,
        displayName: "警察"
    })
    static readonly SWAT = new DraftType({
        tag: "swat",
        category: Categories.POLICE,
        rci: false,
        draftType: BuildingDraft,
        displayName: "特警"
    })
    static readonly FIRE_BRIGADE = new DraftType({
        tag: "fire brigade",
        category: Categories.FIRE_BRIGADE,
        rci: false,
        draftType: BuildingDraft,
        displayName: "消防"
    })
    static readonly EDUCATION = new DraftType({
        tag: "education",
        category: Categories.EDUCATION,
        rci: false,
        draftType: BuildingDraft,
        displayName: "教育"
    })
    static readonly BUS_DEPOT = new DraftType({
        tag: "bus depot",
        category: Categories.ROAD,
        rci: false,
        draftType: BuildingDraft,
        displayName: "公交车站"
    })
    static readonly DESTROYED = new DraftType({
        tag: "destroyed",
        category: null,
        rci: false,
        draftType: BuildingDraft,
        displayName: "已摧毁"
    })
    static readonly DECORATION = new DraftType({
        tag: "decoration",
        category: Categories.DECORATION,
        rci: false,
        draftType: BuildingDraft,
        displayName: "装饰"
    })
    static readonly BUOY = new DraftType({
        tag: "buoy",
        category: Categories.TRANSPORT,
        rci: false,
        draftType: BuildingDraft,
        displayName: "浮标"
    })
    static readonly RAILWAY_STATION = new DraftType({
        tag: "railway station",
        category: Categories.ROAD,
        rci: false,
        draftType: BuildingDraft,
        displayName: "火车站"
    })
    static readonly WASTE_DISPOSAL = new DraftType({
        tag: "waste disposal",
        category: Categories.WASTE_DISPOSAL,
        rci: false,
        draftType: BuildingDraft,
        displayName: "垃圾处理"
    })
    static readonly BODY_DISPOSAL = new DraftType({
        tag: "body disposal",
        category: Categories.BODY_DISPOSAL,
        rci: false,
        draftType: BuildingDraft,
        displayName: "殡葬"
    })
    static readonly MILITARY = new DraftType({
        tag: "military",
        category: Categories.MILITARY,
        rci: false,
        draftType: BuildingDraft,
        displayName: "军事"
    })
    static readonly AIRPORT = new DraftType({
        tag: "airport",
        category: Categories.AIRPORT,
        rci: false,
        draftType: BuildingDraft,
        displayName: "机场"
    })
    //static readonly OTHER = new DraftType("building", null) // Valid type, but should it be used?
    static readonly TERRAIN = new DraftType({
        tag: "terrain",
        category: Categories.TERRAIN,
        rci: false,
        draftType: BuildingDraft,
        displayName: "地形"
    })
    static readonly LANDMARK = new DraftType({
        tag: "landmark",
        category: Categories.LANDMARK,
        rci: false,
        draftType: BuildingDraft,
        displayName: "地标"
    })

    static readonly TREE = new DraftType({
        tag: "tree",
        category: Categories.TREE,
        rci: false,
        draftType: TreeDraft,
        displayName: "树木"
    })

    static readonly CATEGORY = new DraftType({
        tag: "category",
        category: Categories.ROOT,
        rci: false,
        draftType: CategoryDraft,
        displayName: "分类"
    })

    static readonly UPGRADE = new DraftType({
        tag: "upgrade",
        category: null,
        rci: false,
        draftType: UpgradeDraft,
        base: false,
        displayName: "升级"
    })

    static readonly ANIMATION = new DraftType({
        tag: "animation",
        category: null,
        rci: false,
        draftType: AnimationDraft,
        displayName: "动画"
    })


    private constructor(private key: string, public value: any) {}
    toString() {
        return this.key;
    }

    public static getType(type: string) {
        let keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            let item = this[keys[i]];
            if (item instanceof DraftType && item.tag === type)
                return item;
        }
        return null;
    }

    public static getTypes() {
        let attrs: Array<DraftType> = []
        Object.keys(this).forEach(
            (item) => {
                if (this[item] instanceof DraftType && this[item].base)
                    attrs.push(this[item])
            })
        return attrs
    }
}
