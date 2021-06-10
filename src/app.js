import  "dotenv/config";
import server from "./server";
import "./database";
// import gaiaIndex from "./Seeding/gaia.index";

const main = async () => {
    try {
        let port = server.get('port');
        server.listen(port);
        console.log(`Server on port:[${port}]`);
        // await gaiaIndex.terraform('drop-create');
    } catch (error) {
        console.error(error);
    }
}

main();