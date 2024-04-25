import { createSchema } from "@ponder/core";

export default createSchema((p) => ({
  RegisteredEvent: p.createTable({
    id: p.string(),
    recipientId: p.hex(),
    recipientAddress: p.hex(),
    recipientCount: p.bigint(),
    metadata: p.string(),
    sender: p.hex(),
    timestamp: p.bigint(),
  }),
}));
