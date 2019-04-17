import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = (body: string, to: string) => {
  return twilioClient.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to
  });
};

export const sendVerificationSMS = (key: string, to: string) => {
  sendSMS(`We There 인증번호 ${key}를 입력하세요.`, to);
};

export const sendCoupleVerificationSMS = (key: string, to: string) => {
  sendSMS(`We There 커플 인증번호 ${key}를 입력하세요.`, to);
};
