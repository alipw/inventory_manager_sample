function successWrapper(data: any): {
  code: "ok";
  message: "your request has been successfully processed";
  data: any;
} {
  return {
    code: "ok",
    message: "your request has been successfully processed",
    data,
  };
}

export { successWrapper };
