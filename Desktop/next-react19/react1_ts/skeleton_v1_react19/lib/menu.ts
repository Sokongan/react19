import {
    BookOpen,
    ShieldCheck,
    Users,
} from "lucide-react";

export const menuItems = {
    main: [
        {
            name: "Employees",
            url: "/employees",
            icon: Users,
            roles: ["admin", "user"],
        }
    ],
    system: [
        {
            name: "Access Management",
            url: "/access-management",
            icon: ShieldCheck,
            roles: ["admin"],
        },
        {
            name: "Library",
            url: "/library",
            icon: BookOpen,
            roles: ["admin"],
        },
    ],
}
