interface Coach {
  address: string;
  age: number;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  gender: string;
  hasFamily: boolean;
  password: string;
  phoneNumber: string;
  picturePathS3: string;
  playerCategoryID: any; // Type is not clear from the provided data
  stakeholderID: number;
  stakeholderName: string;
  stakeholderType: string;
  updatedAt: string;
  username: string;
}

interface Court {
  area: number;
  courtDescription: string;
  courtID: number;
  courtName: string;
  createdAt: string;
  imagePath: string;
  locationID: number;
  sportsID: number;
  updatedAt: string;
}

interface Customer {
  address: string;
  age: number;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  emiratesID: string;
  emiratesIDExpiry: string;
  gender: string;
  hasFamily: boolean;
  password: string;
  phoneNumber: string;
  picturePathS3: string;
  playerCategoryID: any; // Type is not clear from the provided data
  stakeholderID: number;
  stakeholderName: string;
  stakeholderType: string;
  updatedAt: string;
  username: string;
}

interface Location {
  area: number;
  createdAt: string;
  imagePath: string;
  lat: number;
  locationAddress: string;
  locationDescription: string;
  locationID: number;
  long: number;
  updatedAt: string;
}

export interface BookingTypes {
  amount: number;
  bookingDate: string;
  bookingNumber: string;
  bookingStatusType: string;
  bookingType: string;
  coach: Coach;
  coachID: number;
  coachSessionTermID: any; // Type is not clear from the provided data
  coachSessionTypeID: number;
  coachTermBookingID: any; // Type is not clear from the provided data
  court: Court;
  courtID: number;
  createdAt: string;
  creditTypeID: number;
  customer: Customer;
  customerBookingID: number;
  customerID: number;
  endTime: string;
  familyMember: any; // Type is not clear from the provided data
  familyMemberID: any; // Type is not clear from the provided data
  isPaymentDone: boolean;
  location: Location;
  locationID: number;
  slotMinutes: number;
  startTime: string;
  updatedAt: string;
}
