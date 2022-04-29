import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

const PreviewMediaWithDelete = ({files, deleteFile, id}) => {
    return (
        <div style = {{ 'display' : 'flex', 'alignContent': 'flex-start', 'flexDirection':'row', 'justifyContent' : 'space-evenly', 'flexWrap' : 'wrap', 'margin':'10px'}}>
        { files && files.map((file, index) => {
            return (
                <div style = {{'margin' : '15px'}} key={id}> 
                    {file.fileContentType === 'image' && 
                    <div>
                        <img src = {`http://localhost:8080/${file.src}`} width = '800px' height = '400px' alt='' />
                        {/* <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Image',
                                isFluidWidth: false,
                                width:600,
                                height:300,
                                src: `http://localhost:8080/${file.src}`
                            },
                            largeImage: {
                                src: `http://localhost:8080/${file.src}`,
                                width: 1000,
                                height: 1000
                            }
                        }} /> */}
                    </div>
                    }
                    {file.fileContentType === 'video' && 
                        (<div>
                        <video width='350px' controls='controls' autobuffer='autobuffer' autoplay='autoplay'>
                            <source src={`http://localhost:8080/${file.src}`} type={file.type}></source>
                        </video>
                        </div>)
                    }
                    {file.fileContentType === 'audio' && 
                        (
                        <div>
                        <audio controls='controls' autobuffer='autobuffer' autoplay='autoplay'>
                            <source src={`http://localhost:8080/${file.src}`} type={file.type}></source>
                        </audio>
                        </div>)
                    }
                    <center><p><b><i>fig. {index+1}</i></b></p>
                    <button onClick={()=>deleteFile(file.src, id)}>Delete</button>
                    </center>
                </div>
                )
            })}
        </div>
    )
}

export default PreviewMediaWithDelete;

