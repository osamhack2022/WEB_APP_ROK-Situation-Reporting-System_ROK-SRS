const { SecretClient } = require("@azure/keyvault-secrets");
const { ClientSecretCredential } = require("@azure/identity");
var SHA256 = require("crypto-js/sha256");
var enc = require("crypto-js/enc-hex");
var enc2 = require('crypto-js/enc-utf8')
var AES = require("crypto-js/aes");
var NodeRSA = require('node-rsa');

const { v4: uuidv4 } = require('uuid');

const tenantId = process.env.AZURE_TENANT_ID
const clientId = process.env.AZURE_CLIENT_ID
const clientSecret = process.env.AZURE_CLIENT_SECRET
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const url = "https://" + 'vault-rokasrs' + ".vault.azure.net";
const client = new SecretClient(url, credential);

function hex_to_ascii(str1)
 {
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
		str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
	}
	return str;
 }

function generateKey(IV){
    return SHA256(IV);     
}

export async function encryptchat(userid, chatid, plaintext) {
    let secret = null
    try { //secret exists
        secret = await client.getSecret(userid + "-" + chatid);

    } catch {
        const key = new NodeRSA();
        console.log(key)
        
    }

}