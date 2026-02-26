import styles from "./page.module.css";

// components
import SimpsonsCharacters from './components/SimpsonsCharacters'

// data pasted from readme:
const SIMPSON_CHARACTERS = [
	"Homer Simpson",
	"Bart Simpson",
	"Marge Simpson",
	"Mr. Burns",
	"Lisa Simpson",
	"Apu Nahasapeemapetilon",
	"Sideshow Bob",
	"Milhouse Van Houten",
	"Ned Flanders",
]


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <SimpsonsCharacters characters={SIMPSON_CHARACTERS}/>
      </main>
    </div>
  );
}
