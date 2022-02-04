import { useReducer } from 'react';
import { act, renderHook } from "@testing-library/react-hooks";
import { friendsReducer } from "../common/reducer";
import { mockFriends } from "../mocks/friends";

describe("Friends reducer", () => {
  test("should add a new friend", () => {
    const { result } = renderHook(() => useReducer(friendsReducer, mockFriends));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({ type: "addFriend", payload: "Test Name" });
    })
    expect(result.current[0]).toMatchSnapshot();
  });

  test("should remove a friend", () => {
    const { result } = renderHook(() => useReducer(friendsReducer, mockFriends));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({ type: "removeFriend", payload: 1 });
    })
    expect(result.current[0]).toMatchSnapshot();
  });

  test("should favourite a friend", () => {
    const { result } = renderHook(() => useReducer(friendsReducer, mockFriends));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({
        type: "favouriteFriend", payload: {
          id: 2,
          value: true
        }
      });
    })
    expect(result.current[0]).toMatchSnapshot();
  });

  test("should show nextpage", () => {
    const { result } = renderHook(() => useReducer(friendsReducer, mockFriends));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({
        type: "nextPage", payload: 2
      });
    })
    expect(result.current[0]).toMatchSnapshot();
  });

  test("should search friends list", () => {
    const { result } = renderHook(() => useReducer(friendsReducer, mockFriends));
    const [, dispatch] = result.current;
    act(() => {
      dispatch({
        type: "searchFriend", payload: "DJ"
      });
    })
    expect(result.current[0]).toMatchSnapshot();
  });
})
