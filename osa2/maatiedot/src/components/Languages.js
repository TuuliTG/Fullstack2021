import React from "react";

const Languages = (props) => {
    const languages = props.country.languages
    console.log('languages ', languages, languages.type)
    console.log('entries', Object.entries(props.country.languages))
    const entries = Object.entries(languages)
    const values = []
    for (let i = 0; i < entries.length; i++) {
        console.log(entries[i])
        values.push(entries[i][1])
        
    }
    console.log(values)
    return (
        <ul>
            {values.map(language =>
                <li key={language}>
                    {language}
                </li>
                )}
        </ul>
    )
}

export default Languages