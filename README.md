# Worldwide OpenBazaar Resource Finder (WORF) naming service   

<img src="https://user-images.githubusercontent.com/3887694/44699339-1017a900-aac7-11e8-8525-0133cbcd457b.png" width="400" />

The purpose of this proof of concept is to create a simple naming service for unique handles that map to OpenBazaar addresses (i.e. `peerIDs`). Handles are claimed on a first-come-first-served basis and at zero additional cost to the gas required to execute the necessary function calls in the contract.

This should not be seen as a competitor to ENS, as this naming system is primarily designed to map human-readable handles to OpenBazaar addresses. Morever, other naming services can be used to resolve handles to OpenBazaar addresses including Blockstack and ENS.

### Status

- Not deployed on mainnet
- Experimental
- Comments, suggestions, any and all feedback is welcome

### Deployment

- OBNS contract is deployed on the Rinkeby network
- Contract address: `0x75483ee05abdf364ae5dbe313a0366d32c1a0ffe`
- [ABI JSON](https://gist.githubusercontent.com/drwasho/3224fedc17eccd6de499f8a897065b15/raw/324d30ad3aeeee2f3db2696cea4d3013f0b18955/obnsABI.json)

### Gas costs

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
