import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Layout from '../layouts/layout'

export default function Home() {
  return (
    <div className={styles.container}>

      <Script src="https://kit.fontawesome.com/a4e6dfdc9b.js" crossorigin="anonymous" />

      <Head>
        <title>Drabbler</title>
        <meta charset="utf-8" />
        <meta name="description" content="A WYSIWYG word editor for prompts, drabbles, and writing exercises." />
      </Head>

      <Layout />

    </div>
  )
}
