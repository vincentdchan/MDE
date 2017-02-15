
export interface Config
{
    [tabName: string]: ConfigTab;
}

export interface ConfigTab
{
    label: string;
    items: {
        [itemName: string]: ConfigItem;
    };
}

export enum ConfigItemType
{
    Text, Options, Radio, Checkbox, Slide
}

export enum ValidateType {
    Normal, Warning, Error
}

export interface ValidateResult {
    type: ValidateType;
    message: string
}

export function isValidateResult(obj: any) : obj is ValidateResult {
    return "type" in obj && "message" in obj && typeof obj["message"] == "string";
}

/**
 * When new value is giving to the config item,
 * it will be passed to a validator.
 * 
 * A validator could be a funtion or an object.
 * 
 * A validator will check the value and return the result.
 * 
 * ```
 * if the return value is boolean then
 *     if value is true:
 *         update the value
 *     else
 *         show an red alert
 * ```
 * 
 * if the return value is A `ValidateResult`
 * then show the alert according to the result
 */
export interface Validator {
    (value: any): boolean | ValidateResult; 
}

export interface ConfigItem
{

    label: string;

    type: ConfigItemType;

    value?: any;

    /**
     * enable for **Options** and **Combobox**
     */
    options?: {name: string, label: string}[];

    /**
     * trigger when the value is given to the ConfigItem, 
     * even if load config from the file.
     */
    onChanged?: (newValue, oldValue: any) => void;

    validator? : [Validator];

}
