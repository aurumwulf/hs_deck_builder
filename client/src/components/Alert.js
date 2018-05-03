import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class Alert extends React.Component {
  state = { toggleAlert: true };

  handleAlert = () => {
    this.setState({ toggleAlert: false });
  };

  render() {
    const actions = [
      <Button label="Acknowledge" primary={true} onClick={this.handleClose} />,
    ];
    return (
      <Dialog
        open={this.state.toggleAlert}
        onClose={this.handleAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {'Add the wrong card?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sample Text
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default Alert;
