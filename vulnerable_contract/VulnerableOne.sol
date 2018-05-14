pragma solidity 0.4.23;

import "zeppelin-solidity/contracts/math/SafeMath.sol";

/*
TZ: contract creator becomes the first superuser. Then he adds new users and superusers. Every superuser can add new users and superusers;
If user sends ether, his balance is increased. Then he can withdraw eteher from his balance;
*/

// [!] - vulnerabilities found
// TOTAL FOUND: 9

contract VulnerableOne {

  using SafeMath for uint;

  struct UserInfo {
      uint256 created;
      uint256 ether_balance;
  }

  mapping (address => UserInfo) public users_map;
  // [!] - visibility for variable should be explicit
  // Fix: mapping(address => bool) public is_super_user;
  mapping (address => bool) is_super_user;
  // [!] - visibility for variable should be explicit
  // Fix: address[] public users_list;
  address[] users_list;

  modifier onlySuperUser() {
      require(is_super_user[msg.sender] == true);
      _;
  }

  event UserAdded(address new_user);

  constructor() public {
    set_super_user(msg.sender);
    add_new_user(msg.sender);
  }

  // [!] - function can be directly executed without constractor => get super_user rights
  // Fix: add onlySuperUser modifier
	function set_super_user(address _new_super_user) public {
		is_super_user[_new_super_user] = true;
	}

	function pay() public payable {
		require(users_map[msg.sender].created != 0);
    // [!] - Overflow attack can be executed
    // Fix: use SafeMath library
    // users_map[msg.sender].ether_balance = users_map[msg.sender].ether_balance.add(msg.sender);
		users_map[msg.sender].ether_balance += msg.value;
	}

	function add_new_user(address _new_user) public onlySuperUser {
		require(users_map[_new_user].created == 0);
		users_map[_new_user] = UserInfo({ created: now, ether_balance: 0 });
		users_list.push(_new_user);
    // [!] - UserAdded event not emmited
    // Fix: emit UserAdded(_new_user);
	}

  // [!] - function can be directly executed without super_user rights
  // Fix: add onlySuperUser modifier
	function remove_user(address _remove_user) public {
		require(users_map[msg.sender].created != 0);
		delete(users_map[_remove_user]);
		bool shift = false;
    // [!] - gas limit can be reached => posibility of DOS attack
    // [!] - length of users_list array not decreased after shifting
		for (uint i=0; i<users_list.length; i++) {
			if (users_list[i] == _remove_user) {
				shift = true;
			}
			if (shift == true) {
				users_list[i] = users_list[i+1];
			}
		}
	}
  // [!] - Reentrancy attack can be executed
  // Fix: change to the code below
  // uint256 amountToWithdraw = users_map[msg.sender].ether_balance;
  // users_map[msg.sender].ether_balance = 0;
  // msg.sender.transfer(amountToWithdraw);
	function withdraw() public {
    msg.sender.transfer(users_map[msg.sender].ether_balance);
    users_map[msg.sender].ether_balance = 0;
	}

	function get_user_balance(address _user) public view returns(uint256) {
		return users_map[_user].ether_balance;
	}
}
