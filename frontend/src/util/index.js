import normalize from "json-api-normalizer";

export const normalizeData = response => {
  const normalizedData = normalize(response.data, { camelizeKeys: false });
  normalizedData.meta = response.data.meta;
  return normalizedData;
};
