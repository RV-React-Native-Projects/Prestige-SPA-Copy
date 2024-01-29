interface PlayerCategory {
  createdAt: string;
  playerCategory: string;
  playerCategoryID: number;
  updatedAt: string;
}

interface PreferredLocation {
  area: number;
  createdAt: string;
  imagePath: string;
  lat: number;
  locationAddress: string;
  locationDescription: string;
  locationID: number;
  locationName: string;
  long: number;
  updatedAt: string;
}

interface Stakeholder {
  address: string;
  age: number;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  gender: string;
  password: string;
  phoneNumber: string;
  picturePathS3: string;
  stakeholderID: number;
  stakeholderName: string;
  stakeholderType: string;
  updatedAt: string;
  username: string;
}

interface Membership {
  createdAt: string;
  customerID: number;
  expiryDate: string;
  filePath: string;
  locationID: number;
  membershipID: number;
  membershipType: string;
  status: number;
  statusDescription: string;
  updatedAt: string;
}

interface CustomerProfile {
  createdAt: string;
  customerProfileID: number;
  isMember: boolean;
  memberSince: string;
  membershipNo: string | null;
  playerCategory: PlayerCategory;
  playerCategoryID: number;
  preferredLocation: PreferredLocation;
  preferredLocationID: number;
  stakeholder: Stakeholder;
  stakeholderID: number;
  updatedAt: string;
}

export interface UserProps {
  address: string;
  age: number;
  createdAt: string;
  customerProfile: CustomerProfile;
  dateOfBirth: string;
  email: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  gender: string;
  memberships: Membership[];
  password: string;
  phoneNumber: string;
  picturePathS3: string;
  stakeholderID: number;
  stakeholderName: string;
  stakeholderType: string;
  updatedAt: string;
  username: string;
}
