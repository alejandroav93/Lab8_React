import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./gameover.css";

const Finish = ({ handleRestart, showModal, bestScore, moves }) => {
  return (
    <div>
      <Dialog
        open={showModal}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="alertTitle"
        aria-describedby="alertMessage"
      >
        <h2>FIN DEL JUEGO</h2>
        <DialogTitle id="alertTitle">
          Haz terminado el juego!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alertMessage">
            Haz realizado {moves} movimientos. Mejor Puntaje: {bestScore}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestart} color="primary">
            Reiniciar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Finish;
