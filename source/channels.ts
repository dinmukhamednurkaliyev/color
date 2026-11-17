declare const channelSpace: unique symbol;

export type Channels<Space, Values extends readonly unknown[]> = Values & {
  readonly [channelSpace]?: Space;
};
