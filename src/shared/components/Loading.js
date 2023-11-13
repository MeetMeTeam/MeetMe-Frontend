import React from 'react'
import styles from "../css/Loading.module.css"

export default function Loading() {
  return (
    <div class={styles.loader}>
  <li class={styles.ball}></li>
  <li class={styles.ball}></li>
  <li class={styles.ball}></li>
</div>
  )
}
