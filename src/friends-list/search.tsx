import styles from '../common/ListStyles.module.css';

export const Search = ({ searchText, onChange }: { searchText: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return <input type="text"
    name="searchfriend"
    className={styles.searchBox}
    onChange={onChange}
    value={searchText} placeholder="Search Friend"
  />
}