"use strict";
const util_1 = require("../util");
const viewConfig_1 = require("../view/viewConfig");
function configurationThunk(mde) {
    return {
        tabs: [{
                name: "general",
                label: util_1.i18n.getString("preference.tab.general"),
                items: [{
                        name: "test",
                        label: "Test 1",
                        type: viewConfig_1.ConfigItemType.Text,
                    }, {
                        name: "test2",
                        label: "Test 2",
                        type: viewConfig_1.ConfigItemType.Checkbox,
                    }]
            }, {
                name: "other",
                label: "Other",
                items: [{
                        name: "test2",
                        label: "Test 2",
                        type: viewConfig_1.ConfigItemType.Text
                    }, {
                        name: "test3",
                        label: "Test 3",
                        type: viewConfig_1.ConfigItemType.Options,
                        options: [{
                                name: "dayMode",
                                label: "Day Mode",
                            }, {
                                name: "nightMode",
                                label: "Night Mode",
                            }]
                    }]
            }
        ]
    };
}
exports.configurationThunk = configurationThunk;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL2NvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUN4QixDQUFDLENBRGdDO0FBQ2pDLDZCQUE0RCxvQkFDNUQsQ0FBQyxDQUQrRTtBQUdoRiw0QkFBbUMsR0FBUTtJQUN2QyxNQUFNLENBQUM7UUFDSCxJQUFJLEVBQUUsQ0FBQztnQkFDQyxJQUFJLEVBQUUsU0FBUztnQkFDZixLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDNUMsS0FBSyxFQUFFLENBQUM7d0JBQ0osSUFBSSxFQUFFLE1BQU07d0JBQ1osS0FBSyxFQUFFLFFBQVE7d0JBQ2YsSUFBSSxFQUFFLDJCQUFjLENBQUMsSUFBSTtxQkFDNUIsRUFBRTt3QkFDQyxJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsMkJBQWMsQ0FBQyxRQUFRO3FCQUNoQyxDQUFDO2FBQ0wsRUFBRTtnQkFDQyxJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsT0FBTztnQkFDZCxLQUFLLEVBQUUsQ0FBQzt3QkFDSixJQUFJLEVBQUUsT0FBTzt3QkFDYixLQUFLLEVBQUUsUUFBUTt3QkFDZixJQUFJLEVBQUUsMkJBQWMsQ0FBQyxJQUFJO3FCQUM1QixFQUFFO3dCQUNDLElBQUksRUFBRSxPQUFPO3dCQUNiLEtBQUssRUFBRSxRQUFRO3dCQUNmLElBQUksRUFBRSwyQkFBYyxDQUFDLE9BQU87d0JBQzVCLE9BQU8sRUFBRSxDQUFFO2dDQUNQLElBQUksRUFBRSxTQUFTO2dDQUNmLEtBQUssRUFBRSxVQUFVOzZCQUNwQixFQUFFO2dDQUNDLElBQUksRUFBRSxXQUFXO2dDQUNqQixLQUFLLEVBQUUsWUFBWTs2QkFDdEIsQ0FBQztxQkFDTCxDQUFDO2FBQ0w7U0FDSjtLQUNKLENBQUE7QUFDTCxDQUFDO0FBcENlLDBCQUFrQixxQkFvQ2pDLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9jb25maWd1cmF0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
