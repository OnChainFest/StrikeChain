// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StrikeChain is Ownable, ReentrancyGuard {
    IERC20 public testToken;

    constructor(address _testToken) {
        testToken = IERC20(_testToken);
    }

    enum EventStatus { Open, Closed, Finalized }

    struct Event {
        string name;
        bool isTeamBased;
        uint256[3] prizes;
        address sponsor;
        EventStatus status;
        uint256 registrationDeadline;
        address[3] winners;
    }

    struct Team {
        address[] members;
    }

    uint256 public eventCounter;
    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => bool)) public isRegistered;
    mapping(uint256 => mapping(address => address[])) public teamMembers;

    event EventCreated(uint256 indexed eventId, string name);
    event ParticipantRegistered(uint256 indexed eventId, address indexed participant);
    event WinnersSubmitted(uint256 indexed eventId, address[3] winners);
    event PrizeDistributed(uint256 indexed eventId);
    event EmergencyWithdrawal(uint256 indexed eventId);

    modifier onlySponsor(uint256 eventId) {
        require(events[eventId].sponsor == msg.sender, "Not sponsor");
        _;
    }

    modifier eventExists(uint256 eventId) {
        require(bytes(events[eventId].name).length > 0, "Event does not exist");
        _;
    }

    function createEvent(
        string calldata name,
        bool isTeamBased,
        uint256[3] calldata prizes,
        uint256 registrationDeadline
    ) external nonReentrant {
        uint256 totalPrize = prizes[0] + prizes[1] + prizes[2];
        require(testToken.transferFrom(msg.sender, address(this), totalPrize), "Token transfer failed");

        eventCounter++;
        events[eventCounter] = Event({
            name: name,
            isTeamBased: isTeamBased,
            prizes: prizes,
            sponsor: msg.sender,
            status: EventStatus.Open,
            registrationDeadline: registrationDeadline,
            winners: [address(0), address(0), address(0)]
        });

        emit EventCreated(eventCounter, name);
    }

    function registerParticipant(uint256 eventId, address[] calldata members)
        external eventExists(eventId) {
        Event storage evt = events[eventId];
        require(evt.status == EventStatus.Open, "Event not open");
        require(block.timestamp <= evt.registrationDeadline, "Registration closed");

        if (evt.isTeamBased) {
            for (uint256 i = 0; i < members.length; i++) {
                require(!isRegistered[eventId][members[i]], "Duplicate member");
                isRegistered[eventId][members[i]] = true;
            }
            teamMembers[eventId][msg.sender] = members;
        } else {
            require(members.length == 1, "Only one participant allowed");
            require(!isRegistered[eventId][members[0]], "Already registered");
            isRegistered[eventId][members[0]] = true;
        }

        emit ParticipantRegistered(eventId, msg.sender);
    }

    function submitWinners(uint256 eventId, address[3] calldata winners)
        external onlySponsor(eventId) eventExists(eventId) {
        Event storage evt = events[eventId];
        require(evt.status == EventStatus.Open, "Invalid event status");

        for (uint8 i = 0; i < 3; i++) {
            require(isRegistered[eventId][winners[i]], "Winner not registered");
            for (uint8 j = 0; j < i; j++) {
                require(winners[i] != winners[j], "Duplicate winners");
            }
        }

        evt.status = EventStatus.Finalized;
        evt.winners = winners;

        _distributePrizes(eventId, winners);

        emit WinnersSubmitted(eventId, winners);
    }

    function _distributePrizes(uint256 eventId, address[3] memory winners) internal {
        Event storage evt = events[eventId];
        for (uint8 i = 0; i < 3; i++) {
            uint256 amount = evt.prizes[i];

            if (evt.isTeamBased) {
                address[] storage members = teamMembers[eventId][winners[i]];
                uint256 split = amount / members.length;
                for (uint256 j = 0; j < members.length; j++) {
                    require(testToken.transfer(members[j], split), "Transfer failed");
                }
            } else {
                require(testToken.transfer(winners[i], amount), "Transfer failed");
            }
        }

        emit PrizeDistributed(eventId);
    }

    function emergencyWithdraw(uint256 eventId)
        external onlySponsor(eventId) eventExists(eventId) nonReentrant {
        Event storage evt = events[eventId];
        require(evt.status != EventStatus.Finalized, "Event already finalized");

        uint256 refund = evt.prizes[0] + evt.prizes[1] + evt.prizes[2];
        evt.status = EventStatus.Closed;

        require(testToken.transfer(evt.sponsor, refund), "Refund failed");

        emit EmergencyWithdrawal(eventId);
    }

    // View functions
    function getEvent(uint256 eventId) external view returns (Event memory) {
        return events[eventId];
    }

    function getTeam(uint256 eventId, address teamAddress) external view returns (address[] memory) {
        return teamMembers[eventId][teamAddress];
    }

    function getWinners(uint256 eventId) external view returns (address[3] memory) {
        return events[eventId].winners;
    }
}