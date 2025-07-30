import { kafka } from "./kafka";

export const producer = kafka.producer();
export const startProducer = async () => {
  try {
    await producer.connect();
    console.log("producer connected");
  } catch (e) {
    console.log("failed to connect via producer");
  }
};
