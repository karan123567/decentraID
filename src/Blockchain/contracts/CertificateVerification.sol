// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CertificateVerification {
    
    address public admin;

    struct Certificate {
        bytes32 hash;
        uint256 timestamp;
    }

    // Mapping: student wallet address => certificate data
    mapping(address => Certificate) public certificates;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    constructor() {
        admin = msg.sender; // Deploying wallet becomes admin (university)
    }

    function uploadCertificate(address student, bytes32 certHash) external onlyAdmin {
        certificates[student] = Certificate(certHash, block.timestamp);
    }

    function getCertificateHash(address student) external view returns (bytes32, uint256) {
        Certificate memory cert = certificates[student];
        return (cert.hash, cert.timestamp);
    }

    function verifyHash(address student, bytes32 hashToCheck) external view returns (bool) {
        return certificates[student].hash == hashToCheck;
    }
}
