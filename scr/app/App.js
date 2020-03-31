import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component{
    constructor(){
        super();
        this.state={
            title:'',
            description:'', 
            tasks:[], 
            _id: ''
        };
        this.handleChange=this.handleChange.bind(this);
        this.addTask=this.addTask.bind(this);
    }


    addTask(e) {
       if(this.state._id){
        fetch(`/api/tasks/${this.state._id}`,{
            method:'PUT',
            body:JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) .then(res=> res.json())
            .then(data=> {console.log(data);
                M.toast ({html: 'Tarefa Atualizada'});
                this.setState({title: '', description: '', _id: ''})
                this.fetchTasks()
            })


       }else{
        fetch('/api/tasks',{
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }) .then(res=>res.json())
            .then(data =>{
                console.log(data)
                M.toast({html: 'Tarefa Guardada'})
                this.setState({title:'',description:''})
                this.fetchTasks()
            })
            .catch(err=>console.error(err))

       }
        e.preventDefault();
    }
    componentDidMount(){
        this.fetchTasks()
    }
    fetchTasks(){
        fetch('/api/tasks')
        .then(res=> res.json())
        .then(data=>{
            
            this.setState({tasks: data})
            console.log(this.state.tasks)
        } )
    }
    deleteTask(id){
       if(confirm('Tem a certeza que quer eliminar?')){
        fetch(`/api/tasks/${id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res=> res.json())
        .then(data=>{
            M.toast({html: 'Tarefa eliminada'})
            this.fetchTasks()
        } )
       }
      
    }


    editTask(id){
        fetch(`/api/tasks/${id}`,{
           
        })
        .then(res=> res.json())
        .then(data=>{
           this.setState({
               title: data.title,
               description: data.description,
               _id: data._id
           })
            
        } )
    }
    handleChange(e){
        const { name, value }= e.target;
        
       this.setState ({
            [name]:value
        })
    }
    render(){
        return(
            <div >
                {/* Navigation*/}
            <nav className="light-blue darken-4">

                <div className="container" style={{textAlign: "center"}}>
                    <a className="brand-logo" href="/"> 
                       Tarefas para Semana
                    </a>
                </div>
            </nav>
                <div className="container">
                    <div className='row'>
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" style={{textAlign: "center"}} value= {this.state.title} onChange={this.handleChange} type="text" placeholder="Título da Tarefa"></input>
                                            </div>
                                            <div className="row">
                                            <div className="input-field col s12">
                                               <textarea name="description" style={{textAlign: "center"}} value= {this.state.description} onChange={this.handleChange} placeholder="Descrição da Tarefa" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        </div>
                                        <button type="submit"  className="btn light-blue darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col S7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className= "btn light-blue darken-4" onClick={()=>this.deleteTask(task._id)}>
                                                            <i className= "material-icons">delete</i>
                                                        </button>
                                                        <button className= "btn light-blue darken-4" style={{margin: '4px'}} onClick={()=>this.editTask(task._id)}>
                                                        <i className= "material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )              
                                            })
                                    }
                                    

                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
            
        )
    }
}

export default App;