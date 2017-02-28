"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
const configuration_1 = require("../model/configuration");
function configurationThunk(mde) {
    return {
        "general": {
            labelThunk: () => util_1.i18n.getString("config.general"),
            items: {
                "language": {
                    labelThunk: () => util_1.i18n.getString("config.general.language"),
                    type: configuration_1.ConfigItemType.Options,
                    options: [{
                            name: "chs",
                            labelThunk: () => util_1.i18n.getString("config.general.language.chs"),
                        }, {
                            name: "esn",
                            labelThunk: () => util_1.i18n.getString("config.general.language.esn"),
                        }],
                    value: util_1.i18n.getDefaultLanguage(),
                },
                "showLineNumber": {
                    labelThunk: () => util_1.i18n.getString("config.general.showLineNumber"),
                    type: configuration_1.ConfigItemType.Checkbox,
                    onChanged: (value) => {
                        if (typeof value !== "boolean")
                            throw new TypeError("value must be boolean");
                        if (value !== mde.editorView.showLineNumber) {
                            mde.editorView.toggleLineNumber();
                        }
                    }
                }
            }
        },
        "style": {
            labelThunk: () => util_1.i18n.getString("config.style"),
            items: {
                "fontSize": {
                    labelThunk: () => util_1.i18n.getString("config.style.fontSize"),
                    type: configuration_1.ConfigItemType.Radio,
                    options: [{
                            name: "big",
                            labelThunk: () => util_1.i18n.getString("config.style.fontSize.big"),
                        }, {
                            name: "normal",
                            labelThunk: () => util_1.i18n.getString("config.style.fontSize.normal"),
                        }, {
                            name: "small",
                            labelThunk: () => util_1.i18n.getString("config.style.fontSize.small"),
                        }],
                    value: "normal",
                    onChanged: (value) => {
                        let docElem = document.querySelector(".mde-document");
                        let previewElem = document.querySelector(".mde-preview-document");
                        function addClass(elems, className) {
                            elems.forEach((elem) => elem.classList.add(className));
                        }
                        function clearClass(elems) {
                            elems.forEach((elem) => {
                                elem.classList.remove("big-font");
                                elem.classList.remove("normal-font");
                                elem.classList.remove("small-font");
                            });
                        }
                        let elems = [docElem, previewElem];
                        clearClass(elems);
                        switch (value) {
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
                    labelThunk: () => util_1.i18n.getString("config.style.lineHeight"),
                    type: configuration_1.ConfigItemType.Text,
                    value: "18",
                    validator: [configuration_1.ValidatorGenerator.NumberInRange(14, 25)]
                }
            }
        }
    };
}
exports.configurationThunk = configurationThunk;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBaUM7QUFDakMsMERBQ3FEO0FBTXJELDRCQUFtQyxHQUFRO0lBQ3ZDLE1BQU0sQ0FBQztRQUNILFNBQVMsRUFBRTtZQUNQLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDL0MsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO29CQUN4RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxPQUFPO29CQUM1QixPQUFPLEVBQUUsQ0FBQzs0QkFDTixJQUFJLEVBQUUsS0FBSzs0QkFDWCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO3lCQUMvRCxFQUFFOzRCQUNDLElBQUksRUFBRSxLQUFLOzRCQUNYLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQy9ELENBQUM7b0JBQ0YsS0FBSyxFQUFFLFdBQUMsQ0FBQyxrQkFBa0IsRUFBRTtpQkFDaEM7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQztvQkFDOUQsSUFBSSxFQUFFLDhCQUFjLENBQUMsUUFBUTtvQkFDN0IsU0FBUyxFQUFFLENBQUMsS0FBSzt3QkFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7NEJBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3dCQUM3RSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFF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
