import { MESSAGE_CREATE_TOPIC } from "src/_common/constants/kafka.constants";
import { kafka } from "./kafka";
export async function initializeTopics() {
  try {
    const admin = kafka.admin();

    await admin.connect();
    const existingTopics = await admin.listTopics();
    if (!existingTopics.includes(MESSAGE_CREATE_TOPIC)) {
      await admin.createTopics({
        topics: [
          {
            topic: MESSAGE_CREATE_TOPIC,
            numPartitions: 1,
          },
        ],
      });
      console.log("Topics Created");
    }

    console.log("No need of Topic Creation as Topic already exists");

    await admin.disconnect();
  } catch (e) {
    console.log("error in admin creation");
    console.log(e);
  }
}
