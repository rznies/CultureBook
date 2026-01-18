export type EntryType = 
  | 'Milestone' 
  | 'Founding' 
  | 'Pivot' 
  | 'Hire' 
  | 'Customer' 
  | 'Funding' 
  | 'Culture';

export interface Attachment {
  type: 'image' | 'link' | 'doc';
  url: string;
  title?: string;
}

export interface TimelineEntry {
  id: string;
  date: string; // ISO string
  title: string;
  body: string;
  type: EntryType;
  tags: string[];
  author: string;
  visibility: 'Public' | 'Internal';
  attachments?: Attachment[];
  likes?: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  joinedDate: string;
  quote: string;
  bio: string;
  tags: string[];
}

export interface Value {
  id: string;
  title: string;
  description: string;
  lastReferencedDate: string; // Used for "drift" check
  icon: string;
}

export interface CompanyProfile {
  name: string;
  foundedDate: string;
  missionStatement: string;
  logoUrl?: string;
  candidatePortalEnabled: boolean;
}

export type ViewMode = 'dashboard' | 'timeline' | 'people' | 'values' | 'candidate' | 'settings';
export type AppState = 'landing' | 'auth' | 'onboarding' | 'app';
