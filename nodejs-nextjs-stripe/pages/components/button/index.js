import styles from "../../../styles/Button.module.css";
export default function Button({ text }) {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <button className={styles.button} type="submit" role="link">
        Comprar!
      </button>
    </form>
  );
}
