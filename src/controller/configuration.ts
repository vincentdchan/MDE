import {i18n as $} from "../util"
import {Config, ConfigTab, ConfigItemType, ConfigItem, 
    ValidatorGenerator} from "../model/configuration"
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
                    onChanged: (value) => {
                        if (typeof value !== "boolean") throw new TypeError("value must be boolean");
                        if (value !== mde.editorView.showLineNumber) {
                            mde.editorView.toggleLineNumber();
                        }
                    },
                    triggerOnStart: true,
                    value: true,
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
                    onChanged: (value) => {
                        let docElem = document.querySelector(".mde-document");
                        let previewElem = <HTMLElement>document.querySelector(".mde-preview-document");

                        function addClass(elems: Element[], className: string) {
                            elems.forEach((elem) => elem.classList.add(className));
                        }

                        function clearClass(elems: Element[]) {
                            elems.forEach((elem) => {
                                elem.classList.remove("big-font");
                                elem.classList.remove("normal-font");
                                elem.classList.remove("small-font");
                            });
                        }

                        let elems = [docElem, previewElem];

                        clearClass(elems);
                        switch(value) {
                            case "big":
                                addClass(elems, "big-font");
                                break;
                            case "normal":
                                addClass(elems, "normal-font");
                                break;
                            case "small":
                                addClass(elems, "small-font");
                                break;
                        }
                    }
                }, 
                "lineHeight": {
                    labelThunk: () => $.getString("config.style.lineHeight"),
                    type: ConfigItemType.Text,
                    value: "18",
                    validators: [ValidatorGenerator.NumberInRange(14, 25)]
                }
            }
        }
    }
}
