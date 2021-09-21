import React, { Component } from 'react'
import ipfsCli from 'ipfs-http-client'
import FileViewer from 'react-file-viewer'
// import { CustomErrorComponent } from 'custom-error'
const ipfs = ipfsCli.create({ host: "ipfs.infura.io", port: 5001, protocol: "https" });

class Form extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       buffer : null,
       hash : null,
       type : ''
    }
    this.onSubmit = this.onSubmit.bind(this)
  }

  captureFile = (event)=> {
    event.preventDefault()
    const file = event.target.files[0]
    const fileName = file["name"].split('.')[0];
    const fileType = file["type"];
    const reader = new window.FileReader()
    if(file){
      const type = file['type'].split('/')
      reader.readAsArrayBuffer(file)
      reader.onloadend = () =>{
        this.setState({ 
          buffer : Buffer(reader.result),
          type : type[1]
        })
      }
    }
  }

  async onSubmit(event){
    event.preventDefault()
    console.log('Submitting file...')
    const file = await ipfs.add(this.state.buffer)
    console.log(file);
    this.setState({
      hash : file['path']
    })
  }

  onError = (e) => {
    console.log(e, 'error in file-viewer');
  }

  render1 = () =>{
    return (
      <div>
        <form className='submit-form' onSubmit={this.onSubmit}>
          <input type='file' onChange={this.captureFile} />
          <input type='submit'/> 
        </form>
        <div>
          <FileViewer
            fileType={this.state.type}
            filePath={`https://ipfs.infura.io/ipfs/${this.state.hash}`}
            onError={this.onError} />
        </div>
      </div>
    )
  }

  render2 = () =>{
    return (
      <div>
        <form className='submit-form' onSubmit={this.onSubmit}>
          <input type='file' onChange={this.captureFile} />
          <input type='submit'/> 
        </form>
      </div>
    )
  }

  render() {
    const hash = this.state.hash
    if(hash)
      return this.render1()
    else
      return this.render2()
  }
}

export default Form
