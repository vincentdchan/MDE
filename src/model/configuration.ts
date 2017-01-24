
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
    Text, Options, Combobox, Checkbox, Slide
}

export interface ConfigItem
{
    label: string;
    type: ConfigItemType;
    value?: any;
    options?: {name: string, label: string}[]; // enable for "Options" and "Combobox"
    onChanged?: (newValue, oldValue: any) => void;
}
