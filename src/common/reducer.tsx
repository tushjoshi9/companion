import { friendState } from "../friends-list"

type Action =
  | { type: 'addFriend'; payload: string; }
  | { type: 'nextPage'; payload: number; }
  | { type: 'searchFriend'; payload: string; }
  | { type: 'removeFriend'; payload: number; }
  | { type: 'favouriteFriend'; payload: { id: number; value: boolean; }; }

export function friendsReducer(state: friendState, action: Action) {
  switch (action.type) {
    case "addFriend":
      return {
        ...state,
        friendList: [...state.friendList, { name: action.payload, id: state.friendList.length, favourite: false }]
      };
    case "removeFriend":
      return {
        ...state,
        friendList: state.friendList.filter((friend) => friend.id !== action.payload),
        searchFriendList: state.searchFriendList.filter((friend) => friend.id !== action.payload),
      };
    case "favouriteFriend": {
      let friendList = state.friendList;
      let getIndex = friendList.findIndex(friend => friend.id === action.payload.id);
      friendList[getIndex].favourite = action.payload.value;
      friendList = friendList.sort((a, b) => Number(b.favourite) - Number(a.favourite));
      return { ...state, friendList };
    };
    case "searchFriend":
      return action.payload ?
        {
          ...state,
          searchFriendList: state.friendList.filter(friend => friend.name?.toLowerCase().includes(action.payload.toLowerCase()))
        }
        : state;
    case "nextPage":
      return {
        ...state,
        currentPage: action.payload
      };
    default:
      throw new Error();
  }
}