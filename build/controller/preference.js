"use strict";
const util_1 = require("../util");
const viewSetting_1 = require("../view/viewSetting");
exports.preferences = {
    tabs: [{
            name: "general",
            label: util_1.i18n.getString("preference.tab.general"),
            items: [{
                    name: "test",
                    label: "Test 1",
                    type: viewSetting_1.SettingItemType.Text,
                }, {
                    name: "test2",
                    label: "Test 2",
                    type: viewSetting_1.SettingItemType.Checkbox,
                }]
        }, {
            name: "other",
            label: "Other",
            items: [{
                    name: "test2",
                    label: "Test 2",
                    type: viewSetting_1.SettingItemType.Text
                }, {
                    name: "test3",
                    label: "Test 3",
                    type: viewSetting_1.SettingItemType.Options,
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL3ByZWZlcmVuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHVCQUF3QixTQUN4QixDQUFDLENBRGdDO0FBQ2pDLDhCQUFnRSxxQkFFaEUsQ0FBQyxDQUZvRjtBQUUxRSxtQkFBVyxHQUFhO0lBQy9CLElBQUksRUFBRSxDQUFDO1lBQ0MsSUFBSSxFQUFFLFNBQVM7WUFDZixLQUFLLEVBQUUsV0FBQyxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQztZQUM1QyxLQUFLLEVBQUUsQ0FBQztvQkFDSixJQUFJLEVBQUUsTUFBTTtvQkFDWixLQUFLLEVBQUUsUUFBUTtvQkFDZixJQUFJLEVBQUUsNkJBQWUsQ0FBQyxJQUFJO2lCQUM3QixFQUFFO29CQUNDLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxRQUFRO29CQUNmLElBQUksRUFBRSw2QkFBZSxDQUFDLFFBQVE7aUJBQ2pDLENBQUM7U0FDTCxFQUFFO1lBQ0MsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxDQUFDO29CQUNKLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxRQUFRO29CQUNmLElBQUksRUFBRSw2QkFBZSxDQUFDLElBQUk7aUJBQzdCLEVBQUU7b0JBQ0MsSUFBSSxFQUFFLE9BQU87b0JBQ2IsS0FBSyxFQUFFLFFBQVE7b0JBQ2YsSUFBSSxFQUFFLDZCQUFlLENBQUMsT0FBTztvQkFDN0IsT0FBTyxFQUFFLENBQUU7NEJBQ1AsSUFBSSxFQUFFLFNBQVM7NEJBQ2YsS0FBSyxFQUFFLFVBQVU7eUJBQ3BCLEVBQUU7NEJBQ0MsSUFBSSxFQUFFLFdBQVc7NEJBQ2pCLEtBQUssRUFBRSxZQUFZO3lCQUN0QixDQUFDO2lCQUNMLENBQUM7U0FDTDtLQUNKO0NBQ0osQ0FBQSIsImZpbGUiOiJjb250cm9sbGVyL3ByZWZlcmVuY2UuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
