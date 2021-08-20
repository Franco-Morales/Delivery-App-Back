import  "dotenv/config";
import server from "./server";
import "./database";
// import Gaia from "./Seeding/Gaia.index";

const main = async () => {
    try {
        let port = server.get('port');
        server.listen(port);
        console.log(`Server on port:[${port}]`);
        // await Gaia.terraform("create");
    } catch (error) {
        console.error(error);
    }
}

main();