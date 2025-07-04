# Tags

This is an object of the meta object that contains tags. You can define multiple tags in the same meta object.

Adding custom tags may be useful as you can fetch drafts via tags using [`Draft.getDrafts("meta tag")`](https://doc.theotown.com/modules/Draft.html#getDrafts).

<!-- TODO: add tags that are loaded by Lua -->

## Animation tags

These are tags that are only supported by animation drafts.

### firework

Used for defining [custom fireworks](../../guides/fireworks.md).

#### alpha
The direction of the particle(s).

#### speed
The speed of a particle(s).

#### speed variation

If there should be variation in speed of the particle(s).
#### n
The number of particles to spawn.

#### time
The duration of the particle(s).

#### time variation
If there should be variation in the duration of the particle(s).

#### next
The ID of the particle(s) that should spawn after the lifetime of the current particle(s) expired.


```json
{
  "meta": {
    "tags": {
      "firework": {
        "alpha": 0, // float
        "speed": 0, // float
        "speed variation": 0, // float
        "n": 0, // int
        "time": 0, // int
        "time variation": 0, // float
        "next": [{
          "id": "", // animation draft ID
          "p": 1, // float
          "always": false // bool
        }]
      }
    }
  }
}
```

### road occupation

```json
{
  "meta": {
    "tags": {
      "road occupation": {
        "speed": 1, // float
        "remove flags": 0 // int
      }
    }
  }
}
```




## Building tags

These are tags that are only supported by building drafts.

### build rail

Used to prebuild rails and metro lines for elevated trains and metro. 

```json
{
  "meta": {
    "tags": {
      "build rail": {
        "id": "", // rail or road ID
        "offsets": [], // optional int array

        // These are only if its a road ID
        "level": 0, // int
        "all": false, // bool
        "dir": 1 // int
      }
    }
  }
}
```

### bus depot

Whether a building is considered a bus depot.

```json
{
  "meta": {
    "tags": {
      "bus depot": {}
    }
  }
}
```

### decorator

```json
{
  "meta": {
    "tags": {
      "decorator": {
        "zones": [] // zone ID arr
      }
    }
  }
}
```

### destroyed building

Whether to consider this building as a replacement for destroyed buildings. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed building": {}
    }
  }
}
```

### destroyed building radioactive

Whether to consider this building as a replacement for radioactive destroyed buildings. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed building radioactive": {}
    }
  }
}
```

### destroyed tree

Whether to consider this building as a replacement for destroyed trees. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed tree": {}
    }
  }
}
```

### destroyed tree radioactive

Whether to consider this building as a replacement for radioactive destroyed trees. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed tree radioactive": {}
    }
  }
}
```

### destroyed road

Whether to consider this building as a replacement for destroyed roads. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed road": {}
    }
  }
}
```

### destroyed road radioactive

Whether to consider this building as a replacement for radioactive destroyed roads. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed road radioactive": {}
    }
  }
}
```

### destroyed plain

