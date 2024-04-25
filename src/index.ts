import { ponder } from "@/generated";
import { ethers } from "ethers";

ponder.on("AlloStrategy:Registered", async ({ event, context }) => {
  const { RegisteredEvent } = context.db;
  const abiCoder = new ethers.AbiCoder();
  const item = event.args.data;
  const extendedData = abiCoder.decode(["bytes", "uint256"], item);
  const decodedData = abiCoder.decode(
    ["address", "address", "tuple(uint256, string)"],
    extendedData[0]
  );
  await RegisteredEvent.create({
    id: event.log.id,
    data: {
      recipientId: event.args.recipientId,
      recipientAddress: decodedData[1],
      recipientCount: extendedData[1],
      metadata: decodedData[2][1],
      sender: event.args.sender,
      timestamp: event.block.timestamp,
    },
  });
});
