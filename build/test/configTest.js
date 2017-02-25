"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const configuration_1 = require("../model/configuration");
const path = require("path");
const fs = require("fs");
describe("Config", () => {
    console.log("Config Test...");
    let testConfig = {
        "testTab1": {
            labelThunk: () => "Test Tab 1",
            items: {
                "testTab1Item1": {
                    labelThunk: () => "Test Tab1 Item1",
                    type: configuration_1.ConfigItemType.Text,
                    value: "Item1 Value",
                },
                "testTab1Item2": {
                    labelThunk: () => "Test Tab1 Item2",
                    type: configuration_1.ConfigItemType.Text,
                    value: "Item2 Value"
                }
            }
        },
        "testTab2": {
            labelThunk: () => "Test Tab 2",
            items: {
                "testTab2Item1": {
                    labelThunk: () => "Test Tab2 Item1",
                    type: configuration_1.ConfigItemType.Slide,
                    value: 40,
                }
            }
        }
    };
    let testConfigFilePath = path.join(__dirname, "./test_config.json");
    describe("#lazyLoadLabel", () => {
        configuration_1.ConfigurationUtil.completeLabel(testConfig);
        assert.equal(testConfig["testTab1"].label, "Test Tab 1");
        assert.equal(testConfig["testTab1"].items["testTab1Item1"].label, "Test Tab1 Item1");
        assert.equal(testConfig["testTab1"].items["testTab1Item2"].label, "Test Tab1 Item2");
        assert.equal(testConfig["testTab2"].label, "Test Tab 2");
        assert.equal(testConfig["testTab2"].items["testTab2Item1"].label, "Test Tab2 Item1");
    });
    describe("#Save", () => {
        assert(configuration_1.ConfigurationUtil.saveConfigToPath(testConfigFilePath, testConfig));
        assert(fs.existsSync(testConfigFilePath));
    });
    describe("#Load", () => {
        console.log("initializing loading config test...");
        testConfig["testTab1"].items["testTab1Item1"].value = "";
        testConfig["testTab1"].items["testTab1Item2"].value = "";
        testConfig["testTab2"].items["testTab2Item1"].value = 0;
        assert(configuration_1.ConfigurationUtil.loadConfigFromPath(testConfigFilePath, testConfig));
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFrQixDQUFDLGtCQUFrQixFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQztRQUN2RixNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRXZGLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDaEYsQ0FBQyxDQUFDLENBQUE7SUFHRixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJ0ZXN0L2NvbmZpZ1Rlc3QuanMiLCJzb3VyY2VSb290Ijoic3JjLyJ9
