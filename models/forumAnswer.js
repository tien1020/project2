module.exports = function(sequelize, DataTypes) {
    var forumAnswer = sequelize.define("forumAnswer", {
        aid: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
        qid:DataTypes.INTEGER,
        answer: DataTypes.TEXT,
        student_id:DataTypes.INTEGER,
    });
    return forumAnswer;
  };
  