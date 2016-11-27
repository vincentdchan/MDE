"use strict";
const electron_1 = require("electron");
const { Menu, MenuItem } = electron_1.remote;
const menuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "New File"
            },
            {
                type: "separator"
            },
            {
                label: "Open"
            },
            {
                label: "Save"
            },
            {
                label: "Save as"
            },
            {
                label: "Preference"
            },
            {
                type: "separator"
            },
            {
                label: "Exit"
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            {
                role: "undo"
            },
            {
                role: "redo"
            },
            {
                type: "separator"
            },
            {
                role: "cut"
            },
            {
                role: "copy"
            },
            {
                role: "paste"
            },
            {
                role: "selectall"
            },
        ]
    },
    {
        label: "View",
        submenu: [
            {
                label: "Toggle dev tools",
                click() {
                    console.log("toogle dev tools");
                }
            },
            {
                label: "Reload",
                click() {
                    console.log("reloadk");
                }
            }
        ]
    }
];
function generateMenu() {
    let menu = Menu.buildFromTemplate(menuTemplate);
    menu.append(new MenuItem("File"));
    return menu;
}
exports.generateMenu = generateMenu;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL21lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFxQixVQUNyQixDQUFDLENBRDhCO0FBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUUvQixNQUFNLFlBQVksR0FBZ0M7SUFDOUM7UUFDSSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNMO2dCQUNJLEtBQUssRUFBRSxVQUFVO2FBQ3BCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsWUFBWTthQUN0QjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07YUFDaEI7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNMO2dCQUNJLElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRDtnQkFDSSxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsS0FBSzthQUNkO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07YUFDZjtZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNMO2dCQUNJLEtBQUssRUFBRSxrQkFBa0I7Z0JBQ3pCLEtBQUs7b0JBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDO2FBQ0o7WUFDRDtnQkFDSSxLQUFLLEVBQUUsUUFBUTtnQkFDZixLQUFLO29CQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNCLENBQUM7YUFDSjtTQUNKO0tBQ0o7Q0FDSixDQUFBO0FBRUQ7SUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRWxDLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQU5lLG9CQUFZLGVBTTNCLENBQUEiLCJmaWxlIjoiY29udHJvbGxlci9tZW51LmpzIiwic291cmNlUm9vdCI6InNyYy8ifQ==
