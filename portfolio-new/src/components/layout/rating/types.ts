export interface Ratings {
  visualDesign: number
  caseStudies: number
  usability: number
  overall: number
}

export interface ContactInfo {
  name: string
  email: string
  referralSource: string
  linkedinConnect: 'yes' | 'no' | ''
}

export type RatingStep = 1 | 2

export type RatingKey = keyof Ratings
