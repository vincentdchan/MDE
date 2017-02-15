"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFpQztBQUNqQywwREFBb0Y7QUFNcEYsNEJBQW1DLEdBQVE7SUFDdkMsTUFBTSxDQUFDO1FBQ0gsU0FBUyxFQUFFO1lBQ1AsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUMvQyxLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFO29CQUNSLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUM7b0JBQ3hELElBQUksRUFBRSw4QkFBYyxDQUFDLE9BQU87b0JBQzVCLE9BQU8sRUFBRSxDQUFDOzRCQUNOLElBQUksRUFBRSxLQUFLOzRCQUNYLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUM7eUJBQy9ELEVBQUU7NEJBQ0MsSUFBSSxFQUFFLEtBQUs7NEJBQ1gsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsQ0FBQzt5QkFDL0QsQ0FBQztvQkFDRixLQUFLLEVBQUUsV0FBQyxDQUFDLGtCQUFrQixFQUFFO2lCQUNoQztnQkFDRCxnQkFBZ0IsRUFBRTtvQkFDZCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLCtCQUErQixDQUFDO29CQUM5RCxJQUFJLEVBQUUsOEJBQWMsQ0FBQyxRQUFRO2lCQUNoQzthQUNKO1NBQ0o7UUFDRCxPQUFPLEVBQUU7WUFDTCxVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQztZQUM3QyxLQUFLLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFO29CQUNSLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUM7b0JBQ3RELElBQUksRUFBRSw4QkFBYyxDQUFDLEtBQUs7b0JBQzFCLE9BQU8sRUFBRSxDQUFFOzRCQUNQLElBQUksRUFBRSxLQUFLOzRCQUNYLFVBQVUsRUFBRSxNQUFNLFdBQUMsQ0FBQyxTQUFTLENBQUMsMkJBQTJCLENBQUM7eUJBQzdELEVBQUU7NEJBQ0MsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQzt5QkFDaEUsRUFBRTs0QkFDQyxJQUFJLEVBQUUsT0FBTzs0QkFDYixVQUFVLEVBQUUsTUFBTSxXQUFDLENBQUMsU0FBUyxDQUFDLDZCQUE2QixDQUFDO3lCQUMvRCxDQUFDO29CQUNGLEtBQUssRUFBRSxRQUFRO2lCQUNsQjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsVUFBVSxFQUFFLE1BQU0sV0FBQyxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsQ0FBQztvQkFDeEQsSUFBSSxFQUFFLDhCQUFjLENBQUMsSUFBSTtvQkFDekIsS0FBSyxFQUFFLElBQUk7aUJBQ2Q7YUFDSjtTQUNKO0tBQ0osQ0FBQTtBQUNMLENBQUM7QUFqREQsZ0RBaURDIiwiZmlsZSI6ImNvbnRyb2xsZXIvY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
