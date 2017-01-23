import {i18n as $} from "../util"
import {Setting, SettingTab, SettingItemType, SettingItem} from "../view/viewSetting"

export let preferences : Setting = {
    tabs: [{
            name: "general",
            label: $.getString("preference.tab.general"),
            items: [{
                name: "test",
                label: "Test 1",
                type: SettingItemType.Text,
            }, {
                name: "test2",
                label: "Test 2",
                type: SettingItemType.Checkbox,
            }]
        }, {
            name: "other",
            label: "Other",
            items: [{
                name: "test2",
                label: "Test 2",
                type: SettingItemType.Text
            }, {
                name: "test3",
                label: "Test 3",
                type: SettingItemType.Options,
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
