/**
 * Created by Uncle Charlie, 2017/03/10
 */

import * as  _ from 'lodash'
import utils from '../utils'
import dataProvider from '../models'
// import    Accessory       from '../models/accessory').model;

var postPets = function (req, res) {
  var pet = new dataProvider.Pet();
  pet.name = req.body.name;
  pet.type = req.body.type;
  pet.quantity = req.body.quantity;

  // TODO: first ordinary obj, then a model instance.
  // var accessory = {

  // }
  // var accessory = new Accessory();
  // accessory.name = req.body.accName;
  // accessory.price = req.body.accPrice;

  // pet.accessories.push(accessory);

  // pet.save(function (err) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: pet});
  // });

  var options = _.extend({}, req.query, req.body, req.params, req.user);
  console.log(`print options extended`);
  utils.listAllKeyValues(options);

  // pet.save().then(function(p){
  //     res.json({message: 'done', data: pet});
  // }).catch(function(err) {
  //     res.json({message: 'error', data: err});
  // });

  dataProvider.Pet.saveOne(options).then(function (pet) {
    res.json({ message: 'done', data: pet });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

var getPets = function (req, res) {
  // Pet.find(function (err, pets) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: pets});
  // });

  dataProvider.Pet.find({}).exec().then(function (pets) {
    res.json({ message: 'done', data: pets });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

var getFullPets = function (req, res) {
  console.log('get full pets');
  // var options = _.extend({}, req.query, req.body, req.params, req.user);
  dataProvider.Pet.findFull({}).exec().then(function (pets) {
    res.json({ message: 'done', data: pets });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

var getPet = function (req, res) {
  // Pet.findById(req.params.pet_id, function (err, pet) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }
  //     res.json({message: 'done', data: pet});
  // });

  // Pet.findById(req.params.pet_id).then(function(p) {
  //     res.json({message: 'done', data: pet});
  // }).catch(function(err) {
  //     res.json({message: 'error', data: err});
  // });

  // Pet.anotherFindOne({'_id': req.params.pet_id}, function(err, pet) {
  //     console.log('Pet.anotherFindOne');
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: pet});
  // });



  dataProvider.Pet.anotherFindOne({ '_id': req.params.pet_id }).exec().then(function (pet) {
    res.json({ message: 'done', data: pet });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

var updatePet = function (req, res) {
  // Pet.findById(req.params.pet_id, function(err, pet) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     pet.quantity = req.params.quantity;

  //     pet.save(function (err) {
  //         if (err) {
  //             res.json({message: 'error', data: err});
  //             return;
  //         }
  // 
  //         res.json({message: 'done', data: pet});
  //     });
  // });

  dataProvider.Pet.findById(req.params.pet_id).then(function (p) {
    p.quantity = req.params.quantity;
    return p.save();
  }).then(function (p) {
    res.json({ message: 'done', data: pet });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
};

var deletePet = function (req, res) {
  // Pet.findByIdAndRemove(req.params.pet_id, function(err) {
  //     if (err) {
  //         res.json({message: 'error', data: err});
  //         return;
  //     }

  //     res.json({message: 'done', data: {}});
  // });

  dataProvider.Pet.findByIdAndRemove(req.params.pet_id).then(function () {
    res.json({ message: 'done', data: {} });
  }).catch(function (err) {
    res.json({ message: 'error', data: err });
  });
}

export default {
  postPets: postPets,
  getPets: getPets,
  getFullPets: getFullPets,
  getPet: getPet,
  updatePet: updatePet,
  deletePet: deletePet
};