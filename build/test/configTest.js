"use strict";
const assert = require("assert");
const configuration_1 = require("../model/configuration");
const configuration_2 = require("../controller/configuration");
const path = require("path");
const fs = require("fs");
describe("Config", () => {
    console.log("Config Test...");
    let testConfig = {
        "testTab1": {
            label: "Test Tab 1",
            items: {
                "testTab1Item1": {
                    label: "Test Tab1 Item1",
                    type: configuration_1.ConfigItemType.Text,
                    value: "Item1 Value",
                },
                "testTab1Item2": {
                    label: "Test Tab1 Item2",
                    type: configuration_1.ConfigItemType.Text,
                    value: "Item2 Value"
                }
            }
        },
        "testTab2": {
            label: "Test Tab 2",
            items: {
                "testTab2Item1": {
                    label: "Test Tab2 Item1",
                    type: configuration_1.ConfigItemType.Slide,
                    value: 40,
                }
            }
        }
    };
    let testConfigFilePath = path.join(__dirname, "./test_config.json");
    describe("#Save", () => {
        assert(configuration_2.Configuration.saveConfigToPath(testConfigFilePath, testConfig));
        assert(fs.existsSync(testConfigFilePath));
    });
    describe("#Load", () => {
        console.log("initializing loading config test...");
        testConfig["testTab1"].items["testTab1Item1"].value = "";
        testConfig["testTab1"].items["testTab1Item2"].value = "";
        testConfig["testTab2"].items["testTab2Item1"].value = 0;
        assert(configuration_2.Configuration.loadConfigFromPath(testConfigFilePath, testConfig));
        assert.strictEqual(testConfig["testTab1"].items["testTab1Item1"].value, "Item1 Value");
        assert.strictEqual(testConfig["testTab1"].items["testTab1Item2"].value, "Item2 Value");
        assert.strictEqual(testConfig["testTab2"].items["testTab2Item1"].value, 40);
    });
    if (fs.existsSync(testConfigFilePath)) {
        console.log("config test clear work");
        fs.unlinkSync(testConfigFilePath);
        console.log("config test clear work done!");
    }
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy90ZXN0L2NvbmZpZ1Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQVksTUFBTSxXQUFNLFFBQ3hCLENBQUMsQ0FEK0I7QUFFaEMsZ0NBQTRELHdCQUM1RCxDQUFDLENBRG1GO0FBQ3BGLGdDQUE0Qiw2QkFDNUIsQ0FBQyxDQUR3RDtBQUN6RCxNQUFZLElBQUksV0FBTSxNQUN0QixDQUFDLENBRDJCO0FBQzVCLE1BQVksRUFBRSxXQUFNLElBRXBCLENBQUMsQ0FGdUI7QUFFeEIsUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUVmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUU3QixJQUFJLFVBQVUsR0FBWTtRQUN0QixVQUFVLEVBQUU7WUFDUixLQUFLLEVBQUUsWUFBWTtZQUNuQixLQUFLLEVBQUU7Z0JBQ0gsZUFBZSxFQUFFO29CQUNiLEtBQUssRUFBRSxpQkFBaUI7b0JBQ3hCLElBQUksRUFBRSw4QkFBYyxDQUFDLElBQUk7b0JBQ3pCLEtBQUssRUFBRSxhQUFhO2lCQUN2QjtnQkFDRCxlQUFlLEVBQUU7b0JBQ2IsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsSUFBSSxFQUFFLDhCQUFjLENBQUMsSUFBSTtvQkFDekIsS0FBSyxFQUFFLGFBQWE7aUJBQ3ZCO2FBQ0o7U0FDSjtRQUNELFVBQVUsRUFBRTtZQUNSLEtBQUssRUFBRSxZQUFZO1lBQ25CLEtBQUssRUFBRTtnQkFDSCxlQUFlLEVBQUU7b0JBQ2IsS0FBSyxFQUFFLGlCQUFpQjtvQkFDeEIsSUFBSSxFQUFFLDhCQUFjLENBQUMsS0FBSztvQkFDMUIsS0FBSyxFQUFFLEVBQUU7aUJBQ1o7YUFDSjtTQUNKO0tBQ0osQ0FBQTtJQUVELElBQUksa0JBQWtCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUVwRSxRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2QsTUFBTSxDQUFDLDZCQUFhLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsT0FBTyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO1FBQ2xELFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQTtRQUN4RCxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7UUFFeEQsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBRXZELE1BQU0sQ0FBQyw2QkFBYSxDQUFDLGtCQUFrQixDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2RixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZGLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUE7SUFHRixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJ0ZXN0L2NvbmZpZ1Rlc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
