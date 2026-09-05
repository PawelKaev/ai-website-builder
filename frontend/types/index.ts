export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  structure: SiteStructure;
  design_tokens: DesignTokens;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface SiteStructure {
  business_name: string;
  site_type: string;
  target_audience: string;
  key_message: string;
  design_style: {
    mood: string;
    color_palette: string;
    typography: string;
  };
  sections: Section[];
}

export interface Section {
  type: string;
  title: string;
  content: {
    headline?: string;
    text?: string;
    cta_text?: string;
    items?: SectionItem[];
  };
}

export interface SectionItem {
  title: string;
  description: string;
}

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    heading_font: string;
    body_font: string;
  };
}
