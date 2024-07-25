// Filename: Navbar.js

import React from 'react';
import Select from 'react-select';
import '../Styles/Navbar.css';

const Navbar = ({ userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize }) => {
    const languages = [
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
    return (
        <div className="navbar">
            <h1 className="code-compiler-heading">Code Compiler by Sohel</h1>
            <div className="navbar-controls">
                <Select options={languages} value={userLang}
                    onChange={(e) => setUserLang(e.value)}
                    placeholder={userLang} />
                <Select options={themes} value={userTheme}
                    onChange={(e) => setUserTheme(e.value)}
                    placeholder={userTheme} />
                <label className="font-size-label">Font Size</label>
                <input type="range" min="18" max="30"
                    value={fontSize} step="2"
                    onChange={(e) => { setFontSize(e.target.value) }} />
            </div>
        </div>

    )
}

export default Navbar
