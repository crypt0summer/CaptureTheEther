import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract
const contractAddr: string = `0x2d64f151Dd7F88A1e1EA20d2Af645CDeecd7fa8B`;

describe.skip("Lottery - guess the number", function () {
  before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory("GuessTheNumberChallenge");
    contract = factory.attach(contractAddr);
  });

  it("solves the challenge", async function () {
    let gasPrice = await ethers.provider.getGasPrice();
    const tx = await contract.guess(42, {
      value: ethers.utils.parseEther(`1`),
      gasPrice: BigNumber.from(gasPrice),
    });
    const txHash = tx && tx.hash;
    expect(txHash).to.not.be.undefined;
    console.log(`https://ropsten.etherscan.io/tx/${txHash}`);
  });
});
before(async () => {
  accounts = await ethers.getSigners();
  eoa = accounts[0];
  const factory = await ethers.getContractFactory("GuessTheNumberChallenge");
  contract = factory.attach(contractAddr);
});

it("solves the challenge", async function () {
  let gasPrice = await ethers.provider.getGasPrice();
  const tx = await contract.guess(42, {
    value: ethers.utils.parseEther(`1`),
    gasPrice: BigNumber.from(gasPrice)
  });
  const txHash = tx && tx.hash;
  expect(txHash).to.not.be.undefined;
  console.log(`https://ropsten.etherscan.io/tx/${txHash}`);
});