
module.exports = content

function content(req, res){
  res.haiku(req.url)
}
