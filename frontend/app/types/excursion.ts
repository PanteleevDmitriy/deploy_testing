export interface ExcursionInterface {
  [x: string]: any;
  id: number;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  photoLinks: string[];
  videoLinks: string[] | null;
  isAvailable: boolean;
  isPopular: boolean;
  isWinter: boolean;
  isBeach: boolean;
  isFamilyFriendly: boolean;
  isOption1: boolean;
  isOption2: boolean;
  isOption3: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  schedule: string;
}
