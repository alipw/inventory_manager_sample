async function queryconverter(req, res, next) {
  if (req.query) {
    for (const key of Object.keys(req.query)) {
      if (Array.isArray(req.query[key])) {
        // only accepts a single query parameter for each value
        req.query[key] = req.query[key][0];
      }
    }
  }

  next();
}

export { queryconverter };
