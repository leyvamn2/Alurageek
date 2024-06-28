module.exports = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.10:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  };
  