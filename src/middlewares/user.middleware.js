import admin from '../firebase';

const db = admin.firestore()

const middleware = {}

 middleware.existUser = async(req, res, next) => {
  let uid =  req.body.uid;
  const snapshot = await db.collection('clients').where('uid', '==', uid).get();
  let user = null;
  snapshot.forEach(doc => {
    user = doc.data()
  });
  if(user){
    //console.log('HAY USUARIO')
    next()
  }else{
    //console.log('NO EXISTE USUARIO')
    res.writeHead( 400, 'Error no existe el usuario', {'content-type' : 'text/plain'});
    res.end('Error el usuario no existe');
  }
}

export default middleware;
