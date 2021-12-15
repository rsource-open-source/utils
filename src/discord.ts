import { ShardClient } from "detritus-client";
import { Markup } from "detritus-client/lib/utils";
import { CodeblockFilterOptions } from "detritus-client/lib/utils/markup";
import { rsourceLoggingChannel } from "./constants";

export async function rsourceServerLog(
  client: ShardClient,
  message: string,
  embed = true,
  highlight?: CodeblockFilterOptions
) {
  embed
    ? await client.rest.createMessage(rsourceLoggingChannel, {
        content: Markup.codeblock(message),
      })
    : await client.rest.createMessage(rsourceLoggingChannel, {
        embed: {
          color: 0xff3826,
          description: Markup.codeblock(message, highlight),
          timestamp: new Date().toString(),
        },
      });
}
