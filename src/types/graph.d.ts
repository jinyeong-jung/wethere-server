export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  couple: Couple!\n  createdAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  createdAt: String!\n}\n\ntype Comment {\n  id: Int!\n  feed: Feed!\n  text: String!\n  user: User!\n  createdAt: String!\n}\n\ntype Couple {\n  id: Int!\n  partnerOne: User!\n  partnerTwo: User!\n  firstDate: String\n  chat: Chat\n  places: [Place]\n  createdAt: String!\n}\n\ntype Feed {\n  id: Int!\n  user: User!\n  text: String!\n  feedPicture: String\n  comments: [Comment]\n  place: Place\n  createdAt: String!\n}\n\ntype Place {\n  id: Int!\n  couple: Couple!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isFav: Boolean!\n  feeds: [Feed]\n  createdAt: String!\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype Query {\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype User {\n  id: Int!\n  username: String!\n  password: String!\n  phoneNumber: String!\n  verifiedPhoneNumber: Boolean!\n  nickname: String!\n  gender: String!\n  birth: String\n  status: String\n  profilePhoto: String\n  lastLat: Float\n  lastLng: Float\n  feeds: [Feed]\n  coupleForPartnerOne: Couple\n  coupleForPartnerTwo: Couple\n  comments: [Comment]\n  createdAt: String!\n}\n\ntype SignUpStartResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype Mutation {\n  SignUpStart(username: String!, password: String!, nickname: String!, gender: String!, phoneNumber: String!): SignUpStartResponse!\n}\n\ntype Verification {\n  id: Int!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n}\n"];
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
  username: string;
  password: string;
  phoneNumber: string;
  verifiedPhoneNumber: boolean;
  nickname: string;
  gender: string;
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
  SignUpStart: SignUpStartResponse;
}

export interface SignUpStartMutationArgs {
  username: string;
  password: string;
  nickname: string;
  gender: string;
  phoneNumber: string;
}

export interface SignUpStartResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface Verification {
  id: number;
  payload: string;
  key: string;
  verified: boolean;
  createdAt: string;
}
