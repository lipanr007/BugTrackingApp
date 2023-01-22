import { Sequelize } from "sequelize";

const sequelize=new Sequelize({
    dialect:"sqlite",
    storage:"./backend/database/bugapp.db"
})
sequelize.sync().then(()=>{   
    console.log("All the models have been synced")
})
export {sequelize};