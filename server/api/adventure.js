const router = require('express').Router()
const { Adventure, Location } = require('../db/models')


router.get('/', (req, res, next) => {
    Adventure.findAll()
        .then(adventures => { res.json(adventures) })
        .catch(next);
});

router.get('/:adventureId', (req, res, next) => {
    Adventure.findById(req.params.adventureId)
        .then(adventure => res.json(adventure))
        .catch(next)
});


router.put('/:adventureId', (req, res, next) => {
    return Adventure.update({ status: req.body.status }, {
        where: {
            userId: req.body.userId,
            id: req.body.id,
        },
        returning: true,
        plain: true
    })
        .then(location =>  res.json(location[1].dataValues))
        .catch(next)
});

router.get('/:adventureId/location', (req, res, next) => {
    Location.findAll({
        order: [['positionInHunt', 'ASC']],
        where: {
            adventureId: req.params.adventureId
        }
    })
        .then(locations => res.json(locations))
        .catch(next)
});


// router.get('/:adventureId/location/:locationId', (req, res, next) => {
//     Location.findAll({
//         where: {
//             adventureId: req.params.adventureId,
//             id: req.params.locationId
//         }
//     })
//         .then(location => res.json(location))
//         .catch(next)
// });


router.put('/:adventureId/location/:locationId/visited', (req, res, next) => {
    return Location.update({ visited: req.body.visited }, {
        where: {
            adventureId: req.body.adventureId,
            id: req.body.id
        },
        returning: true,
        plain: true
    })
        .then(location =>  res.json(location[1].dataValues))

        .catch(next)
});

module.exports = router;
