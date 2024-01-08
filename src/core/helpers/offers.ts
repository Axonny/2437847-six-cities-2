import { MockData } from '../../types/mock-data.js';
import { generateRandomNumber, getRandomItem, getRandomItems } from './random.js';
import { City, Facilities, HousingType } from '../../types/enums.js';
import dayjs from 'dayjs';
import { Offer } from '../../types/offer.js';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_COUNT_ROOM = 1;
const MAX_COUNT_ROOM = 5;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 10;
const MIN_RENTAL_COST = 1000;
const MAX_RENTAL_COST = 100000;

const getAllValuesFromEnum = (enumObject: object): string[] =>
  Object.values(enumObject).filter((value) => isNaN(Number(value)));

export const generateOffer = (mockData: MockData): string => {
  const title = getRandomItem<string>(mockData.names);
  const description = getRandomItem<string>(mockData.descriptions);
  const publicationDate = dayjs().subtract(generateRandomNumber(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
  const city = getRandomItem(getAllValuesFromEnum(City));
  const previewImage = getRandomItem<string>(mockData.previewImages);
  const images = getRandomItems<string>(mockData.propertyImages);
  const premium = getRandomItem<string>(['true', 'false']);
  const favorite = getRandomItem<string>(['true', 'false']);
  const rating = generateRandomNumber(MIN_RATING, MAX_RATING, 1);
  const type = getRandomItem(getAllValuesFromEnum(HousingType));
  const roomCount = generateRandomNumber(MIN_COUNT_ROOM, MAX_COUNT_ROOM);
  const guestCount = generateRandomNumber(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER);
  const cost = generateRandomNumber(MIN_RENTAL_COST, MAX_RENTAL_COST);
  const facilities = getRandomItems(getAllValuesFromEnum(Facilities));
  const offerAuthorName = getRandomItem<string>(mockData.users.names);
  const offerAuthorAvatar = getRandomItem<string>(mockData.users.avatars);
  const offerAuthorIsPro = getRandomItem<boolean>([true, false]);
  const offerAuthorNameEmail = getRandomItem<string>(mockData.users.emails);
  const commentsCount = generateRandomNumber(1, 10);
  const latitude = getRandomItem<number>(mockData.location.latitude);
  const longitude = getRandomItem<number>(mockData.location.longitude);

  return [
    title,
    description,
    publicationDate,
    city,
    previewImage,
    images,
    premium,
    favorite,
    rating,
    type,
    roomCount,
    guestCount,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorIsPro,
    offerAuthorNameEmail,
    commentsCount,
    latitude,
    longitude,
    cost,
  ].join('\t');
};

export const parseOffer = (offerString: string): Offer => {
  const offerRow = offerString.split('\t');
  const [
    title,
    description,
    publicationDate,
    city,
    preview,
    images,
    premium,
    favorite,
    rating,
    type,
    roomCount,
    guestCount,
    facilities,
    authorName,
    authorAvatar,
    authorIsPro,
    authorEmail,
    commentsCount,
    latitude,
    longitude,
    cost,
  ] = offerRow;
  return {
    title: title,
    description: description,
    publicationDate: new Date(publicationDate),
    city: city as unknown as City,
    previewImage: preview,
    images: images.split(','),
    isPremium: premium as unknown as boolean,
    isFavourite: favorite as unknown as boolean,
    rating: parseFloat(rating),
    type: type as unknown as HousingType,
    bedrooms: parseInt(roomCount, 10),
    maxAdults: parseInt(guestCount, 10),
    price: parseInt(cost, 10),
    goods: facilities.split(',').map((x) => x as unknown as Facilities),
    host: {
      name: authorName,
      avatarUrl: authorAvatar,
      isPro: authorIsPro === 'true',
      email: authorEmail,
    },
    commentsCount: parseInt(commentsCount, 10),
    location: {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    },
  };
};
