export interface LibraryAddress {
  label?: string;
  lines: string[];
}

export interface LibraryAmenities {
  studyRooms?: number;
  workstations: boolean;
  nightStudy: boolean;
  printers: boolean;
}

export interface LibraryLocation {
  id: string;
  name: string;
  campus: 'Edmonton' | 'Augustana' | 'Saint-Jean' | 'Special Collections';
  isOpen: boolean;
  hours: string;
  addresses: LibraryAddress[];
  phone?: string;
  imageUrl?: string;
  notification?: string;
  amenities: LibraryAmenities;
  staffLabel?: string | null;
}

export const LIBRARY_HOURS_DATA: LibraryLocation[] = [
  // ── Edmonton Campus ──────────────────────────────────────────────────────
  {
    id: 'cameron',
    name: 'Cameron, Science + Engineering Library',
    campus: 'Edmonton',
    isOpen: true,
    hours: '7am to 5pm',
    addresses: [
      { lines: ['11231 Saskatchewan Drive', 'University of Alberta', 'Edmonton, Alberta, T6G 2J8'] },
    ],
    phone: '780-492-3289',
    imageUrl: '/images/ualberta/Cameron-Library-Entrance220x165-1.png',
    amenities: { studyRooms: 8, workstations: true, nightStudy: true, printers: true },
    staffLabel: 'Cameron',
  },
  {
    id: 'dsc',
    name: 'Digital Scholarship Centre (DSC)',
    campus: 'Edmonton',
    isOpen: false,
    hours: 'Closed for Renovation',
    addresses: [
      { lines: ['2nd Floor, Cameron Library', 'University of Alberta', 'Edmonton, Alberta, T6G 2J8'] },
    ],
    phone: '780-248-1300',
    imageUrl: '/images/ualberta/DSC.png',
    notification:
      'The DSC is temporarily closed for renovations. Remote consultations and digital services remain available. In-person access is expected to resume in Fall 2025.',
    amenities: { studyRooms: 4, workstations: true, nightStudy: false, printers: true },
    staffLabel: 'DSC',
  },
  {
    id: 'sperber',
    name: 'Geoffrey + Robyn Sperber, Health Sciences Library',
    campus: 'Edmonton',
    isOpen: true,
    hours: '8am to 5pm',
    addresses: [
      {
        lines: [
          'Walter C. Mackenzie Health Sciences Centre',
          '8440 112 Street NW',
          'Edmonton, Alberta, T6G 2B7',
        ],
      },
    ],
    phone: '780-492-0150',
    imageUrl: '/images/ualberta/Sperber-Library220x165.png',
    amenities: { studyRooms: 6, workstations: true, nightStudy: false, printers: true },
    staffLabel: 'Sperber',
  },
  {
    id: 'rutherford',
    name: 'Rutherford + Robyn Sperber, Humanities, Social Education + Education Library',
    campus: 'Edmonton',
    isOpen: true,
    hours: '8am to 11pm',
    addresses: [
      {
        label: 'Rutherford North',
        lines: ['11204 89 Ave NW', 'University of Alberta', 'Edmonton, Alberta, T6G 2J4'],
      },
      {
        label: 'Rutherford South',
        lines: ['11208 89 Ave NW', 'University of Alberta', 'Edmonton, Alberta, T6G 2J8'],
      },
    ],
    phone: '780-492-3293',
    imageUrl: '/images/ualberta/Rutherford-Library220x165.png',
    amenities: { studyRooms: 14, workstations: true, nightStudy: true, printers: true },
    staffLabel: 'Rutherford',
  },
  {
    id: 'stjosephs',
    name: "St. Joseph's College Library",
    campus: 'Edmonton',
    isOpen: true,
    hours: '9am to 5pm',
    addresses: [
      {
        lines: ["St. Joseph's College", '11460 University Ave NW', 'Edmonton, Alberta, T6G 2J5'],
      },
    ],
    phone: '780-492-7680',
    imageUrl: '/images/ualberta/St.-Josephs-Library220x165.png',
    amenities: { studyRooms: 3, workstations: true, nightStudy: false, printers: true },
    staffLabel: "St. Joseph's",
  },
  {
    id: 'weir',
    name: 'John A. Weir Memorial Law Library',
    campus: 'Edmonton',
    isOpen: true,
    hours: '9am to 9pm',
    addresses: [
      { lines: ['Law Centre', '111 Street & 89 Avenue', 'Edmonton, Alberta, T6G 2H5'] },
    ],
    phone: '780-492-8413',
    imageUrl: '/images/ualberta/Weir-Library220x165-1.png',
    amenities: { studyRooms: 5, workstations: true, nightStudy: false, printers: true },
    staffLabel: 'Weir',
  },

  // ── Augustana & Saint-Jean Campus ────────────────────────────────────────
  {
    id: 'augustana',
    name: 'Augustana Library',
    campus: 'Augustana',
    isOpen: true,
    hours: '9am to 5pm',
    addresses: [
      { lines: ['4901 46 Ave', 'Augustana Campus', 'Camrose, Alberta, T4V 2R3'] },
    ],
    phone: '780-679-1156',
    imageUrl: '/images/ualberta/Augustana-Library220x165.png',
    amenities: { studyRooms: 4, workstations: true, nightStudy: false, printers: true },
    staffLabel: 'Augustana',
  },
  {
    id: 'saint-jean',
    name: 'Bibliothèque Saint-Jean',
    campus: 'Saint-Jean',
    isOpen: false,
    hours: 'Tue and Thu only  |  10AM to 1PM',
    addresses: [
      { lines: ['8406 Rue Marie-Anne Gaboury', 'Edmonton, Alberta, T6C 3N2'] },
    ],
    phone: '780-465-8729',
    imageUrl: '/images/ualberta/BSJ-Campus-Saint-Jean220x165.png',
    notification:
      'The Bibliothèque Saint-Jean is closed from **May 5th to September 2nd, 2025**. Limited services are available allowing access to the library\'s physical collection, however study rooms and computers will not be accessible at this time.',
    amenities: { studyRooms: 2, workstations: false, nightStudy: false, printers: false },
    staffLabel: null,
  },

  // ── Special Collections and Archives ─────────────────────────────────────
  {
    id: 'archives',
    name: 'University of Alberta Archives',
    campus: 'Special Collections',
    isOpen: true,
    hours: 'By appointment',
    addresses: [
      { lines: ['8th Floor, Cameron Library', 'University of Alberta', 'Edmonton, Alberta, T6G 2J8'] },
    ],
    phone: '780-492-4054',
    imageUrl: '/images/ualberta/archives.png',
    amenities: { workstations: true, nightStudy: false, printers: false },
    staffLabel: null,
  },
  {
    id: 'rcrf',
    name: 'Research + Collections Resource Facility (RCRF)',
    campus: 'Special Collections',
    isOpen: true,
    hours: 'By appointment',
    addresses: [
      { lines: ['10920 30 Ave NW', 'Edmonton, Alberta, T6J 7A4'] },
    ],
    phone: '780-492-8640',
    imageUrl: '/images/ualberta/RCRF.png',
    amenities: { workstations: false, nightStudy: false, printers: false },
    staffLabel: null,
  },
  {
    id: 'bruce-peel',
    name: 'Bruce Peel Special Collections',
    campus: 'Special Collections',
    isOpen: true,
    hours: '9am to 5pm',
    addresses: [
      {
        lines: [
          '4th Floor, Rutherford Library South',
          'University of Alberta',
          'Edmonton, Alberta, T6G 2J8',
        ],
      },
    ],
    phone: '780-492-5775',
    imageUrl: '/images/ualberta/bruce-peel.png',
    amenities: { studyRooms: 1, workstations: true, nightStudy: false, printers: false },
    staffLabel: null,
  },
];
