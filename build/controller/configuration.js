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
                    },
                    triggerOnStart: true,
                    value: true,
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
                }
            }
        }
    };
}
exports.configurationThunk = configurationThunk;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBaUM7QUFDakMsMERBQ3FEO0FBTXJELDRCQUFtQyxHQUFRO0lBQ3ZDLE1BQU0sQ0FBQztRQUNILFNBQVMsRUFBRTtZQUNQLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDL0MsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO29CQUN4RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxPQUFPO29CQUM1QixPQUFPLEVBQUUsQ0FBQzs0QkFDTixJQUFJLEVBQUUsS0FBSzs0QkFDWCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO3lCQUMvRCxFQUFFOzRCQUNDLElBQUksRUFBRSxLQUFLOzRCQUNYLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQy9ELENBQUM7b0JBQ0YsS0FBSyxFQUFFLFdBQUMsQ0FBQyxrQkFBa0IsRUFBRTtpQkFDaEM7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQztvQkFDOUQsSUFBSSxFQUFFLDhCQUFjLENBQUMsUUFBUTtvQkFDN0IsU0FBUyxFQUFFLENBQUMsS0FBSzt3QkFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxTQUFTLENBQUM7NEJBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO3dCQUM3RSxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzRCQUMxQyxHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3RDLENBQUM7b0JBQ0wsQ0FBQztvQkFDRCxjQUFjLEVBQUUsSUFBSTtvQkFDcEIsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDN0MsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO29CQUN0RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxLQUFLO29CQUMxQixPQUFPLEVBQUUsQ0FBRTs0QkFDUCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDO3lCQUM3RCxFQUFFOzRCQUNDLElBQUksRUFBRSxRQUFROzRCQUNkLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUM7eUJBQ2hFLEVBQUU7NEJBQ0MsSUFBSSxFQUFFLE9BQU87NEJBQ2IsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQzt5QkFDL0QsQ0FBQztvQkFDRixLQUFLLEVBQUUsUUFBUTtvQkFDZixTQUFTLEVBQUUsQ0FBQyxLQUFLO3dCQUNiLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7d0JBQ3RELElBQUksV0FBVyxHQUFnQixRQUFRLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7d0JBRS9FLGtCQUFrQixLQUFnQixFQUFFLFNBQWlCOzRCQUNqRCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzNELENBQUM7d0JBRUQsb0JBQW9CLEtBQWdCOzRCQUNoQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSTtnQ0FDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQ0FDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7Z0NBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUN4QyxDQUFDLENBQUMsQ0FBQzt3QkFDUCxDQUFDO3dCQUVELElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO3dCQUVuQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2xCLE1BQU0sQ0FBQSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7NEJBQ1gsS0FBSyxLQUFLO2dDQUNOLFFBQVEsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7Z0NBQzVCLEtBQUssQ0FBQzs0QkFDVixLQUFLLFFBQVE7Z0NBQ1QsUUFBUSxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztnQ0FDL0IsS0FBSyxDQUFDOzRCQUNWLEtBQUssT0FBTztnQ0FDUixRQUFRLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO2dDQUM5QixLQUFLLENBQUM7d0JBQ2QsQ0FBQztvQkFDTCxDQUFDO2lCQUNKO2FBQ0o7U0FDSjtLQUNKLENBQUE7QUFDTCxDQUFDO0FBbkZELGdEQW1GQyIsImZpbGUiOiJjb250cm9sbGVyL2NvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
