export const typeDefs = ["type Chat {\n  id: Int!\n  messages: [Message]\n  couple: Couple!\n  createdAt: String!\n}\n\ntype Message {\n  id: Int!\n  text: String!\n  chat: Chat!\n  createdAt: String!\n}\n\ntype Comment {\n  id: Int!\n  feed: Feed!\n  text: String!\n  user: User!\n  createdAt: String!\n}\n\ntype CompleteCoupleVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Mutation {\n  CompleteCoupleVerification(phoneNumber: String!, key: String!): CompleteCoupleVerificationResponse!\n  RequestCoupleVerification(partnerPhoneNumber: String!): RequestCoupleVerificationResponse!\n  AddPlace(name: String!, lat: Float!, lng: Float!, address: String!, isVisited: Boolean!): AddPlaceResponse!\n  DeletePlace(placeId: Int!): DeletePlaceResponse!\n  EditPlace(placeId: Int!, name: String, isVisited: Boolean): EditPlaceResponse!\n  FacebookLogin(facebookId: String!, name: String!): FacebookLoginResponse!\n  GoogleLogin(googleId: String!, name: String!, imageUrl: String): GoogleLoginResponse!\n  KakaoLogin(kakaoId: String!, nickname: String!, thumbnail: String): KakaoLoginResponse!\n  Login(username: String!, password: String!): LoginResponse!\n  NaverLogin(naverId: String!, nickname: String!, imageUrl: String): NaverLoginResponse!\n  SignUpEnd(phoneNumber: String!, key: String!): SignUpEndResponse!\n  SignUpStart(username: String!, password: String!, phoneNumber: String!): SignUpStartResponse!\n  UpdateMyProfile(nickname: String, gender: genderOptions, birth: String, status: statusOptions, profilePhoto: String, phoneNumber: String): UpdateMyProfileResponse!\n}\n\ntype RequestCoupleVerificationResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype Couple {\n  id: Int!\n  verified: Boolean!\n  partnerOne: User!\n  partnerTwo: User\n  firstDate: String\n  chat: Chat\n  places: [Place]\n  coupleVerification: CoupleVerification\n  createdAt: String!\n}\n\ntype CoupleVerification {\n  id: Int!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  couple: Couple!\n  createdAt: String!\n}\n\ntype Feed {\n  id: Int!\n  user: User!\n  text: String!\n  feedPicture: String\n  comments: [Comment]\n  place: Place\n  createdAt: String!\n}\n\ntype AddPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype DeletePlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype EditPlaceResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype GetPlacesResponse {\n  ok: Boolean!\n  error: String\n  places: [Place]\n}\n\ntype Query {\n  GetPlaces: GetPlacesResponse!\n  GetMyProfile: GetMyProfileResponse!\n}\n\ntype Place {\n  id: Int!\n  couple: Couple!\n  name: String!\n  lat: Float!\n  lng: Float!\n  address: String!\n  isVisited: Boolean!\n  feeds: [Feed]\n  createdAt: String!\n}\n\ntype FacebookLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype GetMyProfileResponse {\n  ok: Boolean!\n  error: String\n  user: User\n}\n\ntype GoogleLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype KakaoLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype LoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype NaverLoginResponse {\n  ok: Boolean!\n  error: String\n  token: String\n}\n\ntype User {\n  id: Int!\n  username: String\n  password: String\n  loginProvider: String!\n  phoneNumber: String\n  verifiedPhoneNumber: Boolean!\n  facebookId: String\n  googleId: String\n  kakaoId: String\n  naverId: String\n  nickname: String\n  gender: String\n  birth: String\n  status: String\n  profilePhoto: String\n  lastLat: Float\n  lastLng: Float\n  feeds: [Feed]\n  coupleForPartnerOne: Couple\n  coupleForPartnerTwo: Couple\n  comments: [Comment]\n  createdAt: String!\n}\n\ntype SignUpEndResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype SignUpStartResponse {\n  ok: Boolean!\n  error: String\n}\n\ntype UpdateMyProfileResponse {\n  ok: Boolean!\n  error: String\n}\n\nenum genderOptions {\n  MALE\n  FEMALE\n}\n\nenum statusOptions {\n  HAPPY\n  DEPRESSED\n  MAD\n  ENERGIZED\n  UNCERTAIN\n  PEACEFUL\n  CONFUSED\n}\n\ntype Verification {\n  id: Int!\n  payload: String!\n  key: String!\n  verified: Boolean!\n  createdAt: String!\n}\n"];
/* tslint:disable */

