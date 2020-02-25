const models = require('../../model/menu/Menu');
const systemMessage = require('../../../config/systemMessage');

exports.index = (req,res) => {
    return models.Menu.findAll({
      where: { useYn: "Y" }
    })
    .then(applys => res.json(applys))
    .catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};

exports.show = (req,res) => {
  const id = req.params.id || '';

  if(!id.length){
    return res.status(400).json({error:systemMessage.search.incorrectKey + "id", req:id});
  }

models.Menu.findOne({
    where: {
      id: id,
    }
  }).then(menu => {
      if (!menu){
        return res.status(404).json({error:systemMessage.search.targetMissing});
      }
      return res.json(menu);
    }).catch(function (err) {
        console.log(err);
        return res.status(500).json(err);
    });
};


exports.quickMenu = (req,res) => {
  return models.Menu.findAll({
    where: { mainShowYn: "Y" }
  })
  .then(applys => res.json(applys))
  .catch(function (err) {
      console.log(err);
      return res.status(500).json(err);
  });
};