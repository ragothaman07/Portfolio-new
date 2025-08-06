export const myProjects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Facilitates purchases from international websites like Amazon and eBay, allowing customers to shop from these sites and have products delivered domestically.",
    subDescription: [
      "Built a scalable application with ASP.NET Core MVC, integrating global platforms like Amazon for domestic delivery.",
      "Implemented secure authentication and database management using ASP.NET Core Identity and Entity Framework Core.",
      "Designed a responsive frontend with Tailwind CSS, enhancing user experience.",
      "Added payment systems, localization, and product filtering for functionality improvements.",
    ],
    href: "#",
    logo: "",
    image: "https://via.placeholder.com/800x400?text=E-commerce+Project",
    tags: [
      { id: 1, name: "C#", path: "https://via.placeholder.com/40?text=C%23" },
      { id: 2, name: ".Net", path: "https://via.placeholder.com/40?text=.NET" },
      { id: 3, name: "EF Core", path: "https://via.placeholder.com/40?text=EF" },
      { id: 4, name: "TailwindCSS", path: "https://via.placeholder.com/40?text=TW" },
    ],
  },
  {
    id: 2,
    title: "Authentication System",
    description: "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "Integrated Auth0 for authentication, supporting OAuth, JWT, and multi-factor authentication.",
      "Implemented role-based access control (RBAC) for fine-grained user permissions.",
      "Developed a React-based frontend with Tailwind CSS for a sleek user experience.",
      "Connected to a secure SQLite database for user data storage.",
    ],
    href: "#",
    logo: "",
    image: "https://via.placeholder.com/800x400?text=Auth+System",
    tags: [
      { id: 1, name: "Auth0", path: "https://via.placeholder.com/40?text=A0" },
      { id: 2, name: "React", path: "https://via.placeholder.com/40?text=R" },
      { id: 3, name: "SQLite", path: "https://via.placeholder.com/40?text=SQL" },
      { id: 4, name: "TailwindCSS", path: "https://via.placeholder.com/40?text=TW" },
    ],
  },
  // Add other projects as needed...
];
