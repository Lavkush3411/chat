import { MESSAGE_CREATE_TOPIC } from "src/_common/constants/kafka.constants";
import { kafka } from "./kafka";

export const startConsumer = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "all" });
    await consumer.connect();
    console.log("Consumer connected");
    await consumer.subscribe({
      topic: MESSAGE_CREATE_TOPIC,
      fromBeginning: true,
    });
    await consumer.run({
      autoCommit: true,
      eachBatchAutoResolve: true,
      eachBatch: async ({ batch }) => {
        const { topic, partition, messages } = batch;
        for (let message of messages) {
          const { key, value } = message;
          console.log(topic, partition, key?.toString(), value?.toString());
        }
      },
    });
  } catch (e) {
    console.log("failed to connect with consumer");
  }
};
