function isLogin(req) {
  return req.session.isLogin ? true : false
}
function getUid() {
  return '123'
}
module.exports = {
  isLogin, getUid
}
