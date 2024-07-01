var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET users listing. */
router.get('/accounts', function(req, res, next) {
  res.status(200).send({
    code: 200,
    message: 'success',
    data: []
  });
});


router.get('/mnemonic', function(req,res,next){
  const result = fs.readFileSync(path.join(__dirname, '../', 'database', 'mnemonic.json'), 'utf-8');
  console.log(typeof JSON.parse(result))
  res.status(200).json({
    code: 200,
    message: 'success',
    data: {
      mnemonic: JSON.parse(result)?.mnemonic || null
    }
  })
})

router.post('/createMnemonic', function(req,res,next){
  const mnemonic = req.body?.mnemonic;
  const password = req.body?.password

  if(!mnemonic){
    res.status(400).send({
      code: 400,
      message: "mnemonic is missing",
      data: null
    });
    return;
  }


  const mnemonicData = {
    mnemonic,
    password
  };
  const jsonString = JSON.stringify(mnemonicData, null, 2);


try {
  // 写入文件
  fs.writeFileSync(path.join(__dirname, '../', 'database', 'mnemonic.json'), jsonString, 'utf8');
  res.status(200).send({
    code: 200,
    message: 'success',
    data: true
  })
} catch (error) {
  res.status(500).send({
    code: 500,
    message: 'error',
    data: null
  })
}

})

module.exports = router;
