import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("DevInRes", function () {
    let admin: SignerWithAddress;
    let devInRes: DevInRes;
    it("should register quest contracts", async function () {
      [admin] = await ethers.getSigners();
      devInRes = await new DevInRes__factory(admin).deploy();
      const questECDSA = await new QuestECDSA__factory(admin).deploy();
      const questPoW = await new QuestPoW__factory(admin).deploy();
      const questTx = await new QuestTx__factory(admin).deploy();
      await devInRes.registerQuest(
        questECDSA.interface.getSighash("verifySignature"),
        questECDSA.address
      );
      await devInRes.registerQuest(
        questPoW.interface.getSighash("pow"),
        questPoW.address
      );
      await devInRes.registerQuest(
        questTx.interface.getSighash("run"),
        questTx.address
      );
      expect(
        await devInRes.getQuestContract(questTx.interface.getSighash("run"))
      ).to.equal(questTx.address);
      expect(
        await devInRes.getQuestContract(
          questECDSA.interface.getSighash("verifySignature")
        )
      ).to.equal(questECDSA.address);
      expect(
        await devInRes.getQuestContract(questPoW.interface.getSighash("pow"))
      ).to.equal(questPoW.address);
    });
    it("should get a score with a basic tx", async function () {
      expect(await devInRes.getScore(admin.address)).to.eq(0);
      await devInRes.score();
      expect(await devInRes.getScore(admin.address)).to.eq(1);
    });
    it("should get a score with a basic proxy tx", async function () {
      const questTx = new QuestTx__factory(admin).attach(devInRes.address);
      expect(await devInRes.getScore(admin.address)).to.eq(1);
      await questTx.run();
      expect(await devInRes.getScore(admin.address)).to.eq(2);
    });
  });