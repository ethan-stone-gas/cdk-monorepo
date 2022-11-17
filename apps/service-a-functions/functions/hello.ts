type Event = {
  name?: string;
};

export const main = async (event: Event) => {
  return {
    message: `Hello ${event.name || "World"}`,
  };
};
