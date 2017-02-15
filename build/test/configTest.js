"use strict";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QWtCLENBQUMsa0JBQWtCLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM3RSxNQUFNLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFdkYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUMsQ0FBQTtJQUdGLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3RDLEVBQUUsQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDaEQsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFBIiwiZmlsZSI6InRlc3QvY29uZmlnVGVzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
