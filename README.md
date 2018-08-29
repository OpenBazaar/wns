# Worldwide OpenBazaar resource finder naming service (WorfNS)   

<img src="https://user-images.githubusercontent.com/3887694/44699339-1017a900-aac7-11e8-8525-0133cbcd457b.png" width="400" />

**WorfNS** is a _simple_ naming service to register unique human-readable handles that map to OpenBazaar addresses (i.e. `peerIDs`). This means that instead of finding a store using an address like `QmYEChohLWGxbdgezhwSbaeCsTAG5iimzSkZyhLLUHv2TC`, you can use `@drwasho` instead!

Registering a handle is **free** and are claimed on a first-come-first-served basis. The only cost is the network transaction fee (i.e. gas) required to register the handle in the WorfNS smart contract.

WorfNS was inspired by the awesome work of [Dani Grant](https://twitter.com/thedanigrant) creating https://gravity.cool.

## Features

You can register the following data in WorfNS:

1. **Handle**. The handle must be unique.
2. **Ethereum account.** One account can register multiple handles, and handles can be transferred to other accounts.
3. **Display name.** This is a non-unique name associated with your handle.
4. **Image location.** The avatar URI of an image (can be a URL or IPFS hash).
4. **peerID.** The OpenBazaar address of your node.

## Status

WorfNS is a proof-of-concept and is deployed in the Rinkeby Ethereum testnet. The smart contract is not audited, and we're inviting the community to leave feedback and make suggestions.

## Deployment

- Contract is deployed on the Rinkeby network
- Contract address: `0x75483ee05abdf364ae5dbe313a0366d32c1a0ffe`
- [ABI JSON](https://gist.githubusercontent.com/drwasho/3224fedc17eccd6de499f8a897065b15/raw/324d30ad3aeeee2f3db2696cea4d3013f0b18955/obnsABI.json)
- You can interact with the contract and register a name here: https://openbazaar.github.io/wns/

## Gas costs

It costs `176,247` gas to register a handle.

| Function | Gas cost | Cost* |
| :--- | :---: | :---: |
| Create a handle | 176,247 | $0.10 |
| Remove a handle | 31,775 | $0.02 |
| Transfer a handle | 34,248 | $0.02 |
| Change display name | 39,697 | $0.02  |
| Change peerID | 38,840 | $0.02 |
| Change image | 21,871 | $0.01 |
| Create handle for another account | 135,009 | $0.08 |

(*) Based on today's gas cost of 2.1 gwei/gas and exchange rate

Price estimates for creating a handle at higher gas costs:

| Gas level | Gwei | Cost |
| --- | :---: | :---: |
| Low | 1 | $0.05 |
| Medium | 10 | $0.49 |
| High | 100 | $4.9 | 

## Why?

Many of us are frustrated by the complexity and cost of existing naming services. While a decentralized naming service is vulnerable to squatters, some attempts to mitigate this have made the process of registering a name cumbersome, confusing, and expensive. The WorfNS philosophy is to not try and fight against squatters; sometimes an imperfect but simpler solution is better received by end-users.

Having said that, WorfNS should not be seen as a competitor to ENS, or any other decentralized naming service. OpenBazaar presently supports any naming service being used to resolve handles to OpenBazaar addresses (including Blockstack and ENS).

## License

MIT

## Special thanks

- [Sameep Singhania](https://github.com/sameepsi)
- [Dani Grant](https://github.com/danigrant)
  * Check out https://gravity.cool/
- [Chris Sevilleja](https://scotch.io/@chris)
  * Website and form based on his [tutorial](https://scotch.io/courses/getting-started-with-vue/processing-a-form-with-vue)
- [Bluma](https://bulma.io/)
  * Nice boilerplate components
- Worf

![image](https://media.giphy.com/media/10wLowIznQaRuo/giphy.gif)
