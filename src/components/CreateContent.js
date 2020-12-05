import React,{Component} from 'react';

class CreateContent extends Component{
    shouldComponentUpdate(newProps,newState){
      if(this.props.data === newProps.data){
        return false;
      }
      return true;
    };
    
    render(){
      return(
        <article>
        <h2>Create</h2>
        <form action="/create_process" method = "post"
        onSubmit = {function(e){
          e.preventDefault();
          this.props.onSubmit(
            e.target.title.value,e.target.desc.value
          );
        }.bind(this)}>
          <p><input type ="text" name ="title"
          placeholder = "제목을 입력하세요"></input></p>
          <p><textarea name ="desc" placeholder="내용을 입력하세요"></textarea></p>
          <p>
            <input type = "submit"></input>
          </p>
        </form>
        </article>
      );
    }
  }

  export default CreateContent;