export type MockData = {
  names: string[];
  descriptions: string[];
  previewImages: string[];
  propertyImages: string[];
  location: {
    latitude: number[];
    longitude: number[];
  };
  users: {
    names: string[];
    avatars: string[];
    emails: string[];
    passwords: string[];
  };
};
