// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DummyNFTTrader {
    struct NFT {
        string symbol;
        uint256 price;
        address owner;
    }

    mapping(string => NFT) public nfts;
    mapping(address => uint256) public balances;

    event NFTBought(address indexed buyer, string nftSymbol, uint256 price);
    event NFTSold(address indexed seller, string nftSymbol, uint256 price);

    constructor() {
        balances[msg.sender] = 1000 ether; // Assign 1000 Fake AVAX to contract deployer
    }

    function simulateBuy(string memory nftSymbol) public {
        require(balances[msg.sender] >= 10 ether, "Not enough AVAX to buy");

        uint256 price = (uint256(keccak256(abi.encodePacked(nftSymbol))) % 5 + 1) * 1 ether; // Random price between 1-5 AVAX
        balances[msg.sender] -= price; // Deduct price
        balances[address(this)] += price; // Simulated market revenue

        nfts[nftSymbol] = NFT(nftSymbol, price, msg.sender);

        emit NFTBought(msg.sender, nftSymbol, price);
    }

    function simulateSell(string memory nftSymbol) public {
        require(nfts[nftSymbol].owner == msg.sender, "You don't own this NFT");

        uint256 price = nfts[nftSymbol].price;
        balances[msg.sender] += price; // Refund the price
        balances[address(this)] -= price; // Reduce market balance

        delete nfts[nftSymbol]; // Remove ownership

        emit NFTSold(msg.sender, nftSymbol, price);
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }
}
