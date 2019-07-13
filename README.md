## POC Ethereum Wallet app

**Create key**
When a user opens the app for the first time he will either have to create an new private key or import an existing one by scanning a QR code. This adds the private key to the app so it can be used for signing transactions on the Ethereum network.
 
![keys](https://user-images.githubusercontent.com/29141548/48069834-bde5b900-e1d6-11e8-85f4-5334bc2848ab.png)

**Create identity**
The next step will be to create a new identity. This is an ERC725/ERC735 identity which is created on an Ethereum blockchain. The app itself only keeps the address of the created identity and the name given to it by the user for easy reference. Also, if the user already has an ERC725 identity, it can be imported into the app by entering or scanning the address of the identity. 
![identities](https://user-images.githubusercontent.com/29141548/48069854-c8a04e00-e1d6-11e8-9f61-7d271863fae8.png)
 

**Sign and execute transaction**
Once the user has an identity, it can be used to sign transactions. To do this, the user selects the identity he wants to use and also a private key that can be used with the selected identity. Next he scans a QR code containing the transaction and presses the send button to sign the transaction and execute it on the Ethereum network.
![transaction](https://user-images.githubusercontent.com/29141548/48069860-cc33d500-e1d6-11e8-8e6c-03e227068052.png)

 
**Login to website**
Logging in with an identity looks pretty much the same as signing a transaction. The user first selects an identity and key and then scans a QR code containing the login information from the website. After pressing the login button the app communicates the signed login with the website over the Ethereum whisper protocol.
 
![login](https://user-images.githubusercontent.com/29141548/48069867-d05ff280-e1d6-11e8-971e-959a498781c0.png)


