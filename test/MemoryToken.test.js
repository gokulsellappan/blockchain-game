const MemoryToken = artifacts.require('./MemoryToken.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Memory Token', (accounts) => {
  let token

  before(async()=>{
    token=await MemoryToken.deployed()
  })

  describe("deploy token",async()=>{
    it('deployee successfully',async()=>{
      const address=token.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)

    })

    it('its has a name',async()=>{
      const name= await token.name()
      assert.equal(name,'MemoryToken')
    })
     it('its has a symbol',async()=>{
      const symbol= await token.symbol()
      assert.equal(symbol,'MEMORY')
    })
  })

  describe("mint token",async()=>{
    let result
    it('mint and setURI check',async()=>{
      //mint operation check
      result=await token.mint(accounts[0],'www.token-uri.com/nft')

      //total supply check
      result=await token.totalSupply()
      assert.equal(result,'1','totalSupply is correct')

      //balance of check
      result=await token.balanceOf(accounts[0])
      assert.equal(result,'1','balanceOf is correct')

      //token belong to the owner
      result=await token.ownerOf('1')
      assert.equal(result.toString(),accounts[0].toString(),'token owned by owner')
      result=await token.tokenOfOwnerByIndex(accounts[0],0)

      //every token can see by owner
      let tokenId=[]
      let balanceof=await token.balanceOf(accounts[0])
      for(let i=0;i<balanceof;i++){
        let id=await token.tokenOfOwnerByIndex(accounts[0],i)
        tokenId.push(id.toString())
      }
      let expected=['1']
      assert.equal(tokenId.toString(),expected.toString(),'token are correct')

      let tokenURI=await token.tokenURI('1')
      assert.equal(tokenURI,'www.token-uri.com/nft')


    })

  })


})
