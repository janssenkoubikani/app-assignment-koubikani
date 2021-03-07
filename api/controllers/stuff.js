const Assignment = require('../models/Assignment');
const fs = require('fs');

exports.createAssignment = (req, res, next) => {
    const assignmentObject = JSON.parse(req.body.assignment);
    delete assignmentObject._id;
    const assignment = new Assignment({
      ...assignmentObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    assignment.save()
      .then(() => res.status(201).json({ message: 'Assignment enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneAssignment = (req, res, next) => {
  Assignment.findOne({
    _id: req.params.id
  }).then(
    (assignment) => {
      res.status(200).json(assignment);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyAssignment = (req, res, next) => {
    const assignmentObject = req.file ?
      {
        ...JSON.parse(req.body.assignment),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
      Assignment.updateOne({ _id: req.params.id }, { ...assignmentObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Assignment modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.deleteAssignment = (req, res, next) => {
    Assignment.findOne({ _id: req.params.id })
      .then(assignment => {
        const filename = assignment.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Assignment.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Assignment supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

exports.getAllStuff = (req, res, next) => {
  Assignment.find().then(
    (assignment) => {
      res.status(200).json(assignment);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};