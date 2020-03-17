import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function GuestModal({ open, handleClose, roomId }) {
  const history = useHistory();
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // const username = localStorage.getItem('@multiplan_username');
    // if(!username){
    localStorage.setItem('@multiplan_username', name)
    localStorage.setItem('@multiplan_type', 'guest')
    // }
    history.push(`/room/${roomId}`)
  }
  
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Entrar como convidado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para entrar em uma sala, primeiro me informe um apelido
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="nick"
            label="Apelido"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={handleSubmit}>
            Entrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}