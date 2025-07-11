<!-- AUTOGENERATED, DO NOT EDIT -->
# Template
Template drafts are special in a way that they provide implementations for other draft types.

You can define any attribute, even if it's not listed under the [attributes](#attributes) section
and any draft that uses the template draft as their template will inherit those values.

You can even reference other template drafts using the [template](#template) attribute.

## Attributes
### active
::: type: boolean

Whether the draft is active and should be loaded by the game.

### additive
::: type: boolean



### alias
::: type: string



### aliases
::: type: string[]

Same as [alias](#alias), but for multiple IDs.

### author
::: type: string

The name of the author behind the draft.

### category
::: type: string

ID of the category the draft should be contained in.

### category from
::: type: string

Draft ID to grab category from and use for the draft.

### dev
::: type: boolean



### final
::: type: boolean

If set to true, the draft can no longer be overridden.

### hidden
::: type: boolean

Whether the draft shows up in the toolbar. If set to true, the draft will not be available in the toolbar.

### hide id
::: type: boolean

Whether to hide the draft ID even when the debug mode is enabled.
This will automatically be set to true if final is set to true or if your draft is part of an encrypted plugin file.

### icon frames
::: type: Frame[]

Frames that will be used for the top left corner of the building dialog.

Size of the frames should be 26x26 pixels.

### icon frames winter
::: type: Frame[]

Frames that will be used during winter for the top left corner of the building dialog.

Size of the frames should be 26x26 pixels.

### id
::: type: string

Unique identifier of the draft.

### index
::: type: boolean
::: version-changed: 1.12.12
::: version-changed: 1.12.13

Whether to allow the draft to be indexed by Lua methods.

**By default**, the value will be true unless the draft is scenario draft.

### inherit
::: type: boolean

Whether to modify a draft of the same ID by inheriting values.

### max version
::: type: integer

The maximum game version that will run the draft.

### meta
::: type: Meta

A special attribute that allows you to store additional metadata about the draft.

Read more about it in the [Meta documentation](../guides/drafts/meta.md).

### min version
::: type: integer

The minimum game version required to run the draft.

### mute
::: type: boolean

Whether to suppress any errors that have occurred while loading the draft.

### mute lua
::: type: boolean



### not implemented
::: type: boolean

Whether the draft has to be inherited to be considered implemented. Will cause an error otherwise.

### once
::: type: boolean

Whether the draft should be loaded once.

What this means is that if another draft is encountered with the same ID,
the game will ignore loading it rather than failing with an error message.

### ordinal
::: type: integer

Position of the draft in a category.
Lower ordinal value will list the draft higher. Negative values are allowed.

### ordinal from
::: type: string

ID of the draft to grab ordinal from. Must be used in combination with the ordinal attribute.

### override
::: type: boolean

Whether to modify a draft of the same ID by replacing values.

Rather than replacing the values, you may want to add or only change specific values of the draft.
For that, refer to the [inherit](#inherit) attribute.

### premium
::: type: boolean

Whether the draft is premium.
A premium draft will not be active in non premium versions of the game.

### premium requirement
::: type: NestedDraftRequirement

Requirements that need to be fulfilled for the draft on premium platforms.

If platform is premium, this attribute will be loaded over the regular requirement attribute.
On non-premium platforms, this attribute will be ignored.

### premium requirements
::: type: DraftRequirement[]

Requirements that need to be fulfilled for the draft on premium platforms.

If platform is premium, this attribute will be loaded over the regular requirement attribute.
On non-premium platforms, this attribute will be ignored.

### preview frames
::: type: Frame[]

Frames that will be used for preview in the toolbar instead of regular frames.

### preview frames winter
::: type: Frame[]

Frames that will be used for preview in the toolbar instead of regular frames during winter.

### privileged
::: type: string
::: deprecated: Due to a change in how the privilege system works, you are now recommended to use [require privileges](#require_privileges) or [require super privileges](#require_super_privileges).

Privileged key for your draft.
Allows the use of special features, which are restricted to trusted plugin creators only.

### require privileges
::: type: boolean
::: version-added: 1.11.73

Whether the draft requires features such as monthly income, frame placement, etc.

### require scenario
::: type: string|string[]
::: version-added: 1.12.12

Array of scenario IDs in which this draft can be used.
It will be unloaded when entering a city that is not one of these scenarios.

Privileged context is required to use this attribute as
it could be used to cheat inside a scenario.

### require super privileges
::: type: boolean
::: version-added: 1.11.73

Whether the draft requires features that are restricted to official game content such as DSA.

### requirement
::: type: NestedDraftRequirement

Requirements that need to be fulfilled for the draft.

### requirements
::: type: DraftRequirement[]

Requirements that need to be fulfilled for the draft.

### script
::: type: string

Used to attach a script to the current draft.

#### Supported modes of operation

- Loading the script from file:
```json
{
  "script": "script.lua"
}
```

- Declaring the script inline:
```json
{
  "script": "function script:lateInit() Debug.toast('Late init called') end"
}
```

- Using a helper script `#LuaWrapper` for [Real time script editing](../guides/scripting/real-time-script-editing.md):
```json
{
  "script": "#LuaWrapper",
  "meta": {
    "luawrapper": {
      "script": "script.lua",
      "dev": true
    }
  }
}
```

### scripts
::: type: string[]

Like [script](#script), but for multiple scripts.

### searchable
::: type: boolean

Whether the draft can be searched in the toolbar.

### separator
::: type: boolean

Whether to separate the draft from others in a category.

### show new marker
::: type: boolean

Whether the draft will show a new marker in the toolbar.

### sound click
::: type: obj

This sound will be played when clicked on the draft in default mode.

#### Example
One may refer to a file locally:
```json
{
  "sound click": {
    "file": "path to file.mp3"
  }
}
```

Or a game resource:
```json
{
  "sound click": {
    "res": "SOUND_CHRISTMAS_HOHOO"
  }
}
```

### strict lua
::: type: boolean



### template
::: type: string

ID of the template draft to inherit the implementation from.

### template prefix
::: type: string

Has effect only when using templates.

### templates
::: type: string[]

Like template, but accepts multiple IDs.

### text
::: type: string

Description, usually of the building. Should be English if distributed.

**By default**, the value will be null.

### text id
::: type: string



### title
::: type: string

Title, usually of the building. Should be English if distributed.

**By default**, the value will be null.

### title id
::: type: string



### type
::: type: string

A special attribute that determines what kind of attributes and abilities a draft has.

