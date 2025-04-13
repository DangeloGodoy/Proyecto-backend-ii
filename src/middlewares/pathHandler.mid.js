export const pathHandler = (req, res) => {
  const message = "Not found URL";
  const data = {
    method: req.method,
    url: req.originalUrl,
    error: message,
  };
  return res.status(404).json(data);
};
