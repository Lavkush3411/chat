import { MESSAGE_CREATE_TOPIC } from "src/_common/constants/kafka.constants";
import { kafka } from "./kafka";
import { createMessageBulk } from "src/message/services/message.service";
import { MessageType } from "src/db/models/message.model";
import { CreateMessageDto } from "src/message/dtos/message.dto";

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

        const messageList = messages.map(({ key, value }) => {
          const message = JSON.parse(
            value?.toString() as string
          ) as CreateMessageDto;
          return {
            senderId: key?.toString(),
            senderName: message.senderName,
            receiverId: message.receiverId,
            message: message.message,
          };
        });

        await createMessageBulk(messageList);
      },
    });
  } catch (e) {
    console.log("failed to connect with consumer");
  }
};
