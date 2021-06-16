import  "dotenv/config";
import server from "./server";
import "./database";

const main = async () => {
    try {
        let port = server.get('port');
        server.listen(port);
        console.log(`Server on port:[${port}]`);
    } catch (error) {
        console.error(error);
    }
}

main();
