import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import styles from '../common/ListStyles.module.css';

export const DeleteModal = ({ friendName, show, hide, onClick }: any) => {
  console.log(friendName, "friendStat0]")
  return show ? <Dialog isOpen={show} onDismiss={hide}>
    <p>Remove <span style={{ fontWeight: 600 }}>{friendName}</span> from your friend list?</p>
    <button
      onClick={() => {
        hide();
        onClick();
      }}
      className={styles.removeButton}
    >Remove Friend</button>
  </Dialog> : null
}