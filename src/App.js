import './App.css';
import React, {Component} from 'react';
import Subject from './components/Subject';
import ReadContent from './components/ReadContent';
import TOC from './components/TOC';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode : "welcome",
      subject:{title :'Main', sub:'this is main'},
      welcome : {title : 'welcome', desc:"Hello react"},
      selected_content_id : 1,
      contents:[
        {id:1, title : 'html', desc:'this is html'},
        {id:2, title : 'css', desc:'this is css'},
        {id:3, title : 'js', desc:'this is js'},
      ]
    }
  }
  getReadContent(){
    var i =0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
      i=i+1;
    }
  }
  getContent(){
    var _title, _desc,_article, _content = null;
    if(this.state.mode ==="welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode == "read"){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode ==='create'){
      _article = <CreateContent onSubmit ={function(_title,_desc){
        this.max_content_id = this.max_content_id +1;
        var _contents = Array.from(this.state.contents);
        _contents.push(
          {id:this.max_content_id, title: _title, desc:_desc}
      );
      this.setState({
        contents:_contents,
        mode :'read',
        selected_content_id:this.max_content_id,
  
      });
    }.bind(this)}/>
    }else if(this.state.mode ==='update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} 
      onSubmit ={function(_id,_title,_desc){
        var _contents = Array.from(this.state.contents);
        var i=0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] ={id:_id, title:_title, desc:_desc};
            break;
          }
          i = i+1;
        }
        this.setState({
          contents:_contents,
          mode:'read'
        });
    }.bind(this)}/>
    }
    return _article;
  }
  render() {
    
  return (
    <div className="App">
      <Subject 
      title = {this.state.subject.title} 
      sub = {this.state.subject.sub} //여기서 적어주는 title, sub 등은 subject.js내에서 props로 사용가능.
      onChangePage={function(){//위는 상위 component가 하위를 바꿀때 
        //하위가 상위를 바꾸려면 이벤트를 사용
        this.setState({mode:'welcome'});
      }.bind(this)}></Subject>
     
      <TOC data = {this.state.contents}
      onChangePage={
        function(id){
          this.setState({
            mode:"read",
            selected_content_id:Number(id),})
        }.bind(this)}/>
      <Control onChangeMode={function(_mode){
        if(_mode =='delete'){
          if(window.confirm('삭제하시겠습니까?')){
            var _contents = Array.from(this.state.contents);
            var i =0;
            while(i<_contents.length){
              if(_contents[i].id=== this.state.selected_content_id){
                _contents.splice(i,1);
                break;
              }
              i=i+1;
            }
            this.setState({
              mode:'welcome',
              contents:_contents
            })
          }
        }else{
          this.setState({
            mode:_mode
          })
        }
        
      }.bind(this)}></Control>
      {this.getContent()}
    </div>
  );
}}

export default App;
