import admin from '../firebase';
const db = admin.firestore();


let createUserEmployee = async (request, response) => {
    let { email, password, nombre, rol } = request.body;

    try {
        const UserRecord = await admin.auth().createUser({
            email: email,
            emailVerified: true,
            password: password,
            displayName: nombre
        });
        
        let data = {
            uid: UserRecord.uid,
            email: UserRecord.email,
            estado: 1,
            online: false,
            nombre: UserRecord.displayName,
            role: rol
        };

        await db.collection("clients").doc(UserRecord.uid).set(data, { merge: true});

        response.status(200).json({"uid": UserRecord.uid });
    } catch (error) {
        response.status(500).json({"error": error});
    }
}


const adminController = { createUserEmployee };


export default adminController;