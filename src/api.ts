const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUserLevel = async (username: string) => {
  await delay(1000);

  if (username.startsWith("level1")) {
    return 1;
  }
  if (username.startsWith("level2")) {
    return 2;
  }
  if (username.startsWith("level3")) {
    return 3;
  }

  return 4;
};

export const getList = async (times: number) => {
  await delay(1500);
  console.log("api call");
  return Array.from({ length: times }, (_, index) => ({
    id: index,
    name: `name${index}`,
  }));
};

export const getList2 = async (params: { times: number }) => {
  await delay(1500);
  console.log("api call");
  return Array.from({ length: params.times }, (_, index) => ({
    id: index,
    name: `name${index}`,
  }));
};
