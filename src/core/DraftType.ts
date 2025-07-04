import {Category} from "./Categories";
import {Draft} from "./plugin/drafts/Draft";

interface DraftTypeConstructorParams {
    tag: string;
    category?: Category;
    rci?: boolean;
    draftType: typeof Draft;
    /** Whether the draft type can be considered a base type. */
    base?: boolean;
    /** Display name in Chinese for UI display */
    displayName?: string;
}

export class DraftType {
    private readonly _tag: string;
    private readonly category: Category | null
    private readonly rci: boolean
    private readonly draftType: typeof Draft
    readonly base: boolean
    readonly displayName: string

    constructor({tag, category, rci, draftType, base, displayName}: DraftTypeConstructorParams) {
        this._tag = tag;
        this.category = category
        this.rci = rci || false
        this.draftType = draftType
        if (base == undefined) {
            this.base = true
        } else {
            this.base = base
        }
        this.displayName = displayName || tag; // 如果没有提供displayName，则使用tag作为默认值
    }

    get tag(): string {
        return this._tag;
    }

    public isRCI(): boolean {
        return this.rci;
    }

    public getDraft(): typeof Draft {
        return this.draftType;
    }
}