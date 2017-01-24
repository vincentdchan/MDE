import {i18n as $} from "../util"
import {Config, ConfigTab, ConfigItemType, ConfigItem} from "../view/viewConfig"
import {MDE} from "."

export function configurationThunk(mde: MDE) : Config {
    return {
        tabs: [{
                name: "general",
                label: $.getString("preference.tab.general"),
                items: [{
                    name: "test",
                    label: "Test 1",
                    type: ConfigItemType.Text,
                }, {
                    name: "test2",
                    label: "Test 2",
                    type: ConfigItemType.Checkbox,
                }]
            }, {
                name: "other",
                label: "Other",
                items: [{
                    name: "test2",
                    label: "Test 2",
                    type: ConfigItemType.Text
                }, {
                    name: "test3",
                    label: "Test 3",
                    type: ConfigItemType.Options,
                    options: [ {
                        name: "dayMode",
                        label: "Day Mode",
                    }, {
                        name: "nightMode",
                        label: "Night Mode",
                    }]
                }]
            }
        ]
    }
}