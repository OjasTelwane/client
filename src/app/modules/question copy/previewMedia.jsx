import React from 'react';

const PreviewMedia = ({files}) => {
    return (
        <div style = {{ 'display' : 'flex', 'flexDirection':'row', 'justifyContent' : 'space-evenly', 'flexWrap' : 'wrap', 'margin':'10px'}}>
        { files.map((file, index) => {
            return (
                <div style = {{'margin' : '15px'}} key={index}> 
                    {file.fileContentType === 'image' && 
                    <div>
                        <img src = {`http://localhost:8080/${file.src}`} alt='demo image' width = '600px' height = '600px'/>
                    </div>
                    }
                    {file.fileContentType === 'video' && 
                        <div>
                        <video width='350px' controls='controls' autobuffer='autobuffer' autoplay='autoplay'>
                            <source src = {`http://localhost:8080/${file.src}`} type={file.type}></source>
                        </video>
                        </div>
                    }
                    {file.fileContentType === 'audio' && 
                        <div>
                        <audio controls='controls' autobuffer='autobuffer' autoplay='autoplay'>
                            <source src = {`http://localhost:8080/${file.src}`} type={file.type}></source>
                        </audio>
                        </div>
                    }
                    <center><p><b><i>fig. {index+1}</i></b></p>
                    </center>
                </div>
                )
        })}
        </div>
    )
}

export default PreviewMedia;
