import Twilio from "twilio";

const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export const sendSMS = (body: string, to: string) => {
  twilioClient.messages.create({
    body,
    from: process.env.TWILIO_PHONE,
    to
  });
};
