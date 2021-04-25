/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useEffect, useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

//import { api } from '../../../services/API';

// type ProductsDescriptionProps= {
//   value: string | number | readonly string[] | undefined;
//   label: string;
// };

export default function ModalProduct(props: any) {

  //const [state, setState] = useState([] as ProductsDescriptionProps[]);
  const [ show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);

  // useEffect(() => {
  //   async function fetch() {
  //     const { data } = await api.post('api/products/distinct', {

  //     })
  //     if (data?.data) setState(data.data as ProductsDescriptionProps[])
  //   }
  //   fetch()
  // },[])


  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        Descrição do Produto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
