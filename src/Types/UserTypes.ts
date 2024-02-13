export interface CustomerBooking {
  customerBookingID: number;
  createdAt: string;
  updatedAt: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  slotMinutes: number;
  customerID: number;
  familyMemberID: number;
  locationID: number;
  courtID: number;
  creditTypeID: number;
  coachID: any;
  coachSessionTermID: any;
  coachSessionTypeID: any;
  coachTermBookingID: any;
  bookingType: string;
  bookingStatusType: string;
  amount: number;
  isPaymentDone: boolean;
  bookingNumber: string;
}

export interface PlayerCategory {
  playerCategoryID: number;
  createdAt: string;
  updatedAt: string;
  playerCategory: string;
}

export interface Parent {
  stakeholderID: number;
  stakeholderName: string;
  username: string;
  password: string;
  email: string;
  stakeholderType: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  imagePath: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  age: number;
  address: string;
  gender: string;
  dateOfBirth: string;
  hasFamily: boolean;
  playerCategoryID: any;
}

export interface FamilyMember {
  familyMemberID: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  dateOfBirth: string;
  playerCategoryID: number;
  parentID: number;
  relationship: string;
  age: number;
  imagePath: string | null;
  customerBookings: CustomerBooking[];
  playerCategory: PlayerCategory;
  parent: Parent;
}

export interface Membership {
  membershipID: number;
  locationName?: string | undefined;
  imagePath?: string | undefined;

  createdAt: string;
  updatedAt: string;
  locationID: number;
  customerID: number;
  membershipType: string;
  filePath: string;
  expiryDate?: string | null;
  status: number;
  statusDescription: string;
}

export interface UserProps {
  stakeholderID: number;
  stakeholderName: string;
  username: string;
  password: string;
  email: string;
  stakeholderType: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  imagePath: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  age: number;
  address: string;
  gender: string;
  dateOfBirth: string;
  hasFamily: boolean;
  playerCategoryID: any | null;
  memberships: Membership[];
  familyMembers: FamilyMember[];
}
