const Digest = require('../../model/digest');

module.exports = async (req, res) => {
  const digest = await Digest.findLatestDaily();

  return res.send(digest[0]);
};