import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber, Contract, Signer } from "ethers";

let accounts: Signer[];
let eoa: Signer;
let contract: Contract; // challenge contract
const contractAddr: string = `0xBbd3abc309340a7c37780dC6E0a3Ba06B2fdBd82`;

describe("Lottery - guess the number (Secret)", function () {
  before(async () => {
    accounts = await ethers.getSigners();
    eoa = accounts[0];
    const factory = await ethers.getContractFactory(
      "GuessTheSecretNumberChallenge"
    );
    contract = factory.attach(contractAddr);
  });

  const getHash_bruteForce = (range: number, targetHash: string) => {
    for (let i = 0; i < range; i++) {
      const hash = ethers.utils.keccak256([i]);
      if (targetHash.includes(hash)) return i;
    }
    throw new Error(`No hash found`);
  };

  it("solves the challenge", async function () {
    const answer = getHash_bruteForce(
      2 ** 8,
      `0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365`
    );
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
