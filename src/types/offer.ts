import { City, Facilities, HousingType } from './enums.js';
import { User } from './user.js';

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: Array<string>;
  isPremium: boolean;
  isFavourite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: Array<Facilities>;
  host: User;
  commentsCount: number;
  location: Coordinates;
};
