module.exports = function(sequelize, DataTypes) {
    var forumQuestion = sequelize.define("forumQuestion", {
        qid: {type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,},
        question: DataTypes.TEXT,
        student_id:DataTypes.INTEGER,
    });
    return forumQuestion;
  };
  