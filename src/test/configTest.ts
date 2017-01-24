import * as assert from "assert"
import * as mocha from "mocha"
import {Config, ConfigTab, ConfigItem, ConfigItemType} from "../model/configuration"
import {Configuration} from "../controller/configuration"
import * as path from "path"
import * as fs from "fs"

describe("Config", () => {

    console.log("Config Test...")

    let testConfig : Config = {
        "testTab1": {
            label: "Test Tab 1",
            items: {
                "testTab1Item1": {
                    label: "Test Tab1 Item1",
                    type: ConfigItemType.Text,
                    value: "Item1 Value",
                }, 
                "testTab1Item2": {
                    label: "Test Tab1 Item2",
                    type: ConfigItemType.Text,
                    value: "Item2 Value"
                }
            }
        }, 
        "testTab2": {
            label: "Test Tab 2",
            items: {
                "testTab2Item1": {
                    label: "Test Tab2 Item1",
                    type: ConfigItemType.Slide,
                    value: 40,
                }
            }
        }
    }

    let testConfigFilePath = path.join(__dirname, "./test_config.json");

    describe("#Save", () => {
        assert(Configuration.saveConfigToPath(testConfigFilePath, testConfig));
        assert(fs.existsSync(testConfigFilePath));
    })

    describe("#Load", () => {
        console.log("initializing loading config test...")
        testConfig["testTab1"].items["testTab1Item1"].value = ""
        testConfig["testTab1"].items["testTab1Item2"].value = ""

        testConfig["testTab2"].items["testTab2Item1"].value = 0 

        assert(Configuration.loadConfigFromPath(testConfigFilePath, testConfig));
        assert.strictEqual(testConfig["testTab1"].items["testTab1Item1"].value, "Item1 Value");
        assert.strictEqual(testConfig["testTab1"].items["testTab1Item2"].value, "Item2 Value");

        assert.strictEqual(testConfig["testTab2"].items["testTab2Item1"].value, 40);
    })

    // clear file after test
    if (fs.existsSync(testConfigFilePath)) {
        console.log("config test clear work");
        fs.unlinkSync(testConfigFilePath);
        console.log("config test clear work done!");
    }

})
