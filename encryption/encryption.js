const { SecretClient } = require("@azure/keyvault-secrets");
const { ClientSecretCredential } = require("@azure/identity");
const dotenv = require('dotenv');

dotenv.config({
  path: "./azure_cred.env"
})

let tenantId = process.env.AZURE_TENANT_ID
let clientId = process .env.AZURE_CLIENT_ID
let clientSecret = process.env.AZURE_CLIENT_SECRET // "239482"

async function main() {
  const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
  const url = "https://" + 'vault-rokasrs' + ".vault.azure.net";
  const client = new SecretClient(url, credential);
  //console.log(client)
  const secretName = 'secret1';
  const result = await client.setSecret(secretName, "MySecretValue");
  const secret = await client.getSecret(secretName);
  console.log("secret: ", secret['value']);
}

main()