Whether to consider this building as a replacement for destroyed wires, rail and fences. If no such drafts are defined, `$destroyedtile` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed plain": {}
    }
  }
}
```

### destroyed plain radioactive

Whether to consider this building as a replacement for radioactive destroyed wires, rail and fences. If no such drafts are defined, `$destroyedtileradioactive00` will be used instead.

```json
{
  "meta": {
    "tags": {
      "destroyed plain radioactive": {}
    }
  }
}
```

### dsa rocket supplier

Whether the building is considered a rocket supplier and should spawn supply trucks for the launchpad.

```json
{
  "meta": {
    "tags": {
      "dsa rocket supplier": {}
    }
  }
}
```

### farm field

```json
{
  "meta": {
    "tags": {
      "farm field": {}
    }
  }
}
```

### metro

Whether to consider the building as a metro station.

```json
{
  "meta": {
    "tags": {
      "metro": {}
    }
  }
}
```

### metro_station

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

Whether to consider the building as a metro station.

```json
{
  "meta": {
    "tags": {
      "metro_station": {}
    }
  }
}
```

### metro_depot

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

Whether to consider the building as a metro depot where metro cars are dispatched from.

```json
{
  "meta": {
    "tags": {
      "metro_depot": {}
    }
  }
}
```

### freight_train_platform

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

Whether to consider the building as a freight train platform.

```json
{
  "meta": {
    "tags": {
      "freight_train_platform": {}
    }
  }
}
```

### policehelicopter

```json
{
  "meta": {
    "tags": {
      "policehelicopter": {}
    }
  }
}
```

### railway

Used to define rail-using station buildings. Levels attribute is used to specify served height levels.

- Regular railway stations use `"levels": [0]`
- Elevated railway stations use `"levels": [1]`
- Metro stations use `"levels": [-1]`

```json
{
  "meta": {
    "tags": {
      "railway": {
        "levels": [0]
      }
    }
  }
}
```

### spawn train

ID of a train to spawn at this station. `$train00` by default.

```json
{
  "meta": {
    "tags": {
      "spawn train": {
        "id": "$train00"
      }
    }
  }
}
```




## Bus stop tags

These are tags that are only supported by bus stop drafts.

### default_busstop

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

```json
{
  "meta": {
    "tags": {
      "default_busstop": {}
    }
  }
}
```


## Car tags

These are tags that are only supported by car drafts.

### airport taxi

```json
{
  "meta": {
    "tags": {
      "airport taxi": {}
    }
  }
}
```

### carres0

Used to mark a car draft as a level 1 residential car.

```json
{
  "meta": {
    "tags": {
      "carres0": {}
    }
  }
}
```

### carres1

Used to mark a car draft as a level 2 residential car.

```json
{
  "meta": {
    "tags": {
      "carres1": {}
    }
  }
}
```

### carres2

Used to mark a car draft as a level 3 residential car.

```json
{
  "meta": {
    "tags": {
      "carres2": {}
    }
  }
}
```

### carcom0

Used to mark a car draft as a level 1 commercial car.

```json
{
  "meta": {
    "tags": {
      "carcom0": {}
    }
  }
}
```

### carcom1

Used to mark a car draft as a level 2 commercial car.

```json
{
  "meta": {
    "tags": {
      "carcom1": {}
    }
  }
}
```

### carcom2

Used to mark a car draft as a level 3 commercial car.

```json
{
  "meta": {
    "tags": {
      "carcom2": {}
    }
  }
}
```

### carind0

Used to mark a car draft as a level 1 industrial car.

```json
{
  "meta": {
    "tags": {
      "carind0": {}
    }
  }
}
```

### carind1

Used to mark a car draft as a level 2 industrial car.

```json
{
  "meta": {
    "tags": {
      "carind1": {}
    }
  }
}
```

### carind2

Used to mark a car draft as a level 3 industrial car.

```json
{
  "meta": {
    "tags": {
      "carind2": {}
    }
  }
}
```

### car hearse

Used to mark a car draft as a hearse car.

```json
{
  "meta": {
    "tags": {
      "car hearse": {}
    }
  }
}
```

### fire brigade

Used to mark a car draft as a fire brigade car.

```json
{
  "meta": {
    "tags": {
      "fire brigade": {}
    }
  }
}
```

### garbage

Used to mark a car draft as a garbage truck.

```json
{
  "meta": {
    "tags": {
      "garbage": {}
    }
  }
}
```

### idle bus

```json
{
  "meta": {
    "tags": {
      "idle bus": {}
    }
  }
}
```

### ts_normal_bus

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

Whether to consider the vehicle as a bus that is used in the bus system.

```json
{
  "meta": {
    "tags": {
      "ts_normal_bus": {}
    }
  }
}
```

### medic

Used to mark a car draft as a medic car.

```json
{
  "meta": {
    "tags": {
      "medic": {}
    }
  }
}
```

### military truck

Used to mark a car draft as a military truck.

```json
{
  "meta": {
    "tags": {
      "military truck": {}
    }
  }
}
```

### police

Used to mark a car draft as a police car.

```json
{
  "meta": {
    "tags": {
      "police": {}
    }
  }
}
```

### swat

Used to mark a car draft as a swat car.

```json
{
  "meta": {
    "tags": {
      "swat": {}
    }
  }
}
```




## Feature tags

### consumable

```json
{
  "meta": {
    "tags": {
      "consumable": {}
    }
  }
}
```




## Road tags

These are tags that are only supported by road drafts.

### airport lane

```json
{
  "meta": {
    "tags": {
      "airport lane": {}
    }
  }
}
```

### metro

Whether to consider the road as a metro line.

```json
{
  "meta": {
    "tags": {
      "metro": {}
    }
  }
}
```




## Road decoration tags

These are tags that are only supported by road decoration drafts.

### car accident

Whether the road decoration is considered to be a car accident.

```json
{
  "meta": {
    "tags": {
      "car accident": {}
    }
  }
}
```




## Train car tags

These are tags that are only supported by train car drafts.

### short_distance_passenger_train

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

```json
{
  "meta": {
    "tags": {
      "short_distance_passenger_train": {}
    }
  }
}
```

### long_distance_passenger_train

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

```json
{
  "meta": {
    "tags": {
      "long_distance_passenger_train": {}
    }
  }
}
```

### freight_train

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

```json
{
  "meta": {
    "tags": {
      "freight_train": {}
    }
  }
}
```

### heavy_freight_train

!!! warning "Unstable"

    This feature is part of the ongoing transport update
    and may be subject to change in the future.

```json
{
  "meta": {
    "tags": {
      "heavy_freight_train": {}
    }
  }
}
```

## Tree tags

These are tags that are only supported by tree drafts.

### ranger tree

Whether the tree can be spawned by the Forester's Lodge.

```json
{
  "meta": {
    "tags": {
      "ranger tree": {}
    }
  }
}
```




## Tags supported by all drafts

These are tags that are supported by all drafts, regardless of their type.

<!-- TODO: apparently can be used for fun conditions -->

### budget item

Used to create a new budget item that shows up in the financials menu.

See [budget item attribute](../../draft-types/decoration.md#budget_item) for how it can be referenced from a building.

```json
{
  "meta": {
    "tags": {
      "budget item": {}
    }
  }
}
```

### console

Used to implement a console command with a draft. Multiple commands can be defined.

<!-- TODO: when fun is documented, reference that this supports all transitions -->
```json
{
  "meta": {
    "tags": {
      "console": {
        "commands": {
          "mycustomcommand1": {
            // Fun actions and conditions
            "condition": {...},
            "actions": [
              {"type": "feedback", "id": "Condition ok"},
            ],
            "else actions": [
              {"type": "feedback", "id": "Condition not ok"}
            ]
          },
          "mycustomcommand2": {
            // Fun actions and conditions
            "condition": {...},
            "actions": [
              {"type": "feedback", "id": "Condition ok"},
            ],
            "else actions": [
              {"type": "feedback", "id": "Condition not ok"}
            ]
          }
        }
      }
    }
  }
}
```

### tool

```json
{
  "meta": {
    "tags": {
      "tool": {
        "marker": "" // any of the following: 'pipe', 'water', 'power', 'traffic', 'density', 'happiness', 'level'
      }
    }
  }
}
```
