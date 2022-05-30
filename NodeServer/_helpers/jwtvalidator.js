require('dotenv').config();
const _getKeyValue = require('lodash/get')
const { verifyJwtToken } = require('../_helpers/jwt')

module.exports = {
    accessTokenValidator: async (req, res, next) => {
      try {
        let token = _getKeyValue(req.headers, 'authorization', null);
  
        if (!token) return res.send("Not authorized!!");
        token = token.split(' ')[1]
        req.payload = await verifyJwtToken({ token, secret: process.env.secret })
        next()
      } catch (error) {
        next(error)
      }
    }
  }
