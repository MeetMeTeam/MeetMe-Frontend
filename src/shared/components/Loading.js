import React from 'react'
import styles from "../css/Loading.module.css"

export default function Loading() {
  return (
    <div className={styles.loader}>
  <li className={styles.ball}></li>
  <li className={styles.ball}></li>
  <li className={styles.ball}></li>
</div>
  )
}
