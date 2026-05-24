export interface LibraryService {
  title: string;
  description: string;
  audiences?: string[];
}

export interface LibraryCategory {
  name: string;
  services: LibraryService[];
}

export const LIBRARY_DIRECTORY_DATA: LibraryCategory[] = [
  {
    name: "Library Basics",
    services: [
      {
        title: "Accessibility Services",
        description: "Library materials and services for users with disabilities, including adaptive technology and specialized assistance.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Alumni Services",
        description: "Continued access to select library resources and services for University of Alberta graduates.",
        audiences: ["Alumni"]
      },
      {
        title: "Borrower Services + Library Cards",
        description: "Information about borrowing privileges, loan periods, and obtaining or renewing your ONEcard as a library card.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Distance Services",
        description: "Library support and document delivery for students and faculty living more than 50km from campus.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Interlibrary Loan",
        description: "Request books and articles not held by the University of Alberta Library from other institutions worldwide.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "L-Pass",
        description: "Connect your ONEcard with Edmonton Public Library (EPL) to access their digital and physical collections.",
        audiences: ["Students", "Staff"]
      },
      {
        title: "Library Checkout",
        description: "Express self-checkout options available at various library locations and via the library app.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Off-Campus Access",
        description: "Securely access library databases, journals, and e-books from anywhere in the world using your CCID.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Recommend a Purchase",
        description: "Suggest new books, journals, or other media for the library to add to its permanent collection.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Tutorials",
        description: "Self-paced guides and video tutorials on how to use library systems and improve your research skills.",
        audiences: ["Students"]
      }
    ]
  },
  {
    name: "Visit",
    services: [
      {
        title: "All Library Hours",
        description: "Current opening and closing times for all University of Alberta library locations and service desks.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Book a Study Space",
        description: "Reserve individual or group study rooms equipped with monitors, whiteboards, and other amenities.",
        audiences: ["Students"]
      },
      {
        title: "Library Locations",
        description: "Maps, directions, and unique features of our various libraries across all university campuses.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Student Well being",
        description: "Resources and spaces dedicated to supporting student mental health and academic balance.",
        audiences: ["Students"]
      },
      {
        title: "Study Spaces Explained",
        description: "A guide to the different types of study environments available, from silent zones to collaborative areas.",
        audiences: ["Students"]
      },
      {
        title: "Workshops",
        description: "Register for in-person or virtual sessions on research tools, software, and academic skills.",
        audiences: ["Students", "Researchers"]
      }
    ]
  },
  {
    name: "Research + Publishing Support",
    services: [
      {
        title: "APC Support",
        description: "Information on Article Processing Charge (APC) waivers and discounts for open access publishing.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Audio and Video Curation",
        description: "Assistance with finding, using, and managing multimedia content for research and teaching.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "A-Z Databases",
        description: "A comprehensive, searchable list of all specialized databases and indexes subscribed to by the library.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Citation Guides",
        description: "Helpful resources for APA, MLA, Chicago, and other citation styles to ensure academic integrity.",
        audiences: ["Students"]
      },
      {
        title: "Consultations",
        description: "Book a one-on-one session with a subject librarian for in-depth research assistance.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Copyright",
        description: "Guidance on using copyrighted materials in your research, teaching, and publishing.",
        audiences: ["Faculty", "Researchers", "Staff"]
      },
      {
        title: "Data Help",
        description: "Support for finding, analyzing, and visualizing quantitative and qualitative data.",
        audiences: ["Students", "Researchers"]
      },
      {
        title: "E-Resource Access",
        description: "Troubleshooting and support for accessing electronic journals, books, and databases.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Entrepreneurship + Innovation",
        description: "Specialized resources and support for business research, patents, and startups.",
        audiences: ["Students", "Researchers"]
      },
      {
        title: "ERA",
        description: "The Education & Research Archive (ERA) provides open access to the research output of the university.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Geospatial Data / GIS",
        description: "Expert assistance with Geographic Information Systems (GIS) software and finding geospatial datasets.",
        audiences: ["Students", "Researchers", "Faculty"]
      },
      {
        title: "How to Research",
        description: "A step-by-step guide to the research process, from refining a topic to evaluating sources.",
        audiences: ["Students"]
      },
      {
        title: "Open Access",
        description: "Support for publishing your work openly and meeting funder mandates for open research.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Open Science Guide",
        description: "Best practices and tools for making scientific research and its dissemination accessible to all.",
        audiences: ["Researchers", "Faculty"]
      },
      {
        title: "Publishing",
        description: "Assistance with selecting journals, understanding metrics, and navigating the publishing lifecycle.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Research Data Management (RDM)",
        description: "Guidance on planning, storing, and sharing research data throughout your project.",
        audiences: ["Researchers", "Faculty"]
      },
      {
        title: "Research Impact Service",
        description: "Help with tracking and demonstrating the impact of your research through bibliometrics and other tools.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Systemic Reviews Guide",
        description: "Methodological support for conducting comprehensive systematic and scoping reviews.",
        audiences: ["Researchers", "Faculty"]
      }
    ]
  },
  {
    name: "Technology",
    services: []
  },
  {
    name: "Digital Preservation + Collections",
    services: []
  },
  {
    name: "Teaching Support",
    services: []
  }
];

export const FREQUENTLY_VISITED_DATA = {
  lastVisited: ["Publishing", "Geospatial Data / GIS"],
  frequentlyVisited: ["Publishing", "All Library Hours", "Library Checkout", "Recommend a Purchase", "Open Access"]
};
