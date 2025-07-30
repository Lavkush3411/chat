import { MESSAGE_CREATE_TOPIC } from "src/_common/constants/kafka.constants";
import { kafka } from "./kafka";
import { createMessageBulk } from "src/message/services/message.service";

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

        const messageList = messages.map(({ key, value }) => ({
          senderId: key?.toString(),
          receiverId: (value?.toJSON() as unknown as { receiverId: string })
            ?.receiverId,
          message: (value?.toJSON() as unknown as { message: string })?.message,
        }));

        await createMessageBulk(messageList);
      },
    });
  } catch (e) {
    console.log("failed to connect with consumer");
  }
};
