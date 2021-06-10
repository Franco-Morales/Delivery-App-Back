// import minerva from "./minerva";
import Demeter from "./Demeter";
import Hades from "./Hades";

const terraform = async (opt) => {
    try {
        switch (opt) {
            case 'update':
                await Demeter.init();
                break;
            case 'drop-create': 
                await Hades.dropCollections();
                await Demeter.init();
                break;
            case 'drop':
                await Hades.dropCollections();
                break;
            case 'kill':
                await Hades.kill();
                break;
            default:
                break;
        }

    } catch (error) {
        console.error(`Module : Gaia : Error -> ${error}`);
    }
}


export default { terraform };