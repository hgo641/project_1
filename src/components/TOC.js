import react,{Component} from 'react';

class TOC extends Component{
    
    render(){
        var data = this.props.data;
        var list = [];
        var i = 0;
        while(i<data.length){
        list.push(
        <li key = {data[i].id}>
            <a 
            href = {"/content"+data[i].id}
            
            data-id={data[i].id}//data-aaa로 하면 e.target.dataset.aaa; e.target에는 e를 포함하고있는 a태그가 담긴다.
            onClick={function(e){
                e.preventDefault();
                this.props.onChangePage(e.target.dataset.id);
            }.bind(this)}

            /*
            onClick={function(id,e){
                e.preventDefault();
                this.props.onChangePage(id);
            }.bind(this, data[i].id)}
            */
            >{data[i].title}</a></li>);
        i=i+1;
        }
      return(
        <nav>
         {list}
        </nav>
      );
    }
  }

export default TOC;