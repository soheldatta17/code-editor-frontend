// Filename - App.js

import { useState, useEffect } from 'react';
import './App.css';
import Editor from "@monaco-editor/react";
import Navbar from './Components/Navbar';
import Axios from 'axios';
import { Oval } from 'react-loader-spinner'; // Import the loader
import { FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

    // State variable to set users source code
    const [userCode, setUserCode] = useState(``);

    // State variable to set editors default language
    const [userLang, setUserLang] = useState("python");

    // State variable to set editors default theme
    const [userTheme, setUserTheme] = useState("vs-dark");

    // State variable to set editors default font size
    const [fontSize, setFontSize] = useState(20);

    // State variable to set users input
    const [userInput, setUserInput] = useState("");

    // State variable to set users output
    const [userOutput, setUserOutput] = useState("");

    // Loading state variable to show spinner
    // while fetching data
    const [loading, setLoading] = useState(false);

    const [width, setWidth] = useState(window.innerWidth);

    const [codescreen, setCodescreen] = useState("code")


    const options = {
        fontSize: fontSize
    }

    useEffect(() => {
        // Function to update width state
        const handleResize = () => setWidth(window.innerWidth);

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to call the compile endpoint
    function compile() {

        if (userCode === ``) {
            return
        }
        setLoading(true);
        console.log(userCode)

        // Post request to compile endpoint
        try {
            setLoading(true);
            Axios.post(`https://code-editor-backend-wheat.vercel.app/compile`, {
                code: userCode,
                language: userLang,
                input: userInput
            }).then((res) => {
                setUserOutput(res.data.output);
                console.log(res.data.output);
            }).catch((error) => {
                console.error('Error:', error);
                setUserOutput(`Error: ${error.message}`);
            }).finally(() => {
                setLoading(false);
            });
        } catch (error) {
            console.error('Unexpected Error:', error);
            setUserOutput(`Unexpected Error: ${error.message}`);
            setLoading(false);
        }

    }

    // Function to clear the output screen
    function clearOutput() {
        setUserOutput("");
    }

    return (
        width > 768 ? (
            <div className="App">
                <Navbar
                    userLang={userLang} setUserLang={setUserLang}
                    userTheme={userTheme} setUserTheme={setUserTheme}
                    fontSize={fontSize} setFontSize={setFontSize}
                />
                <div className="main">
                    <div className="left-container">
                        <Editor
                            options={options}
                            height="calc(100vh - 50px)"
                            width="100%"
                            theme={userTheme}
                            language={userLang}
                            defaultLanguage="python"
                            defaultValue="# Enter your code here"
                            onChange={(value) => { setUserCode(value) }}
                        />
                        <button className="run-btn" onClick={() => compile()}>
                            <FaPlay />
                        </button>
                    </div>
                    <div className="right-container">
                        <h4>Input:</h4>
                        <div className="input-box">
                            <textarea
                                id="code-inp"
                                onChange={(e) => setUserInput(e.target.value)}
                            />
                        </div>
                        <h4>Output:</h4>
                        {loading ? (
                            <div className="spinner-box">
                                <Oval
                                    height={80}
                                    width={80}
                                    color="#4fa94d"
                                    ariaLabel='loading'
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            </div>
                        ) : (
                            <div className="output-box">
                                <h2 style={{ marginLeft: "2px" }}>{userOutput}</h2>
                                <button onClick={() => clearOutput()} className="clear-btn">
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        ) :
            (
                <div className="App">
                    <Navbar
                        userLang={userLang} setUserLang={setUserLang}
                        userTheme={userTheme} setUserTheme={setUserTheme}
                        fontSize={fontSize} setFontSize={setFontSize}
                    />

                    <div className="main">

                        <div className='choose'>
                            <button className='selector-btn' onClick={()=>
                                {
                                    setCodescreen("code")
                                }
                            }>CODE</button>
                            <button className='selector-btn' onClick={()=>
                                {
                                    setCodescreen("input")
                                }
                            }>INPUT</button>
                            <button className='selector-btn' onClick={()=>
                                {
                                    setCodescreen("output")
                                }
                            }>OUTPUT</button>
                        </div>
                        {codescreen === "code" ?
                            (
                                <>
                                    <div className="left-container">

                                        <Editor
                                            options={options}
                                            width="100%"
                                            theme={userTheme}
                                            language={userLang}
                                            defaultLanguage="python"
                                            defaultValue="# Enter your code here"
                                            onChange={(value) => { setUserCode(value) }}
                                        />

                                    </div>
                                    <button className="floating-btn" onClick={() => compile()}>
                                        <FaPlay />
                                    </button>
                                </>

                            ) : (
                                codescreen === "input" ?
                                    (
                                        <>
                                            <div className="right-container">
                                                <h4>Input:</h4>
                                                <div className="input-box">
                                                    <textarea
                                                        id="code-inp"
                                                        onChange={(e) => setUserInput(e.target.value)}
                                                        placeholder='Enter the Inputs (if any)'
                                                    />
                                                </div>
                                                <button onClick={() => clearOutput()} className="floating-btn">
                                                    <FaPlay/>
                                                </button>
                                            </div>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <div className="right-container">

                                                <h4>Output:</h4>
                                                {loading ? (
                                                    <div className="spinner-box">
                                                        <Oval
                                                            height={80}
                                                            width={80}
                                                            color="#4fa94d"
                                                            ariaLabel='loading'
                                                            wrapperStyle={{}}
                                                            wrapperClass=""
                                                            visible={true}
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="output-box">
                                                        <h2 style={{ marginLeft: "2px" }}>{userOutput}</h2>
                                                        <button onClick={() => clearOutput()} className="floating-btn">
                                                            X
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )
                            )
                        }

                    </div>
                </div>
            )
    );

}

export default App;


