import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Link from 'next/link';

function Top() {
  return (
    <Head>
      <title>NextJS</title>
    </Head>
  );
}

function Header({ title }) {
  return <h1>{title ? title : 'Default title'}</h1>;
}

export default function HomePage() {
  const names = ['Ada Lovelace', 'Grace Hopper', 'Margaret Hamilton'];

  const [likes, setLikes] = useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <>
      <Top />
      <div>
        <Header title="Develop. Preview. Ship. 🚀" />
        <ul>
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <button onClick={handleClick}>Like ({likes})</button>

        <div>
          <Link href="/">Go Home!</Link>
        </div>
      </div>
    </>
  );
}
