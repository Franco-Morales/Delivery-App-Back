import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.cert({
    "type": "service_account",
"project_id": "delivery-app2021",
"private_key_id": "b5e7177fa868bf80c45896866a01f265fb08413d",
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC5hUJ0aK7zNbwZ\nJuCjqBTn/VUC0BS9meo/7+pGAY7rO1ihYBuAlEPsA5N8tnQaKV9w8wCDIOeZEPij\nTOgZf4JoZ4Ukbe493IKeE2P80U58TZJg60nRlyaE7C4euxmY90xUWa/hzwH8rS/Z\nWRVGlx4hyC78MPvsM4nRyGyUyowS0AsmWE3vbJRrVYbdRcR6xPBCZPsrC2fQPbAy\nLRaKukiN4fJpq31SRD9Ckjk0O44hjE3lozLDDlxj3uG6wyFkCMIFch84tcPZWUVl\n+6s55JesIrzBbXpy+Qt6Unv83RoZlMJ0dKIk/pZFO0rvejhkO7++q95Ubf1TNWfK\nm/bAdNV1AgMBAAECggEADgxWk+oOwBakP7ip72VIRVOcSbI9X9N1NueRSJZ69A/H\nuQXwud6AUNw/IYUkwDZnJm5q7i23sTzlFw3j0B/Pst2OlMueQXZJOHR6Gygzq/Cp\nJ52pjALIxUKn22aKRwMITKWIpANrlcP83kCDU+0YOFv9nYCNaGger5FgZ4P5nL2d\n6k31dY9uUFuR/07Dl4Y0xjY+Jw4ocXBcBzp6cX1GRNqMKNBg7+0mhxjAmdGBEesG\n3EVaKoVpUr77v2Pfr4J2Dc4wSlQMaMbpUK+tSUon3ub8IRz/Ff3TXtqOUKwcNN2d\nnyyKd+RxufVgIRmopqDyCfe1KbbVowpA5fioyD8qoQKBgQDg8zcHYo0aOTkACWxi\nWPjVJuoGnyENDiZG9ffopE9Jjxmk95UMMe+uwYc87GWxjVNmrf/1ZcNmzX8JfD0r\n5ikXATpbc0DN56It4xmWCbf7J+Fn4VN7YdBTmF27aDbAhcGnMitKi1mkWtGZM3Zl\nzsEKtr1HvMTspMX222qdyaxFBwKBgQDTIMWsKdowD8L9qzrDnPVtamwC2spULRJz\ntgaY/hfI0v7/02JI8WIgCSCZGr6aPGKLOcJFfK2qvxOTjEOz1qCEErfLT3s3T8XX\nJ1qwuBzeoO1DZnCmL7gfow9yjg8xxapCoRd16O9rU44tettKG+5cbeln4tZbJHfE\nSM1Eju2OowKBgDoSr/cpGxJVCYEX7bIqE/s7M5mIBUlQiNMy9tBJcuqjldQ/0mu2\njJEKBzbUNKC0wn40l2qr3dkxXgV93HDz11HIEF/Bjk5Z6UV9ZoKUebnOHuPpiNrG\ncrjSEgiqq8/h+A+I5SI2fWrvw0KQxZUc3js81/qoIhKRq0XCeXDIur+LAoGBAKDK\nvME5vqoL1v1Kgx6nU2NZQZmK97zT9tGZN70dBxAzYXGEk73p2El9qg3wiGj+xC40\ndvhk0/7ONyKQGJ/GPclYWBHHHpgpcQtDNZaRIauL9Cb4xaJLhXbSwNkFyByn5duI\nxE1QccbTg9yvTINMcmSCcNhlscsIIw6iQ3KLR/DxAoGBAIcbfcnnfEkDkIYY4331\nMzjAAGEw78NR4WEhxZPitic9ARzdF8afZ9W1dLIKLKVyw5egK2qjASLjFIWBk1DM\nkSrJcElcTF4gGG/PCYosrvPV4b9HO8aPb7YpaWURfdsz4VYGcQupwR80QX0XZkVe\nlxRyz4IKkirL1zEaNNSe6NVi\n-----END PRIVATE KEY-----\n",
"client_email": "firebase-adminsdk-eb75w@delivery-app2021.iam.gserviceaccount.com",
"client_id": "107340217759280996110",
"auth_uri": "https://accounts.google.com/o/oauth2/auth",
"token_uri": "https://oauth2.googleapis.com/token",
"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-eb75w%40delivery-app2021.iam.gserviceaccount.com"
  }),
  databaseURL: 'https://delivery-app2021.firebaseio.com'
});

export default admin;
