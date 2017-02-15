import {i18n as $} from "../util"
import {Config, ConfigTab, ConfigItemType, ConfigItem} from "../model/configuration"
import {MDE} from "."

/**
 * lazy loading the label
 */
export function configurationThunk(mde: MDE) : Config {
    return {
        "general": {
            labelThunk: () => $.getString("config.general"),
            items: {
                "language": {
                    labelThunk: () => $.getString("config.general.language"),
                    type: ConfigItemType.Options,
                    options: [{ 
                        name: "chs",
                        labelThunk: () => $.getString("config.general.language.chs"),
                    }, {
                        name: "esn",
                        labelThunk: () => $.getString("config.general.language.esn"),
                    }],
                    value: $.getDefaultLanguage(),
                },
                "showLineNumber": {
                    labelThunk: () => $.getString("config.general.showLineNumber"),
                    type: ConfigItemType.Checkbox,
                }
            }
        }, 
        "style": {
            labelThunk: () => $.getString("config.style"),
            items: {
                "fontSize": {
                    labelThunk: () => $.getString("config.style.fontSize"),
                    type: ConfigItemType.Radio,
                    options: [ {
                        name: "big",
                        labelThunk: () => $.getString("config.style.fontSize.big"),
                    }, {
                        name: "normal",
                        labelThunk: () => $.getString("config.style.fontSize.normal"),
                    }, {
                        name: "small",
                        labelThunk: () => $.getString("config.style.fontSize.small"),
                    }],
                    value: "normal",
                }, 
                "lineHeight": {
                    labelThunk: () => $.getString("config.style.lineHeight"),
                    type: ConfigItemType.Text,
                    value: "18",
                }
            }
        }
    }
}
