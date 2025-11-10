export interface Villain {
  name: string;
  url?: string;
  description?: string;
}

export interface Book {
  id: number;
  Title: string;
  Publisher: string;
  Year: number;
  Pages: number;
  ISBN: string;
  Notes: string[];
  villains: Villain[];
}
