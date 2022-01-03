import React from "react";

import {useGetContactsQuery, useGetContactIdQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation} from './redux/services/contact'

const App = () => {

  const {data, error, isFetching} = useGetContactsQuery()
console.log(data);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h1>Contactos Query</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          {/* Listar contactos  */}
          {error ? <h3>No se encontró la info</h3>
            :
            isFetching ? <h4>Cargando...</h4>
            :
            data.map(contact=>(
              <div key={contact.id} >
                <h4>{contact.nombre}</h4>
                <ContactId id={contact.id}/>
              </div>
            ))
           }

          {/* Botones para actualizar y eliminar  */}
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 col-md-6 offset-md-3 d-grid gap-3">
          {/* Botón Agregar contacto  */}
          <AddContact />
        </div>
      </div>
    </div>
  );
};


//Datos de cada contacto por su id
 const ContactId=({id})=>{

  const { data}= useGetContactIdQuery(id)

  return(
    <pre>{JSON.stringify(data, undefined, 2)}</pre>
  )

}

//Componente para agregar contacto
const AddContact=()=>{

  const [addContact]= useAddContactMutation();

  const contacto={
    id:4,
    nombre:'Cecilia Fernandez',
    email:'cfernandez@gmail.com'
  }

  const agregarContacto= async ()=>{
    await addContact(contacto)
  }

  return(

     <button className="btn btn-primary" onClick={agregarContacto}>Add Contact</button>
  )


}





export default App;
