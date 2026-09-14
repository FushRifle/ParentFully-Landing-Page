import { IMenuItem } from "@/types";

export const menuItems: IMenuItem[] = [
    {
        text: "Features",
        url: "https://parentfullyapp.com/"
    },
    {
        text: "Contact",
        url: "#contact"
    },
    {
        text: "Blog",
        url: "/blog"
    },
    {
        text: "Partnership",
        url: "/affiliate",
        children: [
            {
                text: "Parent Partnership",
                url: "/affiliate"
            },
            {
                text: "School Partnership",
                url: "/affiliate/school"
            }
        ]
    }
];
