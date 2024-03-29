import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';


export default class News extends Component {
  

  
constructor(){
  
  super();
  
  this.state={
    articles: [],
    loading:true,
    page:1
  }
}
async componentDidMount(){
  
  let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bc728af77344dc7a13cae8203529f91&page-${this.state.page}&pageSize=10`;  

  this.setState({loading:true})
  let data = await fetch(url);
  let parsedData=await data.json()
  console.log(parsedData);
  console.log(this.state.totalResults)
  this.setState({
    page:1,
    articles:parsedData.articles,
    loading:false,
    totalResults:parsedData.totalResults
  })
}


handleNextBtn =async()=>{
  if (!(this.state.page > Math.ceil(this.state.totalResults / 10))) {
  
    
console.log("Total Results:", this.state.totalResults);

    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bc728af77344dc7a13cae8203529f91&page=${this.state.page+1}&pageSize=10`;

    this.setState({loading:true});
      let data = await fetch(url);
      let parsedData=await data.json()
      console.log(this.state.totalResults)  
      
    this.setState({
      loading:false,
      page:this.state.page+1,
      articles : parsedData.articles,
      totalResults:parsedData.totalResults}

    )
  }
}
handlePrevBtn=async()=>{
  if(this.state.page<1){
    
  }
  else{
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=5bc728af77344dc7a13cae8203529f91&page=${this.state.page-1}&pageSize=10`;
    this.setState(
      {
        loading:true
      }
    )
    console.log("Page:", this.state.page);
    console.log("Total Results:", this.state.totalResults);

      let data = await fetch(url);
      let parsedData=await data.json()
      console.log(parsedData);
      this.setState(

      {loading:false,
        page:this.state.page-1,

      articles : parsedData.articles,
      totalResults:parsedData.totalResults
    }
    )
  }
}
  render() {
    console.log("render");
    return (<>

        <div className='container my-3 p-2'>
          <h2 className='text-center  p-1 my-2 ' style={{color:"red",backgroundColor:"green"}}>News Headline</h2>
          {this.state.loading && <Spinner/>}
          <div className='row'>
           {!this.state.loading  && this.state.articles?.map((element)=>{
          return <div className="col-md-4" key={element.url}>
            <Newsitem title={element.title?element.title.slice(0,20):""} description={element.description?element.description:""} imageurl={element.urlToImage} newsUrl={element.url}/>
                  </div>
            })

          }
          </div>
          <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-secondary" onClick={this.handlePrevBtn}>&larr; Previous</button>
          <button disabled={this.state.page+1>Math.ceil(this.state.totalResults/10)}  className="btn btn-secondary" onClick={this.handleNextBtn}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}
