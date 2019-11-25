import React, { Component} from 'react';

import {Button,
        Form,
        FormGroup,
        Label,
        Input,
        Alert,
    } from 'reactstrap';

class FormContact extends Component {


    state = {
        model:{
            id: 0,
            nome:'',
            telefone:'',
            email:''
    }
};

    setValues = (e, field) => {
        const {model} = this.state;
        model[field] = e.target.value;
        this.setState ({model});
        console.log(this.state.model);
    }

    create = () => {
        this.setState({model:{id: 0, nome:'', telefone:'', email:'' }})
        this.props.contactCreate(this.state.model);

    }
  
    render ( ){
        return (
           <Form>
               
               
               <FormGroup>
                   <Form>                       
                   <Label for="Nomide">ID</Label>
                           <Input id="id" type="number" value={this.state.model.id} placeholder="Insira o ID do contato a ser atualizado..."
                            onChange={e=> this.setValues(e, 'id')}/>
                           <br></br>
                           
                   </Form>
                   <div>                       
                           <Label for="Nome">Nome</Label>
                           <Input id="nome" type="text" value={this.state.model.nome} placeholder="Insira o nome do contato..."
                            onChange={e=> this.setValues(e, 'nome')}/>
                           <br></br>
                   <div >   
                            <Label for="Telefone">Telefone</Label>
                            <Input id="telefone" type="number" value={this.state.model.telefone} placeholder="Insira o número do contato..."
                             onChange={e=> this.setValues(e, 'telefone')}/>
                            <br></br>
                        </div>
                    <div >   
                            <Label for="Email">Email</Label>
                            <Input id="email" type="text" value={this.state.model.email} placeholder="Insira o email do contato..."
                             onChange={e=> this.setValues(e, 'email')}/>
                            <br></br>
                        </div>
                   </div>
               </FormGroup>
               <Button color="primary" block onClick={this.create}>Salvar</Button>
               
           </Form>
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

    save = (contact)=> {
        
        let data = {
            id: parseInt(contact.id),
            nome: contact.nome,
            telefone: contact.telefone,
            email: contact.email,


        };
        const requestInfo = {
            method: data.id !==0? 'PUT':'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type':'application/json'
            })
        };
        if (data.id === 0) {
            //criar um contato novo
            fetch(this.Url, requestInfo)
            .then(response => response.json())
            .then(newContact => {
                let { contacts } = this.state;
                contacts.push(newContact);
                this.setState({ contacts, message:{text:'Contato Cadastrado com Sucesso!', alert:'success'} });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        }else {
            //editar um contato existente
            fetch(`${this.Url}/${data.id}`, requestInfo)
            .then(response => response.json())
            .then(updatedContact => {
                let { contacts } = this.state;
                let position = contacts.findIndex(contact => contact.id === data.id);
                contacts[position] = updatedContact;
                this.setState({ contacts, message:{text:'Contato Atualizado com Sucesso', alert:'info'} });
                this.timerMessage(3000);
            })
            .catch(e => console.log(e));

        }
       
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
            
                <div >             
                    
                        <h2 className="font-weight-bold text-center ">Cadastrar/Atualizar Contato</h2>
                        <FormContact contactCreate={this.save}/>

           
           </div>
      </div>
            );
    }
       
}
