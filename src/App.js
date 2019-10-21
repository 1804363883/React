import React, { Component } from 'react';
import './App.css';


class App extends Component {

  //Constructor 
  constructor(props){
    super(props);
    // Definir variables de Estado
    this.state={
      title: 'Aplicación Simple REACT',
      act: 0,
      index: '',
      datas: []
    } 

  }

  // Método para enlazar el foco en el componente name 
  componentDidMount(){
    this.refs.name.focus();
  }

  fSubmit = (e) =>{
   // Referencia directa al nodo DOM autocompletado 
    e.preventDefault();
   // decalara variable locales  obteniendo los valores 
    let datas = this.state.datas;
    let name = this.refs.name.value;
    let address = this.refs.address.value;

    // verificar si  la variable  de estadop es igual a 0
    if(this.state.act === 0){   //nuevo
      let data = {
        name, address
      }
      // añadir datos
      datas.push(data);
    }else{  
      //actualizar datos                    //actualizar
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }   

//Actualizar variables de estado
    this.setState({
      datas: datas,
      act: 0
    });
// Refencia a componentes my form y name para borrar y tomar el foco
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  // Metodo Remover dato
  fRemove = (i) => {
    // variable  local toma valores definidos por los componentes
    let datas = this.state.datas;
    // separ datos seleccionados 
    datas.splice(i,1);
    
//Actualizar variables de estado
    this.setState({
      datas: datas
    });
// Refencia a componentes my form y name para borrar y tomar el foco
    this.refs.myForm.reset();
    this.refs.name.focus();
  }

  // Metodo editar 
  fEdit = (i) => {
      // variable  local toma valores definidos por los componentes de estado en la  posición correspondiente 
    let data = this.state.datas[i];
    // haciendo referencia  a variables name y addresss para tomar valores asignados
    
    this.refs.name.value = data.name;
    this.refs.address.value = data.address;

//Actualizar variables de estado
    this.setState({
      act: 1,
      index: i
    });

    // Asignar foco en  el componente name
    this.refs.name.focus();
  }  

  //Método de ejecución
  render() {
    // definir variable local que contenga los datos de las variables de estado
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
       
          <input type="text" ref="name" placeholder="Nombre" className="formField" />
          <input type="text" ref="address" placeholder="Dirección" className="formField" />
        
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Añadir </button>
        </form>
        <pre>
      
          {datas.map((data, i) =>
            //identificar que ítems han cambiado, son agregados, o son eliminados.
            <li key={i} className="myList">
              {i+1}. {data.name}, {data.address}
          
              <button onClick={()=>this.fRemove(i)} className="myListButton">Quitar </button>
              <button onClick={()=>this.fEdit(i)} className="myListButton">Editar </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;
