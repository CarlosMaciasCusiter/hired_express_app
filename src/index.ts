import dotenv from "dotenv";
import express from "express";
import { isUserAuthenticated } from "./utils/authMiddleware";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

/**
 * currently using jwt.io to generate a jwt, build out future login
 * routes after connected to mongoose.
 */

// define a route handler for the default home page
app.get( "/", isUserAuthenticated, ( req, res ) => {
    // render the index template
    res.send( "Hello root route" );
} );

// start the express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );