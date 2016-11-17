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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb250cm9sbGVyL21lbnUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJCQUFxQixVQUNyQixDQUFDLENBRDhCO0FBQy9CLE1BQU0sRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLEdBQUcsaUJBQU0sQ0FBQTtBQUUvQixNQUFNLFlBQVksR0FBZ0M7SUFDOUM7UUFDSSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNMO2dCQUNJLEtBQUssRUFBRSxVQUFVO2FBQ3BCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsTUFBTTthQUNoQjtZQUNEO2dCQUNJLEtBQUssRUFBRSxNQUFNO2FBQ2hCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLFNBQVM7YUFDbkI7WUFDRDtnQkFDSSxLQUFLLEVBQUUsWUFBWTthQUN0QjtZQUNEO2dCQUNJLElBQUksRUFBRSxXQUFXO2FBQ3BCO1lBQ0Q7Z0JBQ0ksS0FBSyxFQUFFLE1BQU07YUFDaEI7U0FDSjtLQUNKO0lBQ0Q7UUFDSSxLQUFLLEVBQUUsTUFBTTtRQUNiLE9BQU8sRUFBRTtZQUNMO2dCQUNJLElBQUksRUFBRSxNQUFNO2FBQ2Y7WUFDRDtnQkFDSSxJQUFJLEVBQUUsTUFBTTthQUNmO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7WUFDRDtnQkFDSSxJQUFJLEVBQUUsS0FBSzthQUNkO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLE1BQU07YUFDZjtZQUNEO2dCQUNJLElBQUksRUFBRSxPQUFPO2FBQ2hCO1lBQ0Q7Z0JBQ0ksSUFBSSxFQUFFLFdBQVc7YUFDcEI7U0FDSjtLQUNKO0NBQ0osQ0FBQTtBQUVEO0lBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUVsQyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFOZSxvQkFBWSxlQU0zQixDQUFBIiwiZmlsZSI6ImNvbnRyb2xsZXIvbWVudS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIn0=
