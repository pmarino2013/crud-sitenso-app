import React from "react";
import {
  useGetContactQuery,
  useGetContactIdQuery,
  useAddContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} from "./redux/services/contact";

const App = () => {
  const { data, error, isFetching } = useGetContactQuery();
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <h1>Contactos Query</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          {error ? (
            <h3>No se encontró la info</h3>
          ) : isFetching ? (
            <h4>Cargando...</h4>
          ) : (
            data.map((contact) => (
              <div key={contact.id} className="mb-2">
                <h4>{contact.nombre}</h4>
                <ContactId id={contact.id} />

                <div className="d-flex gap-3 ">
                  <UpdateContact id={contact.id} />
                  <DeleteContacto id={contact.id} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 col-md-6 offset-md-3 d-grid gap-3">
          <AddContact />
        </div>
      </div>
    </div>
  );
};
//Datos de cada contacto por id--------------------------
export const ContactId = ({ id }) => {
  const { data } = useGetContactIdQuery(id);
  return <pre>{JSON.stringify(data, undefined, 2)}</pre>;
};

//Agregar un contacto------------------------------------
export const AddContact = () => {
  const [addContact] = useAddContactMutation();
  const contact = {
    id: 4,
    nombre: "Adriana Guerra",
    email: "adriguerra@gmail.com",
    password: "abc123456",
  };

  const agregarContacto = async () => {
    await addContact(contact);
  };

  return (
    <button className="btn btn-primary" onClick={agregarContacto}>
      Add Contact
    </button>
  );
};

//Actualizar contacto---------------------------------
export const UpdateContact = ({ id }) => {
  const [updateContact] = useUpdateContactMutation();
  const contact = {
    id,
    nombre: "Pedro Torres",
    email: "ptorres@gmail.com",
    password: "abc123456",
  };

  const actualizarContacto = async () => {
    await updateContact(contact);
  };

  return (
    <>
      <button className="btn btn-warning" onClick={actualizarContacto}>
        Update Contact
      </button>
    </>
  );
};

//Borrar Contacto------------------------------------
export const DeleteContacto = ({ id }) => {
  const [deleteContact] = useDeleteContactMutation();

  const borrarContacto = async () => {
    await deleteContact(id);
  };

  return (
    <button className="btn btn-danger" onClick={borrarContacto}>
      Delete Contact
    </button>
  );
};

export default App;
