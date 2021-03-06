module.exports = function (sequelize, DataTypes) {
  var Assignments = sequelize.define('Assignments', {
    assignName: {
      type: DataTypes.STRING, 
      validate: {
        isAlpha: true 
      }
    },
  }); 
  Assignments.associate = function(models) {
    Assignments.hasMany(models.Grades, {
      onDelete: 'cascade' 
    }); 
  }
  return Assignments;
}
