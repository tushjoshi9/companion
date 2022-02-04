import { useReducer, useState } from 'react';
import styles from '../common/ListStyles.module.css';
import { usePagination } from "../pagination"
import { friendsReducer } from "../common/reducer";
import { Search } from "./search";
import { DeleteModal } from "./delete-modal";

export type friendState = {
  friendList: { id: number; name: string, favourite: boolean }[];
  searchFriendList: { id: number; name: string, favourite: boolean }[];
  currentPage: number;
  todosPerPage: number;
}

export const PersonList = () => {
  const initialState: friendState = {
    friendList: [],
    searchFriendList: [],
    currentPage: 0,
    todosPerPage: 4
  }
  const [state, dispatch] = useReducer(friendsReducer, initialState);
  const [showDialog, setShowDialog] = useState(false);
  const [deleteFriend, setDeleteFriend] = useState<friendState["friendList"][0]>({ id: 0, name: "", favourite: false });

  const [searchText, setSearch] = useState("");
  let listItem = searchText ? state.searchFriendList : state.friendList;
  const [addFriend, setAddFriend] = useState("");
  const { noOfPages, itemsToLoad } = usePagination(listItem, state.todosPerPage, state.currentPage);
  return <div>
    <div className={`${styles.flexbox} ${styles.header}`}>
      <div className={styles.title}>
        <span style={{ fontStyle: "italic", fontSize: "40px", position: "absolute", top: "-18px", left: "0px", color: "#e76060" }}>C</span>ompanion
      </div>
      <Search searchText={searchText} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.replace(/ /g, ''));
        dispatch({ type: 'searchFriend', payload: e.target.value.replace(/ /g, '') });
      }} />
    </div>
    <input type="text"
      name="addFriend"
      className={styles.addFriend}
      onKeyPress={(e) => {
        if (e.key === "Enter" && addFriend) {
          dispatch({ type: 'addFriend', payload: addFriend });
          setAddFriend("");
        }
      }}
      onChange={(e) => setAddFriend(e.target.value)}
      value={addFriend}
      placeholder="Enter your friend's name"
      required
    />
    {
      searchText && <div className={styles.searchResult}>{itemsToLoad?.length ?? 0} search result{itemsToLoad?.length === 1 ? "" : "s"} found for <span style={{ fontWeight: "600" }}>{searchText}</span></div>
    }
    <ul className={styles.list}>
      {
        itemsToLoad.map((friend: friendState["friendList"][0]) => <li key={friend.id} className={`${styles.flexbox} ${styles.listtray}`}>
          <div className={styles.friendName}>
            <div>{friend.name}</div>
            <div className={styles.friendNote}>is your friend</div>
          </div>
          <div className={styles.actionWrapper}>
            <button
              onClick={() => dispatch({ type: 'favouriteFriend', payload: { id: friend.id, value: !friend.favourite } })}
              className={`${styles.actions} ${styles.favourite}`}
              data-fav={friend.favourite}></button>
            <button
              className={`${styles.actions} ${styles.remove}`}
              onClick={() => {
                setDeleteFriend(friend);
                setShowDialog(true)
              }}
            ></button>
          </div>
        </li>
        )
      }
    </ul>
    <div>
      {listItem.length > 4 &&
        Array.from(Array(noOfPages + 1).keys()).map((i) =>
          <span
            className={state.currentPage === i ? styles.activePage : styles.inActivePage}
            onClick={() => dispatch({ type: 'nextPage', payload: i })}>{i + 1}</span>
        )}
    </div>
    <DeleteModal
      show={showDialog}
      hide={() => setShowDialog(false)}
      onClick={() => dispatch({ type: 'removeFriend', payload: deleteFriend.id })}
      friendName={deleteFriend.name} />
  </div >
}