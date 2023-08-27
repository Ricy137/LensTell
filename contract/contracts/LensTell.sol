// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";

contract LensTell is PhatRollupAnchor, ERC1155, Ownable {
    uint256 public constant singlePrice = 0.01 ether;
    mapping(uint => address) public requestsByUsers;
    address lensHub=0x60Ae865ee4C725cd04353b5AAb364553f56ceF82;

    event ResponseReceived(uint reqId, string pair, uint256 value);
    event ErrorReceived(uint reqId, string pair, uint256 errno);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor)ERC1155("ipfs://QmQxfPhnrKiRCAFPzDGk6BhTz7qBMUejsBKH4cXDWEEqSc/{id}.json") {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setAttestor(address phatAttestor) public onlyOwner {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function request(string calldata profileId) public payable {
        require(singlePrice<=msg.value,"Value under the price");
        uint id = nextRequest;
        requests[id] = profileId;
        requestsByUsers[id] = msg.sender;
        _pushMessage(abi.encode(id, profileId));
        nextRequest += 1;
    }

    function _onMessageReceived(bytes calldata action) internal override {
        require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        if (respType == TYPE_RESPONSE) {
            uint256 nftId=data-1;
            _mint(requestsByUsers[id],nftId,1,"");
            emit ResponseReceived(id, requests[id], data);
            delete requests[id];
            delete requestsByUsers[id] ;
        } else if (respType == TYPE_ERROR) {
            emit ErrorReceived(id, requests[id], data);
            delete requests[id];
        }
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155,AccessControl) returns (bool) {
         return interfaceId == type(IAccessControl).interfaceId || super.supportsInterface(interfaceId);
    }
}