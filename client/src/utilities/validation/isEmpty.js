// optimized global isempty method
export var isEmpty = value =>
  value === null ||
  value === undefined ||
  (typeof value == "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

// export so we can make use of this globally
