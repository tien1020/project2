module.exports = function(sequelize, DataTypes) {
    var question = sequelize.define("question", {
        qid: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
        question: DataTypes.TEXT,
        student_id:DataTypes.INTEGER,
    });
    return question;
  };
  