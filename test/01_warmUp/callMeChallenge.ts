import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer } from "ethers";

let accounts: Signer[];
let contract: Contract;
const contractAddr : string = `0x71b9627C2DB7A51851b337e6542A77B85D3Df91a`;

describe("Call Me Challenge", function () {
    
    before(async () => {
      accounts = await ethers.getSigners();
      let wallet: Signer = accounts[0];
      const factory =  await ethers.getContractFactory("CallMeChallenge")
      contract = await factory.attach(contractAddr);
    });
    
    it("should solve the challenge", async function () {
      const tx = await contract.callme();
      const txHash = tx.hash
      expect(txHash).to.not.be.undefined
    });

});
