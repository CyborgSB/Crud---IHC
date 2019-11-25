import React, { Component} from 'react';

import {Table,
        Button,
        Alert,
    } from 'reactstrap';


class ListContact extends Component {

    delete = (id) => {
        this.props.deleteContact(id);
    }
    
    render ( ){
        const {contacts} = this.props;
        return (
          <Table className="table-bordered text-center">
              <thead className="thead-dark">
                  <tr><th>ID</th>
                      <th>Nome</th>
                      <th>Telefone</th>
                      <th>Email</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      contacts.map(contact => (
                          <tr key={contact.id}>
                              <td>{contact.id}</td>
                              <td>{contact.nome}</td> 
                              <td>{contact.telefone}</td> 
                              <td>{contact.email}</td> 
                              <td>                             
                              <Button color='danger' size="lg"  onClick={e => this.delete(contact.id)}>Excluir</Button>
                              </td>
                          </tr>
                      ))
                  }
              </tbody>
          </Table>
        )
    }
}

export default class ContactBox extends Component {
    Url = 'http://localhost:3333/agendadigital';

    state = {
        contacts: [],
        message:{
            text:'',
            alert:''
        }

    }

    async componentDidMount () {
        fetch (this.Url)
            .then (response => response.json())
            .then (contacts => this.setState({contacts}))
            .catch (e => console.log(e));
        
    }

    delete =  (id) => {
        fetch(`${this.Url}/${id}`,{method: 'DELETE'})
        .then(response => response.json())
        .then(rows => {
            const contacts = this.state.contacts.filter(contact=>contact.id!==id);
            this.setState({contacts, message:{text:'Contato Excluído com Sucesso', alert:'danger'} });
            this.timerMessage(3000);
        })
        .catch(e => console.log(e));
    }

    timerMessage = (duration) => {
        setTimeout (() =>{
            this.setState({message: {text:'', alert:''}});
        }, duration);
    }

    render () {
        return (
            <div>
                {
                    this.state.message.text !== ''? (
                        <Alert color={this.state.message.alert} className="text-center"> {this.state.message.text} </Alert>
                    ) : ''
                }
            
                <div>             
                  
                    <h2 className="font-weight-bold text-center ">Lista de Contatos</h2>
                <ListContact contacts={this.state.contacts} deleteContact={this.delete}/>
            

        </div>
        
      </div>
            );
    }
       
}
