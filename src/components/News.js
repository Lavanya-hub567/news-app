import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    };
  }

  async updateNews(page) {
    this.setState({ loading: true });
    const apiKey = "5bc728af77344dc7a13cae8203529f91"; // Use environment variable for API key
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&page=${page}&pageSize=10`;

    let data = await fetch(url);
    let parsedData = await data.json();

    if (data.ok) {
      this.setState({
        articles: parsedData.articles,
        loading: false,
        totalResults: parsedData.totalResults,
        page: page
      });
    } else {
      console.error('API call failed with status:', data.status);
      this.setState({ loading: false });
    }
  }

  componentDidMount() {
    this.updateNews(this.state.page);
  }

  handleNextBtn = () => {
    let newPage = this.state.page + 1;
    if (newPage <= Math.ceil(this.state.totalResults / 10)) {
      this.updateNews(newPage);
    }
  };

  handlePrevBtn = () => {
    let newPage = this.state.page - 1;
    if (newPage > 0) {
      this.updateNews(newPage);
    }
  };

  render() {
    return (
      <>
        <div className='container my-3 p-2'>
          <h2 className='text-center  p-1 my-2 ' style={{ color: 'red', backgroundColor: 'green' }}>News Headline</h2>
          {this.state.loading && <Spinner />}
          <div className='row'>
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <Newsitem title={element.title ? element.title.slice(0, 45) : ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage} newsUrl={element.url} />
                </div>
              );
            })}
          </div>
          <div className='d-flex justify-content-between'>
            <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevBtn}>← Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 10)} className='btn btn-dark' onClick={this.handleNextBtn}>Next →</button>
          </div>
        </div>
      </>
    );
  }
}
