export interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  mediaSrc?: string;
  mediaType?: 'video' | 'image';
  figureSrc?: string;
  figureAlt?: string;
  tags: { text: string; color: 'mint' | 'blue' | 'gold' | 'purple' | 'teal' | 'coral' }[];
  links: { label: string; url: string; isExternal?: boolean }[];
  posterId?: string;
}

export interface MiniProjectItem {
  id: string;
  title: string;
  description: string;
  mediaSrc: string;
  mediaType?: 'video' | 'image';
  tags?: { text: string; color: 'mint' | 'blue' | 'gold' | 'purple' | 'teal' | 'coral' }[];
  links?: { label: string; url: string }[];
}

export interface NewsItem {
  id: string;
  date: string;
  tag: {
    label: string;
    type: 'role' | 'paper' | 'patent' | 'research' | 'talk' | 'award';
  };
  title: string;
  titleLink?: string;
  description: string;
  paperLink?: { label: string; url: string };
}

export interface PublicationItem {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year?: string;
  links: { label: string; url: string }[];
  isPatent?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  logoSrc?: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  institutionUrl?: string;
  period: string;
  details: string[];
}

export interface GalleryItem {
  id: string;
  imgSrc: string;
  caption: string;
  alt: string;
}
