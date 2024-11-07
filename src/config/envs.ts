import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars{
    PORT_MC: number;
    PORT:number;
    DATABASE_URL: string;
   
}

const envsSchema = joi.object({
    PORT_MC: joi.number().required(),
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    
})


.unknown(true);

const {error, value} = envsSchema.validate(process.env);

if (error){
    throw new Error(`Config validation error: ${error.message}`);
}

const EnvVars: EnvVars = value;

export const envs = {
    port_mc: EnvVars.PORT_MC,
    port: EnvVars.PORT,
    databaseUrl: EnvVars.DATABASE_URL,
   
};