export interface Query {
  GetPlaces: GetPlacesResponse;
  GetMyProfile: GetMyProfileResponse;
}

export interface GetPlacesResponse {
  ok: boolean;
  error: string | null;
  places: Array<Place> | null;
}

export interface Place {
  id: number;
  couple: Couple;
  name: string;
  lat: number;
  lng: number;
  address: string;
  isVisited: boolean;
  feeds: Array<Feed> | null;
  createdAt: string;
}

export interface Couple {
  id: number;
  verified: boolean;
  partnerOne: User;
  partnerTwo: User | null;
  firstDate: string | null;
  chat: Chat | null;
  places: Array<Place> | null;
  coupleVerification: CoupleVerification | null;
  createdAt: string;
}

export interface User {
  id: number;
  username: string | null;
  password: string | null;
  loginProvider: string;
  phoneNumber: string | null;
  verifiedPhoneNumber: boolean;
  facebookId: string | null;
  googleId: string | null;
  kakaoId: string | null;
  naverId: string | null;
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

export interface CoupleVerification {
  id: number;
  payload: string;
  key: string;
  verified: boolean;
  couple: Couple;
  createdAt: string;
}

export interface GetMyProfileResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface Mutation {
  CompleteCoupleVerification: CompleteCoupleVerificationResponse;
  RequestCoupleVerification: RequestCoupleVerificationResponse;
  AddPlace: AddPlaceResponse;
  DeletePlace: DeletePlaceResponse;
  EditPlace: EditPlaceResponse;
  FacebookLogin: FacebookLoginResponse;
  GoogleLogin: GoogleLoginResponse;
  KakaoLogin: KakaoLoginResponse;
  Login: LoginResponse;
  NaverLogin: NaverLoginResponse;
  SignUpEnd: SignUpEndResponse;
  SignUpStart: SignUpStartResponse;
  UpdateMyProfile: UpdateMyProfileResponse;
}

export interface CompleteCoupleVerificationMutationArgs {
  phoneNumber: string;
  key: string;
}

export interface RequestCoupleVerificationMutationArgs {
  partnerPhoneNumber: string;
}

export interface AddPlaceMutationArgs {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isVisited: boolean;
}

export interface DeletePlaceMutationArgs {
  placeId: number;
}

export interface EditPlaceMutationArgs {
  placeId: number;
  name: string | null;
  isVisited: boolean | null;
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

export interface KakaoLoginMutationArgs {
  kakaoId: string;
  nickname: string;
  thumbnail: string | null;
}

export interface LoginMutationArgs {
  username: string;
  password: string;
}

export interface NaverLoginMutationArgs {
  naverId: string;
  nickname: string;
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

export interface UpdateMyProfileMutationArgs {
  nickname: string | null;
  gender: genderOptions | null;
  birth: string | null;
  status: statusOptions | null;
  profilePhoto: string | null;
  phoneNumber: string | null;
}

export interface CompleteCoupleVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface RequestCoupleVerificationResponse {
  ok: boolean;
  error: string | null;
}

export interface AddPlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface DeletePlaceResponse {
  ok: boolean;
  error: string | null;
}

export interface EditPlaceResponse {
  ok: boolean;
  error: string | null;
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

export interface KakaoLoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface NaverLoginResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface SignUpEndResponse {
  ok: boolean;
  error: string | null;
}

export interface SignUpStartResponse {
  ok: boolean;
  error: string | null;
}

export type genderOptions = "MALE" | "FEMALE";

export type statusOptions = "HAPPY" | "DEPRESSED" | "MAD" | "ENERGIZED" | "UNCERTAIN" | "PEACEFUL" | "CONFUSED";

export interface UpdateMyProfileResponse {
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
