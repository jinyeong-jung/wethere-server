export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  couple: Couple!\n  createdAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  createdAt: String!\n}\n\ntype Comment {\n  id: Int!\n  feed: Feed!\n  text: String!\n  user: User!\n  createdAt: String!\n}\n\ntype Couple {\n  id: Int!\n  partnerOne: User!\n  partnerTwo: User!\n  firstDate: String\n  chat: Chat\n  places: [Place]\n  createdAt: String!\n}\n\ntype Feed {\n  id: Int!\n  user: User!\n  text: String!\n  feedPicture: String\n  comments: [Comment]\n  place: Place\n  createdAt: String!\n}\n\ntype Place {\n  id: Int!\n  couple: Couple!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  feeds: [Feed]\n  createdAt: String!\n}\n\ntype FacebookLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  FacebookLogin(facebookId: String!, name: String!): FacebookLoginResponse!\n  GoogleLogin(googleId: String!, name: String!, imageUrl: String): GoogleLoginResponse!\n  SignUpEnd(phoneNumber: String!, key: String!): SignUpEndResponse!\n  SignUpStart(username: String!, password: String!, phoneNumber: String!): SignUpStartResponse!\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype GoogleLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  username: String\n  password: String\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  facebookId: String\n  googleId: String\n  nickname: String\n  gender: String\n  birth: String\n  status: String\n  profilePhoto: String\n  lastLat: Float\n  lastLng: Float\n  feeds: [Feed]\n  coupleForPartnerOne: Couple\n  coupleForPartnerTwo: Couple\n  comments: [Comment]\n  createdAt: String!\n}\n\ntype SignUpEndResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype SignUpStartResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Verification {\n  id: Int!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetMyProfile: GetMyProfileResponse;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface User {
  id: number;
  username: string | null;
  password: string | null;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  facebookId: string | null;
  googleId: string | null;
  nickname: string | null;
  gender: string | null;
  birth: string | null;
  status: string | null;
  profilePhoto: string | null;
  lastLat: number | null;
  lastLng: number | null;
  feeds: Array<Feed> | null;
  coupleForPartnerOne: Couple | null;
  coupleForPartnerTwo: Couple | null;
  comments: Array<Comment> | null;
  createdAt: string;
}

export interface Feed {
  id: number;
  user: User;
  text: string;
  feedPicture: string | null;
  comments: Array<Comment> | null;
  place: Place | null;
  createdAt: string;
}

export interface Comment {
  id: number;
  feed: Feed;
  text: string;
  user: User;
  createdAt: string;
}

export interface Place {
  id: number;
  couple: Couple;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
  feeds: Array<Feed> | null;
  createdAt: string;
}

export interface Couple {
  id: number;
  partnerOne: User;
  partnerTwo: User;
  firstDate: string | null;
  chat: Chat | null;
  places: Array<Place> | null;
  createdAt: string;
}

export interface Chat {
  id: number;
  messages: Array<Message> | null;
  couple: Couple;
  createdAt: string;
}

export interface Message {
  id: number;
  text: string;
  chat: Chat;
  createdAt: string;
}

export interface Mutation {
  FacebookLogin: FacebookLoginResponse;
  GoogleLogin: GoogleLoginResponse;
  SignUpEnd: SignUpEndResponse;
  SignUpStart: SignUpStartResponse;
}

export interface FacebookLoginMutationArgs {
  facebookId: string;
  name: string;
}

export interface GoogleLoginMutationArgs {
  googleId: string;
  name: string;
  imageUrl: string | null;
}

export interface SignUpEndMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface SignUpStartMutationArgs {
  username: string;
  password: string;
  phoneNumber: string;
}

export interface FacebookLoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface GoogleLoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpEndResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpStartResponse {
  ok: boolean;
  error: string | null;
}

export interface Verification {
  id: number;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
}
