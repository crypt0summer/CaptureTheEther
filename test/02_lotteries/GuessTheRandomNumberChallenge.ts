import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract
const contractAddr: string = `0xb5238bC6f5F4fA2f5a2D0913503b13634aD63513`;

describe("Lottery - guess the number (Random)", function () {
  before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory(
      "GuessTheSecretNumberChallenge"
    );
    contract = factory.attach(contractAddr);
  });


  it("solves the challenge", async function () {
   

    const answer = BigNumber.from(
        await contract.provider.getStorageAt(contract.address, 0)
      )

    console.log(`Answer: ${answer}`);

    let gasPrice = await ethers.provider.getGasPrice();
    const tx = await contract.guess(answer, {
      value: ethers.utils.parseEther(`1`),
      gasPrice: BigNumber.from(gasPrice),
    });
    const txHash = tx && tx.hash;
    expect(txHash).to.not.be.undefined;
    console.log(`https://ropsten.etherscan.io/tx/${txHash}`);
  });
});
