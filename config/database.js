import { Sequelize } from "sequelize";

const sequelize = new Sequelize('mercevery_bd', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;