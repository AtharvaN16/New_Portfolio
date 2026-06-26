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
        description: "Support and resources to ensure an inclusive library experience for all users.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Alumni Services",
        description: "Resources and services available to UofA Alumni.",
        audiences: ["Alumni"]
      },
      {
        title: "Borrower Services + Library Cards",
        description: "Information on borrowing materials, renewing items, and obtaining a library card.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Distance Services",
        description: "Delivery of library materials to your home or work address.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Interlibrary Loan",
        description: "A service that allows you to borrow materials from other libraries not available in our collection.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "L-Pass",
        description: "Registering for L-Pass gives you access to all services currently available to any Edmonton Public Library (EPL) card holder.",
        audiences: ["Students", "Staff"]
      },
      {
        title: "Library Checkout",
        description: "A fast and easy way to borrow books from the UofA Library!",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Off-Campus Access",
        description: "Access scholarly journals and other electronic resources from your mobile device or computer off campus!",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Recommend a Purchase",
        description: "Suggest library resources or materials you'd like to see added to the collection.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Tutorials",
        description: "Foundational Tutorials, APA Tutorial, Business Tutorials, Systematic Review Workshop Tutorial.",
        audiences: ["Students"]
      }
    ]
  },
  {
    name: "Visit",
    services: [
      {
        title: "All Library Hours",
        description: "Operating hours for all library branches.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Book a Study Space",
        description: "Find a place to work, study, and collaborate in UofA Libraries!",
        audiences: ["Students"]
      },
      {
        title: "Library Locations",
        description: "Find addresses, hours, and contact information for all our libraries.",
        audiences: ["Students", "Faculty", "Staff", "Alumni"]
      },
      {
        title: "Student Well being",
        description: "Find addresses, hours, and contact information for all our libraries.",
        audiences: ["Students"]
      },
      {
        title: "Study Spaces Explained",
        description: "An overview of the different study rooms available, including quiet areas, and collaborative spaces.",
        audiences: ["Students"]
      },
      {
        title: "Workshops",
        description: "Instructor-led events that provide practical tools and techniques for improving your academic and personal skills.",
        audiences: ["Students", "Researchers"]
      }
    ]
  },
  {
    name: "Research + Publishing Support",
    services: [
      {
        title: "APC Support",
        description: "Free or discounted Article Processing Charges (APCs) for UofA researchers through negotiated publisher agreements.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Audio and Video Curation",
        description: "Access to audiovisual content, including interviews, performances, and broadcasts, through the Aviary platform.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "A-Z Databases",
        description: "A comprehensive list of databases for your research and academic needs.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Citation Guides",
        description: "Guides to help you correctly format citations in various styles for your academic work.",
        audiences: ["Students"]
      },
      {
        title: "Consultations",
        description: "Schedule an appointment with a librarian for personalized research assistance.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Copyright",
        description: "The Copyright Office is a source of information and guidance for the UofA community on issues related to copyright.",
        audiences: ["Faculty", "Researchers", "Staff"]
      },
      {
        title: "Data Help",
        description: "Contact the UofA Library Data Unit with any data-related research questions.",
        audiences: ["Students", "Researchers"]
      },
      {
        title: "E-Resource Access",
        description: "Access to a wide range of licensed electronic resources for UofA affiliates.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Entrepreneurship + Innovation",
        description: "Support for your venture through consultations, research strategies, workshops, and access to resources and technologies.",
        audiences: ["Students", "Researchers"]
      },
      {
        title: "ERA",
        description: "The UofA's open access repository for faculty research, promoting discovery and preservation.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Geospatial Data / GIS",
        description: "Assistance with the location, retrieval, and use of geospatial data files in the Library collection, and the acquisition of data files held elsewhere.",
        audiences: ["Students", "Researchers", "Faculty"]
      },
      {
        title: "How to Research",
        description: "Guidance on effective research strategies, tools, and resources to help you find, evaluate, and use academic materials.",
        audiences: ["Students"]
      },
      {
        title: "Open Access",
        description: "Free, unrestricted access to scholarly research and publications.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Open Science Guide",
        description: "Guide to help you engage with the Open Science movement, promoting transparency, accessibility, and collaboration in scientific research.",
        audiences: ["Researchers", "Faculty"]
      },
      {
        title: "Publishing",
        description: "Support for open access scholarly publishing, including journals, and textbooks.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Research Data Management (RDM)",
        description: "Tools and support for managing and preserving research data throughout the project lifecycle.",
        audiences: ["Researchers", "Faculty"]
      },
      {
        title: "Research Impact Service",
        description: "Support for showcasing research impact through benchmarking, grant support, bibliometric data analysis, consultations, and customized training.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Systemic Reviews Guide",
        description: "A resource for finding studies to include in systematic reviews, scoping reviews, and Health Technology Assessments (HTAs).",
        audiences: ["Researchers", "Faculty"]
      }
    ]
  },
  {
    name: "Technology",
    services: [
      {
        title: "3D Printing",
        description: "A free service for your 3D printing needs",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Digital Scholarship Centre",
        description: "The Digital Scholarship Centre (DSC) is a research and teaching facility for faculty, students, and staff at the University of Alberta",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Multimedia Equipment Lending",
        description: "Borrow a variety of multimedia equipment, including cameras, audio recorders, and other tools for your creative and academic projects.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Printing + Scanning",
        description: "Copying, printing, and scanning are available at library locations across campus.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Specialized Equipment",
        description: "Access specialized equipment like listening and viewing devices, microform readers, and scanners in our library spaces.",
        audiences: ["Students", "Faculty", "Staff"]
      },
      {
        title: "Using Generative AI",
        description: "A guide for students on ethically and creatively using generative AI tools in education and research.",
        audiences: ["Students"]
      },
      {
        title: "Workstations + Software",
        description: "Access public Windows workstations at various library locations, available on a first-come, first-served basis.",
        audiences: ["Students", "Faculty", "Staff"]
      }
    ]
  },
  {
    name: "Digital Preservation + Collections",
    services: [
      {
        title: "Data Services",
        description: "Access to research data across disciplines, with support for locating, retrieving, and using data from the library and external sources.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Digitized Collections",
        description: "Resources from the UofA Library preserved digitally for research, teaching, and learning.",
        audiences: ["Students", "Faculty", "Researchers"]
      },
      {
        title: "Digital Preservation",
        description: "Find addresses, hours, and contact information for all our libraries.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Digitization",
        description: "Ensuring the long-term accessibility and integrity of digital content through dedicated preservation initiatives.",
        audiences: ["Faculty", "Researchers"]
      },
      {
        title: "Web Archiving",
        description: "Preserving at-risk online content, particularly local and western Canadian materials, to support long-term access for research and teaching.",
        audiences: ["Researchers", "Faculty"]
      }
    ]
  },
  {
    name: "Teaching Support",
    services: [
      {
        title: "Accessing Library Online Resources",
        description: "Use your Campus Computing ID (CCID) to access the University of Alberta Library's online resources securely.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Course Materials and Reading Lists",
        description: "Access your course readings and materials, including textbooks and articles, through the UofA Library.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Library eclass / Canvas Integration",
        description: "Integration of library resources into eClass and Canvas to support course learning.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Library Instruction",
        description: "Instructors can collaborate with subject librarians to design customized sessions.",
        audiences: ["Faculty"]
      },
      {
        title: "Open Educational Resources",
        description: "Freely available teaching and learning materials for both students and instructors.",
        audiences: ["Students", "Faculty"]
      },
      {
        title: "Teaching + Learning",
        description: "Supporting instructors and campus partners in finding, evaluating, citing, creating, and communicating information through various instructional resources and services.",
        audiences: ["Faculty"]
      }
    ]
  }
];
