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
                },
                "lineHeight": {
                    labelThunk: () => util_1.i18n.getString("config.style.lineHeight"),
                    type: configuration_1.ConfigItemType.Text,
                    value: "18",
                }
            }
        }
    };
}
exports.configurationThunk = configurationThunk;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxrQ0FBaUM7QUFDakMsMERBQW9GO0FBTXBGLDRCQUFtQyxHQUFRO0lBQ3ZDLE1BQU0sQ0FBQztRQUNILFNBQVMsRUFBRTtZQUNQLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUM7WUFDL0MsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDO29CQUN4RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxPQUFPO29CQUM1QixPQUFPLEVBQUUsQ0FBQzs0QkFDTixJQUFJLEVBQUUsS0FBSzs0QkFDWCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO3lCQUMvRCxFQUFFOzRCQUNDLElBQUksRUFBRSxLQUFLOzRCQUNYLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQy9ELENBQUM7b0JBQ0YsS0FBSyxFQUFFLFdBQUMsQ0FBQyxrQkFBa0IsRUFBRTtpQkFDaEM7Z0JBQ0QsZ0JBQWdCLEVBQUU7b0JBQ2QsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQywrQkFBK0IsQ0FBQztvQkFDOUQsSUFBSSxFQUFFLDhCQUFjLENBQUMsUUFBUTtpQkFDaEM7YUFDSjtTQUNKO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUM7WUFDN0MsS0FBSyxFQUFFO2dCQUNILFVBQVUsRUFBRTtvQkFDUixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO29CQUN0RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxLQUFLO29CQUMxQixPQUFPLEVBQUUsQ0FBRTs0QkFDUCxJQUFJLEVBQUUsS0FBSzs0QkFDWCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDJCQUEyQixDQUFDO3lCQUM3RCxFQUFFOzRCQUNDLElBQUksRUFBRSxRQUFROzRCQUNkLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUM7eUJBQ2hFLEVBQUU7NEJBQ0MsSUFBSSxFQUFFLE9BQU87NEJBQ2IsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQzt5QkFDL0QsQ0FBQztvQkFDRixLQUFLLEVBQUUsUUFBUTtpQkFDbEI7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7b0JBQ3hELElBQUksRUFBRSw4QkFBYyxDQUFDLElBQUk7b0JBQ3pCLEtBQUssRUFBRSxJQUFJO2lCQUNkO2FBQ0o7U0FDSjtLQUNKLENBQUE7QUFDTCxDQUFDO0FBakRELGdEQWlEQyIsImZpbGUiOiJjb250cm9sbGVyL2NvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
