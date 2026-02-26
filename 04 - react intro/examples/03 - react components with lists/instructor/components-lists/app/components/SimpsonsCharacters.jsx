// writing this out in expanded form so it's visually clear;
// you don't have to write your code like this & most JS is condensed
export default function SimpsonsCharacters({ characters }) {
    return <ul> 
        {
            characters.map(
                (charName, index) => {
                    return <li key={index}>{charName}</li>
                }
            )
        }
    </ul>
}
